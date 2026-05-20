"use client";

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
import { Tabs } from "@/components/ui/tabs";

type TabItem = {
  title: string;
  subtitle?: string;
  period?: string;
  points?: string[];
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
};

const tabContent: Record<"education" | "courses" | "achievements", TabItem[]> = {
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

function TabPanel({ items }: { items: TabItem[] }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131a2c]/90 p-4 sm:p-5">
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1730]/75 p-4 sm:p-5"
          >
            <div
              className={`pointer-events-none absolute -right-8 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50 sm:block ${item.accent}`}
            />
            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h3 className="display-font text-base font-semibold text-[#f0f0ff] sm:text-lg">
                  {item.title}
                </h3>
                {item.subtitle ? (
                  <p className="mt-1.5 text-sm text-[#a0a0b8] sm:mt-2 sm:text-base">{item.subtitle}</p>
                ) : null}
                {item.period ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.09em] text-[#6c9dff] sm:text-sm sm:tracking-[0.1em]">
                    {item.period}
                  </p>
                ) : null}
                {item.points ? (
                  <ul className="mt-2.5 space-y-1.5 text-sm text-[#c6cee8] sm:mt-3 sm:space-y-2 sm:text-base">
                    {item.points.map((point) => (
                      <li key={point} className="leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg sm:h-12 sm:w-12 ${item.accent}`}>
                <item.icon className="text-lg sm:text-xl" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function AboutTabs() {
  const tabs = [
    {
      title: "Education",
      value: "education",
      content: <TabPanel items={tabContent.education} />,
    },
    {
      title: "Courses",
      value: "courses",
      content: <TabPanel items={tabContent.courses} />,
    },
    {
      title: "Achievements",
      value: "achievements",
      content: <TabPanel items={tabContent.achievements} />,
    },
  ];

  return (
    <Bounded>
      <section className="rounded-3xl border border-white/[0.08] bg-[#111423]/80 p-4 shadow-[0_0_40px_rgba(108,99,255,0.10)] backdrop-blur-xl sm:p-5 md:p-8">
        <Heading as="h2" size="lg" className="display-font mb-4 text-[#f0f0ff] sm:mb-5 md:mb-6">
          Highlights
        </Heading>

        <div className="relative mx-auto flex h-[31rem] w-full max-w-5xl flex-col [perspective:1000px] items-start justify-start sm:h-[35rem] md:h-[40rem]">
          <Tabs
            tabs={tabs}
            containerClassName="gap-1"
            tabClassName="border border-white/10 bg-[#0f1730]/80 text-xs font-semibold text-[#b8c2e6] sm:text-sm"
            activeTabClassName="bg-gradient-to-r from-[#4f46e5] to-[#2563eb]"
            contentClassName="mt-24"
          />
        </div>
      </section>
    </Bounded>
  );
}
