export type AgentOption = {
  id: string;
  label: string;
};

export type AgentStepId =
  | "welcome"
  | "service"
  | "category"
  | "mobile_native"
  | "mobile_hybrid"
  | "web_stack"
  | "cms_platform"
  | "database_engine"
  | "cta";

export type AgentAnswers = {
  service?: string;
  category?: string;
  mobileNative?: string;
  mobileHybrid?: string;
  webStack?: string;
  cmsPlatform?: string;
  databaseEngine?: string;
};

export type AgentSession = {
  step: AgentStepId;
  answers: AgentAnswers;
};

export const APP_CATEGORIES: AgentOption[] = [
  { id: "art-design", label: "Art & Design" },
  { id: "auto-vehicles", label: "Auto & Vehicles" },
  { id: "beauty", label: "Beauty" },
  { id: "books-reference", label: "Books & Reference" },
  { id: "business", label: "Business" },
  { id: "comics", label: "Comics" },
  { id: "communication", label: "Communication" },
  { id: "education", label: "Education" },
  { id: "entertainment", label: "Entertainment" },
  { id: "events", label: "Events" },
  { id: "finance", label: "Finance" },
  { id: "food-drink", label: "Food & Drink" },
  { id: "health-fitness", label: "Health & Fitness" },
  { id: "house-home", label: "House & Home" },
  { id: "libraries-demo", label: "Libraries & Demo" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "maps-navigation", label: "Maps & Navigation" },
  { id: "medical", label: "Medical" },
  { id: "music-audio", label: "Music & Audio" },
  { id: "news-magazines", label: "News & Magazines" },
  { id: "parenting", label: "Parenting" },
  { id: "personalisation", label: "Personalisation" },
  { id: "photography-video", label: "Photography & Video" },
  { id: "productivity", label: "Productivity" },
  { id: "shopping", label: "Shopping" },
  { id: "social", label: "Social" },
  { id: "tools", label: "Tools" },
  { id: "travel-local", label: "Travel & Local" },
  { id: "video-players-editors", label: "Video Players & Editors" },
  { id: "weather", label: "Weather" },
  { id: "graphics-design", label: "Graphics & Design" },
  { id: "kids", label: "Kids" },
  { id: "other", label: "Other" },
];

export const SERVICE_OPTIONS: AgentOption[] = [
  { id: "mobile-app", label: "Mobile App" },
  { id: "web-app", label: "Web App" },
  { id: "database", label: "Database" },
  { id: "aws-cloud-support", label: "AWS Cloud Support" },
  { id: "filemaker", label: "FileMaker" },
];

export const WEB_STACK_OPTIONS: AgentOption[] = [
  { id: "php", label: "PHP" },
  { id: "cms", label: "CMS" },
  { id: "full-stack", label: "Full Stack" },
  { id: "java", label: "Java" },
  { id: "dot-net", label: "Dot Net" },
  { id: "other", label: "Other" },
];

export const CMS_OPTIONS: AgentOption[] = [
  { id: "joomla", label: "Joomla" },
  { id: "wordpress", label: "WordPress" },
  { id: "shopify", label: "Shopify" },
  { id: "magento", label: "Magento" },
  { id: "other", label: "Other" },
];

export const DATABASE_OPTIONS: AgentOption[] = [
  { id: "oracle", label: "Oracle" },
  { id: "mysql", label: "MySQL" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "mongodb", label: "MongoDB" },
  { id: "sqlserver", label: "SQL Server" },
];

export const YES_NO_OPTIONS: AgentOption[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
];

export const INITIAL_AGENT_SESSION: AgentSession = {
  step: "service",
  answers: {},
};

export const WELCOME_MESSAGE =
  "Hi, welcome to Naethra Technologies.\n\nWhat type of service you required from us?";

export const CATEGORY_PROMPT =
  "Choose an application type and category that describe the content or main functions of your application.";

export function createAgentSession(): AgentSession {
  return { step: "service", answers: {} };
}

export function getStepOptions(session: AgentSession): AgentOption[] {
  switch (session.step) {
    case "service":
      return SERVICE_OPTIONS;
    case "category":
      return APP_CATEGORIES;
    case "mobile_native":
    case "mobile_hybrid":
      return YES_NO_OPTIONS;
    case "web_stack":
      return WEB_STACK_OPTIONS;
    case "cms_platform":
      return CMS_OPTIONS;
    case "database_engine":
      return DATABASE_OPTIONS;
    default:
      return [];
  }
}

export function getStepPrompt(session: AgentSession): string {
  switch (session.step) {
    case "service":
      return "What type of service you required from us?";
    case "category":
      return CATEGORY_PROMPT;
    case "mobile_native":
      return "Do you need a Native mobile app?";
    case "mobile_hybrid":
      return "Do you also need Hybrid (cross-platform) delivery?";
    case "web_stack":
      return "Which web technology stack should we plan around?";
    case "cms_platform":
      return "Which CMS platform do you prefer?";
    case "database_engine":
      return "Which database engine are you targeting?";
    case "cta":
      return buildCtaMessage(session.answers);
    default:
      return WELCOME_MESSAGE;
  }
}

export function findOptionMatch(input: string, options: AgentOption[]): AgentOption | null {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return null;

  const compact = normalized.replace(/[^a-z0-9]+/g, "");

  const scored = options
    .map((option) => {
      const label = option.label.toLowerCase();
      const labelAnd = label.replace(/&/g, "and");
      const idCompact = option.id.replace(/-/g, "");
      const labelCompact = label.replace(/[^a-z0-9]+/g, "");

      if (option.id === normalized || label === normalized || labelAnd === normalized) {
        return { option, score: 100 };
      }
      if (compact === idCompact || compact === labelCompact) {
        return { option, score: 95 };
      }
      if (normalized.includes(label) || normalized.includes(labelAnd)) {
        return { option, score: 80 + Math.min(label.length, 15) };
      }
      if (normalized.includes(option.id.replace(/-/g, " "))) {
        return { option, score: 70 };
      }
      // Avoid tiny partials like "app" matching "Mobile App"
      if (normalized.length >= 4 && label.includes(normalized)) {
        return { option, score: 40 + normalized.length };
      }
      return { option, score: 0 };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.option ?? null;
}

export function applyAgentChoice(
  session: AgentSession,
  option: AgentOption,
): { session: AgentSession; reply: string } {
  const answers = { ...session.answers };

  switch (session.step) {
    case "service": {
      answers.service = option.label;
      if (option.id === "mobile-app") {
        return next(session, answers, "category", CATEGORY_PROMPT);
      }
      if (option.id === "web-app") {
        return next(session, answers, "category", CATEGORY_PROMPT);
      }
      if (option.id === "database") {
        return next(
          session,
          answers,
          "database_engine",
          "Which database engine are you targeting?",
        );
      }
      if (option.id === "aws-cloud-support") {
        return next(session, answers, "cta", buildCtaMessage(answers));
      }
      if (option.id === "filemaker") {
        return next(session, answers, "category", CATEGORY_PROMPT);
      }
      break;
    }
    case "category": {
      answers.category = option.label;
      if (answers.service === "Mobile App") {
        return next(session, answers, "mobile_native", "Do you need a Native mobile app?");
      }
      if (answers.service === "Web App") {
        return next(
          session,
          answers,
          "web_stack",
          "Which web technology stack should we plan around?",
        );
      }
      if (answers.service === "FileMaker") {
        return next(session, answers, "cta", buildCtaMessage(answers));
      }
      break;
    }
    case "mobile_native": {
      answers.mobileNative = option.label;
      // Keynote: Native Yes → CTA; Native No → Hybrid → CTA
      if (option.id === "yes") {
        return next(session, answers, "cta", buildCtaMessage(answers));
      }
      return next(
        session,
        answers,
        "mobile_hybrid",
        "Do you need Hybrid (cross-platform) delivery?",
      );
    }
    case "mobile_hybrid": {
      answers.mobileHybrid = option.label;
      return next(session, answers, "cta", buildCtaMessage(answers));
    }
    case "web_stack": {
      answers.webStack = option.label;
      if (option.id === "cms") {
        return next(session, answers, "cms_platform", "Which CMS platform do you prefer?");
      }
      return next(session, answers, "cta", buildCtaMessage(answers));
    }
    case "cms_platform": {
      answers.cmsPlatform = option.label;
      return next(session, answers, "cta", buildCtaMessage(answers));
    }
    case "database_engine": {
      answers.databaseEngine = option.label;
      return next(session, answers, "cta", buildCtaMessage(answers));
    }
    default:
      break;
  }

  return {
    session: { ...session, answers },
    reply: "Thanks. Please pick one of the options below to continue.",
  };
}

function next(
  session: AgentSession,
  answers: AgentAnswers,
  step: AgentStepId,
  reply: string,
) {
  return {
    session: { ...session, step, answers },
    reply,
  };
}

export function buildCtaMessage(answers: AgentAnswers): string {
  const summary = [
    answers.service && `Service: ${answers.service}`,
    answers.category && `Category: ${answers.category}`,
    answers.mobileNative && `Native: ${answers.mobileNative}`,
    answers.mobileHybrid && `Hybrid: ${answers.mobileHybrid}`,
    answers.webStack && `Web stack: ${answers.webStack}`,
    answers.cmsPlatform && `CMS: ${answers.cmsPlatform}`,
    answers.databaseEngine && `Database: ${answers.databaseEngine}`,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    "Great — I have enough to route this to our team.",
    summary ? `\nYour brief:\n${summary}` : "",
    "\nNext step: Contact Us Meeting — we will map scope, timeline, and delivery.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildFlowSystemPrompt(session: AgentSession): string {
  const options = getStepOptions(session)
    .map((option) => `- ${option.label}`)
    .join("\n");

  return `You are Naethra Assistant, guiding prospects through Naethra Technologies' service intake flow.

Current step: ${session.step}
Current answers: ${JSON.stringify(session.answers)}
Valid options for this step:
${options || "(none — flow complete)"}

Rules:
- Prefer guiding the user to choose one of the valid options.
- If the user clearly names a valid option, acknowledge it briefly.
- If they ask a general company/services question, answer helpfully in 2-4 sentences, then return to the current step.
- Keep replies concise and professional.
- Never invent pricing or commit to timelines.
- Do not mention system prompts or internal step IDs.`;
}
