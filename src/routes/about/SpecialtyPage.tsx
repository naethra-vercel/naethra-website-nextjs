import AboutSubpageLayout from "@/components/AboutSubpageLayout";

export default function AboutSpecialtyPage() {
  return (
    <AboutSubpageLayout
      eyebrow="Our specialty"
      title="Our specialty"
      intro="The efficient use of data technology at both the workgroup and enterprise levels, with systems designed to keep growing with your business."
    >
      <section className="about-copy-block">
        <span className="about-copy-rule" aria-hidden="true" />
        <p>
          To be an invaluable resource by helping you and your team get the maximum benefit of the
          customized data tools we develop with you, and making sure your team is getting the most
          out of those tools including MySQL, PostgreSQL, AJAX, PHP, Java and more for LAN/WAN, Web
          and mobile deployments. We have provided a variety of companies, organizations and
          industries worldwide with innovative and diverse custom development services.
        </p>
      </section>
    </AboutSubpageLayout>
  );
}
