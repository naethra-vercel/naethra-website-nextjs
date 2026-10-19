"use client";

import "@/styles/content.css";

import { type FormEvent, useState, type HTMLAttributes } from "react";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { SOCIAL_PROFILES } from "@/lib/social";

const MAP_EMBED =
  "https://maps.google.com/maps?q=37%2C%20Viswanathapuram%20Main%20Rd%2C%20Azeez%20Nagar%2C%20Kodambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600024&t=m&z=14&output=embed&iwloc=near";

const MAP_LINK =
  "https://maps.google.com/?q=37,+Viswanathapuram+Main+Rd,+Kodambakkam,+Chennai+600024";

type SiteFooterProps = HTMLAttributes<HTMLElement> & {
  /** Hide Send a Message / Free Demo (used on Contact + Meeting pages). */
  hideTopContact?: boolean;
};

export default function SiteFooter({
  className = "",
  hideTopContact = false,
  ...props
}: SiteFooterProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className={`site-footer-detailed ${className}`.trim()} {...props}>
      {!hideTopContact && (
        <div className="site-container site-footer-detailed-shell">
          <div className="site-footer-message-panel">
            <h2>Send A Message</h2>
            <form className="site-footer-message-form" onSubmit={handleSubmit}>
              <div className="site-footer-field-row">
                <label>
                  <span>Your Name</span>
                  <input aria-label="Your name" name="name" required />
                </label>
                <label>
                  <span>Your Email</span>
                  <input aria-label="Your email" name="email" type="email" required />
                </label>
              </div>
              <div className="site-footer-field-row">
                <label>
                  <span>Your Number</span>
                  <input aria-label="Your phone number" name="phone" type="tel" />
                </label>
                <label>
                  <span>Choose a Reason</span>
                  <select aria-label="Choose a reason" name="reason" defaultValue="">
                    <option value="" disabled>
                      Choose a Reason
                    </option>
                    <option>Flutter development</option>
                    <option>Web application</option>
                    <option>Mobile application</option>
                    <option>FileMaker development</option>
                    <option>Support and maintenance</option>
                  </select>
                </label>
              </div>
              <label className="site-footer-message-field">
                <span>Message here.</span>
                <textarea aria-label="Your message" name="message" rows={4} required />
              </label>
              <button type="submit">{submitted ? "Message sent" : "Send a message"}</button>
            </form>
          </div>

          <div className="site-footer-demo">
            <h2>Request a Free Demo Today</h2>
            <a href="/30-mins-meeting" className="site-footer-demo-card">
              <span className="site-footer-demo-icon" aria-hidden="true">
                ◉
              </span>
              <strong>Meet with Naethra Works</strong>
              <small>Schedule a conversation about your next product.</small>
            </a>
          </div>
        </div>
      )}

      <div className="site-footer-map-block">
        <div className="site-container site-footer-map-wrap">
          <a className="site-footer-map-open" href={MAP_LINK} target="_blank" rel="noreferrer">
            Open in Maps
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <iframe
            loading="lazy"
            title="Naethra Technologies office map"
            src={MAP_EMBED}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="site-footer-detailed-bottom">
        <div className="site-container site-footer-detailed-grid">
          <div className="site-footer-about">
            <img src="/logo.png" alt="Naethra Technologies" width={150} height={33} />
            <p>
              Technology is constantly evolving, shaping the way we live and work. It encompasses
              innovation, automation, and connectivity.
            </p>
            <div className="site-footer-socials" aria-label="Social links">
              {SOCIAL_PROFILES.map((profile) => (
                <a
                  key={profile.id}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer me"
                  aria-label={profile.label}
                >
                  {profile.short}
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer-contact-block">
            <h2>Contact</h2>
            <div className="site-footer-contact-list">
              <div className="site-footer-contact-item">
                <span className="site-footer-contact-icon">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div>
                  <span>Address</span>
                  <strong>
                    37, Viswanathapuram Main Rd,
                    <br />
                    Azeez Nagar, Kodambakkam,
                    <br />
                    Chennai, Tamil Nadu 600024
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="site-footer-contact-block site-footer-contact-secondary">
            <div className="site-footer-contact-list">
              <div className="site-footer-contact-item">
                <span className="site-footer-contact-icon">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <div>
                  <span>Phone Number</span>
                  <strong>
                    <a href="tel:+914435003204">+91 44 3500 3204</a>
                  </strong>
                </div>
              </div>
              <div className="site-footer-contact-item">
                <span className="site-footer-contact-icon">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div>
                  <span>Email</span>
                  <strong>
                    <a href="mailto:info@naethra.com">info@naethra.com</a>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-container site-footer-detailed-legal">
          <span>
            2026 © Copyrights <strong>Naethra Technologies</strong> | Designed by{" "}
            <strong>Naethra Technologies</strong>
          </span>
          <nav className="footer-links" aria-label="Footer links">
            <a href="/contact-us">Contact Us</a>
            <a href="/terms-and-conditions">Terms and Conditions</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/disclaimer-and-notification">Disclaimer and Notification</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
