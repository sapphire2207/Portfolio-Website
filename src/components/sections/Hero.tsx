"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Bounded from "@/components/Bounded";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

type HeroProps = {
  firstName: string;
  lastName: string;
  tagLine: string;
  aboutText: string;
};

export default function Hero({ firstName, lastName, tagLine, aboutText }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fullName = `${firstName} ${lastName}`;
  const totalNameLength = fullName.length;

  return (
    <Bounded className="pt-4 sm:pt-6 md:pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0f0f1a]/50 px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10">
        <div className="hero-grid-pattern pointer-events-none absolute inset-0 z-0" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 sm:gap-8 md:min-h-[70vh] md:grid-cols-2 md:gap-10">
          <div className="order-2 row-span-1 mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:order-none md:col-span-1 md:col-start-2 md:max-w-[30rem]">
            <motion.div
              className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#13131f]/50 shadow-[0_20px_60px_rgba(108,99,255,0.25)]"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: [0.9, 1, 0.95, 1], scale: [1, 1.015, 1] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 1.2, ease: "easeInOut" },
                      scale: { duration: 8, ease: "easeInOut", repeat: Infinity },
                    }
              }
            >
              <Image
                src="/my-photo.jpeg"
                alt="Mysore Sridhar"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>
          <div className="order-1 col-start-1 md:order-none md:row-start-1" data-speed=".2">
            <motion.div
              className="display-font mb-5 overflow-visible leading-none sm:mb-6 md:mb-8"
              aria-label={`${firstName} ${lastName}`}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.1,
                    staggerChildren: 0.055,
                  },
                },
              }}
            >
              <TypewriterEffect
                words={[
                  { text: firstName, className: "!text-[#f0f0ff]" },
                  {
                    text: lastName,
                    className:
                      "bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff] bg-clip-text !text-transparent",
                  },
                ]}
                className="!text-left !text-[clamp(2rem,10.8vw,8.75rem)] sm:!text-[clamp(2.15rem,11.5vw,8.75rem)] !font-black !leading-[0.94] !tracking-[-0.02em]"
                cursorClassName="!bg-[#a78bfa]"
              />
            </motion.div>

            <motion.span
              className="job-title inline-block rounded-full border border-white/10 px-6 py-2"
              initial={prefersReducedMotion ? false : { y: 24, opacity: 0, scale: 1.04 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: "easeOut", delay: totalNameLength * 0.055 + 0.15 }
              }
            >
              <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff] bg-clip-text text-sm font-semibold uppercase tracking-[0.12em] text-transparent sm:text-base md:text-2xl md:tracking-[0.16em]">
                {tagLine}
              </span>
            </motion.span>
            <motion.p
              className="hero-about mt-4 max-w-2xl text-sm leading-relaxed text-[#c3cbe4] sm:mt-5 sm:text-base md:mt-6 md:text-lg"
              initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: "easeOut", delay: totalNameLength * 0.055 + 0.3 }
              }
            >
              {aboutText}
            </motion.p>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
