import { createFileRoute } from "@tanstack/react-router";
import NaethraContentPage, { ContentSection } from "@/components/NaethraContentPage";

export const Route = createFileRoute("/terms-and-conditions")({ component: TermsPage });

function TermsPage() {
  return (
    <NaethraContentPage
      eyebrow="Agreement and support"
      title="Terms and Conditions"
      intro="The terms that govern the use of Naethra products, services, software, and downloadable files."
      compact
    >
      <ContentSection title="License Agreement">
        <p>
          By purchasing, downloading, or using any products, services, or downloadable files from
          this website, you agree to this License Agreement between Naethra Technologies and you,
          the purchaser or user.
        </p>
        <ol>
          <li>
            You receive a limited, non-exclusive license to use the software. Naethra remains the
            owner of all rights, title, and interest in the software and in modifications,
            customizations, updates, and fixes.
          </li>
          <li>
            The license permits one installation on one domain for personal or internal business
            use. A separate license is required for each additional domain or installation.
          </li>
          <li>
            You may not copy, incorporate, sell, distribute, sublicense, rent, lease, lend, or
            transfer the software or documentation without prior written permission.
          </li>
          <li>
            Copyright notices, attribution text, links, and branding must remain intact. Naethra may
            include your name and logo in a client list unless you request removal in writing.
          </li>
          <li>
            The software is provided “as is” without implied warranties. To the extent permitted by
            law, Naethra is not liable for indirect, incidental, special, exemplary, punitive, or
            consequential damages.
          </li>
          <li>
            This agreement is governed by the laws of India. Disputes are subject to the exclusive
            jurisdiction of the courts in Chennai, Tamil Nadu, India.
          </li>
        </ol>
      </ContentSection>
      <ContentSection title="Order Processing">
        <p>
          Orders are typically processed on the next business day. Verification, customization, or
          operational factors may extend processing to 72 business hours.
        </p>
      </ContentSection>
      <ContentSection title="Support Policy">
        <p>
          Purchased software, extensions, or services include limited support as described at
          purchase. Complimentary support is provided for 90 days and covers product questions and
          bugs in the product. Issues caused by custom themes, third-party extensions, external
          code, incorrect configuration, or modifications by another developer may be chargeable.
        </p>
        <p>
          Free software or services do not include entitlement to updates, upgrades, or support.
          Installation services include one installation on a test environment and one on the live
          site when purchased.
        </p>
      </ContentSection>
      <ContentSection title="Refund Policy">
        <p>
          Refund requests may be considered within 15 days of purchase where an issue cannot be
          resolved or the product fails to function as described. Approved refunds are returned to
          the original payment method and typically appear within 5–7 working days.
        </p>
        <p>
          Refunds are not provided for installation or customization, third-party compatibility
          issues, services already delivered, unlicensed-domain use, or additional customization
          quotations that were not accepted. Each request is reviewed case by case.
        </p>
      </ContentSection>
    </NaethraContentPage>
  );
}
