"use client";

import { useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  HelpCircleIcon,
  Home01Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";

import { JarvisArcReactor, openJarvis } from "@/components/JarvisArcReactor";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    // #region agent log
    fetch("http://127.0.0.1:7800/ingest/94ea0936-4433-4e8f-b586-7fcc797a61ea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "f894e3",
      },
      body: JSON.stringify({
        sessionId: "f894e3",
        runId: "pre-fix",
        hypothesisId: "D",
        location: "src/app/error.tsx:useEffect",
        message: "Client error boundary triggered",
        data: {
          name: error?.name,
          message: error?.message?.slice(0, 300),
          digest: error?.digest ?? null,
          path: typeof window !== "undefined" ? window.location.pathname : null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7fc] px-4 py-12 text-[#142033] font-sans">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center">
        <div className="mx-auto mb-5 flex justify-center">
          <JarvisArcReactor size={88} label="SYS.ERR" />
        </div>

        <div className="inline-flex items-center gap-x-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 mb-4">
          <HugeiconsIcon icon={AlertCircleIcon} size={15} />
          <span>System Interruption</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142033]">
          This page didn&apos;t load
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>

        {error?.message && (
          <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Details
            </p>
            <p className="text-xs font-mono text-slate-700 break-all line-clamp-2">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#005b96] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#005b96]/20 transition-all hover:bg-[#004877] active:scale-95"
          >
            <HugeiconsIcon icon={RefreshIcon} size={18} />
            <span>Try again</span>
          </button>
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <HugeiconsIcon icon={Home01Icon} size={18} />
            <span>Go home</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8edf6] text-[#005b96]">
              <HugeiconsIcon icon={HelpCircleIcon} size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#142033]">Need assistant guidance?</p>
              <p className="text-[11px] text-slate-500">Launch Jarvis AI to assist navigation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openJarvis}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005b96] hover:underline"
          >
            <span>Ask Jarvis</span> &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
