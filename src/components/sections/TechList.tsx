"use client";

import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import type { TechItem } from "@/types";

gsap.registerPlugin(ScrollTrigger);

type TechListProps = {
  title: string;
  items: TechItem[];
};

export default function TechList({ title, items }: TechListProps) {
  const component = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!component.current) {
      return;
    }
    const section = component.current;

    const rows = Array.from(
      section.querySelectorAll<HTMLElement>(".tech-row"),
    );
    if (!rows.length) return;

    rows.forEach((row) => {
      row.style.willChange = "transform";
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        {
          x: (index: number) =>
            index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400),
        },
        {
          x: (index: number) =>
            index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400),
          ease: "none",
          stagger: 0.06,
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      );

      ScrollTrigger.refresh();
    }, section);

    return () => {
      rows.forEach((row) => {
        row.style.willChange = "auto";
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={component}
      className="wrapper overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #0a0a0f 10%, #0a0a0f 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, #0a0a0f 10%, #0a0a0f 90%, transparent 100%)",
      }}
    >
      <Bounded as="div" className="pb-2">
        <Heading size="lg" className="display-font mb-8 text-[#f0f0ff]" as="h2">
          {title}
        </Heading>
      </Bounded>

      {items.map(({ techColor, techName }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-[#1e1e30]"
          aria-label={techName}
        >
          {Array.from({ length: 15 }, (_, itemIndex) => (
            <React.Fragment key={itemIndex}>
              <span
                className="tech-item display-font text-6xl font-extrabold uppercase tracking-tight md:text-7xl"
                style={{ color: itemIndex === 7 ? techColor : "inherit" }}
              >
                {techName}
              </span>
              <span className="text-2xl md:text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
}
