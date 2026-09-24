import { type FormEvent, useState, type HTMLAttributes } from "react";

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
      <div className="site-container site-footer-detailed-top">
        <div className="site-footer-contact-card">
          <h2>Contact Us</h2>
          <a href="tel:+914435003204">☎ +91 44 3500 3204</a>
          <a href="mailto:info@naethra.com">✉ info(at)naethra.com</a>
          <iframe
            loading="lazy"
            title="Naethra Technologies office map"
            src="https://maps.google.com/maps?q=Naethra%20Technologies%20Private%20Limited%2C%2037%2C%20Viswanathapuram%20Main%20Rd%2C%20Kodambakkam%2C%20Chennai%20600024&t=m&z=15&output=embed"
          />
        </div>
        <div className="site-footer-demo">
          <h2>Request a Free Demo Today</h2>
          <a href="/30-mins-meeting" className="site-footer-demo-card">
            <span aria-hidden="true">◉</span>
            <strong>Meet with Naethra Works</strong>
            <small>Schedule a conversation about your next product.</small>
          </a>
        </div>
      </div>
      <div className="site-footer-detailed-bottom">
        <div className="site-container site-footer-detailed-grid">
          <div className="site-footer-about">
            <img src="/logo.png" alt="Naethra Technologies" width={150} height={33} />
            <p>
              We want to be your trusted partner in custom data tool development, helping you and
              your team get the most out of your tools, including Flutter Development, Ionic
              Framework, Cordova, PHP, Java, MySQL, PostgreSQL, AJAX, and more for LAN/WAN, Web and
              mobile deployments.
            </p>
            <iframe
              loading="lazy"
              title="Naethra Technologies location"
              src="https://maps.google.com/maps?q=Naethra%20Technologies%20Private%20Limited%2C%2037%2C%20Viswanathapuram%20Main%20Rd%2C%20Kodambakkam%2C%20Chennai%20600024&t=m&z=14&output=embed"
            />
          </div>
          <div className="site-footer-email">
            <h2>Email Us</h2>
            <form onSubmit={handleSubmit}>
              <input aria-label="Your name" name="name" placeholder="Your name" required />
              <input
                aria-label="Your email"
                name="email"
                type="email"
                placeholder="Your email"
                required
              />
              <input aria-label="Your subject" name="subject" placeholder="Your subject" required />
              <textarea
                aria-label="Your message"
                name="message"
                placeholder="Your message"
                rows={3}
                required
              />
              <button type="submit">{submitted ? "SENT" : "SEND"}</button>
            </form>
            <address>
              Naethra Technologies Pvt Ltd. New No:37, Old No: 22, Viswanathapuram Main Road,
              Kodambakkam, Chennai
              <br />
              <br />
              +91 4435003204, +91 4435003205
              <br />
              <br />
              info@naethra.com
              <br />
              <br />
              Monday - Friday: 10:00 AM - 07:30 PM Hrs
            </address>
          </div>
        </div>
      </div>
      <div className="site-footer-detailed-legal site-container">
        <span>
          2026 © Copyrights <strong>Naethra Technologies</strong>
        </span>
        <FooterLinks />
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
