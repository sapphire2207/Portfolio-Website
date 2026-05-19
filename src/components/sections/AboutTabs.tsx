"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  FaBookOpen,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaLaptopCode,
  FaMedal,
  FaTrophy,
} from "react-icons/fa6";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { cn } from "@/lib/utils";

type TabKey = "education" | "courses" | "achievements";

type TabItem = {
  title: string;
  subtitle?: string;
  period?: string;
  points?: string[];
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "education", label: "Education" },
  { key: "courses", label: "Courses" },
  { key: "achievements", label: "Achievements" },
];

const tabContent: Record<TabKey, TabItem[]> = {
  education: [
    {
      title: "BTech Computer Science in Artificial Intelligence and Data Science",
      subtitle: "Sri Indu College of Engineering & Technology",
      period: "2022 - 2026",
      points: ["GPA: 8.7 / 10.0"],
      icon: FaGraduationCap,
      accent: "from-[#6c63ff] to-[#00d4ff]",
    },
    {
      title: "Intermediate Education (MPC)",
      subtitle: "Chaithanya Kalasala Govt Aided Jr College",
      points: ["GPA: 9.3 / 10.0"],
      icon: FaBookOpen,
      accent: "from-[#4f46e5] to-[#38bdf8]",
    },
    {
      title: "SSC",
      subtitle: "Bhashyam",
      points: ["GPA: 10.0 / 10.0"],
      icon: FaMedal,
      accent: "from-[#22c55e] to-[#84cc16]",
    },
  ],
  courses: [
    {
      title: "Complete Web Development Course 2026",
      subtitle: "Udemy - Hitesh Choudhary",
      icon: FaLaptopCode,
      accent: "from-[#0ea5e9] to-[#6366f1]",
    },
    {
      title: "Striver's A2Z DSA Sheet",
      subtitle: "TakeYouForward",
      icon: FaDatabase,
      accent: "from-[#14b8a6] to-[#3b82f6]",
    },
  ],
  achievements: [
    {
      title: "Smart India Hackathon",
      points: [
        "Worked with a team of 4 on Railway Complaint Management and secured a spot in round 2 out of 25 teams.",
        "RailEase focused on AI-powered safety, convenience, and efficiency with real-time train tracking, live PNR updates, automated complaint handling, and quick journey insights.",
      ],
      icon: FaTrophy,
      accent: "from-[#f59e0b] to-[#ef4444]",
    },
    {
      title: "College Website",
      points: [
        "Collaborated with a team of 2 to create a dynamic AI & Data Science club website with announcements, syllabus, and curriculum.",
        "Built a platform showcasing schedules, events, college information, and resources to improve online engagement and visibility.",
      ],
      icon: FaCode,
      accent: "from-[#8b5cf6] to-[#06b6d4]",
    },
  ],
};

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("education");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const buttonRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    education: null,
    courses: null,
    achievements: null,
  });
  const activeItems = useMemo(() => tabContent[activeTab], [activeTab]);

  useLayoutEffect(() => {
    if (!panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
    );
  }, [activeTab]);

  useLayoutEffect(() => {
    const activeButton = buttonRefs.current[activeTab];
    const indicator = indicatorRef.current;
    const tabList = tabListRef.current;
    if (!activeButton || !indicator || !tabList) return;

    const buttonRect = activeButton.getBoundingClientRect();
    const listRect = tabList.getBoundingClientRect();
    const x = buttonRect.left - listRect.left;

    gsap.to(indicator, {
      x,
      width: buttonRect.width,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [activeTab]);

  return (
    <Bounded>
      <section className="rounded-3xl border border-white/[0.08] bg-[#111423]/80 p-6 shadow-[0_0_40px_rgba(108,99,255,0.10)] backdrop-blur-xl md:p-8">
          <Heading as="h2" size="lg" className="display-font mb-6 text-[#f0f0ff]">
          Profile Highlights
          </Heading>

          <div
            ref={tabListRef}
            className="relative mb-6 inline-flex w-full max-w-fit items-center rounded-full border border-white/10 bg-[#0f1730]/80 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute bottom-1 left-1 top-1 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#2563eb] shadow-[0_0_20px_rgba(79,70,229,0.45)]"
            />
            {tabs.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  ref={(el) => {
                    buttonRefs.current[tab.key] = el;
                  }}
                  className={cn(
                    "motion-all relative z-10 rounded-full px-5 py-2 text-sm font-semibold tracking-[0.01em]",
                    active
                      ? "text-white"
                      : "text-[#b8c2e6] hover:text-white",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div ref={panelRef} className="grid gap-4">
            {activeItems.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131a2c]/70 p-5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50",
                    item.accent,
                  )}
                />
                <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <h3 className="display-font text-lg font-semibold text-[#f0f0ff]">
                      {item.title}
                    </h3>
                    {item.subtitle ? (
                      <p className="mt-2 text-[#a0a0b8]">{item.subtitle}</p>
                    ) : null}
                    {item.period ? (
                      <p className="mt-1 text-sm uppercase tracking-[0.1em] text-[#6c9dff]">
                        {item.period}
                      </p>
                    ) : null}
                    {item.points ? (
                      <ul className="mt-3 space-y-2 text-[#c6cee8]">
                        {item.points.map((point) => (
                          <li key={point} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                      item.accent,
                    )}
                  >
                    <item.icon className="text-xl" />
                  </div>
                </div>
              </article>
            ))}
          </div>
      </section>
    </Bounded>
  );
}
