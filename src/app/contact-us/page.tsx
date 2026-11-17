import type { Metadata } from "next";

import ContactPage from "@/components/pages/ContactPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function Page() {
  return <ContactPage />;
}
