import { createFileRoute } from "@tanstack/react-router";
import NaethraContentPage, { ContentSection } from "@/components/NaethraContentPage";

export const Route = createFileRoute("/privacy-policy")({ component: PrivacyPolicyPage });

function PrivacyPolicyPage() {
  return (
    <NaethraContentPage
      eyebrow="Privacy and data"
      title="Privacy Policy"
      intro="How Naethra Technologies collects, uses, protects, and shares information provided through our website and services."
      compact
    >
      <ContentSection title="General">
        <p>
          This privacy statement describes how Naethra Technologies Private Limited collects and
          uses the personal information you provide on our website,{" "}
          <a href="https://naethra.com">naethra.com</a>. By visiting and using the site, you consent
          to the collection, use, and disclosure of your personal information as described here.
        </p>
        <p>
          Questions or concerns can be sent to{" "}
          <a href="mailto:info@naethra.com">info@naethra.com</a> or Data Privacy, Naethra
          Technologies Private Limited, 37 Viswanathapuram Main Road, Kodambakkam, Chennai 600024,
          India.
        </p>
      </ContentSection>
      <ContentSection title="Collection of Personal Data">
        <p>
          We may collect company and contact information, billing information, account identifiers,
          preferences, usage information such as IP address and device details, and tracking
          information such as cookies and server logs.
        </p>
      </ContentSection>
      <ContentSection title="Use of Personal Data">
        <p>
          Naethra uses this information to provide and improve services, assess business needs,
          respond to support requests, administer accounts, conduct research, develop new services,
          and send important service information. Marketing communications include unsubscribe
          instructions.
        </p>
      </ContentSection>
      <ContentSection title="Data Sharing and Security">
        <p>
          Naethra does not sell personal information. We may share information with service
          providers who help us operate the business, or when required by law, to protect rights and
          safety, investigate fraud, or with your prior consent. We use generally accepted industry
          safeguards, but no internet transmission or storage method is completely secure.
        </p>
      </ContentSection>
      <ContentSection title="Customer Data and Retention">
        <p>
          Customers remain responsible for the security of their user IDs and passwords. Naethra
          retains information while an account is active or as needed to provide services, meet
          legal obligations, resolve disputes, and enforce agreements. Customer data is accessed
          only for support, security, legal, or service purposes.
        </p>
      </ContentSection>
      <ContentSection title="Changes to this statement">
        <p>
          We may update this privacy statement as our information practices change. Material changes
          will be communicated by email or a notice on this website. Please review this page
          periodically for the latest information.
        </p>
      </ContentSection>
    </NaethraContentPage>
  );
}
