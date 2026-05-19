"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Bounded from "@/components/Bounded";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type HeroProps = {
  firstName: string;
  lastName: string;
  tagLine: string;
  aboutText: string;
};

export default function Hero({ firstName, lastName, tagLine, aboutText }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
  const totalNameLength = fullName.length;

  const renderLetters = (name: string, key: string, offset = 0) => {
    return name.split("").map((letter, index) => {
      const actualIndex = index + offset;
      return (
        <motion.span
          key={`${key}-${index}`}
          className="name-animation inline-block"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.28,
                  ease: "easeOut",
                  delay: actualIndex * 0.055,
                }
          }
        >
          {letter}
        </motion.span>
      );
    });
  };

  return (
    <Bounded className="pt-6 md:pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0f0f1a]/50 px-4 py-8 md:px-8 md:py-10">
        <div className="hero-grid-pattern pointer-events-none absolute inset-0 z-0" />

        <div className="relative z-10 grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
          <div className="row-span-1 row-start-1 -mt-6 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <motion.div
              className="relative mx-auto h-full w-full max-w-[30rem] overflow-hidden rounded-3xl border border-white/10 bg-[#13131f]/50 shadow-[0_20px_60px_rgba(108,99,255,0.25)]"
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
          <div className="col-start-1 md:row-start-1" data-speed=".2">
            <motion.h1
              className="display-font mb-8 text-[clamp(4rem,10vw,9rem)] font-black leading-[0.94] tracking-[-0.02em]"
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
              <span className="block text-[#f0f0ff]">
                {renderLetters(firstName, "first")}
              </span>
              <span className="mt-[0.08em] block bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff] bg-clip-text text-transparent">
                {renderLetters(lastName, "last", firstName.length)}
              </span>
            </motion.h1>

            <motion.span
              aria-hidden
              className="pointer-events-none -ml-2 inline-block align-middle text-[#a78bfa]"
              initial={{ opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0 } : { opacity: [0, 1, 0] }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.1 }
                  : {
                      duration: 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: totalNameLength * 0.055 + 0.2,
                    }
              }
            >
              |
            </motion.span>

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
              <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff] bg-clip-text text-lg font-semibold uppercase tracking-[0.16em] text-transparent md:text-2xl">
                {tagLine}
              </span>
            </motion.span>
            <motion.p
              className="hero-about mt-6 max-w-2xl text-base leading-relaxed text-[#c3cbe4] md:text-lg"
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
