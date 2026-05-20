"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import {
  FaEnvelope,
  FaFileLines,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const contactItems = [
  {
    label: "Phone Number",
    value: "+91-7396947527",
    href: "tel:+917396947527",
    icon: FaPhone,
    hoverColor: "hover:text-[#22c55e]",
  },
  {
    label: "Email",
    value: "mysoresridhar72@gmail.com",
    href: "mailto:mysoresridhar72@gmail.com",
    icon: FaEnvelope,
    hoverColor: "hover:text-[#38bdf8]",
  },
  {
    label: "GitHub",
    value: "github.com/sapphire2207",
    href: "https://github.com/sapphire2207",
    icon: FaGithub,
    hoverColor: "hover:text-[#f0f0ff]",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mysoresridhar",
    href: "https://www.linkedin.com/in/mysoresridhar",
    icon: FaLinkedin,
    hoverColor: "hover:text-[#0a66c2]",
  },
  {
    label: "LeetCode",
    value: "leetcode.com/sapphire2207",
    href: "https://leetcode.com/sapphire2207",
    icon: SiLeetcode,
    hoverColor: "hover:text-[#ffa116]",
  },
  {
    label: "Resume",
    value: "View Resume (PDF)",
    href: "/api/resume",
    newTab: true,
    icon: FaFileLines,
    hoverColor: "hover:text-[#a78bfa]",
  },
];

export default function ContactDockModal({
  trigger,
  open,
  onOpenChange,
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/about%20us.json")
      .then((res) => res.json())
      .then((data: object) => {
        if (isMounted) setAnimationData(data);
      })
      .catch(() => {
        if (isMounted) setAnimationData(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <ModalTrigger className="h-full w-full cursor-pointer rounded-full bg-transparent p-0 text-inherit">
          {trigger}
        </ModalTrigger>
      ) : null}
      <ContactModalPanel animationData={animationData} />
    </Modal>
  );
}

function ContactModalPanel({ animationData }: { animationData: object | null }) {
  const { open } = useModal();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance) return;

    if (open) {
      instance.play();
      return;
    }

    instance.pause();
    instance.goToAndStop(0, true);
  }, [open]);

  return (
    <ModalBody className="min-h-0 w-[94vw] max-w-4xl border border-white/10 bg-[#05070e] md:max-w-4xl">
      <ModalContent className="p-0">
        <div className="px-6 pt-10 md:px-10">
          <h3 className="display-font text-center text-3xl font-bold text-[#f1f3ff]">
            Let&apos;s Connect
            <span className="mx-2 inline-flex rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-xl text-white/90">
              now
            </span>{" "}
            *
          </h3>
        </div>

        <div className="mt-7 px-4 pb-2 md:px-8">
          <div className="mx-auto flex h-56 items-center justify-center rounded-2xl border border-white/15 bg-[#0d111f] shadow-xl md:h-64">
            {animationData ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop
                autoplay={false}
                className="h-full w-full"
              />
            ) : (
              <p className="text-sm text-[#9aa5c8]">Loading animation...</p>
            )}
          </div>
        </div>

        <div className="px-6 pb-8 pt-6 md:px-10">
          <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-10">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={
                  item.newTab || item.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  item.newTab || item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`group inline-flex items-center text-lg text-[#e7ebff] transition-colors duration-300 ${item.hoverColor}`}
              >
                <item.icon className="mr-2 h-4 w-4 text-[#b7bfd8] group-hover:text-current" />
                <span className="text-base">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </ModalContent>

      <ModalFooter className="justify-end gap-3 border-t border-white/10 bg-white/[0.04] px-5 py-4 md:px-6">
        <ModalActions />
      </ModalFooter>
    </ModalBody>
  );
}

function ModalActions() {
  const { setOpen } = useModal();

  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="rounded-lg border border-black/60 bg-white px-8 py-2 text-lg text-black transition-colors hover:bg-neutral-100"
    >
      Close
    </button>
  );
}
