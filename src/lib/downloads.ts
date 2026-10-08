import { createServerFn } from "@tanstack/react-start";

const WORDPRESS_API_BASE =
  import.meta.env["VITE_WORDPRESS_API_URL"]?.replace(/\/$/, "") ||
  "https://naethra.com/wp-json/wp/v2";

const WORDPRESS_ORIGIN =
  WORDPRESS_API_BASE.replace(/\/wp-json\/wp\/v2\/?$/i, "") || "https://naethra.com";

export type DownloadResource = {
  id: number;
  title: string;
  category: string;
  href: string;
};

type DownloadManagerPackage = {
  ID?: number;
  post_title?: string;
  post_content?: string;
};

type DownloadManagerResponse = {
  packages?: DownloadManagerPackage[];
};

type DownloadUnlockResponse = {
  success?: boolean;
  message?: string;
  downloadurl?: string;
  download_url?: string;
  url?: string;
};

const DOWNLOADS_FALLBACK: DownloadResource[] = [
  [46108, "PHP Web Apps", "PHP"],
  [46079, "WordPress", "WordPress"],
  [46132, "Ecommerce Solutions", "Ecommerce solutions"],
  [46133, "Android Apps", "Android"],
  [46134, "iOS Apps", "iOS"],
  [46137, "Hybrid Mobile Apps", "Hybrid"],
  [46138, "Flutter Apps", "Flutter"],
  [46139, "Content Management Systems (CMS)", "Content Management Systems"],
  [46140, "Cloud (AWS / AZURE / DevOps)", "Cloud"],
  [46141, "Angular", "Angular"],
  [46142, "Custom Web Publishing (CWP)", "CWP"],
  [46143, "Claris FileMaker", "Claris FileMaker"],
  [46188, "Java", "Java"],
  [46198, ".Net", ".Net"],
  [46476, "Database Management", "Database"],
  [46479, "Mobile Project", "Mobile"],
  [46489, "Oracle project", "Oracle"],
  [46490, "Shopify Project", "Shopify"],
  [46491, "WordPress Integration With FileMaker", "WordPress / FileMaker"],
  [46496, "Web Project", "Web"],
].map(([id, title, category]) => ({
  id: id as number,
  title: title as string,
  category: category as string,
  href: `${WORDPRESS_ORIGIN}/?p=${id}`,
}));

const fallbackById = new Map(DOWNLOADS_FALLBACK.map((item, index) => [item.id, { item, index }]));

export async function getDownloads() {
  try {
    const response = await fetch(`${WORDPRESS_ORIGIN}/wp-json/wpdm/search`);
    if (!response.ok) throw new Error(`Downloads request failed: ${response.status}`);

    const data = (await response.json()) as DownloadManagerResponse;
    const downloads = (data.packages ?? [])
      .map((item): DownloadResource | null => {
        if (typeof item.ID !== "number" || !item.post_title) return null;
        return {
          id: item.ID,
          title: item.post_title,
          category:
            item.post_content?.trim() ||
            fallbackById.get(item.ID)?.item.category ||
            "Project resource",
          href: `${WORDPRESS_ORIGIN}/?p=${item.ID}`,
        };
      })
      .filter((item): item is DownloadResource => item !== null)
      .sort(
        (a, b) =>
          (fallbackById.get(a.id)?.index ?? Number.MAX_SAFE_INTEGER) -
          (fallbackById.get(b.id)?.index ?? Number.MAX_SAFE_INTEGER),
      );

    return downloads.length > 0 ? downloads : DOWNLOADS_FALLBACK;
  } catch {
    return DOWNLOADS_FALLBACK;
  }
}

function extractDownloadUrl(result: DownloadUnlockResponse) {
  const value = result.downloadurl || result.download_url || result.url || "";
  if (/^https?:\/\//i.test(value)) return value;

  const html = `${value} ${result.message ?? ""}`;
  const href = html.match(/href=["']([^"']+)["']/i)?.[1];
  return href ? new URL(href, WORDPRESS_ORIGIN).toString() : "";
}

function plainMessage(message?: string) {
  return (
    message
      ?.replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " ")
      .trim() || "The password is incorrect. Please try again."
  );
}

const validateDownloadPassword = createServerFn({ method: "POST" })
  .validator((data: { packageId: number; password: string }) => {
    if (!Number.isInteger(data.packageId) || data.packageId < 1) {
      throw new Error("Invalid download.");
    }
    const password = data.password.trim();
    if (!password || password.length > 200) {
      throw new Error("Enter a valid password.");
    }
    return { packageId: data.packageId, password };
  })
  .handler(async ({ data }) => {
    const body = new URLSearchParams({
      __wpdm_ID: String(data.packageId),
      dataType: "json",
      execute: "wpdm_getlink",
      action: "wpdm_ajax_call",
      password: data.password,
    });
    const response = await fetch(`${WORDPRESS_ORIGIN}/wp-json/wpdm/validate-password`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const result = (await response.json().catch(() => null)) as DownloadUnlockResponse | null;

    if (!response.ok || !result) {
      throw new Error("WordPress could not validate this download.");
    }
    return result;
  });

export async function unlockDownload(packageId: number, password: string) {
  const result = await validateDownloadPassword({ data: { packageId, password } });

  if (!result.success) {
    throw new Error(plainMessage(result?.message));
  }

  const downloadUrl = extractDownloadUrl(result);
  if (!downloadUrl) {
    throw new Error("The download link could not be created. Please try again.");
  }

  return downloadUrl;
}
