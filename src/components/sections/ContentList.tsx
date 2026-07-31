"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
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
  githubUrl?: string;
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
    <ul ref={component} className="grid gap-6 sm:gap-8">
      {items.map((post, index) => (
        <li
          key={post.id}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="list-item opacity-0"
        >
          <div className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#13131f]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#6c63ff]/40 hover:bg-[#13131f] hover:shadow-lg hover:shadow-[#6c63ff]/5">
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3">
                <Link
                  href={`${urlPrefix}/${post.uid}`}
                  className="display-font text-2xl font-semibold text-[#f0f0ff] transition-colors duration-200 hover:text-[#a78bfa]"
                >
                  {post.title}
                </Link>
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

              <div className="flex items-center gap-3 shrink-0 sm:gap-4">
                {post.githubUrl ? (
                  <a
                    href={post.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#f0f0ff] transition-all duration-200 hover:scale-105 hover:border-[#6c63ff]/50 hover:bg-[#6c63ff]/20 hover:text-white shadow-md"
                    aria-label={`GitHub repository for ${post.title}`}
                    title="View Source Code on GitHub"
                  >
                    <FaGithub className="text-xl sm:text-2xl" />
                  </a>
                ) : null}

                <Link
                  href={`${urlPrefix}/${post.uid}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#6c63ff]/40 bg-[#6c63ff]/10 px-4 py-2 text-sm sm:text-base font-medium text-[#6c63ff] transition-all duration-200 hover:scale-105 hover:bg-[#6c63ff] hover:text-white shadow-md shadow-[#6c63ff]/10"
                  aria-label={`View details for ${post.title}`}
                >
                  <span>{viewMoreText}</span>
                  <MdArrowOutward className="text-lg sm:text-xl" aria-hidden />
                </Link>
              </div>
            </div>

            <Meteors number={14} />
          </div>
        </li>
      ))}
    </ul>
  );
}
