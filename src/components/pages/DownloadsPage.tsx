"use client";

import {
  Code as PhosphorCode,
  Database as PhosphorDatabase,
  DownloadSimple,
  Eye,
  EyeSlash,
  GlobeSimple,
  MagnifyingGlass,
  SquaresFour,
  List as PhosphorList,
  ShoppingBag,
  DeviceMobile,
  X,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import angularIcon from "@/assets/icons/Angular.svg";
import appleIcon from "@/assets/icons/Apple.svg";
import awsIcon from "@/assets/icons/AWS.svg";
import cIcon from "@/assets/icons/C.svg";
import csharpIcon from "@/assets/icons/CSharp.svg";
import dartIcon from "@/assets/icons/Dart.svg";
import flutterIcon from "@/assets/icons/Flutter.svg";
import googleCloudIcon from "@/assets/icons/Google Cloud.svg";
import ionicIcon from "@/assets/icons/Ionic.svg";
import nextIcon from "@/assets/icons/Next.js.svg";
import typescriptIcon from "@/assets/icons/TypeScript.svg";
import { unlockDownloadAction } from "@/app/download/actions";
import NaethraContentPage from "@/components/NaethraContentPage";
import { assetSrc } from "@/lib/asset-src";
import type { DownloadResource } from "@/lib/downloads";

type ViewMode = "grid" | "list";

type DownloadIcon =
  | { kind: "asset"; src: string; label: string }
  | { kind: "glyph"; Icon: PhosphorIcon; label: string };

const easeOut = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const listStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const TITLE_ICON_RULES: Array<{ match: RegExp; icon: DownloadIcon }> = [
  { match: /flutter/i, icon: { kind: "asset", src: assetSrc(flutterIcon), label: "Flutter" } },
  { match: /dart/i, icon: { kind: "asset", src: assetSrc(dartIcon), label: "Dart" } },
  { match: /angular/i, icon: { kind: "asset", src: assetSrc(angularIcon), label: "Angular" } },
  { match: /\bios\b|apple/i, icon: { kind: "asset", src: assetSrc(appleIcon), label: "Apple" } },
  { match: /\baws\b/i, icon: { kind: "asset", src: assetSrc(awsIcon), label: "AWS" } },
  {
    match: /google\s*cloud|gcp/i,
    icon: { kind: "asset", src: assetSrc(googleCloudIcon), label: "Google Cloud" },
  },
  { match: /ionic/i, icon: { kind: "asset", src: assetSrc(ionicIcon), label: "Ionic" } },
  { match: /next\.?js/i, icon: { kind: "asset", src: assetSrc(nextIcon), label: "Next.js" } },
  {
    match: /typescript|\bts\b/i,
    icon: { kind: "asset", src: assetSrc(typescriptIcon), label: "TypeScript" },
  },
  {
    match: /c\s*#|csharp|\.?\s*net\b|dotnet/i,
    icon: { kind: "asset", src: assetSrc(csharpIcon), label: ".NET" },
  },
  { match: /c\+\+/i, icon: { kind: "asset", src: assetSrc(cIcon), label: "C" } },
  { match: /cloud|azure|devops/i, icon: { kind: "asset", src: assetSrc(awsIcon), label: "Cloud" } },
  { match: /hybrid/i, icon: { kind: "asset", src: assetSrc(ionicIcon), label: "Hybrid" } },
  { match: /android|mobile/i, icon: { kind: "glyph", Icon: DeviceMobile, label: "Mobile" } },
  {
    match: /database|sql|mysql|oracle/i,
    icon: { kind: "glyph", Icon: PhosphorDatabase, label: "Database" },
  },
  {
    match: /ecommerce|e-commerce|shopify|commerce/i,
    icon: { kind: "glyph", Icon: ShoppingBag, label: "Commerce" },
  },
  {
    match: /web|wordpress|php|cms|filemaker|claris|cwp|react|java/i,
    icon: { kind: "glyph", Icon: GlobeSimple, label: "Web" },
  },
  { match: /code|app/i, icon: { kind: "glyph", Icon: PhosphorCode, label: "Code" } },
];

function iconForResource(resource: DownloadResource): DownloadIcon {
  const haystack = `${resource.title} ${resource.category}`;
  return (
    TITLE_ICON_RULES.find((entry) => entry.match.test(haystack))?.icon ?? {
      kind: "glyph",
      Icon: DownloadSimple,
      label: "Download",
    }
  );
}

function DownloadThemeIcon({ icon }: { icon: DownloadIcon }) {
  if (icon.kind === "asset") {
    return <img className="download-theme-icon" src={icon.src} alt="" width={22} height={22} />;
  }
  const Icon = icon.Icon;
  return <Icon className="download-theme-icon" size={20} weight="light" aria-hidden="true" />;
}

export default function DownloadsPage({ downloads }: { downloads: DownloadResource[] }) {
  const reduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [selectedDownload, setSelectedDownload] = useState<DownloadResource | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [unlockMessage, setUnlockMessage] = useState("");
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!selectedDownload) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const lenis = window.__naethraLenis;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    lenis?.stop();

    const blockScroll = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousPadding;
      lenis?.start();
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [selectedDownload]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? downloads.filter(
          (item) =>
            item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
        )
      : downloads;
    return [...list].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );
  }, [downloads, query]);

  const openPasswordPrompt = (resource: DownloadResource) => {
    setSelectedDownload(resource);
    setPassword("");
    setShowPassword(false);
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

  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  return (
    <NaethraContentPage
      className="downloads-page downloads-page-premium"
      eyebrow="Resources"
      title="Downloads"
      intro="Browse password-protected project profiles and platform resources from the Naethra delivery team."
      compact
    >
      <div className="downloads-stack">
        <motion.div
          className="downloads-search-shell"
          variants={fadeUp}
          {...motionProps}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="downloads-search-bezel">
            <div className="downloads-search">
              <MagnifyingGlass size={18} weight="light" aria-hidden="true" />
              <label className="downloads-search-field">
                <span className="sr-only">Search downloads</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title or category"
                  autoComplete="off"
                />
              </label>
              {query ? (
                <button
                  className="downloads-search-clear"
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={14} weight="bold" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="downloads-toolbar"
          variants={fadeUp}
          {...motionProps}
          transition={{ duration: 0.7, ease: easeOut, delay: reduceMotion ? 0 : 0.04 }}
        >
          <p className="downloads-count">
            {filtered.length === downloads.length
              ? `${filtered.length} resources`
              : `${filtered.length} of ${downloads.length} resources`}
            <span>Sorted A to Z</span>
          </p>

          <div className="downloads-view-toggle" role="group" aria-label="View mode">
            <button
              type="button"
              className={viewMode === "list" ? "is-active" : undefined}
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
            >
              <PhosphorList size={16} weight="light" aria-hidden="true" />
              List
            </button>
            <button
              type="button"
              className={viewMode === "grid" ? "is-active" : undefined}
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
            >
              <SquaresFour size={16} weight="light" aria-hidden="true" />
              Grid
            </button>
          </div>
        </motion.div>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                className="downloads-empty"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                {...(reduceMotion ? {} : { exit: { opacity: 0 } })}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                No resources match “{query.trim()}”.
              </motion.p>
            ) : (
              <motion.section
                key={viewMode}
                className={
                  viewMode === "grid"
                    ? "downloads-collection is-grid"
                    : "downloads-collection is-list"
                }
                variants={listStagger}
                {...motionProps}
                aria-label="Available downloads"
              >
                {filtered.map((resource, index) => {
                  const icon = iconForResource(resource);
                  return (
                    <motion.div
                      layout={!reduceMotion}
                      className="download-card-shell"
                      key={resource.id}
                      variants={fadeUp}
                      transition={{
                        layout: { duration: 0.35, ease: easeOut },
                        duration: 0.55,
                        ease: easeOut,
                        delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.28),
                      }}
                    >
                      <article className="download-card">
                        <div className="download-card-icon" title={icon.label}>
                          <DownloadThemeIcon icon={icon} />
                        </div>

                        <div className="download-card-copy">
                          <p>{resource.category}</p>
                          <h2>{resource.title}</h2>
                        </div>

                        <button
                          className="download-card-action"
                          type="button"
                          onClick={() => openPasswordPrompt(resource)}
                          aria-label={`Download ${resource.title}`}
                        >
                          Download
                        </button>
                      </article>
                    </motion.div>
                  );
                })}
              </motion.section>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {portalReady
        ? createPortal(
            <AnimatePresence>
              {selectedDownload ? (
                <motion.div
                  className="download-modal-backdrop"
                  role="presentation"
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onMouseDown={closePasswordPrompt}
                  onWheel={(event) => event.preventDefault()}
                  onTouchMove={(event) => event.preventDefault()}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  {...(reduceMotion ? {} : { exit: { opacity: 0 } })}
                  transition={{ duration: 0.22, ease: easeOut }}
                >
                  <motion.section
                    className="download-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="download-modal-title"
                    data-lenis-prevent="true"
                    onMouseDown={(event) => event.stopPropagation()}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    {...(reduceMotion ? {} : { exit: { opacity: 0, scale: 0.985 } })}
                    transition={{ duration: 0.28, ease: easeOut }}
                  >
                    <button
                      className="download-modal-close"
                      type="button"
                      onClick={closePasswordPrompt}
                      aria-label="Close password prompt"
                    >
                      <X size={16} weight="bold" aria-hidden="true" />
                    </button>
                    <p>Protected download</p>
                    <h2 id="download-modal-title">{selectedDownload.title}</h2>
                    <span>Enter the document password to begin downloading.</span>

                    <form onSubmit={handleUnlock}>
                      <label htmlFor="download-password">Password</label>
                      <div className="download-password-field">
                        <input
                          id="download-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          autoComplete="current-password"
                          autoFocus
                          required
                        />
                        <button
                          className="download-password-toggle"
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          aria-pressed={showPassword}
                        >
                          {showPassword ? (
                            <EyeSlash size={16} weight="light" aria-hidden="true" />
                          ) : (
                            <Eye size={16} weight="light" aria-hidden="true" />
                          )}
                          <span>{showPassword ? "Hide" : "Show"}</span>
                        </button>
                      </div>
                      {unlockStatus === "error" && (
                        <p className="download-modal-error" role="alert">
                          {unlockMessage}
                        </p>
                      )}
                      <button type="submit" disabled={unlockStatus === "submitting"}>
                        {unlockStatus === "submitting" ? "Checking…" : "Unlock and download"}
                      </button>
                    </form>
                  </motion.section>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </NaethraContentPage>
  );
}
