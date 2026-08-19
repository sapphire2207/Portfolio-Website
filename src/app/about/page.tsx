import AboutTabs from "@/components/sections/AboutTabs";
import TechList from "@/components/sections/TechList";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AboutPage() {
  return (
    <>
      <TechList
        title="Core Skills"
        items={[
          { techName: "Python", techColor: "#38bdf8" },
          { techName: "Java", techColor: "#f97316" },
          { techName: "LangGraph", techColor: "#a78bfa" },
          { techName: "LangChain", techColor: "#00d4ff" },
          { techName: "Generative AI", techColor: "#ff6b6b" },
          { techName: "Agentic AI", techColor: "#4ade80" },
          { techName: "FastAPI", techColor: "#2dd4bf" },
          { techName: "Next.js", techColor: "#f0f0ff" },
          { techName: "TypeScript", techColor: "#38bdf8" },
          { techName: "RAG", techColor: "#fbbf24" },
          { techName: "AI Agents", techColor: "#ec4899" },
          { techName: "Multi-Agent Systems", techColor: "#8b5cf6" },
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
