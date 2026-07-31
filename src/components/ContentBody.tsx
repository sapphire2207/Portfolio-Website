"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import SoftAurora from "@/components/designs/soft-aurora";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { formatDate } from "@/utils/formatDate";
import type { CSSProperties } from "react";

type ContentBodyProps = {
  title: string;
  date: string;
  tags: readonly string[];
  children: React.ReactNode;
};

export default function ContentBody({
  title,
  date,
  tags,
  children,
}: ContentBodyProps) {
  const formattedDate = formatDate(date);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative">
      {!prefersReducedMotion ? (
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07]"
          aria-hidden="true"
        >
          <SoftAurora
            speed={0.18}
            scale={1.1}
            brightness={0.3}
            color1="#6c63ff"
            color2="#00d4ff"
            noiseFrequency={2.2}
            noiseAmplitude={0.35}
            bandHeight={0.55}
            bandSpread={0.8}
            octaveDecay={0.2}
            layerOffset={0.08}
            colorSpeed={0.35}
            enableMouseInteraction={false}
            mouseInfluence={0}
          />
        </div>
      ) : null}

      <Bounded as="article">
        <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#13131f]">
          <div className="h-1 w-full bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff]" />
          <div className="px-5 py-10 md:px-10 md:py-16">
            <Heading as="h1" className="display-font mb-5 text-[#f0f0ff]" size="xl">
              {title}
            </Heading>

            <div className="mb-6 flex flex-wrap gap-2.5">
              {tags.map((tag, index) => (
                <span
                  key={`${title}-${tag}-${index}`}
                  className="rounded-full border border-[#ff6b6b30] bg-[#ff6b6b15] px-3 py-0.5 text-sm font-medium text-[#ff6b6b]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#2a2a40] to-transparent md:my-10" />

            <div
              className="prose prose-lg prose-invert w-full max-w-none prose-img:w-full prose-img:rounded-lg prose-pre:overflow-x-auto prose-pre:text-sm prose-table:block prose-table:overflow-x-auto"
              style={
                {
                  "--tw-prose-body": "#a0a0b8",
                  "--tw-prose-headings": "#f0f0ff",
                  "--tw-prose-links": "#6c63ff",
                  "--tw-prose-bold": "#f0f0ff",
                  "--tw-prose-code": "#00d4ff",
                } as CSSProperties
              }
            >
              {children}
            </div>
          </div>
        </div>
      </Bounded>
    </div>
  );
}
