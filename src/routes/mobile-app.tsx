import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  FileText,
  Gauge,
  MapPin,
  Phone,
  Smartphone,
  Star,
} from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import ionicIcon from "@/assets/icons/Ionic.svg";
import flutterIcon from "@/assets/icons/Flutter.svg";
import androidIcon from "@/assets/icons/Android.svg";
import appleIcon from "@/assets/icons/Apple.svg";
import reactIcon from "@/assets/icons/React.svg";
import dartIcon from "@/assets/icons/Dart.svg";

export const Route = createFileRoute("/mobile-app")({ component: MobileAppPage });

const trackRecord = [
  [
    "STRONG TRACK RECORD",
    "Indian app developers are a popular choice for businesses looking to get the most bang for their buck. They are some of the most cost-effective developers in the world, while also being good at what they do. Indian app developers are skilled in a variety of programming languages, cutting-edge technology, and cross-platform mobile application development, so they can easily accommodate most outsourcing needs.",
    FileText,
  ],
  [
    "POPULAR DESTINATION",
    "As the mobile app market continues to grow, so does the demand for skilled app developers. India has become a popular destination for companies looking to outsource their app development projects due to the vast pool of talented developers and lower cost of labor. Indian app developers can accommodate Native Android, iOS, and cross-platform application needs.",
    Gauge,
  ],
  [
    "GOVERNMENT SUPPORT",
    "In recent years, the Government of India has made significant strides to improve the business environment for Android app developers and entrepreneurs. Initiatives like Startup India have provided infrastructure and policy support, helping development firms and entrepreneurs thrive while mobile internet adoption continues to grow.",
    Star,
  ],
] as const;

const capabilitySections = [
  [
    "FAMILIARITY WITH TECHNOLOGIES",
    "Indian app developers working in cutting-edge mobile app development companies are familiar with Java, Android Studio, and other popular app development frameworks and toolsets. This allows teams to rapidly develop high-quality apps for a wide range of platforms and devices while keeping up with the latest mobile technology advancements.",
    FileText,
  ],
  [
    "DELIVERING HIGH-QUALITY STANDARDS",
    "Indian IT companies working on digital solutions and application development services offer quality standards on par with the best in the world. They invest in training, daily scrum meetings, and stringent quality control measures. As a result, mobile application development companies provide excellent service at competitive prices.",
    CheckCircle2,
  ],
  [
    "GREAT TALENT",
    "Indian app developers are some of the most talented in the world. They understand user experience and mobile app design, creating high-quality apps that are user-friendly and visually appealing. They also understand design thinking principles and how to create engaging interfaces for audiences in the United States and Europe.",
    Brain,
  ],
] as const;

const techIcons = [
  ["Flutter", flutterIcon],
  ["Ionic", ionicIcon],
  ["Xamarin", reactIcon],
  ["Android Native", androidIcon],
  ["iOS Native", appleIcon],
  ["React Native", reactIcon],
  ["Dart", dartIcon],
] as const;

function MobileAppPage() {
  return (
    <main className="mobile-app-page">
      <NaethraContentHeader />
      <section className="mobile-app-hero">
        <div className="mobile-app-hero-image" />
        <div className="mobile-app-hero-overlay" />
      </section>
      <section className="mobile-app-intro">
        <div className="site-container mobile-app-narrow">
          <h1>Mobile App Development Service</h1>
          <p>
            We help our customers stay connected through interactive and functional mobile apps. We
            have strong capabilities across the app development lifecycle starting with Business
            analysis of the initial idea, UI/UX design, software development, Quality assurance and
            secure PlayStore deployment. We are technology agnostic and have strong capabilities in
            native iOS, Android and cross-platform technologies such as Angular, Cordova, Ionic
            native, Flutter and React native etc.
          </p>
          <p>
            Do you want an innovative solution to support your business? Bring it to us! We deliver
            mobile solutions that fit your budget and are delivered on time.
          </p>
        </div>
      </section>
      <section className="mobile-app-dark mobile-app-track">
        <div className="site-container mobile-app-narrow">
          {trackRecord.map(([title, description, Icon]) => (
            <article className="mobile-app-timeline-item" key={title}>
              <div className="mobile-app-timeline-icon">
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mobile-app-tech">
        <div className="site-container">
          <h2>Mobile App</h2>
          <div className="mobile-app-orbit">
            <div className="mobile-app-orbit-center">
              <Smartphone size={34} aria-hidden="true" />
              <span>
                Mobile
                <br />
                App
              </span>
            </div>
            {techIcons.map(([label, icon], index) => (
              <div className={`mobile-app-orbit-node mobile-app-orbit-node-${index}`} key={label}>
                <img src={icon} alt="" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mobile-app-dark mobile-app-capabilities">
        <div className="site-container mobile-app-narrow">
          {capabilitySections.map(([title, description, Icon]) => (
            <article className="mobile-app-capability" key={title}>
              <Icon size={25} aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mobile-app-skill-pool">
        <div className="site-container mobile-app-skill-grid">
          <div>
            <h2>LARGE SKILL POOL</h2>
            <p>
              India is home to a large pool of skilled developers, making it an attractive location
              for app development companies. The cost of doing business in India is also relatively
              low, which lowers the overall project budget. This makes India an attractive
              destination for mobile app development companies.
            </p>
          </div>
          <img
            src="https://naethra.com/wp-content/uploads/2022/07/mob-app-landing.jpg"
            alt="Mobile application icons on a smartphone"
          />
        </div>
        <div className="site-container mobile-app-callout">
          <p>
            If you are looking for a software development company or a Web and Mobile app
            development solution, Naethra Technologies is here to help you. We have put together a
            team that is dedicated to helping you achieve your goals.
          </p>
          <a className="button button-orange" href="/contact-us">
            Contact us <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="mobile-app-blog">
        <div className="site-container mobile-app-narrow">
          <h2>Blogs</h2>
          <article>
            <img
              src="https://naethra.com/wp-content/uploads/2022/08/hyprid-app-thegem-post-thumb-large.png"
              alt="Hybrid app article"
            />
            <div>
              <p className="mobile-app-meta">Hybrid App</p>
              <h3>Hybrid App</h3>
              <p>
                Hybrid App development is a kind of coding approach, rather than a particular
                variety of apps.
              </p>
              <a className="text-link" href="/blog/hybrid-app">
                Read more <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className="mobile-app-contact">
        <div className="site-container mobile-app-contact-grid">
          <div>
            <h2>Contact Us</h2>
            <a href="tel:+914435003204">
              <Phone size={17} aria-hidden="true" /> +91 44 3500 3204
            </a>
            <a href="mailto:info@naethra.com">
              <MapPin size={17} aria-hidden="true" /> info@naethra.com
            </a>
          </div>
          <div>
            <h2>Request a Free Demo Today</h2>
            <a className="button button-orange" href="/30-mins-meeting">
              Meet with us <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <SiteFooter className="mobile-app-footer" />
    </main>
  );
}
