import { HugeiconsIcon } from "@hugeicons/react";
import { HelpCircleIcon, Home01Icon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";

import { JarvisArcReactor, openJarvis } from "@/components/JarvisArcReactor";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function NotFoundPage() {
  useDocumentTitle("Page not found | Naethra Technologies");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7fc] px-4 py-12 text-[#142033] font-sans">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center">
        <div className="mx-auto mb-5 flex justify-center">
          <JarvisArcReactor size={88} label="404" />
        </div>

        <span className="inline-block text-xs font-bold tracking-wider text-[#005b96] uppercase bg-[#e8edf6] px-3.5 py-1 rounded-full mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142033]">
          Page Not Found
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          The requested page doesn&apos;t exist or may have been relocated.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#005b96] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#005b96]/20 transition-all hover:bg-[#004877] active:scale-95"
          >
            <HugeiconsIcon icon={Home01Icon} size={18} />
            <span>Go home</span>
          </Link>
          <button
            type="button"
            onClick={openJarvis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <HugeiconsIcon icon={HelpCircleIcon} size={18} />
            <span>Ask Jarvis AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}
