import React from "react";

const INTEGRATIONS = [
  {
    name: "Angular",
    icon: "https://api.iconify.design/logos:angular-icon.svg",
  },
  {
    name: "PHP",
    icon: "https://api.iconify.design/logos:php.svg",
  },
  {
    name: "React",
    icon: "https://api.iconify.design/logos:react.svg",
  },
  {
    name: ".NET",
    icon: "https://api.iconify.design/logos:dotnet.svg",
  },
  {
    name: "Node.JS",
    icon: "https://api.iconify.design/logos:nodejs-icon.svg",
  },
  {
    name: "Java",
    icon: "https://api.iconify.design/logos:java.svg",
  },
  {
    name: "JavaScript",
    icon: "https://api.iconify.design/logos:javascript.svg",
  },
  {
    name: "Android",
    icon: "https://api.iconify.design/logos:android-icon.svg",
  },
  {
    name: "Ionic",
    icon: "https://api.iconify.design/logos:ionic-icon.svg",
  },
  {
    name: "iOS",
    icon: "https://api.iconify.design/logos:apple.svg",
  },
  {
    name: "React Native",
    icon: "https://api.iconify.design/logos:react.svg",
  },
  {
    name: "Flutter",
    icon: "https://api.iconify.design/logos:flutter.svg",
  },
  {
    name: "Cloud AWS",
    icon: "https://api.iconify.design/logos:aws.svg",
  },
  {
    name: "Azure GCP",
    icon: "https://api.iconify.design/logos:azure-icon.svg",
  },
  {
    name: "FileMaker",
    icon: "https://cdn.simpleicons.org/claris/007AFF",
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
            <span className="font-medium">Tech Stacks</span>
          </div>
        </div>

        {/* Heading and Description */}
        <div className="space-y-3">
          <h2 className="mx-auto max-w-[620px] text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Your entire tech stack — <br />
            fully connected
          </h2>
          <p className="mx-auto max-w-[560px] text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
            Proud To Have Picked These Up Along The Way
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-center pt-2">
          <a href="#contact">
            <button
              type="button"
              className="group relative flex h-11 cursor-pointer items-center rounded-full border border-gray-300 bg-white p-1 pr-6 text-xs sm:text-sm text-gray-900 shadow-sm transition-all hover:border-gray-400"
            >
              <div className="relative z-20 flex h-9 w-12 items-center justify-center overflow-hidden rounded-full bg-[#005b96] transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xs">›</span>
              </div>
              <span className="shrink-0 pl-3 font-semibold">Contact Us</span>
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
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-7 sm:size-8 object-contain"
                      loading="lazy"
                    />
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
