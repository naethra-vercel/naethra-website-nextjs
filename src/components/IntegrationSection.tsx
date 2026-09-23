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

const INTEGRATIONS = [
  {
    name: "Angular",
    icon: angularIcon,
  },
  {
    name: "PHP",
    icon: phpIcon,
  },
  {
    name: "React",
    icon: reactIcon,
  },
  {
    name: ".NET",
    icon: netIcon,
  },
  {
    name: "Node.JS",
    icon: nodeIcon,
  },
  {
    name: "Java",
    icon: javaIcon,
  },
  {
    name: "JavaScript",
    icon: javascriptIcon,
  },
  {
    name: "Android",
    icon: androidIcon,
  },
  {
    name: "Ionic",
    icon: ionicIcon,
  },
  {
    name: "iOS",
    icon: appleIcon,
  },
  {
    name: "React Native",
    icon: reactIcon,
  },
  {
    name: "Flutter",
    icon: flutterIcon,
  },
  {
    name: "Cloud AWS",
    icon: awsIcon,
  },
  {
    name: "Azure",
    icon: azureIcon,
  },
  {
    name: "Google Cloud",
    icon: googleCloudIcon,
  },
  {
    name: "C#",
    icon: csharpIcon,
  },
  {
    name: "C",
    icon: cIcon,
  },
  {
    name: "Dart",
    icon: dartIcon,
  },
  {
    name: "Docker",
    icon: dockerIcon,
  },
  {
    name: "GitHub",
    icon: githubIcon,
  },
  {
    name: "GraphQL",
    icon: graphqlIcon,
  },
  {
    name: "Jenkins",
    icon: jenkinsIcon,
  },
  {
    name: "jQuery",
    icon: jqueryIcon,
  },
  {
    name: "Kubernetes",
    icon: kubernetesIcon,
  },
  {
    name: "MySQL",
    icon: mysqlIcon,
  },
  {
    name: "Nest.js",
    icon: nestIcon,
  },
  {
    name: "Next.js",
    icon: nextIcon,
  },
  {
    name: "Oracle",
    icon: oracleIcon,
  },
  {
    name: "PostgreSQL",
    icon: postgresIcon,
  },
  {
    name: "Python",
    icon: pythonIcon,
  },
  {
    name: "WordPress",
    icon: wordpressIcon,
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
