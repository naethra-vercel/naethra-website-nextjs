import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SectionEyebrow from "@/components/SectionEyebrow";

import androidIcon from "@/assets/icons/Android.svg";
import angularIcon from "@/assets/icons/Angular.svg";
import appleIcon from "@/assets/icons/Apple.svg";
import awsIcon from "@/assets/icons/AWS.svg";
import azureIcon from "@/assets/icons/Azure.svg";
import cIcon from "@/assets/icons/C.svg";
import csharpIcon from "@/assets/icons/CSharp.svg";
import dartIcon from "@/assets/icons/Dart.svg";
import dockerIcon from "@/assets/icons/Docker.svg";
import flutterIcon from "@/assets/icons/Flutter.svg";
import githubIcon from "@/assets/icons/GitHub.svg";
import googleCloudIcon from "@/assets/icons/Google Cloud.svg";
import graphqlIcon from "@/assets/icons/GraphQL.svg";
import ionicIcon from "@/assets/icons/Ionic.svg";
import javaIcon from "@/assets/icons/Java.svg";
import javascriptIcon from "@/assets/icons/JavaScript.svg";
import jenkinsIcon from "@/assets/icons/Jenkins.svg";
import jqueryIcon from "@/assets/icons/jQuery.svg";
import kubernetesIcon from "@/assets/icons/Kubernetes.svg";
import mysqlIcon from "@/assets/icons/MySQL.svg";
import nestIcon from "@/assets/icons/Nest.js.svg";
import nextIcon from "@/assets/icons/Next.js.svg";
import netIcon from "@/assets/icons/NET.svg";
import nodeIcon from "@/assets/icons/Node.js.svg";
import oracleIcon from "@/assets/icons/Oracle.svg";
import phpIcon from "@/assets/icons/PHP.svg";
import postgresIcon from "@/assets/icons/PostgresSQL.svg";
import pythonIcon from "@/assets/icons/Python.svg";
import reactIcon from "@/assets/icons/React.svg";
import wordpressIcon from "@/assets/icons/WordPress.svg";
import { assetSrc } from "@/lib/asset-src";

const INTEGRATIONS = [
  {
    name: "Angular",
    icon: assetSrc(angularIcon),
  },
  {
    name: "PHP",
    icon: assetSrc(phpIcon),
  },
  {
    name: "React",
    icon: assetSrc(reactIcon),
  },
  {
    name: ".NET",
    icon: assetSrc(netIcon),
  },
  {
    name: "Node.JS",
    icon: assetSrc(nodeIcon),
  },
  {
    name: "Java",
    icon: assetSrc(javaIcon),
  },
  {
    name: "JavaScript",
    icon: assetSrc(javascriptIcon),
  },
  {
    name: "Android",
    icon: assetSrc(androidIcon),
  },
  {
    name: "Ionic",
    icon: assetSrc(ionicIcon),
  },
  {
    name: "iOS",
    icon: assetSrc(appleIcon),
  },
  {
    name: "React Native",
    icon: assetSrc(reactIcon),
  },
  {
    name: "Flutter",
    icon: assetSrc(flutterIcon),
  },
  {
    name: "Cloud AWS",
    icon: assetSrc(awsIcon),
  },
  {
    name: "Azure",
    icon: assetSrc(azureIcon),
  },
  {
    name: "Google Cloud",
    icon: assetSrc(googleCloudIcon),
  },
  {
    name: "C#",
    icon: assetSrc(csharpIcon),
  },
  {
    name: "C",
    icon: assetSrc(cIcon),
  },
  {
    name: "Dart",
    icon: assetSrc(dartIcon),
  },
  {
    name: "Docker",
    icon: assetSrc(dockerIcon),
  },
  {
    name: "GitHub",
    icon: assetSrc(githubIcon),
  },
  {
    name: "GraphQL",
    icon: assetSrc(graphqlIcon),
  },
  {
    name: "Jenkins",
    icon: assetSrc(jenkinsIcon),
  },
  {
    name: "jQuery",
    icon: assetSrc(jqueryIcon),
  },
  {
    name: "Kubernetes",
    icon: assetSrc(kubernetesIcon),
  },
  {
    name: "MySQL",
    icon: assetSrc(mysqlIcon),
  },
  {
    name: "Nest.js",
    icon: assetSrc(nestIcon),
  },
  {
    name: "Next.js",
    icon: assetSrc(nextIcon),
  },
  {
    name: "Oracle",
    icon: assetSrc(oracleIcon),
  },
  {
    name: "PostgreSQL",
    icon: assetSrc(postgresIcon),
  },
  {
    name: "Python",
    icon: assetSrc(pythonIcon),
  },
  {
    name: "WordPress",
    icon: assetSrc(wordpressIcon),
  }];

export default function IntegrationSection() {
  const orbitItems = INTEGRATIONS;

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
          animation-direction: reverse;
        }
        .animate-icon-counter-spin {
          animation: icon-counter-spin 48s linear infinite;
          animation-direction: reverse;
        }
        .animate-orbit-spin:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content Area */}
      <div className="relative z-20 -translate-y-16 space-y-6 text-center max-w-3xl mx-auto px-4 py-6 pointer-events-auto">
        <SectionEyebrow>Tech Stacks</SectionEyebrow>

        {/* Heading and Description */}
        <div className="space-y-3">
          <h2 className="mx-auto max-w-[620px] text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Your entire tech stack <br />
            fully connected
          </h2>
          <p className="mx-auto max-w-[560px] text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
            Proud To Have Picked These Up Along The Way
          </p>
        </div>

      </div>

      {/* Orbit Circle forming U-shaped smiling arc line passing through app icons */}
      <div className="absolute top-[-440px] sm:top-[-540px] left-1/2 -translate-x-1/2 size-[850px] sm:size-[1050px] rounded-full border border-gray-300/80 shadow-inner animate-orbit-spin pointer-events-none z-10">
        <TooltipProvider delayDuration={100}>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="animate-icon-counter-spin pointer-events-auto flex size-13 sm:size-15 items-center justify-center rounded-full bg-white p-2.5 sm:p-3 shadow-lg border border-gray-100 hover:scale-120 transition-transform cursor-pointer">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="size-7 sm:size-8 object-contain"
                            loading="lazy"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="font-sans font-semibold text-xs bg-slate-900 text-white border border-slate-700/80 shadow-xl px-3 py-1.5 rounded-lg z-50"
                      >
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </TooltipProvider>
      </div>
    </section>
  );
}
