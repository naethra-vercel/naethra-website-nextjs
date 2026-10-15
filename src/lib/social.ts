/** Canonical public profiles — one handle set across the site. */
export const SOCIAL_PROFILES = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/naethratechnologies",
    short: "f",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/naethra-technologies/",
    short: "in",
  },
  {
    id: "x",
    label: "X",
    href: "https://twitter.com/naethratech",
    short: "X",
  },
] as const;

export const ORGANIZATION_SAME_AS = SOCIAL_PROFILES.map((profile) => profile.href);
