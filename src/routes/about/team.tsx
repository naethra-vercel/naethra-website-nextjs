import { createFileRoute } from "@tanstack/react-router";

import founderImage from "@/assets/putech-founder.jpg";
import projectImage from "@/assets/putech-project.jpg";
import teamImage from "@/assets/putech-team.jpg";
import AboutSubpageLayout from "@/components/AboutSubpageLayout";

export const Route = createFileRoute("/about/team")({
  component: TeamPage,
});

const teamMembers = [
  {
    name: "Murali Ramakrishnan",
    role: "CEO",
    image: founderImage,
    description: "Murali Ramakrishnan holds a Bachelors degree in Computer Science and has an overall industry experience of 18 years. He has spent over 11 years with Tata Consultancy Services (TCS). He has worked in large IT Development projects and managed delivery for several large engagements. He was involved in setting up the offshore delivery center of Barclays. His areas of expertise include managing large delivery centers, transition management and Business Process Outsourcing (BPO) delivery. He has worked for client organizations such as Nedcor Group, Qwest, Concert, AT&T, among others.",
  },
  {
    name: "NP Murali",
    role: "COO",
    image: teamImage,
    description: "NP Murali (NP) holds a Bachelors degree in Mechanical Engineering and has a Masters Degree in Business Administration. He has worked with Tata Consultancy Services (TCS) for 5+ years executing projects in Activity Based Management (ABM), Business Process Reengineering (BPR) and BPO delivery. His areas of expertise include relationship management, transition management and development of new business lines in BPO and conceptualizing service guidelines for Finance & accounting (F&A) processes. NP has 11+ years of industry experience and has worked in IDBI Bank, ISRO and India Pistons Ltd.",
  },
  {
    name: "Ramachandran",
    role: "CFO",
    image: projectImage,
    description: "Ramachandran holds a degree in Commerce and has about 20 years of experience in Business Management. He is a first generation entrepreneur and has incubated several companies. He has extensive experience in managing the finance function of large corporations in India and the Middle East.",
  },
] as const;

function TeamPage() {
  return (
    <AboutSubpageLayout
      eyebrow="Our team"
      title="Our team"
      intro="Experienced people bringing thoughtful delivery, technical judgment, and dependable partnership to every engagement."
    >
      <div className="about-team-list">
        {teamMembers.map((member, index) => (
          <article className={`about-team-card about-team-card-${index + 1}`} key={member.name}>
            <img src={member.image} alt={member.name} width={1200} height={1104} />
            <div>
              <h2>{member.name}</h2>
              <span>{member.role}</span>
              <p>{member.description}</p>
            </div>
          </article>
        ))}
      </div>
    </AboutSubpageLayout>
  );
}
