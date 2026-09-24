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
          <a href="/#contact">Contact Us</a>
          <a href="/#contact">Terms and Conditions</a>
          <a href="/#contact">Privacy Policy</a>
          <a href="/#contact">Disclaimer and Notification</a>
        </nav>
      </div>
    </footer>
  );
}
