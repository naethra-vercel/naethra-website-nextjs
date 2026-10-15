import { Route, Routes } from "react-router-dom";

import { AppShell } from "@/components/AppShell";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import AboutRoute from "@/routes/AboutRoute";
import AboutServicesPage from "@/routes/about/ServicesPage";
import AboutSpecialtyPage from "@/routes/about/SpecialtyPage";
import AboutTeamPage from "@/routes/about/TeamPage";
import BlogPostPage from "@/routes/blogs/BlogPostPage";
import BlogsRoute from "@/routes/BlogsRoute";
import ContactRoute from "@/routes/ContactRoute";
import DownloadRoute from "@/routes/DownloadRoute";
import FlutterPage from "@/routes/FlutterPage";
import HomeRoute from "@/routes/HomeRoute";
import LegalPageRoute from "@/routes/LegalPageRoute";
import MeetingPage from "@/routes/MeetingPage";
import MobileAppPage from "@/routes/MobileAppPage";
import NotFoundPage from "@/routes/NotFoundPage";
import PortfolioPage from "@/routes/PortfolioPage";
import ServiceDetailRoute from "@/routes/ServiceDetailRoute";
import ServicesRoute from "@/routes/ServicesRoute";
import WebAppPage from "@/routes/WebAppPage";
import {
  getAwsContent,
  getCmsContent,
  getCustomWebPublishingContent,
  getDotNetContent,
  getFileMakerContent,
  getJavaContent,
  getPhpMysqlContent,
} from "@/lib/wordpress";

const FILEMAKER_DESCRIPTION =
  "Naethra is a FileMaker development company in India offering Claris FileMaker Pro, Go, WebDirect, Custom Web Publishing, integration, migration, and 24×7 support.";

const fileMakerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FileMaker Development Company India",
  serviceType: "Claris FileMaker application development",
  provider: {
    "@type": "Organization",
    "@id": "https://naethra.com/#organization",
    name: "Naethra Technologies",
  },
  areaServed: "IN",
  url: "https://naethra.com/services/claris-filemaker-application",
  description: FILEMAKER_DESCRIPTION,
};

export default function App() {
  return (
    <AppShell>
      <OrganizationJsonLd />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/about/specialty" element={<AboutSpecialtyPage />} />
        <Route path="/about/services" element={<AboutServicesPage />} />
        <Route path="/about/team" element={<AboutTeamPage />} />
        <Route path="/blogs" element={<BlogsRoute />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        <Route path="/contact-us" element={<ContactRoute />} />
        <Route path="/download" element={<DownloadRoute />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesRoute />} />
        <Route
          path="/services/claris-filemaker-application"
          element={
            <ServiceDetailRoute
              title="FileMaker Development Company India | Claris FileMaker Experts | Naethra"
              loader={getFileMakerContent}
              jsonLd={fileMakerJsonLd}
            />
          }
        />
        <Route
          path="/services/custom-web-publishing"
          element={
            <ServiceDetailRoute
              title="Custom Web Publishing | Naethra Technologies"
              loader={getCustomWebPublishingContent}
            />
          }
        />
        <Route
          path="/services/java-j2ee-applications"
          element={
            <ServiceDetailRoute
              title="Java / J2EE Applications | Naethra Technologies"
              loader={getJavaContent}
            />
          }
        />
        <Route
          path="/services/dot-net-application"
          element={
            <ServiceDetailRoute
              title=".NET Application | Naethra Technologies"
              loader={getDotNetContent}
            />
          }
        />
        <Route
          path="/services/php-mysql-applications"
          element={
            <ServiceDetailRoute
              title="PHP / MySQL Applications | Naethra Technologies"
              loader={getPhpMysqlContent}
            />
          }
        />
        <Route
          path="/services/aws-cloud-support"
          element={
            <ServiceDetailRoute
              title="AWS Cloud Support | Naethra Technologies"
              loader={getAwsContent}
            />
          }
        />
        <Route
          path="/cms"
          element={
            <ServiceDetailRoute title="CMS | Naethra Technologies" loader={getCmsContent} />
          }
        />
        <Route path="/mobile-app" element={<MobileAppPage />} />
        <Route path="/web-app" element={<WebAppPage />} />
        <Route path="/flutter-app-development-company" element={<FlutterPage />} />
        <Route path="/30-mins-meeting" element={<MeetingPage />} />
        <Route
          path="/privacy-policy"
          element={
            <LegalPageRoute
              slug="privacy-policy"
              eyebrow="Privacy and data"
              titleFallback="Privacy Policy"
            />
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <LegalPageRoute
              slug="terms-and-conditions"
              eyebrow="Terms"
              titleFallback="Terms and Conditions"
            />
          }
        />
        <Route
          path="/disclaimer-and-notification"
          element={
            <LegalPageRoute
              slug="disclaimer-and-notification"
              eyebrow="Disclaimer"
              titleFallback="Disclaimer and Notification"
            />
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
