"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

export default function Avatar({
  image,
  className,
}: {
  image: ImageAsset;
  className?: string;
}) {
  const component = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const avatarNode = component.current?.querySelector<HTMLElement>(".avatar");
    const highlightNode = component.current?.querySelector<HTMLElement>(".highlight");

    if (!avatarNode || !highlightNode) {
      return;
    }

    avatarNode.style.willChange = "transform, opacity";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        avatarNode,
        {
          opacity: 0,
          scale: 1.06,
        },
        {
          scale: 1,
          opacity: 1,
          duration: prefersReducedMotion ? 0 : designTokens.motion.entranceDuration,
          ease: designTokens.motion.entranceEase,
          onComplete: () => {
            avatarNode.style.willChange = "auto";
          },
        },
      );

      if (prefersReducedMotion) {
        return;
      }

      const handleMouseMove = (event: MouseEvent) => {
        if (!component.current) {
          return;
        }

        const componentRect = component.current.getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        const componentPercent = {
          x: (event.clientX - componentCenterX) / componentRect.width / 2,
        };

        const distFromCenterX = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: {
              duration: designTokens.motion.entranceDuration,
              overwrite: "auto",
              ease: designTokens.motion.transitionEase,
            },
          })
          .to(
            avatarNode,
            {
              rotation: gsap.utils.clamp(-2.5, 2.5, 6 * componentPercent.x),
            },
            0,
          )
          .to(
            highlightNode,
            {
              opacity: distFromCenterX - 0.62,
              x: -12 + 24 * componentPercent.x,
            },
            0,
          );
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, component);

    return () => {
      avatarNode.style.willChange = "auto";
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={component} className={cn("relative h-full w-full", className)}>
      <div
        className="rounded-3xl p-[2px]"
        style={{
          background:
            "linear-gradient(#13131f,#13131f) padding-box, linear-gradient(135deg,#6c63ff,#00d4ff) border-box",
          border: "2px solid transparent",
        }}
      >
        <div
          className="avatar relative aspect-square overflow-hidden rounded-[1.3rem] bg-[#13131f] opacity-0"
          style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-full w-full object-cover"
            preload
          />
          <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 md:block" />
        </div>
      </div>
    </div>
  );
}
