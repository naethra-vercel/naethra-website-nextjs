import { WORDPRESS_ORIGIN } from "@/lib/wordpress-config";

const CONTACT_FORM_ID = 136;
export const FOOTER_CONTACT_FORM_ID = "598b27e";
const RECAPTCHA_SITE_KEY =
  process.env["NEXT_PUBLIC_RECAPTCHA_SITE_KEY"]?.trim() ||
  process.env["VITE_RECAPTCHA_SITE_KEY"]?.trim();

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

let recaptchaScriptPromise: Promise<void> | undefined;

function loadRecaptcha() {
  if (!RECAPTCHA_SITE_KEY) {
    return Promise.reject(new Error("reCAPTCHA is not configured."));
  }

  if (typeof window === "undefined") {
    return Promise.reject(new Error("reCAPTCHA is only available in the browser."));
  }

  if (window.grecaptcha) {
    return new Promise<void>((resolve) => window.grecaptcha?.ready(resolve));
  }

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (!window.grecaptcha) {
          reject(new Error("reCAPTCHA could not be initialized."));
          return;
        }
        window.grecaptcha.ready(resolve);
      };
      script.onerror = () => reject(new Error("reCAPTCHA could not be loaded."));
      document.head.append(script);
    });
  }

  return recaptchaScriptPromise;
}

async function getRecaptchaToken() {
  if (!RECAPTCHA_SITE_KEY) return "";
  try {
    await loadRecaptcha();
    return window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "contactform" });
  } catch {
    return "";
  }
}

type ContactFormInput = {
  name: string;
  email: string;
  website?: string;
  message: string;
  details?: Array<[label: string, value?: string]>;
  formId?: string | number;
  fields?: Record<string, string>;
};

type ContactForm7Response = {
  status?: string;
  message?: string;
};

export async function submitContactForm(input: ContactFormInput) {
  const recaptchaToken = await getRecaptchaToken();
  const formId = String(input.formId ?? CONTACT_FORM_ID);
  const details = input.details
    ?.filter((detail): detail is [string, string] => Boolean(detail[1]?.trim()))
    .map(([label, value]) => `${label}: ${value.trim()}`);
  const message = details?.length
    ? `${input.message.trim()}\n\n${details.join("\n")}`
    : input.message.trim();

  const body = new FormData();
  body.set("_wpcf7", formId);
  body.set("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
  body.set("_wpcf7_container_post", "0");
  body.set("_wpcf7_recaptcha_response", recaptchaToken);

  if (input.fields) {
    for (const [key, value] of Object.entries(input.fields)) {
      body.set(key, value);
    }
  } else {
    body.set("your-name", input.name.trim());
    body.set("your-email", input.email.trim());
    body.set("your-website", input.website?.trim() ?? "");
    body.set("your-message", message);
  }

  const response = await fetch(
    `${WORDPRESS_ORIGIN}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    {
      method: "POST",
      body,
    },
  );
  const result = (await response.json().catch(() => null)) as ContactForm7Response | null;

  if (!response.ok || result?.status !== "mail_sent") {
    throw new Error(
      result?.message || "We couldn't send your message. Please try again in a moment.",
    );
  }

  return result;
}

export function submitFooterContactForm(input: {
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  message: string;
}) {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone?.trim() ?? "";
  const reason = input.reason?.trim() ?? "";
  const message = input.message.trim();

  return submitContactForm({
    formId: FOOTER_CONTACT_FORM_ID,
    name,
    email,
    message,
    fields: {
      "your-name": name,
      "your-email": email,
      "your-phone": phone,
      "your-number": phone,
      "your-subject": reason,
      "your-reason": reason,
      "your-message": message,
    },
  });
}
