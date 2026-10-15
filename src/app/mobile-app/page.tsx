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
  type LucideIcon,
} from "lucide-react";

import ionicIcon from "@/assets/icons/Ionic.svg";
import flutterIcon from "@/assets/icons/Flutter.svg";
import androidIcon from "@/assets/icons/Android.svg";
import appleIcon from "@/assets/icons/Apple.svg";
import reactIcon from "@/assets/icons/React.svg";
import dartIcon from "@/assets/icons/Dart.svg";
import mobileHeroImage from "@/assets/mobile/hero.png";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import TalkToUsSection from "@/components/TalkToUsSection";
import { getMobileAppContent } from "@/lib/wordpress";
import { assetSrc } from "@/lib/asset-src";

export const revalidate = 60;

const trackIcons: LucideIcon[] = [FileText, Gauge, Star];
const capabilityIcons: LucideIcon[] = [FileText, CheckCircle2, Brain];

const techIcons = [
  ["Flutter", assetSrc(flutterIcon)],
  ["Ionic", assetSrc(ionicIcon)],
  ["Xamarin", assetSrc(reactIcon)],
  ["Android Native", assetSrc(androidIcon)],
  ["iOS Native", assetSrc(appleIcon)],
  ["React Native", assetSrc(reactIcon)],
  ["Dart", assetSrc(dartIcon)],
] as const;

export default async function Page() {
  const content = await getMobileAppContent();

  return (
    <main className="mobile-app-page">
      <NaethraContentHeader />
      <section className="mobile-app-hero">
        <img className="mobile-app-hero-banner" src={assetSrc(mobileHeroImage)} alt="" />
      </section>
      <TalkToUsSection>{content.introParagraphs[0] ?? content.title}</TalkToUsSection>
      <section className="mobile-app-intro">
        <div className="site-container mobile-app-narrow">
          <h1>{content.title}</h1>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="mobile-app-dark mobile-app-track">
        <div className="site-container mobile-app-narrow">
          {content.trackRecord.map((item, index) => {
            const Icon = trackIcons[index] ?? FileText;
            return (
              <article className="mobile-app-timeline-item" key={item.title}>
                <div className="mobile-app-timeline-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="mobile-app-tech">
        <div className="site-container">
          <h2>{content.techTitle}</h2>
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
          {content.capabilities.map((item, index) => {
            const Icon = capabilityIcons[index] ?? CheckCircle2;
            return (
              <article className="mobile-app-capability" key={item.title}>
                <Icon size={25} aria-hidden="true" />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="mobile-app-skill-pool">
        <div className="site-container mobile-app-skill-grid">
          <div>
            <h2>{content.skillPoolTitle}</h2>
            <p>{content.skillPoolBody}</p>
          </div>
          <img src={content.skillPoolImage} alt="Mobile application icons on a smartphone" />
        </div>
        <div className="site-container mobile-app-callout">
          <p>{content.callout}</p>
          <a className="talk-to-us-button" href="/contact-us">
            Talk to us
          </a>
        </div>
      </section>
      <section className="mobile-app-blog">
        <div className="site-container mobile-app-narrow">
          <h2>{content.blogTitle}</h2>
          <article>
            <img src={content.blogImage} alt={content.blogHeadline} />
            <div>
              <p className="mobile-app-meta">{content.blogCategory}</p>
              <h3>{content.blogHeadline}</h3>
              <p>{content.blogExcerpt}</p>
              <a className="text-link" href={content.blogHref}>
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
    </main>
  );
}
