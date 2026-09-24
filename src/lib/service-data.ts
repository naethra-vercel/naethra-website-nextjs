import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Code2,
  Database,
  FileCode2,
  Globe2,
  LayoutGrid,
  Smartphone,
  Workflow,
} from "lucide-react";

export type ServiceDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: Array<{ title: string; body: string; image?: string; bullets?: string[] }>;
};

export const services = [
  {
    title: "iOS, Android and hybrid mobility applications",
    description:
      "Build connected mobile experiences across native and cross-platform technologies.",
    href: "/mobile-app",
    icon: Smartphone,
  },
  {
    title: "Website development",
    description: "Websites and application experiences shaped around your product and users.",
    href: "/web-app",
    icon: Globe2,
  },
  {
    title: "Content management system",
    description: "Flexible CMS solutions with publishing workflows, integrations, and analytics.",
    href: "/cms",
    icon: LayoutGrid,
  },
  {
    title: "Java/J2EE applications",
    description: "Enterprise Java solutions that improve the way your business builds software.",
    href: "/services/dot-net-application",
    icon: Code2,
  },
  {
    title: "PHP/MySQL applications",
    description: "Practical, scalable PHP and database applications for growing organisations.",
    href: "/web-app",
    icon: Database,
  },
  {
    title: ".NET applications",
    description: "Full-cycle Microsoft .NET development for robust custom applications.",
    href: "/services/dot-net-application",
    icon: FileCode2,
  },
  {
    title: "FileMaker development",
    description: "Certified FileMaker development, integrations, and custom business tools.",
    href: "/services/custom-web-publishing",
    icon: Workflow,
  },
  {
    title: "Custom web publishing with PHP",
    description: "Publish FileMaker data securely through custom web applications.",
    href: "/services/custom-web-publishing",
    icon: FileCode2,
  },
  {
    title: "Cloud solutions",
    description: "Cloud infrastructure, support, and application delivery that can scale with you.",
    href: "/services/aws-cloud-support",
    icon: Cloud,
  },
] satisfies Array<{ title: string; description: string; href: string; icon: LucideIcon }>;

const base = "https://naethra.com/wp-content/uploads";

export const serviceDetails: Record<string, ServiceDetail> = {
  cms: {
    slug: "cms",
    title: "Outsource CMS Development India",
    eyebrow: "Content management systems",
    intro:
      "Naethra offers cost-effective CMS development services using PHP, WordPress, Joomla, and Magento, with WooCommerce and payment gateway integration when your product needs it.",
    heroImage: `${base}/2022/06/web-app-changed.jpg`,
    sections: [
      {
        title: "Website and CMS development in India",
        body: "For over 8 years, Indian website developers have delivered custom-tailored CMS solutions that are flexible and agile enough to adapt to a changing business model. From design and development to security enhancement, we create robust systems that fit the way your organisation works.",
        image: `${base}/2022/09/cms-details.jpg`,
      },
      {
        title: "A complete publishing system",
        body: "Our teams customise open-source CMS frameworks like WordPress, Joomla, and Drupal. We deliver end-to-end content management packages with responsive design, integrated analytics, and less maintenance across ecommerce, learning management, real estate, and business listing applications.",
      },
      {
        title: "Benefits of outsourcing CMS development",
        body: "Outsourcing gives you access to specialist teams, reliable delivery, and a flexible cost model while your internal team stays focused on the work only it can do.",
        image: `${base}/2022/05/7-4-1.jpg`,
        bullets: [
          "Quality assurance",
          "Cost-effective services",
          "Saving on infrastructure",
          "24/7 services",
          "Versatility",
        ],
      },
    ],
  },
  "custom-web-publishing": {
    slug: "custom-web-publishing",
    title: "Custom Web Publishing",
    eyebrow: "FileMaker integrations",
    intro:
      "FileMaker Custom Web Publishing integrates a FileMaker database with a custom website, giving teams secure control over how business data is published and used on the web.",
    heroImage: `${base}/2022/12/filemaker-server.jpg`,
    sections: [
      {
        title: "Publish the data your users need",
        body: "FileMaker has an API that enables access through PHP, a standard tool for web development. With CWP, a website can securely publish all or a portion of your data to a few remote users or the entire web.",
        bullets: [
          "Angular",
          "PHP",
          "JavaScript and jQuery",
          "HTML5, AJAX and CSS3",
          "MySQL",
          "FileMaker Data API",
        ],
      },
      {
        title: "Custom web publishing with PHP",
        body: "The FileMaker API for PHP provides an object-oriented interface to FileMaker Pro databases. Because the web pages are built as a custom application, your team has complete control over the interface and how users interact with the data.",
        image: `${base}/2022/12/filemaker-api-php.jpg`,
        bullets: [
          "Integrate your database with another website",
          "Determine how users interact with data",
          "Control how data displays in web browsers",
        ],
      },
      {
        title: "A dependable publishing stack",
        body: "FileMaker Server brings together the web server, Web Publishing Engine, PHP engine, database server, and Admin Console. Our team can design, build, and support the connection between those layers.",
      },
    ],
  },
  "claris-filemaker-application": {
    slug: "claris-filemaker-application",
    title: "Claris FileMaker Application",
    eyebrow: "FileMaker solutions",
    intro:
      "One-stop FileMaker solutions for design, development, hosting, maintenance, and 24 x 7 support services.",
    heroImage: `${base}/2025/10/filemaker-ser-new-1.jpg`,
    sections: [
      {
        title: "One-stop shop for FileMaker solutions",
        body: "We are full of people who are experts in the FileMaker field, from A-Z. We can assist with the design, development, implementation, and support of customised FileMaker solutions that connect with internal and external websites.",
        bullets: [
          "FileMaker Pro custom development",
          "FileMaker Go development",
          "WebDirect",
          "Cloud",
          "Integration",
          "Consulting",
          "Support and maintenance",
          "Migration and conversion",
        ],
      },
      {
        title: "Experience across industries and locations",
        body: "We have more than 20 years of market experience and industry know-how. More than 100 clients have chosen us for FileMaker projects across finance, construction, media, technology, retail, manufacturing, legal, education, health, and other sectors around the world.",
        image: `${base}/2022/12/naethra-filemaker.jpg`,
      },
      {
        title: "Integration, migration, and support",
        body: "FileMaker data can be integrated and synchronised with other data sources through ODBC. We can also perform complete migrations and conversions from another database, then support the solution as it grows.",
      },
    ],
  },
  "dot-net-application": {
    slug: "dot-net-application",
    title: ".NET Application Development",
    eyebrow: "Microsoft .NET development",
    intro:
      "Naethra provides full-cycle development services in Microsoft .NET for independent software vendors, product companies, and teams that need scalable custom applications.",
    heroImage: `${base}/2022/12/net-2.jpg`,
    sections: [
      {
        title: "Benefits of ASP.NET in development",
        body: ".NET provides a steady, adaptable, user-friendly, dependable, and flexible platform with low maintenance cost and strong compatibility. It enables teams to build ecommerce and business applications for customers wherever they are.",
        image: `${base}/2022/12/net-2.jpg`,
      },
      {
        title: "Maintenance and support services",
        body: "Naethra offers sustainable, constant specialist support that helps applications, websites, and digital products keep working smoothly. Prompt maintenance gives customers accuracy, continuity, and confidence after launch.",
      },
      {
        title: "Why choose Naethra for .NET services?",
        body: "We offer a broad range of ASP.NET and .NET web development services globally, with the proven capability to build robust, scalable custom applications that meet demanding business requirements.",
      },
    ],
  },
  "aws-cloud-support": {
    slug: "aws-cloud-support",
    title: "AWS and Cloud Support",
    eyebrow: "Cloud infrastructure and support",
    intro:
      "Move from infrastructure pressure to dependable delivery with cloud architecture, deployment, monitoring, and support shaped around your product and team.",
    heroImage: `${base}/2022/09/web-app-img.jpg`,
    sections: [
      {
        title: "Cloud solutions that fit the business",
        body: "Cloud computing brings together servers, storage, databases, networking, software, analytics, and intelligence. We help teams choose the right combination and turn it into a reliable working environment.",
        bullets: [
          "AWS architecture and deployment",
          "Cloud migration planning",
          "Monitoring and performance support",
          "Security and backup practices",
        ],
      },
      {
        title: "Build for continuity",
        body: "The goal is not simply to move an application to the cloud. It is to create a system that can be observed, maintained, recovered, and improved as usage and business needs change.",
      },
      {
        title: "Support beyond launch",
        body: "Our team can stay close after deployment with proactive maintenance, technical guidance, and a clear route for the next stage of your application.",
      },
    ],
  },
};
