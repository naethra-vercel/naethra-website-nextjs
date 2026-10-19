import "@/styles/pages.css";

import type { Metadata } from "next";

import NaethraContentPage from "@/components/NaethraContentPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "30 mins meeting | Naethra Technologies",
  description:
    "Schedule a 30-minute online consultation with Naethra Technologies, or share your preferred time by email.",
  alternates: { canonical: "/30-mins-meeting" },
};

const HUBSPOT_MEETING_SRC = "https://meetings.hubspot.com/info12224?embed=true";

export default function Page() {
  return (
    <NaethraContentPage
      className="meeting-page"
      eyebrow="Book a call"
      title="30 mins meeting"
      intro="Schedule a focused online consultation. Share your goals, constraints, and timeline — we will help map the next step."
      compact
    >
      <div className="meeting-page-shell">
        <aside className="meeting-page-aside">
          <h2>How to connect</h2>
          <ol className="meeting-page-steps">
            <li>
              <strong>Schedule</strong> your 30-min online consultation using the calendar.
            </li>
            <li>
              Alternatively send us a link to <strong>your appointment calendar</strong>.
            </li>
            <li>
              <strong>Email</strong> us at{" "}
              <a href="mailto:info@naethra.com">info@naethra.com</a> with a date and time of your
              choice.
            </li>
          </ol>
          <div className="meeting-page-note">
            <span>Prefer email?</span>
            <a href="mailto:info@naethra.com">info@naethra.com</a>
          </div>
        </aside>

        <section className="meeting-page-embed" aria-label="HubSpot meeting scheduler">
          <iframe
            title="Schedule a 30 minute meeting with Naethra"
            src={HUBSPOT_MEETING_SRC}
            className="meeting-page-iframe"
            loading="lazy"
            allow="camera; microphone; fullscreen"
          />
        </section>
      </div>
    </NaethraContentPage>
  );
}
