import { NextResponse } from "next/server";

import {
  applyAgentChoice,
  buildFlowSystemPrompt,
  findOptionMatch,
  getStepOptions,
  getStepPrompt,
  type AgentSession,
} from "@/lib/agent-flow";

export const runtime = "nodejs";

type ChatRequestBody = {
  message?: string;
  session?: AgentSession;
  history?: Array<{ role: "user" | "assistant"; text: string }>;
};

function getGeminiApiKey() {
  return (
    process.env["GEMINI_API_KEY"]?.trim() ||
    process.env["GOOGLE_GENERATIVE_AI_API_KEY"]?.trim() ||
    ""
  );
}

async function askGemini(params: {
  system: string;
  message: string;
  history?: Array<{ role: "user" | "assistant"; text: string }>;
}) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const contents = [
    ...(params.history ?? []).slice(-8).map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.text }],
    })),
    {
      role: "user",
      parts: [{ text: params.message }],
    },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: params.system }],
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 400,
        },
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Gemini request failed (${response.status}): ${detail.slice(0, 240)}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = body.message?.trim() || "";
    const session = body.session;

    if (!message || !session) {
      return NextResponse.json({ error: "Message and session are required." }, { status: 400 });
    }

    if (session.step === "cta") {
      return NextResponse.json({
        reply:
          "Your brief is ready. Use Contact Us or book a 30-minute meeting and our team will continue from here.",
        session,
        options: [],
        showCta: true,
        usedAi: false,
      });
    }

    const options = getStepOptions(session);
    const matched = findOptionMatch(message, options);

    if (matched) {
      const result = applyAgentChoice(session, matched);
      return NextResponse.json({
        reply: result.reply,
        session: result.session,
        options: getStepOptions(result.session),
        showCta: result.session.step === "cta",
        usedAi: false,
      });
    }

    let aiReply: string | null = null;
    try {
      aiReply = await askGemini({
        system: buildFlowSystemPrompt(session),
        message,
        history: body.history,
      });
    } catch (error) {
      console.error("Gemini chat error:", error);
    }

    const prompt = getStepPrompt(session);
    const fallback =
      options.length > 0
        ? `${aiReply ? `${aiReply}\n\n` : ""}Please choose one of the options below to continue.\n\n${prompt}`
        : aiReply ||
          "Thanks for reaching out. Share a bit more about your project, or restart the assistant to begin the guided intake again.";

    return NextResponse.json({
      reply: fallback,
      session,
      options,
      showCta: false,
      usedAi: Boolean(aiReply),
      aiConfigured: Boolean(getGeminiApiKey()),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unable to process that message right now." },
      { status: 500 },
    );
  }
}
