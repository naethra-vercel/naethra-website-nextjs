"use client";

import { type FormEvent, useState } from "react";

import NaethraContentPage from "@/components/NaethraContentPage";
import { submitContactForm } from "@/lib/contact-form";

const MAP_EMBED =
  "https://maps.google.com/maps?q=37%2C%20Viswanathapuram%20Main%20Rd%2C%20Azeez%20Nagar%2C%20Kodambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600024&t=m&z=14&output=embed&iwloc=near";

const MAP_LINK =
  "https://maps.google.com/?q=37,+Viswanathapuram+Main+Rd,+Kodambakkam,+Chennai+600024";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setFormStatus("submitting");
    setFormMessage("");

    try {
      await submitContactForm({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        website: String(data.get("company") ?? ""),
        message: String(data.get("message") ?? ""),
        details: [
          ["Phone", String(data.get("phone") ?? "")],
          ["Project type", String(data.get("projectType") ?? "")],
          ["Budget / timeline", String(data.get("budget") ?? "")],
        ],
      });
      form.reset();
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
            data-reveal="fade-up"
            data-reveal-delay="1"
          >
            <div className="contact-form-header">
              <p className="contact-premium-kicker">Tell us about your project.</p>
              <h3>A few details are enough to get the conversation started.</h3>
            </div>

            <label>
              <span>Your name</span>
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              <span>Email address</span>
              <input name="email" type="email" required placeholder="you@company.com" />
            </label>
            <label>
              <span>Phone number</span>
              <input name="phone" type="tel" placeholder="+91 98 7654 3210" />
            </label>
            <label>
              <span>Company / website</span>
              <input name="company" placeholder="Company or website" />
            </label>
            <label>
              <span>What are you looking to build?</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what you are building"
              />
            </label>

            <div className="contact-form-row">
              <label>
                <span>Project type</span>
                <select name="projectType" defaultValue="">
                  <option value="" disabled>
                    Select a project type
                  </option>
                  <option>Web application</option>
                  <option>Mobile application</option>
                  <option>Flutter development</option>
                  <option>FileMaker development</option>
                  <option>Support & maintenance</option>
                </select>
              </label>
              <label>
                <span>Budget / timeline</span>
                <input name="budget" placeholder="Optional" />
              </label>
            </div>

            <button className="button button-blue" type="submit" disabled={formStatus === "submitting"}>
              {formStatus === "submitting" ? "Sending…" : "Start the conversation →"}
            </button>

            {formStatus === "success" && (
              <p className="contact-success" role="status">
                ✓ Thanks for reaching out. We&apos;ll get back to you shortly.
              </p>
            )}
            {formStatus === "error" && (
              <p className="contact-error" role="alert">
                {formMessage}
              </p>
            )}
          </form>
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
