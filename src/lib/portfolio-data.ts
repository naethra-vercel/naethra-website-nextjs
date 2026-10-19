import { WORDPRESS_ORIGIN } from "@/lib/wordpress-config";

export type PortfolioCategory = ".Net" | "CMS" | "CWP" | "Java/J2EE" | "Mobile App" | "Web App";

export type PortfolioProject = {
  title: string;
  category: PortfolioCategory;
  image: string;
  href: string;
  summary: string;
};

const portfolioBase = `${WORDPRESS_ORIGIN}/wp-content/uploads`;

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Courier Management System",
    category: "Web App",
    image: `${portfolioBase}/2022/06/courier-management-system-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/courier-management-system/`,
    summary: "A focused web platform for coordinating courier operations and delivery workflows.",
  },
  {
    title: "Orthofix Contract Management System",
    category: ".Net",
    image: `${portfolioBase}/2019/09/orthofix-contract-management-system-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/orthofix-contract-management-system/`,
    summary: "A contract management system designed around structured business processes.",
  },
  {
    title: "Proof of Coverage",
    category: ".Net",
    image: `${portfolioBase}/2019/09/proof-of-coverage-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/proof-of-coverage/`,
    summary: "A digital workflow that helps teams collect and manage proof of coverage records.",
  },
  {
    title: "EMV Payment App",
    category: "Mobile App",
    image: `${portfolioBase}/2019/09/emv-payment-app-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/emv-payment-app/`,
    summary: "A mobile payment experience built around secure, practical transaction flows.",
  },
  {
    title: "A Web Based Document Management System",
    category: "Java/J2EE",
    image: `${portfolioBase}/2019/09/a-web-based-document-management-system-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/a-web-based-document-management-system/`,
    summary: "A structured document platform that makes business information easier to manage.",
  },
  {
    title: "Computerized Maintenance Management Software",
    category: "Java/J2EE",
    image: `${portfolioBase}/2019/09/computerized-maintenance-management-software-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/computerized-maintenance-management-software-cmms/`,
    summary:
      "A maintenance management system for keeping operational work visible and accountable.",
  },
  {
    title: "Advisory Services Company",
    category: "CMS",
    image: `${portfolioBase}/2019/09/advisory-services-company-1-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/advisory-services-company/`,
    summary: "A clear content-led web presence for an advisory services business.",
  },
  {
    title: "Service Inquiries Form",
    category: "CMS",
    image: `${portfolioBase}/2019/09/service-inquiries-form-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/service-inquiries-form/`,
    summary:
      "A focused inquiry experience that helps service teams receive better project context.",
  },
  {
    title: "Vessel Survey Client Portal",
    category: "CWP",
    image: `${portfolioBase}/2019/09/vessel-survey-client-portal-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/vessel-survey-client-portal/`,
    summary: "A client portal that brings vessel survey information into one accessible workflow.",
  },
  {
    title: "Academy App",
    category: "Mobile App",
    image: `${portfolioBase}/2019/09/academy-app.jpeg`,
    href: `${WORDPRESS_ORIGIN}/pf/academy-app/`,
    summary: "A hybrid mobile application for delivering a more connected academy experience.",
  },
  {
    title: "Barge Draft Surveys",
    category: "CWP",
    image: `${portfolioBase}/2019/09/barge-draft-surveys-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/barge-draft-surveys/`,
    summary: "A web workflow that supports draft survey operations and client communication.",
  },
  {
    title: "Healthcare Marketing Website",
    category: "Web App",
    image: `${portfolioBase}/2022/06/healthcare-marketing-website-thegem-portfolio-masonry.jpg`,
    href: `${WORDPRESS_ORIGIN}/blog/portfolio/healthcare-marketing-website/`,
    summary: "A healthcare-focused marketing site built to communicate services with clarity.",
  },
];

export const portfolioCategories = [
  "Show All",
  ".Net",
  "CMS",
  "CWP",
  "Java/J2EE",
  "Mobile App",
  "Web App",
] as const;
