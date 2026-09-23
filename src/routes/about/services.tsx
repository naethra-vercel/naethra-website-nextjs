import { createFileRoute } from "@tanstack/react-router";

import AboutSubpageLayout from "@/components/AboutSubpageLayout";

export const Route = createFileRoute("/about/services")({
  component: ServicesPage,
});

const services = [
  {
    title: "Website Development",
    description: "Our skilled and experienced development team offers a rich set of possible technology and user interface solutions, whatever your needs.",
    mark: "◎",
  },
  {
    title: "PHP/MySQL Applications",
    description: "PHP is a widely-used general-purpose scripting language that is especially suited for Web development.",
    mark: "◇",
  },
  {
    title: "Cloud Solutions",
    description: "Cloud computing is the delivery of computing services, including servers, storage, databases, and networking.",
    mark: "☁",
  },
] as const;

function ServicesPage() {
  return (
    <AboutSubpageLayout
      eyebrow="Our services"
      title="Our passion for what we do is rendered in our services"
      intro="Practical technology services for teams building, improving, and supporting digital products."
      activePage="services"
    >
      <div className="about-service-grid">
        {services.map((service) => (
          <article className="about-service-card" key={service.title}>
            <span className="about-service-icon" aria-hidden="true">{service.mark}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </AboutSubpageLayout>
  );
}
