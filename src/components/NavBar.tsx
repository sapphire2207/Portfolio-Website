"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { MdClose, MdMenu } from "react-icons/md";
import Button from "@/components/Button";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const NAME = "Mysore Sridhar";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
];

const CTA = {
  href: "/projects",
  isExternal: false,
  target: null,
  text: null,
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const mobileItemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (!open || prefersReducedMotion) {
      return;
    }

    const items = mobileItemsRef.current.filter(Boolean) as HTMLLIElement[];
    items.forEach((item) => {
      item.style.willChange = "transform, opacity";
    });

    gsap.fromTo(
      items,
      { x: 28, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: designTokens.motion.entranceDuration,
        ease: designTokens.motion.entranceEase,
        stagger: designTokens.motion.listStagger,
        onComplete: () => {
          items.forEach((item) => {
            item.style.willChange = "auto";
          });
        },
      },
    );
  }, [open, prefersReducedMotion]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <nav aria-label="Main navigation">
      <div className="mx-4 mt-0 translate-y-3 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 shadow-[0_0_40px_rgba(108,99,255,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <NameLogo name={NAME} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="motion-all block rounded-full p-2 text-2xl text-[#f0f0ff] hover:bg-white/10 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>

        <div
          className={cn(
            "motion-all fixed inset-0 z-[70] flex flex-col bg-[#0a0a0f] px-6 pt-24 md:hidden",
            open
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0",
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="motion-all absolute right-5 top-5 rounded-full p-2 text-3xl text-[#f0f0ff] hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>

          <ul className="flex w-full flex-col items-start gap-4">
            {NAV_ITEMS.map(({ href, label }, index) => (
              <li
                key={`mobile-${label}`}
                ref={(el) => {
                  mobileItemsRef.current[index] = el;
                }}
                className="w-full"
              >
                <NavLink
                  href={href}
                  label={label}
                  pathname={pathname}
                  mobile
                  onClick={() => setOpen(false)}
                />
              </li>
            ))}
            <li
              ref={(el) => {
                mobileItemsRef.current[NAV_ITEMS.length] = el;
              }}
              className="mt-4"
            >
              <Button link={CTA} label="Projects" className="!px-8 !py-3" />
            </li>
          </ul>
        </div>

        <DesktopMenu pathname={pathname} />
      </div>
    </nav>
  );
}

function NameLogo({ name }: { name: string }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="display-font motion-all text-xl font-bold tracking-tight text-[#f0f0ff] hover:text-[#a78bfa]"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({ pathname }: { pathname: string }) {
  return (
    <ul className="relative z-10 hidden flex-row items-center gap-3 md:flex">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={`desktop-${label}`}>
          <NavLink href={href} label={label} pathname={pathname} />
        </li>
      ))}
      <li>
        <Button link={CTA} label="Projects" className="ml-2 !px-6 !py-2.5" />
      </li>
    </ul>
  );
}

function NavLink({
  href,
  label,
  pathname,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      className={cn(
        "group motion-all relative inline-flex flex-col items-start gap-1 font-medium text-[#a0a0b8] hover:text-[#f0f0ff]",
        mobile ? "text-4xl" : "text-base",
      )}
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{label}</span>
      <span
        className={cn(
          "motion-all h-1 w-1 rounded-full bg-[#6c63ff]",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70",
        )}
      />
    </Link>
  );
}
