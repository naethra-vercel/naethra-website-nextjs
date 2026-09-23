import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { JarvisAIAssistant } from "@/components/JarvisAIAssistant";
import { FakeJobsDisclaimerModal } from "@/components/FakeJobsDisclaimerModal";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { JarvisArcReactor, openJarvis } from "@/components/JarvisArcReactor";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RefreshIcon,
  Home01Icon,
  AlertCircleIcon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7fc] px-4 py-12 text-[#142033] font-sans">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center">
        {/* Visual Arc Reactor Icon */}
        <div className="mx-auto mb-5 flex justify-center">
          <JarvisArcReactor size={88} label="404" />
        </div>

        {/* Tag */}
        <span className="inline-block text-xs font-bold tracking-wider text-[#005b96] uppercase bg-[#e8edf6] px-3.5 py-1 rounded-full mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142033]">
          Page Not Found
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          The requested page doesn't exist or may have been relocated.
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7fc] px-4 py-12 text-[#142033] font-sans">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center">
        {/* Visual Arc Reactor HUD Icon */}
        <div className="mx-auto mb-5 flex justify-center">
          <JarvisArcReactor size={88} label="SYS.ERR" />
        </div>

        {/* Error Tag */}
        <div className="inline-flex items-center gap-x-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 mb-4">
          <HugeiconsIcon icon={AlertCircleIcon} size={15} />
          <span>System Interruption</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142033]">
          This page didn't load
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>

        {/* Technical Message Snippet if available */}
        {error?.message && (
          <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Details</p>
            <p className="text-xs font-mono text-slate-700 break-all line-clamp-2">{error.message}</p>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
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

        {/* Help Banner */}
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Putech" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <SpotlightCursor />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <JarvisAIAssistant />
        {pathname === "/" && <FakeJobsDisclaimerModal />}
        <ScrollToTopButton />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
