"use client";

import { Download, FileArchive, LockKeyhole, X } from "lucide-react";
import { type FormEvent, useState } from "react";

import { unlockDownloadAction } from "@/app/download/actions";
import NaethraContentPage from "@/components/NaethraContentPage";
import type { DownloadResource } from "@/lib/downloads";

export default function DownloadsPage({ downloads }: { downloads: DownloadResource[] }) {
  const [selectedDownload, setSelectedDownload] = useState<DownloadResource | null>(null);
  const [password, setPassword] = useState("");
  const [unlockStatus, setUnlockStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [unlockMessage, setUnlockMessage] = useState("");

  const openPasswordPrompt = (resource: DownloadResource) => {
    setSelectedDownload(resource);
    setPassword("");
    setUnlockMessage("");
    setUnlockStatus("idle");
  };

  const closePasswordPrompt = () => {
    if (unlockStatus === "submitting") return;
    setSelectedDownload(null);
  };

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDownload || !password.trim()) return;

    setUnlockStatus("submitting");
    setUnlockMessage("");

    try {
      const downloadUrl = await unlockDownloadAction(selectedDownload.id, password);
      setSelectedDownload(null);
      window.location.assign(downloadUrl);
    } catch (error) {
      setUnlockMessage(error instanceof Error ? error.message : "Unable to unlock this download.");
      setUnlockStatus("error");
    }
  };

  return (
    <NaethraContentPage
      className="downloads-page"
      eyebrow="Resources"
      title="Downloads"
      intro="Explore project profiles, platform capabilities, and technical resources from our delivery team."
      compact
    >
      <section className="downloads-intro" data-reveal="fade-up">
        <div>
          <FileArchive size={24} aria-hidden="true" />
          <strong>{downloads.length} resources</strong>
        </div>
        <p>
          Downloads are securely managed by WordPress. Select a resource to continue to its download
          page.
        </p>
      </section>

      <section className="downloads-grid" aria-label="Available downloads">
        {downloads.map((resource, index) => (
          <article
            className="download-card"
            key={resource.id}
            data-reveal="fade-up"
            data-reveal-delay={String((index % 3) + 1)}
          >
            <div className="download-card-icon">
              <Download size={21} aria-hidden="true" />
            </div>
            <p>{resource.category}</p>
            <h2>{resource.title}</h2>
            <button
              className="download-card-action"
              type="button"
              onClick={() => openPasswordPrompt(resource)}
              aria-label={`Download ${resource.title}`}
            >
              Download
              <LockKeyhole size={16} aria-hidden="true" />
            </button>
          </article>
        ))}
      </section>

      {selectedDownload && (
        <div
          className="download-modal-backdrop"
          role="presentation"
          onMouseDown={closePasswordPrompt}
        >
          <section
            className="download-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="download-modal-close"
              type="button"
              onClick={closePasswordPrompt}
              aria-label="Close password prompt"
            >
              <X size={19} aria-hidden="true" />
            </button>
            <div className="download-modal-icon">
              <LockKeyhole size={24} aria-hidden="true" />
            </div>
            <p>Protected download</p>
            <h2 id="download-modal-title">{selectedDownload.title}</h2>
            <span>Enter the document password to begin downloading.</span>

            <form onSubmit={handleUnlock}>
              <label htmlFor="download-password">Password</label>
              <input
                id="download-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                autoFocus
                required
              />
              {unlockStatus === "error" && (
                <p className="download-modal-error" role="alert">
                  {unlockMessage}
                </p>
              )}
              <button type="submit" disabled={unlockStatus === "submitting"}>
                {unlockStatus === "submitting" ? "Checking…" : "Unlock and download"}
                <Download size={17} aria-hidden="true" />
              </button>
            </form>
          </section>
        </div>
      )}
    </NaethraContentPage>
  );
}
