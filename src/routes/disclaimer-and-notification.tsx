import { createFileRoute } from "@tanstack/react-router";
import NaethraContentPage, { ContentSection } from "@/components/NaethraContentPage";

export const Route = createFileRoute("/disclaimer-and-notification")({ component: DisclaimerPage });

function DisclaimerPage() {
  return (
    <NaethraContentPage
      eyebrow="Important information"
      title="Disclaimer and Notification"
      intro="Please verify that communications, opportunities, and service information come from Naethra Technologies through the official channels listed on this website."
      compact
    >
      <ContentSection title="Official communication">
        <p>
          Naethra Technologies does not request confidential passwords, banking credentials, or
          payment information by unsolicited email or phone. If you receive a suspicious message
          claiming to represent Naethra, do not share personal or financial information. Verify it
          with <a href="mailto:info@naethra.com">info@naethra.com</a> or the contact details on our
          website.
        </p>
      </ContentSection>
      <ContentSection title="Website content">
        <p>
          Information on this website is provided for general information and may change without
          notice. While we make reasonable efforts to keep content accurate and current, we do not
          guarantee that every page is complete, error-free, or suitable for a particular purpose.
        </p>
      </ContentSection>
      <ContentSection title="Third-party links">
        <p>
          Our website may link to third-party websites, tools, maps, or meeting services. These
          services operate under their own terms and privacy policies. Naethra is not responsible
          for the content, availability, or practices of external sites.
        </p>
      </ContentSection>
      <ContentSection title="Use of information">
        <p>
          Project examples, estimates, technology references, and service descriptions are
          illustrative. A project scope, timeline, price, and deliverable are defined only by a
          written agreement between Naethra Technologies and the client.
        </p>
      </ContentSection>
    </NaethraContentPage>
  );
}
