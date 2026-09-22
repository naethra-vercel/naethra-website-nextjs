import React from "react";

const INTEGRATIONS = [
  { name: "Discord", icon: "https://api.iconify.design/logos:discord-icon.svg" },
  { name: "Mocha", icon: "https://api.iconify.design/logos:mocha.svg" },
  { name: "Pinterest", icon: "https://api.iconify.design/logos:pinterest.svg" },
  { name: "Reddit", icon: "https://api.iconify.design/logos:reddit-icon.svg" },
  { name: "Snapchat", icon: "https://api.iconify.design/logos:snapchat-icon.svg" },
  { name: "Twitter", icon: "https://api.iconify.design/logos:twitter.svg" },
  { name: "YouTube Music", icon: "https://api.iconify.design/logos:youtube-icon.svg" },
  { name: "YouTube", icon: "https://api.iconify.design/logos:youtube-icon.svg" },
  { name: "Zapier", icon: "https://api.iconify.design/logos:zapier-icon.svg" },
];

export default function IntegrationSection() {
  // Triple items list to repeat along the circular orbit
  const orbitItems = [
    ...INTEGRATIONS,
    ...INTEGRATIONS,
    ...INTEGRATIONS,
  ];

  return (
    <section className="relative overflow-hidden pb-35 bg-[#f2f5fa] min-h-screen flex items-center justify-center">
      {/* Pure CSS Animations for Orbit & Counter Rotation */}
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes icon-counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-orbit-spin {
          animation: orbit-spin 45s linear infinite;
        }
        .animate-icon-counter-spin {
          animation: icon-counter-spin 45s linear infinite;
        }
      `}</style>

      {/* Top Gradient Fade */}
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-[100px] w-full bg-gradient-to-b from-[#f2f5fa] to-transparent" />

      {/* Main Content Area */}
      <div className="relative z-30 space-y-8 lg:space-y-14 text-center max-w-4xl mx-auto px-4">
        {/* Category Tag */}
        <div className="inline-block rounded-full border border-gray-200 bg-white py-[3px] pr-4 pl-[3px] font-sans text-xs text-gray-700 shadow-sm">
          <div className="flex items-center gap-x-2">
            <span className="flex h-6 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                className="size-4 fill-white"
              >
                <path d="M6.66602 4.16675H8.33268V5.83341H6.66602V4.16675Z" />
                <path d="M9.16602 6.66675H10.8327V8.33342H9.16602V6.66675Z" />
                <path d="M11.666 9.16675H13.3327V10.8334H11.666V9.16675Z" />
                <path d="M9.16602 11.6667H10.8327V13.3334H9.16602V11.6667Z" />
                <path d="M6.66602 14.1667H8.33268V15.8334H6.66602V14.1667Z" />
              </svg>
            </span>
            <span className="font-medium">Integration</span>
          </div>
        </div>

        {/* Heading and Description */}
        <div className="space-y-4">
          <h2 className="mx-auto max-w-[600px] text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Your entire tech stack — <br />
            fully connected
          </h2>
          <p className="mx-auto max-w-[592px] text-gray-600 text-base sm:text-lg leading-relaxed">
            Integrate your favorite apps and build workflows that move data,
            trigger actions, and keep everything in sync — automatically.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-center">
          <a href="/pricing">
            <button
              type="button"
              className="group relative flex h-12 cursor-pointer items-center rounded-full border border-gray-300 bg-white p-1 pr-6 font-mono text-sm text-gray-900 shadow-sm transition-all hover:border-gray-400"
            >
              <div className="relative z-20 flex h-10 w-14 items-center justify-center overflow-hidden rounded-full bg-lime-300 transition-transform duration-500 group-hover:scale-105">
                <span className="flex size-6 shrink-0 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5 fill-black"
                  >
                    <path d="M8 5H10V7H8V5Z" />
                    <path d="M11 8H13V10H11V8Z" />
                    <path d="M14 11H16V13H14V11Z" />
                    <path d="M11 14H13V16H11V14Z" />
                    <path d="M8 17H10V19H8V17Z" />
                  </svg>
                </span>
              </div>
              <span className="shrink-0 pl-3 font-semibold">Start free</span>
            </button>
          </a>
        </div>
      </div>

      {/* Orbit Container */}
      <div className="absolute top-[-18%] left-1/2 -translate-x-1/2 md:top-[-72%] lg:top-[-115%] xl:top-[-137%] pointer-events-none">
        <div className="mx-auto w-fit">
          <div className="animate-orbit-spin relative mx-auto aspect-square size-[1100px] rounded-full border-2 border-gray-200/80">
            {orbitItems.map((item, index) => {
              const totalItems = orbitItems.length;
              const angle = (360 / totalItems) * index;

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-550px)`,
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="animate-icon-counter-spin flex size-16 items-center justify-center rounded-full bg-white p-3 shadow-md border border-gray-100">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="size-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
