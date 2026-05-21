import AboutTabs from "@/components/sections/AboutTabs";
import TechList from "@/components/sections/TechList";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AboutPage() {
  return (
    <>
      <TechList
        title="Core Skills"
        items={[
          { techName: "MERN Stack", techColor: "#00d4ff" },
          { techName: "Next.js", techColor: "#a78bfa" },
          { techName: "React.js", techColor: "#6c63ff" },
          { techName: "Node.js", techColor: "#4ade80" },
          { techName: "MongoDB", techColor: "#4ade80" },
          { techName: "TypeScript", techColor: "#38bdf8" },
          { techName: "Express", techColor: "#fbbf24" },
          { techName: "Redux", techColor: "#a78bfa" },
          { techName: "REST APIs", techColor: "#34d8ff" },
          { techName: "DSA", techColor: "#f97316" },
          { techName: "LLM Integrations", techColor: "#ff6b6b" },
        ]}
      />
      <div className="relative mt-1 sm:mt-2 md:mt-3">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <BackgroundBeams className="opacity-35" />
        </div>
        <div className="space-y-0 sm:space-y-0.5 md:space-y-1">
          <AboutTabs />
        </div>
      </div>
    </>
  );
}
