"use client";

import React from "react";
import { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import ContactDockModal from "@/components/ContactDockModal";
import { IconBriefcase, IconHome, IconMail, IconUser } from "@tabler/icons-react";

export default function NavBar() {
  const [contactOpen, setContactOpen] = useState(false);

  const links = [
    {
      title: "Mysore Sridhar",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "About",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
    },
    {
      title: "Projects",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setContactOpen(true),
    },
  ];

  return (
    <>
      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <FloatingDock items={links} />
      </nav>
      <ContactDockModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
