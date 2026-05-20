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
        tagLine="Full Stack Web Developer"
        aboutText="I’m a Full Stack Web Developer and B.Tech graduate in Artificial Intelligence and Data Science from Sri Indu College of Engineering & Technology. I specialize in building scalable web applications using the MERN stack, Next.js, and TypeScript. I’m passionate about backend development, system design, APIs, and solving DSA problems. I enjoy creating real-world products with clean architecture, performance, and great user experience while continuously exploring modern technologies and AI integrations."
      />
    </main>
  );
}
