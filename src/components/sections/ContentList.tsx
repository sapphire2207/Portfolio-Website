"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { designTokens } from "@/lib/design-tokens";
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
  const component = useRef<HTMLUListElement | null>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const urlPrefix = contentType === "Blogs" ? "/blog" : "/project";

  const contentImages = useMemo(
    () => items.map((item) => item.image?.src || fallbackItemImage.src),
    [items, fallbackItemImage.src],
  );

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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (prefersReducedMotion || currentItem === null || !revealRef.current) {
        return;
      }

      const mousePos = { x: event.clientX, y: event.clientY + window.scrollY };
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));
      const maxY = window.scrollY + window.innerHeight - 350;
      const maxX = window.innerWidth - 250;

      revealRef.current.style.willChange = "transform, opacity";

      gsap.to(revealRef.current, {
        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
        ease: designTokens.motion.transitionEase,
        duration: designTokens.motion.entranceDuration,
      });

      gsap.to(revealRef.current, {
        opacity: hovering ? 1 : 0,
        visibility: "visible",
        ease: designTokens.motion.transitionEase,
        duration: designTokens.motion.entranceDuration,
        onComplete: () => {
          if (!hovering && revealRef.current) {
            revealRef.current.style.willChange = "auto";
          }
        },
      });

      lastMousePos.current = mousePos;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (revealRef.current) {
        revealRef.current.style.willChange = "auto";
      }
    };
  }, [hovering, currentItem, prefersReducedMotion]);

  useEffect(() => {
    contentImages.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) {
      setHovering(true);
    }
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);
  };

  return (
    <>
      <ul ref={component} className="grid gap-4" onMouseLeave={onMouseLeave}>
        {items.map((post, index) => (
          <li
            key={post.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            onMouseEnter={() => onMouseEnter(index)}
            className="list-item opacity-0"
          >
            <Link
              href={`${urlPrefix}/${post.uid}`}
              className="group motion-all block rounded-2xl border border-white/[0.06] bg-[#13131f]/80 p-6 backdrop-blur-sm hover:border-[#6c63ff]/40 hover:bg-[#13131f] hover:shadow-lg hover:shadow-[#6c63ff]/5"
              aria-label={post.title}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
            </Link>
          </li>
        ))}

        <div
          className="pointer-events-none fixed left-0 top-0 z-50 h-[320px] w-[220px] rounded-2xl border border-white/10 bg-cover bg-center opacity-0 shadow-2xl shadow-black/50 backdrop-blur-sm"
          style={{
            backgroundImage:
              currentItem !== null ? `url(${contentImages[currentItem]})` : "",
          }}
          ref={revealRef}
        />
      </ul>
    </>
  );
}
