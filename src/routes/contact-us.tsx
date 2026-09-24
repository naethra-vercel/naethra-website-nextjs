import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

import NaethraContentPage, { ContentSection } from "@/components/NaethraContentPage";

export const Route = createFileRoute("/contact-us")({ component: ContactPage });

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <NaethraContentPage
      eyebrow="Start a conversation"
      title="Tell us what you are building"
      intro="Have a project we might love, or simply want to say hello? Send a few details and the team will get back to you."
      compact
      footerVariant="simple"
    >
      <div className="contact-page-grid">
        <div>
          <ContentSection title="Visit or reach us">
            <div className="contact-page-details">
              <div>
                <MapPin size={21} aria-hidden="true" />
                <p>
                  Naethra Technologies Pvt Ltd.
                  <br />
                  New No: 37, Old No: 22,
                  <br />
                  Viswanathapuram Main Road,
                  <br />
                  Kodambakkam, Chennai 600024
                </p>
              </div>
              <a href="tel:+914435003204">
                <Phone size={21} aria-hidden="true" />
                <span>+91 44 3500 3204</span>
              </a>
              <a href="mailto:info@naethra.com">
                <Mail size={21} aria-hidden="true" />
                <span>info@naethra.com</span>
              </a>
            </div>
          </ContentSection>
          <iframe
            className="contact-map"
            loading="lazy"
            title="Naethra Technologies office map"
            src="https://maps.google.com/maps?q=Naethra%20Technologies%20Private%20Limited%2C%2037%2C%20Viswanathapuram%20Main%20Rd%2C%20Kodambakkam%2C%20Chennai%20600024&t=m&z=15&output=embed"
          />
        </div>
        <form className="contact-page-form" onSubmit={handleSubmit}>
          <label>
            Name <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Email <input name="email" type="email" required placeholder="you@company.com" />
          </label>
          <label>
            Website <input name="website" placeholder="https://" />
          </label>
          <label>
            Message{" "}
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell us a little about the project"
            />
          </label>
          <button className="button button-orange" type="submit">
            {submitted ? "Message ready to send" : "Submit message"}
          </button>
          {submitted && (
            <p className="contact-success" role="status">
              Thanks. Your message has been captured for this presentation page.
            </p>
          )}
        </form>
      </div>
    </NaethraContentPage>
  );
}
