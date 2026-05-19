import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import type { LinkData } from "@/types";
import { cn } from "@/lib/utils";

type ButtonProps = {
  link: LinkData;
  label: string;
  showIcon?: boolean;
  className?: string;
};

export default function Button({
  link,
  label,
  showIcon = true,
  className,
}: ButtonProps) {
  const classes = cn(
    "gradient-border-pill motion-all inline-flex w-fit items-center justify-center gap-2 rounded-xl px-7 py-3 font-semibold hover:scale-[1.03] hover:shadow-[0_14px_35px_-16px_rgba(108,99,255,0.75)]",
    className,
  );

  const content = (
    <>
      <span className="gradient-text">{label}</span>
      {showIcon && (
        <MdArrowOutward
          aria-hidden
          className="gradient-text motion-all text-[1.1rem] group-hover:opacity-85"
        />
      )}
    </>
  );

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        className={cn("group", classes)}
        target={link.target ?? undefined}
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cn("group", classes)}>
      {content}
    </Link>
  );
}
