"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const SoftAurora = dynamic(
  () => import("@/components/designs/soft-aurora"),
  { ssr: false },
);

export default function HomePage() {
  return (
    <main className="relative isolate">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-85">
        <SoftAurora
          scale={1.25}
          brightness={0.9}
          color1="#8ec5ff"
          color2="#ff55d6"
          noiseFrequency={2.1}
          noiseAmplitude={0.85}
          bandHeight={0.55}
          bandSpread={0.9}
          octaveDecay={0.22}
          layerOffset={0.2}
          colorSpeed={0.55}
          enableMouseInteraction
          mouseInfluence={0.14}
        />
      </div>
      <Hero
        firstName="Mysore"
        lastName="Sridhar"
        tagLine="Full Stack Web Developer"
        aboutText="I’m a Full Stack Web Developer and B.Tech graduate in Artificial Intelligence and Data Science from Sri Indu College of Engineering & Technology. I specialize in building scalable web applications using the MERN stack, Next.js, and TypeScript. I’m passionate about backend development, system design, APIs, and solving DSA problems. I enjoy creating real-world products with clean architecture, performance, and great user experience while continuously exploring modern technologies and AI integrations."
      />
    </main>
  );
}
