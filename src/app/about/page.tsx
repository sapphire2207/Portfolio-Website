import AboutTabs from "@/components/sections/AboutTabs";
import AboutContact from "@/components/sections/AboutContact";
import TechList from "@/components/sections/TechList";

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
          { techName: "LLM Integrations", techColor: "#ff6b6b" },
        ]}
      />
      <div className="mt-4 space-y-2">
        <AboutTabs />
        <AboutContact />
      </div>
    </>
  );
}
