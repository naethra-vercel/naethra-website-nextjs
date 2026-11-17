"use client";

import {
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  type FormEvent,
  useState,
} from "react";

import { ModernDropdown } from "@/components/ModernDropdown";
import NaethraContentPage from "@/components/NaethraContentPage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitContactForm } from "@/lib/contact-form";

const PROJECT_TYPE_OPTIONS = [
  { value: "Web application", label: "Web application", description: "Sites, portals, and custom web apps" },
  {
    value: "Mobile application",
    label: "Mobile application",
    description: "iOS, Android, or cross-platform",
  },
  {
    value: "Flutter development",
    label: "Flutter development",
    description: "One codebase for mobile and beyond",
  },
  {
    value: "FileMaker development",
    label: "FileMaker development",
    description: "Claris FileMaker apps and integrations",
  },
  {
    value: "Support & maintenance",
    label: "Support & maintenance",
    description: "Ongoing care for what you already run",
  },
];

const MAP_EMBED =
  "https://maps.google.com/maps?q=37%2C%20Viswanathapuram%20Main%20Rd%2C%20Azeez%20Nagar%2C%20Kodambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600024&t=m&z=14&output=embed&iwloc=near";

const MAP_LINK =
  "https://maps.google.com/?q=37,+Viswanathapuram+Main+Rd,+Kodambakkam,+Chennai+600024";

type ContactField = "name" | "email" | "phone" | "company" | "message" | "projectType" | "budget";

type ContactValues = Record<ContactField, string>;

type ContactErrors = Partial<Record<ContactField, string>>;

const INITIAL_VALUES: ContactValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  projectType: "",
  budget: "",
};

function isValidEmail(value: string) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value);
}

function isValidPhone(value: string) {
  return /^\+[0-9]{8,15}$/.test(value);
}

function sanitizeName(value: string) {
  return value.replace(/[^a-zA-Z0-9. ]+/g, "").toUpperCase();
}

function sanitizeEmail(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function sanitizePhone(value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  const plusCount = (digits.match(/\+/g) ?? []).length;
  if (plusCount === 0) return digits.replace(/\D/g, "");
  const rest = digits.replace(/\+/g, "");
  return `+${rest}`;
}

const UNSAFE_CODE_PATTERN =
  /<\/?[a-z][\w:-]*\b|<!DOCTYPE\b|<!--|<\?|<%|javascript\s*:|data\s*:\s*text\/html|on[a-z]+\s*=\s*(['"]|javascript)|expression\s*\(|document\s*\.|window\s*\.|eval\s*\(|<\s*script\b/i;

function containsUnsafeCode(value: string) {
  return UNSAFE_CODE_PATTERN.test(value);
}

function normalizeFieldValue(field: ContactField, value: string) {
  switch (field) {
    case "name":
      return sanitizeName(value);
    case "email":
      return sanitizeEmail(value);
    case "phone":
      return sanitizePhone(value);
    default:
      return value;
  }
}

function validateField(field: ContactField, values: ContactValues): string {
  const value = values[field].trim();

  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (!/^[A-Z0-9. ]+$/.test(value)) {
        return "Name can only include letters, numbers, spaces, and periods.";
      }
      return "";
    case "email":
      if (!value) return "Please enter your email address.";
      if (!isValidEmail(value)) return "Please enter a valid email address.";
      return "";
    case "phone":
      if (!value) return "";
      if (!isValidPhone(value)) {
        return "Enter a country code with numbers only, like +919876543210.";
      }
      return "";
    case "message":
      return value ? "" : "Please tell us what you are looking to build.";
    default:
      return "";
  }
}

function validateForm(values: ContactValues): ContactErrors {
  const fields: ContactField[] = ["name", "email", "phone", "message"];
  const errors: ContactErrors = {};

  fields.forEach((field) => {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  });

  return errors;
}

function FieldLabel({ children, required = false }: { children: string; required?: boolean }) {
  return (
    <span className="contact-field-label">
      {children}
      {required ? <span className="contact-required-star" aria-hidden="true"> *</span> : null}
    </span>
  );
}

export default function ContactPage() {
  const [values, setValues] = useState<ContactValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [codeWarningOpen, setCodeWarningOpen] = useState(false);
  const [blockedSample, setBlockedSample] = useState("");

  function showCodeWarning(sample: string) {
    setBlockedSample(sample.trim().slice(0, 180));
    setCodeWarningOpen(true);
  }

  function rejectUnsafeInput(value: string) {
    if (!containsUnsafeCode(value)) return false;
    showCodeWarning(value);
    return true;
  }

  function setFieldValue(field: ContactField, value: string) {
    if (rejectUnsafeInput(value)) return;
    const normalized = normalizeFieldValue(field, value);

    setValues((current) => {
      const next = { ...current, [field]: normalized };
      if (touched[field] || errors[field]) {
        const message = validateField(field, next);
        setErrors((currentErrors) => {
          const nextErrors = { ...currentErrors };
          if (message) nextErrors[field] = message;
          else delete nextErrors[field];
          return nextErrors;
        });
      }
      return next;
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    const nextValue = event.target.value;
    if (rejectUnsafeInput(nextValue)) {
      event.target.value = values[field];
      return;
    }
    setFieldValue(field, nextValue);
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as ContactField;
    const pasted = event.clipboardData.getData("text");
    if (containsUnsafeCode(pasted)) {
      event.preventDefault();
      showCodeWarning(pasted);
      return;
    }

    if (field === "name" || field === "email" || field === "phone") {
      event.preventDefault();
      const input = event.currentTarget;
      const start = input.selectionStart ?? values[field].length;
      const end = input.selectionEnd ?? values[field].length;
      const merged = `${values[field].slice(0, start)}${pasted}${values[field].slice(end)}`;
      setFieldValue(field, merged);
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    if (containsUnsafeCode(event.target.value)) {
      showCodeWarning(event.target.value);
      return;
    }
    const nextValues = { ...values, [field]: event.target.value };
    setTouched((current) => ({ ...current, [field]: true }));
    const message = validateField(field, nextValues);
    setErrors((current) => {
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const unsafeField = (Object.keys(values) as ContactField[]).find((field) =>
      containsUnsafeCode(values[field]),
    );
    if (unsafeField) {
      showCodeWarning(values[unsafeField]);
      setValues((current) => ({ ...current, [unsafeField]: "" }));
      return;
    }

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      message: true,
      phone: true,
      company: true,
      projectType: true,
      budget: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus("idle");
      setFormMessage("");
      return;
    }

    setFormStatus("submitting");
    setFormMessage("");

    try {
      await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        website: values.company.trim(),
        message: values.message.trim(),
        details: [
          ["Phone", values.phone],
          ["Project type", values.projectType],
          ["Budget / timeline", values.budget],
        ],
      });
      setValues(INITIAL_VALUES);
      setErrors({});
      setTouched({});
      setFormStatus("success");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "Unable to send your message.");
      setFormStatus("error");
    }
  };

  return (
    <NaethraContentPage
      className="contact-page-premium"
      eyebrow="Start a conversation"
      title="Let's build what's next."
      intro="Tell us what you're building, what you're solving, or where you want to go next. Our team will help turn the idea into something real."
      compact
    >
      <div className="contact-page-premium-shell">
        <section className="contact-premium-contact-items">
          <article className="contact-premium-card" data-reveal="fade-up" data-reveal-delay="1">
            <h3>Visit us</h3>
            <p>
              Naethra Technologies Pvt Ltd. New No: 37, Old No: 22, Viswanathapuram Main Road,
              Kodambakkam, Chennai 600024
            </p>
            <a href={MAP_LINK} target="_blank" rel="noreferrer">
              Open map <span>→</span>
            </a>
          </article>

          <article className="contact-premium-card" data-reveal="fade-up" data-reveal-delay="2">
            <h3>Call us</h3>
            <p>+91 44 3500 3204</p>
            <a href="tel:+914435003204">
              Call now <span>→</span>
            </a>
          </article>

          <article className="contact-premium-card" data-reveal="fade-up" data-reveal-delay="3">
            <h3>Email us</h3>
            <p>Share your roadmap, product idea, or strategy challenge with our team.</p>
            <a href="mailto:info@naethra.com">
              Send email <span>→</span>
            </a>
          </article>
        </section>

        <section className="contact-premium-main">
          <form
            className="contact-premium-form"
            onSubmit={handleSubmit}
            noValidate
            data-reveal="fade-up"
            data-reveal-delay="1"
          >
            <div className="contact-form-header">
              <p className="contact-premium-kicker">Tell us about your project.</p>
              <h3>A few details are enough to get the conversation started.</h3>
            </div>

            <label className={errors.name ? "has-error" : undefined}>
              <FieldLabel required>Your name</FieldLabel>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                onPaste={handlePaste}
                onBlur={handleBlur}
                placeholder="Your Name"
                autoCapitalize="characters"
                spellCheck={false}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name ? (
                <span id="contact-name-error" className="contact-field-error" role="alert">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className={errors.email ? "has-error" : undefined}>
              <FieldLabel required>Email address</FieldLabel>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onPaste={handlePaste}
                onBlur={handleBlur}
                placeholder="You@Company.Com"
                autoCapitalize="off"
                spellCheck={false}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email ? (
                <span id="contact-email-error" className="contact-field-error" role="alert">
                  {errors.email}
                </span>
              ) : null}
            </label>

            <label className={errors.phone ? "has-error" : undefined}>
              <FieldLabel>Phone number</FieldLabel>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                value={values.phone}
                onChange={handleChange}
                onPaste={handlePaste}
                onBlur={handleBlur}
                placeholder="+91 98765 43210"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              />
              {errors.phone ? (
                <span id="contact-phone-error" className="contact-field-error" role="alert">
                  {errors.phone}
                </span>
              ) : null}
            </label>

            <label>
              <FieldLabel>Company / website</FieldLabel>
              <input
                name="company"
                value={values.company}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Company or website"
              />
            </label>

            <label className={errors.message ? "has-error" : undefined}>
              <FieldLabel required>What are you looking to build?</FieldLabel>
              <textarea
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                onPaste={handlePaste}
                onBlur={handleBlur}
                placeholder="Tell us what you are building"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message ? (
                <span id="contact-message-error" className="contact-field-error" role="alert">
                  {errors.message}
                </span>
              ) : null}
            </label>

            <div className="contact-form-row">
              <label>
                <FieldLabel>Project type</FieldLabel>
                <ModernDropdown
                  name="projectType"
                  placeholder="Select a project type"
                  options={PROJECT_TYPE_OPTIONS}
                  value={values.projectType}
                  onChange={(value) => setFieldValue("projectType", value)}
                  variant="solid"
                  aria-label="Project type"
                />
              </label>
              <label>
                <FieldLabel>Budget / timeline</FieldLabel>
                <input
                  name="budget"
                  value={values.budget}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  placeholder="Optional"
                />
              </label>
            </div>

            <button
              className="contact-submit-button"
              type="submit"
              disabled={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? "Sending…" : "Start the conversation"}
            </button>

            <p className="contact-form-required-note">
              <span className="contact-required-star">*</span> Indicates required field
            </p>

            {formStatus === "success" && (
              <p className="contact-success" role="status">
                Thanks for reaching out. We&apos;ll get back to you shortly.
              </p>
            )}
            {formStatus === "error" && (
              <p className="contact-error" role="alert">
                {formMessage}
              </p>
            )}
          </form>

          <Dialog open={codeWarningOpen} onOpenChange={setCodeWarningOpen}>
            <DialogContent className="contact-code-warning-dialog">
              <DialogHeader>
                <p className="contact-code-warning-kicker">Security warning</p>
                <DialogTitle className="contact-code-warning-title">
                  HTML or script code is not allowed
                </DialogTitle>
                <DialogDescription className="contact-code-warning-copy">
                  Please enter plain text only. HTML tags, scripts, and program code cannot be
                  entered in this form and were not added to the field.
                </DialogDescription>
              </DialogHeader>
              {blockedSample ? (
                <pre className="contact-code-warning-sample" aria-hidden="true">
                  {blockedSample}
                </pre>
              ) : null}
              <DialogFooter className="contact-code-warning-actions">
                <button
                  type="button"
                  className="contact-code-warning-button"
                  onClick={() => setCodeWarningOpen(false)}
                >
                  Got it
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <section className="contact-premium-map" data-reveal="image" data-reveal-delay="1">
          <iframe
            loading="lazy"
            title="Naethra Technologies office map"
            src={MAP_EMBED}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        <section className="contact-premium-process" data-reveal="fade-up">
          <div className="contact-process-header">
            <p className="contact-premium-kicker">Why talk to us?</p>
            <h3>Good products start with good conversations.</h3>
          </div>
          <div className="contact-process-grid">
            <article data-reveal="fade-up" data-reveal-delay="1">
              <h4>Understand</h4>
              <p>We start by understanding the problem, the users, and the business goal.</p>
            </article>
            <article data-reveal="fade-up" data-reveal-delay="2">
              <h4>Build</h4>
              <p>We turn ideas into scalable, production-ready digital products.</p>
            </article>
            <article data-reveal="fade-up" data-reveal-delay="3">
              <h4>Grow</h4>
              <p>We continue improving the product as your business evolves.</p>
            </article>
          </div>
        </section>
      </div>
    </NaethraContentPage>
  );
}
