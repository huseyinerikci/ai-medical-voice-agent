"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconHeartbeat,
  IconStethoscope,
  IconReportMedical,
  IconRobot,
  IconHistory,
  IconUserHeart,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] bg-clip-text text-transparent">
        Why Medivoice AI?
      </h2>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

export function FeatureBentoGridWithTitle() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] bg-clip-text text-transparent">
        Why Medivoice AI?
      </h2>
      <FeatureBentoGrid />
    </div>
  );
}

const SimplePulse = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-800 rounded-2xl p-4">
    <IconHeartbeat className="w-12 h-12 text-blue-500 animate-pulse mb-2" />
    <span className="text-blue-700 dark:text-blue-200 font-bold text-lg">
      AI Health
    </span>
  </div>
);
const SimpleSteth = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-cyan-100 via-blue-100 to-cyan-200 dark:from-cyan-900 dark:via-blue-900 dark:to-cyan-800 rounded-2xl p-4">
    <IconStethoscope className="w-12 h-12 text-cyan-500 animate-bounce mb-2" />
    <span className="text-cyan-700 dark:text-cyan-200 font-bold text-lg">
      Live Triage
    </span>
  </div>
);
const SimpleReport = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-green-100 via-blue-100 to-green-200 dark:from-green-900 dark:via-blue-900 dark:to-green-800 rounded-2xl p-4">
    <IconReportMedical className="w-12 h-12 text-green-500 animate-pulse mb-2" />
    <span className="text-green-700 dark:text-green-200 font-bold text-lg">
      Instant Reports
    </span>
  </div>
);
const SimpleRobot = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-purple-100 via-blue-100 to-purple-200 dark:from-purple-900 dark:via-blue-900 dark:to-purple-800 rounded-2xl p-4">
    <IconRobot className="w-12 h-12 text-purple-500 animate-bounce mb-2" />
    <span className="text-purple-700 dark:text-purple-200 font-bold text-lg">
      Conversational AI
    </span>
  </div>
);
const SimpleHistory = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-yellow-100 via-blue-100 to-yellow-200 dark:from-yellow-900 dark:via-blue-900 dark:to-yellow-800 rounded-2xl p-4">
    <IconHistory className="w-12 h-12 text-yellow-500 animate-pulse mb-2" />
    <span className="text-yellow-700 dark:text-yellow-200 font-bold text-lg">
      Consultation History
    </span>
  </div>
);
const SimpleUser = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-pink-100 via-blue-100 to-pink-200 dark:from-pink-900 dark:via-blue-900 dark:to-pink-800 rounded-2xl p-4">
    <IconUserHeart className="w-12 h-12 text-pink-500 animate-bounce mb-2" />
    <span className="text-pink-700 dark:text-pink-200 font-bold text-lg">
      Personalized Care
    </span>
  </div>
);

const items = [
  {
    title: "AI-Powered Health Guidance",
    description: (
      <span className="text-sm">
        Get instant, accurate answers to your health questions—anytime,
        anywhere.
      </span>
    ),
    header: <SimplePulse />,
    className: "md:col-span-1",
    icon: <IconHeartbeat className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Live Symptom Triage",
    description: (
      <span className="text-sm">
        Let our AI agent assess your symptoms and recommend next steps in real
        time.
      </span>
    ),
    header: <SimpleSteth />,
    className: "md:col-span-1",
    icon: <IconStethoscope className="h-4 w-4 text-cyan-500" />,
  },
  {
    title: "Instant Medical Reports",
    description: (
      <span className="text-sm">
        Receive structured, shareable reports after every
        consultation—automatically.
      </span>
    ),
    header: <SimpleReport />,
    className: "md:col-span-1",
    icon: <IconReportMedical className="h-4 w-4 text-green-500" />,
  },
  {
    title: "Conversational AI",
    description: (
      <span className="text-sm">
        Speak naturally—our voice agent understands and responds like a real
        doctor.
      </span>
    ),
    header: <SimpleRobot />,
    className: "md:col-span-1",
    icon: <IconRobot className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Consultation History",
    description: (
      <span className="text-sm">
        Access all your past sessions and reports securely, anytime you need
        them.
      </span>
    ),
    header: <SimpleHistory />,
    className: "md:col-span-1",
    icon: <IconHistory className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Personalized Care",
    description: (
      <span className="text-sm">
        Your experience adapts to your needs—AI learns and improves with every
        use.
      </span>
    ),
    header: <SimpleUser />,
    className: "md:col-span-1",
    icon: <IconUserHeart className="h-4 w-4 text-pink-500" />,
  },
];
