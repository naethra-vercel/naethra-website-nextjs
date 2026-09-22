import React from "react";

const INTEGRATIONS = [
  {
    name: "Discord",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#5865F2]">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#FF4F00]">
        <path d="M13.5 2L3 13.5h7.5L9 22l12-11.5h-7.5L13.5 2z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#E60023]">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#FF4500]">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.196-.491.956 0 1.733.777 1.733 1.733 0 .658-.363 1.222-.897 1.516.012.164.018.33.018.498 0 2.541-2.956 4.606-6.6 4.606-3.645 0-6.6-2.065-6.6-4.606 0-.168.006-.334.018-.498-.534-.294-.897-.858-.897-1.516 0-.956.777-1.733 1.733-1.733.466 0 .888.182 1.196.491 1.194-.856 2.85-1.418 4.674-1.488l.942-4.41 3.252.684a1.246 1.246 0 0 1 1.198-.823zm-7.61 8.877c-.672 0-1.218.546-1.218 1.218 0 .672.546 1.218 1.218 1.218.672 0 1.218-.546 1.218-1.218 0-.672-.546-1.218-1.218-1.218zm6.202 0c-.672 0-1.218.546-1.218 1.218 0 .672.546 1.218 1.218 1.218.672 0 1.218-.546 1.218-1.218 0-.672-.546-1.218-1.218-1.218zm-5.78 3.972c-.126.126-.126.33 0 .456.966.966 2.532.966 3.498 0 .126-.126.126-.33 0-.456-.126-.126-.33-.126-.456 0-.714.714-1.87.714-2.586 0-.126-.126-.33-.126-.456 0z" />
      </svg>
    ),
  },
  {
    name: "Snapchat",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#FFFC00] stroke-black stroke-[0.5]">
        <path d="M12.046 2.1c-2.923 0-5.26 2.22-5.26 5.485 0 1.543.513 3.018 1.284 4.09.155.215.196.495.105.741-.129.35-.619 1.488-1.802 1.761-.397.091-.659.444-.632.85.03.447.379.79.824.79.378 0 .809-.15 1.283-.448.337-.212.766-.179 1.066.082.906.787 2.054 1.249 3.238 1.249 1.184 0 2.332-.462 3.238-1.249.3-.261.729-.294 1.066-.082.474.298.905.448 1.283.448.445 0 .794-.343.824-.79.027-.406-.235-.759-.632-.85-1.183-.273-1.673-1.411-1.802-1.761-.091-.246-.05-.526.105-.741.771-1.072 1.284-2.547 1.284-4.09 0-3.265-2.337-5.485-5.26-5.485z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    svg: (
      <svg viewBox="0 0 24 24" className="size-6 fill-black">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube Music",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#FF0000]">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.977 0-7.2-3.223-7.2-7.2s3.223-7.2 7.2-7.2 7.2 3.223 7.2 7.2-3.223 7.2-7.2 7.2zm-2.4-10.8v7.2l6-3.6-6-3.6z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" className="size-7 fill-[#FF0000]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Mocha",
    svg: (
      <svg viewBox="0 0 24 24" className="size-6 fill-black">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.24l7.6 3.8-7.6 3.8-7.6-3.8L12 4.24zM4 8.78l7 3.5v7.44l-7-3.5V8.78zm16 7.44l-7 3.5v-7.44l7-3.5v7.44z" />
      </svg>
    ),
  },
];

export default function IntegrationSection() {
  // Repeating list to populate full circular orbit
  const orbitItems = [
    ...INTEGRATIONS,
    ...INTEGRATIONS,
  ];

  return (
    <section id="integration" className="relative overflow-hidden py-20 lg:py-28 bg-[#f4f7fc] min-h-[580px] flex flex-col items-center justify-center">
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
          animation: orbit-spin 48s linear infinite;
        }
        .animate-icon-counter-spin {
          animation: icon-counter-spin 48s linear infinite;
        }
        .animate-orbit-spin:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content Area */}
      <div className="relative z-20 space-y-6 text-center max-w-3xl mx-auto px-4 py-6 pointer-events-auto">
        {/* Category Tag */}
        <div className="inline-block rounded-full border border-gray-200 bg-white py-1 pr-4 pl-1 font-sans text-xs text-gray-700 shadow-sm">
          <div className="flex items-center gap-x-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-[10px]">
              ›
            </span>
            <span className="font-medium">Integration</span>
          </div>
        </div>

        {/* Heading and Description */}
        <div className="space-y-3">
          <h2 className="mx-auto max-w-[620px] text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Your entire tech stack — <br />
            fully connected
          </h2>
          <p className="mx-auto max-w-[560px] text-gray-600 text-sm sm:text-base leading-relaxed">
            Integrate your favorite apps and build workflows that move data,
            trigger actions, and keep everything in sync — automatically.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-center pt-2">
          <a href="#contact">
            <button
              type="button"
              className="group relative flex h-11 cursor-pointer items-center rounded-full border border-gray-300 bg-white p-1 pr-6 text-xs sm:text-sm text-gray-900 shadow-sm transition-all hover:border-gray-400"
            >
              <div className="relative z-20 flex h-9 w-12 items-center justify-center overflow-hidden rounded-full bg-lime-300 transition-transform duration-300 group-hover:scale-105">
                <span className="text-black font-bold text-xs">›</span>
              </div>
              <span className="shrink-0 pl-3 font-semibold">Start free</span>
            </button>
          </a>
        </div>
      </div>

      {/* Orbit Circle forming U-shaped smiling arc line passing through app icons */}
      <div className="absolute top-[-440px] sm:top-[-540px] left-1/2 -translate-x-1/2 size-[850px] sm:size-[1050px] rounded-full border border-gray-300/80 shadow-inner animate-orbit-spin pointer-events-none z-10">
        {orbitItems.map((item, index) => {
          const totalItems = orbitItems.length;
          const angle = (360 / totalItems) * index;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div className="translate-y-[425px] sm:translate-y-[525px]">
                <div
                  style={{
                    transform: `rotate(-${angle}deg)`,
                  }}
                >
                  <div
                    className="animate-icon-counter-spin pointer-events-auto flex size-13 sm:size-15 items-center justify-center rounded-full bg-white p-2.5 sm:p-3 shadow-lg border border-gray-100 hover:scale-120 transition-transform cursor-pointer"
                    title={item.name}
                  >
                    {item.svg}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
