import { Cloud, Code2, Database } from "lucide-react";

import AboutSubpageLayout from "@/components/AboutSubpageLayout";

const services = [
  {
    title: "Website Development",
    description:
      "Our skilled and experienced development team offers a rich set of possible technology and user interface solutions, whatever your needs.",
    mark: Code2,
  },
  {
    title: "PHP/MySQL Applications",
    description:
      "PHP is a widely-used general-purpose scripting language that is especially suited for Web development.",
    mark: Database,
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud computing is the delivery of computing services, including servers, storage, databases, and networking.",
    mark: Cloud,
  },
] as const;

export default function AboutServicesPage() {
  return (
    <AboutSubpageLayout
      eyebrow="Our services"
      title="Our passion for what we do is rendered in our services"
      intro="Practical technology services for teams building, improving, and supporting digital products."
    >
      <div className="about-service-grid">
        {services.map((service) => (
          <article className="about-service-card" key={service.title}>
            <span className="about-service-icon" aria-hidden="true">
              <service.mark size={34} strokeWidth={1.5} />
            </span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </AboutSubpageLayout>
  );
}
