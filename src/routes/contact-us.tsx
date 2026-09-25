import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";

import NaethraContentPage from "@/components/NaethraContentPage";

export const Route = createFileRoute("/contact-us")({ component: ContactPage });

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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
            <div className="contact-card-topline">
              <span>01</span>
              <span>Visit us</span>
            </div>
            <h3>Chennai, India</h3>
            <p>Naethra Technologies Pvt Ltd. New No: 37, Old No: 22, Viswanathapuram Main Road, Kodambakkam, Chennai 600024</p>
            <a href="https://maps.google.com/?q=Naethra+Technologies+Private+Limited+Chennai" target="_blank" rel="noreferrer">
              Open map <span>→</span>
            </a>
          </article>

          <article className="contact-premium-card" data-reveal="fade-up" data-reveal-delay="2">
            <div className="contact-card-topline">
              <span>02</span>
              <span>Call us</span>
            </div>
            <h3>+91 44 3500 3204</h3>
            <p>Available Monday through Friday, 10:00 AM to 07:30 PM.</p>
            <a href="tel:+914435003204">
              Call now <span>→</span>
            </a>
          </article>

          <article className="contact-premium-card" data-reveal="fade-up" data-reveal-delay="3">
            <div className="contact-card-topline">
              <span>03</span>
              <span>Email us</span>
            </div>
            <h3>info@naethra.com</h3>
            <p>Share your roadmap, product idea, or strategy challenge with our team.</p>
            <a href="mailto:info@naethra.com">
              Send email <span>→</span>
            </a>
          </article>
        </section>

        <section className="contact-premium-main">
          <div className="contact-premium-story" data-reveal="fade-up" data-reveal-delay="1">
            <p className="contact-premium-kicker">Come say hello.</p>
            <h3>Whether you're launching a new product, modernizing an existing platform, or simply exploring an idea, we'd love to hear from you.</h3>
            <div className="contact-premium-details">
              <div>
                <span className="contact-premium-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>Naethra Technologies Pvt Ltd. New No: 37, Old No: 22, Viswanathapuram Main Road, Kodambakkam, Chennai 600024</p>
                </div>
              </div>
              <div>
                <span className="contact-premium-icon">☎</span>
                <div>
                  <strong>Phone</strong>
                  <p>+91 44 3500 3204</p>
                </div>
              </div>
              <div>
                <span className="contact-premium-icon">✉</span>
                <div>
                  <strong>Email</strong>
                  <p>info@naethra.com</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-premium-form" onSubmit={handleSubmit} data-reveal="fade-up" data-reveal-delay="2">
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
              <textarea name="message" rows={5} required placeholder="Tell us what you are building" />
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

            <button className="button button-blue" type="submit">
              {submitted ? "Thanks for reaching out" : "Start the conversation →"}
            </button>

            {submitted && (
              <p className="contact-success" role="status">
                ✓ Thanks for reaching out. We&apos;ll get back to you shortly.
              </p>
            )}
          </form>
        </section>

        <section className="contact-premium-map" data-reveal="image" data-reveal-delay="1">
          <div className="contact-map-overlay">
            <p>Naethra Technologies</p>
            <h3>Chennai, India</h3>
            <a href="https://maps.google.com/?q=Naethra+Technologies+Private+Limited+Chennai" target="_blank" rel="noreferrer">
              Open in Google Maps →
            </a>
          </div>
          <iframe
            loading="lazy"
            title="Naethra Technologies office map"
            src="https://maps.google.com/maps?q=Naethra%20Technologies%20Private%20Limited%2C%2037%2C%20Viswanathapuram%20Main%20Rd%2C%20Kodambakkam%2C%20Chennai%20600024&t=m&z=15&output=embed"
          />
        </section>

        <section className="contact-premium-process" data-reveal="fade-up">
          <div className="contact-process-header">
            <p className="contact-premium-kicker">Why talk to us?</p>
            <h3>Good products start with good conversations.</h3>
          </div>
          <div className="contact-process-grid">
            <article data-reveal="fade-up" data-reveal-delay="1">
              <span>01</span>
              <h4>Understand</h4>
              <p>We start by understanding the problem, the users, and the business goal.</p>
            </article>
            <article data-reveal="fade-up" data-reveal-delay="2">
              <span>02</span>
              <h4>Build</h4>
              <p>We turn ideas into scalable, production-ready digital products.</p>
            </article>
            <article data-reveal="fade-up" data-reveal-delay="3">
              <span>03</span>
              <h4>Grow</h4>
              <p>We continue improving the product as your business evolves.</p>
            </article>
          </div>
        </section>

        <section className="contact-premium-cta" data-reveal="fade-up" data-reveal-delay="1">
          <div>
            <p className="contact-premium-kicker">Have something worth building?</p>
            <h3>Let's turn your idea into a digital product people actually want to use.</h3>
          </div>
          <a className="button button-light" href="mailto:info@naethra.com">
            Start a conversation →
          </a>
        </section>
      </div>
    </NaethraContentPage>
  );
}
