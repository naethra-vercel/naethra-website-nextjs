import type { HTMLAttributes } from "react";

type SiteFooterProps = HTMLAttributes<HTMLElement>;

export default function SiteFooter({ className = "", ...props }: SiteFooterProps) {
  return (
    <footer className={`site-footer-simple ${className}`.trim()} {...props}>
      <div className="site-container">
        <span>
          2026 © Copyrights <strong>Naethra Technologies</strong>
        </span>
        <nav className="footer-links" aria-label="Footer links">
          <a href="/contact-us">Contact Us</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/disclaimer-and-notification">Disclaimer and Notification</a>
        </nav>
      </div>
    </footer>
  );
}
