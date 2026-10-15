import ContactPage from "@/components/pages/ContactPage";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function ContactRoute() {
  useDocumentTitle("Contact Us | Naethra Technologies");
  return <ContactPage />;
}
