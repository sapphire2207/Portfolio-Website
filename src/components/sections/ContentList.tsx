"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { designTokens } from "@/lib/design-tokens";
import { Meteors } from "@/components/ui/meteors";
import type { ContentTypeName, ImageAsset } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export type ContentListItem = {
  id: string;
  uid: string;
  title: string;
  tags: string[];
  image: ImageAsset;
};

type ContentListProps = {
  items: ContentListItem[];
  contentType: ContentTypeName;
  fallbackItemImage: ImageAsset;
  viewMoreText: string;
};

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  void fallbackItemImage;
  const component = useRef<HTMLUListElement | null>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const urlPrefix = contentType === "Blogs" ? "/blog" : "/project";

  useEffect(() => {
    if (!component.current) {
      return;
    }

    const rows = itemsRef.current.filter(Boolean) as HTMLLIElement[];

    if (prefersReducedMotion) {
      rows.forEach((row) => {
        row.style.opacity = "1";
        row.style.transform = "none";
      });
      return;
    }

    rows.forEach((row) => {
      row.style.willChange = "transform, opacity";
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: designTokens.motion.entranceDuration,
          ease: designTokens.motion.entranceEase,
          stagger: designTokens.motion.listStagger,
          scrollTrigger: {
            trigger: component.current,
            start: designTokens.motion.revealStart,
            toggleActions: "play none none none",
          },
          onComplete: () => {
            rows.forEach((row) => {
              row.style.willChange = "auto";
            });
          },
        },
      );
    }, component);

    return () => {
      rows.forEach((row) => {
        row.style.willChange = "auto";
      });
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <ul ref={component} className="grid gap-4">
      {items.map((post, index) => (
        <li
          key={post.id}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="list-item opacity-0"
        >
          <Link
            href={`${urlPrefix}/${post.uid}`}
            className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#13131f]/80 p-6 backdrop-blur-sm hover:border-[#6c63ff]/40 hover:bg-[#13131f] hover:shadow-lg hover:shadow-[#6c63ff]/5"
            aria-label={post.title}
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3">
                <span className="display-font text-2xl font-semibold text-[#f0f0ff]">
                  {post.title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.id}-${tag}`}
                      className="rounded-full border border-[#ff6b6b30] bg-[#ff6b6b15] px-3 py-0.5 text-sm text-[#ff6b6b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="motion-all inline-flex items-center gap-2 text-lg font-medium text-[#6c63ff] group-hover:text-[#a78bfa]">
                {viewMoreText} <MdArrowOutward aria-hidden />
              </span>
            </div>

            <Meteors number={14} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
