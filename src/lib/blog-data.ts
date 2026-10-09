import founderImage from "@/assets/putech-founder.jpg";
import projectImage from "@/assets/putech-project.jpg";
import teamImage from "@/assets/putech-team.jpg";
import { assetSrc } from "@/lib/asset-src";

export type BlogPost = {
  slug: string;
  category: "Flutter" | "Web Development" | "FileMaker" | "Mobile" | "Strategy";
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tips-for-writing-clean-and-reusable-flutter-code",
    category: "Flutter",
    date: "February 8, 2023",
    readTime: "7 min read",
    title: "Tips for Writing Clean and Reusable Flutter Code",
    excerpt:
      "A practical approach to building Flutter codebases that stay readable, testable, and ready for the next feature.",
    image: assetSrc(projectImage),
    intro:
      "Flutter makes it possible to move quickly, but speed only compounds when the code remains easy to understand. Clear boundaries, small widgets, and deliberate naming give a growing product room to breathe.",
    sections: [
      {
        heading: "Start with clear boundaries",
        body: "Keep UI composition, state changes, and data access separate wherever the product allows it. A widget should be able to explain its own responsibility without asking the reader to trace through the entire application.",
      },
      {
        heading: "Prefer small, focused widgets",
        body: "Breaking a long screen into focused components makes visual changes safer and gives each piece a natural place for tests. Reusable widgets should expose the decisions a screen actually needs and hide implementation noise.",
      },
      {
        heading: "Make consistency a team habit",
        body: "Formatting, naming conventions, code review checklists, and shared design primitives turn quality from a final cleanup step into part of everyday delivery.",
      },
    ],
  },
  {
    slug: "the-great-debate-flutter-vs-react-native",
    category: "Flutter",
    date: "January 30, 2023",
    readTime: "8 min read",
    title: "The Great Debate: Flutter vs React Native",
    excerpt:
      "The right cross-platform choice depends on your product, team, and long-term maintenance plan, not a popularity contest.",
    image: assetSrc(teamImage),
    intro:
      "Flutter and React Native both help teams ship across platforms. The useful question is not which framework wins in general, but which one fits your product constraints and the people who will maintain it.",
    sections: [
      {
        heading: "Compare the whole delivery system",
        body: "Look beyond the first release. Consider hiring, native integrations, testing, performance budgets, release tooling, and how comfortably your team can debug production issues.",
      },
      {
        heading: "Choose for the product ahead",
        body: "A short-lived experiment and a long-running customer platform may need different trade-offs. Map the next two years of the product before making a framework decision.",
      },
    ],
  },
  {
    slug: "optimising-performance-in-flutter-apps",
    category: "Mobile",
    date: "January 18, 2023",
    readTime: "6 min read",
    title: "Optimising Performance in Flutter Apps",
    excerpt:
      "Practical performance improvements begin with measuring the slow path and end with a calmer, more responsive product.",
    image: assetSrc(founderImage),
    intro:
      "Performance is a user experience signal. Flutter gives teams strong tools for smooth interfaces, but those tools work best when performance is treated as a measurable product requirement.",
    sections: [
      {
        heading: "Measure before changing",
        body: "Use profiling tools to identify expensive builds, unnecessary repaints, large asset costs, and slow network work. A clear baseline keeps optimisation grounded in evidence.",
      },
      {
        heading: "Keep the first screen light",
        body: "Defer work that is not needed for the first interaction, optimise image delivery, and make loading states purposeful. The first few seconds shape the user's sense of quality.",
      },
    ],
  },
  {
    slug: "understanding-the-flutter-architecture-and-why-it-matters",
    category: "Flutter",
    date: "January 10, 2023",
    readTime: "7 min read",
    title: "Understanding the Flutter Architecture and Why It Matters",
    excerpt:
      "A closer look at the layers that make Flutter flexible and how architecture decisions affect everyday development.",
    image: assetSrc(projectImage),
    intro:
      "Understanding the framework's layers helps teams make better decisions when a product grows beyond a collection of screens. Architecture becomes useful when it clarifies trade-offs rather than adding ceremony.",
    sections: [
      {
        heading: "Think in layers",
        body: "Rendering, widgets, services, and platform integration each solve different problems. Keeping those concerns visible makes it easier to reason about change and performance.",
      },
      {
        heading: "Let the product shape the structure",
        body: "Start with a structure that supports the current product, then evolve it as domain complexity appears. The best architecture is one the team can explain and maintain.",
      },
    ],
  },
  {
    slug: "create-and-update-an-event-in-google-calendar-from-filemaker",
    category: "FileMaker",
    date: "December 19, 2022",
    readTime: "9 min read",
    title: "Create and Update an Event in Google Calendar from FileMaker",
    excerpt:
      "Connect FileMaker workflows with Google Calendar so teams can move from a record to a scheduled action without duplicate entry.",
    image: assetSrc(teamImage),
    intro:
      "When a business process lives in FileMaker but the calendar lives elsewhere, small integration gaps quickly become daily friction. A focused API connection can keep both systems useful and in sync.",
    sections: [
      {
        heading: "Model the workflow first",
        body: "Define which FileMaker fields own the event, how updates are identified, and what should happen when a calendar event is moved or deleted. The data contract matters more than the first API call.",
      },
      {
        heading: "Design for retries",
        body: "External services can be unavailable. Store the remote event identifier, surface failures clearly, and make retrying safe so users do not create duplicate events.",
      },
    ],
  },
  {
    slug: "filemaker-integration-with-microsoft-onedrive",
    category: "FileMaker",
    date: "December 2, 2022",
    readTime: "8 min read",
    title: "FileMaker Integration with Microsoft OneDrive",
    excerpt:
      "Bring documents into the workflow your team already understands with a dependable FileMaker and OneDrive connection.",
    image: assetSrc(founderImage),
    intro:
      "Document workflows often fail at the handoff between a business record and the file attached to it. Connecting FileMaker with OneDrive can make that relationship visible, searchable, and easier to maintain.",
    sections: [
      {
        heading: "Keep ownership explicit",
        body: "Decide whether FileMaker or OneDrive owns names, permissions, and lifecycle events. Clear ownership prevents sync logic from becoming a source of conflicting edits.",
      },
      {
        heading: "Make files useful in context",
        body: "A link is most valuable when it appears beside the record, status, and people who need it. Good integration reduces searching rather than simply moving files between systems.",
      },
    ],
  },
  {
    slug: "why-your-business-needs-a-thoughtful-digital-roadmap",
    category: "Strategy",
    date: "June 20, 2025",
    readTime: "5 min read",
    title: "Why Your Business Needs a Thoughtful Digital Roadmap",
    excerpt:
      "A useful roadmap connects business priorities to the sequence of product decisions that will create measurable progress.",
    image: assetSrc(projectImage),
    intro:
      "Digital transformation is rarely blocked by a lack of ideas. It is blocked by too many competing ideas and no shared way to decide what comes next.",
    sections: [
      {
        heading: "Start with the outcome",
        body: "Name the business result before choosing a tool. A roadmap is stronger when every initiative has a clear reason to exist and a way to tell whether it helped.",
      },
      {
        heading: "Leave room to learn",
        body: "Sequence work in small, visible steps. The roadmap should create confidence while leaving enough flexibility to respond to evidence from customers and teams.",
      },
    ],
  },
  {
    slug: "five-ways-modern-teams-can-build-better-software",
    category: "Web Development",
    date: "May 28, 2025",
    readTime: "6 min read",
    title: "Five Ways Modern Teams Can Build Better Software",
    excerpt:
      "Better software comes from better feedback loops: clearer decisions, smaller releases, and a closer relationship with real users.",
    image: assetSrc(teamImage),
    intro:
      "Tools change quickly, but the habits behind reliable delivery are remarkably consistent. Strong teams make the work visible, reduce uncertainty, and keep learning close to the code.",
    sections: [
      {
        heading: "Make decisions visible",
        body: "Record the why behind important choices, especially when there are meaningful trade-offs. Shared context helps teams move quickly without repeating old debates.",
      },
      {
        heading: "Ship in smaller slices",
        body: "Small releases reveal risk earlier and give users more chances to shape the result. Delivery becomes a conversation instead of a single high-stakes handoff.",
      },
    ],
  },
];

export const blogCategories = [
  "All",
  "Flutter",
  "Web Development",
  "FileMaker",
  "Mobile",
  "Strategy",
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
