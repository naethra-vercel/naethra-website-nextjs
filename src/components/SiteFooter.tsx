import { type FormEvent, useState, type HTMLAttributes } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

type SiteFooterProps = HTMLAttributes<HTMLElement> & {
  variant?: "simple" | "detailed";
};

export default function SiteFooter({
  className = "",
  variant = "detailed",
  ...props
}: SiteFooterProps) {
  const [submitted, setSubmitted] = useState(false);

  if (variant === "simple") {
    return (
      <footer className={`site-footer-simple ${className}`.trim()} {...props}>
        <div className="site-container">
          <span>
            2026 © Copyrights <strong>Naethra Technologies</strong>
          </span>
          <FooterLinks />
        </div>
      </footer>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className={`site-footer-detailed ${className}`.trim()} {...props}>
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

      <div className="site-footer-map-block">
        <div className="site-container site-footer-map-wrap">
          <iframe
            loading="lazy"
            title="Naethra Technologies office map"
            src="https://maps.google.com/maps?q=Naethra%20Technologies%20Private%20Limited%2C%2037%2C%20Viswanathapuram%20Main%20Rd%2C%20Kodambakkam%2C%20Chennai%20600024&t=m&z=15&output=embed"
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
              <a href="https://www.facebook.com/naethratechnologies" aria-label="Facebook">f</a>
              <a href="https://www.linkedin.com/company/naethra-technologies/" aria-label="LinkedIn">in</a>
              <a href="https://twitter.com/naethratech" aria-label="X">X</a>
            </div>
          </div>

          <div className="site-footer-contact-block">
            <h2>Contact</h2>
            <div className="site-footer-contact-list">
              <div className="site-footer-contact-item">
                <span className="site-footer-contact-icon"><MapPin size={18} aria-hidden="true" /></span>
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
                <span className="site-footer-contact-icon"><Phone size={18} aria-hidden="true" /></span>
                <div>
                  <span>Phone Number</span>
                  <strong>+91 44 3500 3204</strong>
                </div>
              </div>
              <div className="site-footer-contact-item">
                <span className="site-footer-contact-icon"><Mail size={18} aria-hidden="true" /></span>
                <div>
                  <span>Email</span>
                  <strong>info@naethra.com</strong>
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
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
}

function FooterLinks() {
  return (
    <nav className="footer-links" aria-label="Footer links">
      <a href="/contact-us">Contact Us</a>
      <a href="/terms-and-conditions">Terms and Conditions</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/disclaimer-and-notification">Disclaimer and Notification</a>
    </nav>
  );
}
