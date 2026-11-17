import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/instantly.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const instantly = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

test("management requests require the configured admin bearer token", () => {
  const previous = process.env["INSTANTLY_ADMIN_TOKEN"];
  process.env["INSTANTLY_ADMIN_TOKEN"] = "correct-secret-value-long-enough-for-production-use";
  try {
    const missing = instantly.authorizeAndLimit(
      new Request("https://example.test/api/instantly/campaigns"),
    );
    const invalid = instantly.authorizeAndLimit(
      new Request("https://example.test/api/instantly/campaigns", {
        headers: { Authorization: "Bearer wrong-secret" },
      }),
    );
    assert.equal(missing.status, 401);
    assert.equal(invalid.status, 401);
  } finally {
    if (previous === undefined) delete process.env["INSTANTLY_ADMIN_TOKEN"];
    else process.env["INSTANTLY_ADMIN_TOKEN"] = previous;
  }
});

test("lead and campaign payloads reject missing or malformed required fields", () => {
  const campaignId = "123e4567-e89b-12d3-a456-426614174000";
  assert.equal(instantly.isValidCampaignPayload({ name: "New campaign" }), true);
  assert.equal(instantly.isValidCampaignPayload({ name: " " }), false);
  assert.equal(
    instantly.isValidLeadPayload({ campaign: campaignId, email: "person@example.com" }),
    true,
  );
  assert.equal(instantly.isValidLeadPayload({ campaign: campaignId }), false);
  assert.equal(instantly.isValidLeadPayload({ list_id: campaignId, first_name: "Ari" }), true);
  assert.equal(instantly.isValidLeadPayload({ list_id: campaignId }), false);
  assert.equal(
    instantly.isValidLeadPayload({ campaign: "not-a-uuid", email: "person@example.com" }),
    false,
  );
});

test("list query validation limits page size and rejects unknown parameters", () => {
  const valid = instantly.buildListQuery(
    new Request("https://example.test/api/instantly/accounts?limit=50&search=hello"),
    ["limit", "search"],
  );
  const tooLarge = instantly.buildListQuery(
    new Request("https://example.test/api/instantly/accounts?limit=101"),
    ["limit"],
  );
  const unknown = instantly.buildListQuery(
    new Request("https://example.test/api/instantly/accounts?api_key=secret"),
    ["limit"],
  );
  assert.deepEqual(valid, { query: "limit=50&search=hello" });
  assert.equal("error" in tooLarge, true);
  assert.equal("error" in unknown, true);
});

test("Instantly API calls keep credentials in headers, log metadata only, and handle errors safely", async () => {
  const previous = process.env["INSTANTLY_API_KEY"];
  process.env["INSTANTLY_API_KEY"] = "server-api-key";
  const logs = [];
  const originalInfo = console.info;
  console.info = (message) => logs.push(String(message));
  try {
    const success = await instantly.callInstantly({
      path: "/accounts?limit=10",
      method: "GET",
      requestId: "test-api-success",
      fetcher: async (url, init) => {
        assert.equal(url, "https://api.instantly.ai/api/v2/accounts?limit=10");
        assert.equal(init.headers.Authorization, "Bearer server-api-key");
        return Response.json({ items: [{ email: "private@example.com" }] });
      },
    });
    assert.equal(success.status, 200);
    assert.equal((await success.json()).items[0].email, "private@example.com");
    assert.equal(logs.join("\n").includes("server-api-key"), false);
    assert.equal(logs.join("\n").includes("private@example.com"), false);

    const failed = await instantly.callInstantly({
      path: "/campaigns",
      method: "POST",
      requestId: "test-api-error",
      body: { name: "Example" },
      fetcher: async () => new Response("sensitive upstream details", { status: 401 }),
    });
    assert.equal(failed.status, 502);
    assert.deepEqual(await failed.json(), { error: "Instantly API request failed." });
  } finally {
    console.info = originalInfo;
    if (previous === undefined) delete process.env["INSTANTLY_API_KEY"];
    else process.env["INSTANTLY_API_KEY"] = previous;
  }
});

test("webhook validation, bearer authentication, and duplicate suppression", () => {
  const previous = process.env["INSTANTLY_WEBHOOK_SECRET"];
  process.env["INSTANTLY_WEBHOOK_SECRET"] = "webhook-secret-value-long-enough-for-production-use";
  const body = JSON.stringify({
    timestamp: "2026-10-23T12:00:00.000Z",
    event_type: "reply_received",
    workspace: "workspace-id",
    campaign_id: "campaign-id",
    campaign_name: "Example",
    lead_email: "private@example.com",
  });
  const event = JSON.parse(body);
  try {
    assert.equal(
      instantly.verifyWebhookAuthorization(
        new Request("https://example.test/api/webhooks/instantly", {
          headers: { Authorization: "Bearer incorrect" },
        }),
      ),
      false,
    );
    assert.equal(
      instantly.verifyWebhookAuthorization(
        new Request("https://example.test/api/webhooks/instantly", {
          headers: { Authorization: "Bearer webhook-secret-value-long-enough-for-production-use" },
        }),
      ),
      true,
    );
    assert.equal(instantly.validateWebhookEvent(event), true);
    assert.equal(instantly.validateWebhookEvent({ ...event, timestamp: "bad-date" }), false);
    assert.equal(instantly.acceptWebhookEvent(event, body), true);
    assert.equal(instantly.acceptWebhookEvent(event, body), false);
  } finally {
    if (previous === undefined) delete process.env["INSTANTLY_WEBHOOK_SECRET"];
    else process.env["INSTANTLY_WEBHOOK_SECRET"] = previous;
  }
});

test("management API rate limit returns 429 after 60 authorized calls", () => {
  const previous = process.env["INSTANTLY_ADMIN_TOKEN"];
  process.env["INSTANTLY_ADMIN_TOKEN"] = "rate-limit-secret-long-enough-for-production-use";
  const request = new Request("https://example.test/api/instantly/accounts", {
    headers: { Authorization: "Bearer rate-limit-secret-long-enough-for-production-use" },
  });
  try {
    for (let index = 0; index < 60; index += 1) {
      assert.equal(instantly.authorizeAndLimit(request, `rate-test-${index}`), null);
    }
    const limited = instantly.authorizeAndLimit(request, "rate-test-over");
    assert.equal(limited.status, 429);
    assert.ok(Number(limited.headers.get("Retry-After")) > 0);
  } finally {
    if (previous === undefined) delete process.env["INSTANTLY_ADMIN_TOKEN"];
    else process.env["INSTANTLY_ADMIN_TOKEN"] = previous;
  }
});
