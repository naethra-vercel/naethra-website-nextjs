import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";

export const Route = createFileRoute("/30-mins-meeting")({
  component: MeetingPage,
});

function MeetingPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="content-page meeting-page">
      <NaethraContentHeader />
      <section className="content-page-hero">
        <div className="site-container">
          <p className="content-page-eyebrow">Schedule a Conversation</p>
          <h1>30 Mins Meeting</h1>
          <p className="content-page-intro">
            Schedule a conversation about your next product, project, or technical requirements with our team.
          </p>
        </div>
      </section>

      <section className="site-container meeting-embed-section" style={{ paddingBlock: "3rem 5rem" }}>
        <div
          className="meetings-iframe-container"
          data-src="https://meetings.hubspot.com/info12224?embed=true"
          style={{ minHeight: "680px", width: "100%" }}
        />
      </section>

      <SiteFooter className="content-page-footer" />
    </main>
  );
}
