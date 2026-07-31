"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const ColorBends = dynamic(() => import("@/components/designs/color-bends"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="relative isolate">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-85">
        <ColorBends
          colors={["#f7f7f7", "#e100ff"]}
          rotation={75}
          speed={0.18}
          scale={1.05}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.9}
          noise={0.12}
          parallax={0.45}
          iterations={1}
          intensity={1.25}
          bandWidth={6}
          transparent
          autoRotate={0}
        />
      </div>
      <Hero
        firstName="Mysore"
        lastName="Sridhar"
        tagLine="AI Engineer & Full Stack Developer"
        aboutText="I’m an AI Engineer and Full Stack Developer with a B.Tech in Artificial Intelligence and Data Science from Sri Indu College of Engineering & Technology. I specialize in building production-ready AI applications using Generative AI, Agentic AI, LangGraph, and FastAPI, along with scalable web applications using Next.js and TypeScript. I’m passionate about AI systems, backend engineering, APIs, and clean software architecture. I enjoy creating intelligent, real-world products powered by LLMs, multi-agent systems, and modern web technologies while continuously exploring advancements in AI and software engineering."
      />
    </main>
  );
}
