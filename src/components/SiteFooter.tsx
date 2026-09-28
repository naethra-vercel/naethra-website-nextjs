import { type FormEvent, useState, type HTMLAttributes } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Mail01Icon, SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { MessageCircle, ArrowRight, Sparkles, Video, Send } from "lucide-react";

type SiteFooterProps = HTMLAttributes<HTMLElement> & {
  variant?: "simple" | "detailed";
};

export default function SiteFooter({
  className = "",
  variant,
  ...props
}: SiteFooterProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className={`site-footer ${className}`.trim()} {...props}>
      {/* Top Section: Send A Message & Request a Free Demo Today */}
      <div className="site-footer-top-wrap">
        <div className="site-container site-footer-top-shell">
          <div className="site-footer-message-panel">
            <h2>Send A Message</h2>
            <form className="site-footer-message-form" onSubmit={handleSubmit}>
              <div className="site-footer-field-row">
                <label>
                  <span>Your Name</span>
                  <input aria-label="Your name" name="name" required placeholder="Your Name" />
                </label>
                <label>
                  <span>Your Email</span>
                  <input aria-label="Your email" name="email" type="email" required placeholder="Your Email" />
                </label>
              </div>
              <div className="site-footer-field-row">
                <label>
                  <span>Your Number</span>
                  <input aria-label="Your phone number" name="phone" type="tel" placeholder="Your Number" />
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
                <span>Message here..</span>
                <textarea aria-label="Your message" name="message" rows={4} required placeholder="Message here.." />
              </label>
              <button type="submit" className="site-footer-send-btn">
                <span>{submitted ? "Message Sent!" : "Send a message"}</span>
                <Send size={15} className="send-btn-icon" aria-hidden="true" />
              </button>
            </form>
          </div>

          <div className="site-footer-demo">
            <div className="site-footer-demo-header">
              <span className="demo-tag">
                <Sparkles size={13} aria-hidden="true" /> Live Meeting
              </span>
              <h2>Request a Free Demo Today</h2>
            </div>
            
            <a href="/30-mins-meeting" className="site-footer-demo-card">
              <div className="demo-card-glow" />
              <div className="demo-icon-ring">
                <div className="demo-icon-inner">
                  <Video size={24} aria-hidden="true" />
                </div>
              </div>
              <div className="demo-card-content">
                <strong>Meet with Naethra Works</strong>
                <small>Schedule a 30-minute interactive session to discuss your next product.</small>
              </div>
              <div className="demo-card-cta">
                <span>Book 30 Mins Meeting</span>
                <ArrowRight size={15} className="demo-cta-arrow" aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Middle Section: Map */}
      <div className="site-container footer-map-wrap">
        <iframe
          className="footer-map"
          title="Naethra Technologies location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.810857592566!2d80.2267234!3d13.047708300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266f74b625631%3A0xdf28fa08eca396b9!2sNaethra%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1790084108341!5m2!1sen!2sin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Bottom Section: Brand, Contact, Copy */}
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <a href="/" className="brand-mark" aria-label="Naethra Technologies home">
            <img
              src="/logo.png"
              alt="Naethra Technologies"
              className="brand-logo brand-logo-inverse"
              width="220"
              height="49"
            />
          </a>
          <p>
            Technology is constantly evolving, shaping the way we live and work. It encompasses
            innovation, automation, and connectivity.
          </p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.facebook.com/naethratechnologies" aria-label="Facebook">
              f
            </a>
            <a href="https://twitter.com/naethratech" aria-label="X">
              X
            </a>
            <a href="https://www.linkedin.com/company/naethra-technologies/" aria-label="LinkedIn">
              in
            </a>
            <a href="https://www.pinterest.com/naethratechnologies" aria-label="Pinterest">
              p
            </a>
          </div>
        </div>

        <div className="footer-address">
          <h3>Contact</h3>
          <div className="footer-contact-row">
            <span className="footer-contact-icon">
              <HugeiconsIcon icon={Location01Icon} size={17} />
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

        <div className="footer-contact-details">
          <div className="footer-contact-row">
            <span className="footer-contact-icon">
              <HugeiconsIcon icon={SmartPhone01Icon} size={17} />
            </span>
            <div>
              <span>Phone Number</span>
              <strong>+91 44 3500 3204</strong>
            </div>
          </div>
          <div className="footer-contact-row">
            <span className="footer-contact-icon">
              <HugeiconsIcon icon={Mail01Icon} size={17} />
            </span>
            <div>
              <span>Email</span>
              <strong>info@naethra.com</strong>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <span>
            2026 © Copyrights <strong>Naethra Technologies</strong> | Designed by{" "}
            <strong>Naethra Technologies</strong>
          </span>

          <div className="footer-links">
            <a href="/contact-us">Contact Us</a>
            <a href="/terms-and-conditions">Terms and Conditions</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/disclaimer-and-notification">Disclaimer and Notification</a>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <a className="site-footer-chat" href="mailto:info@naethra.com" aria-label="Email Naethra Technologies">
        <MessageCircle size={24} aria-hidden="true" />
      </a>
    </footer>
  );
}
