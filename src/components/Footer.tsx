import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Bounded from "@/components/Bounded";

const NAME = "Mysore Sridhar";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

const SOCIAL_LINKS = {
  github: "https://github.com/sapphire2207",
  leetcode: "https://leetcode.com/u/sapphire2207/",
  linkedin: "https://www.linkedin.com/in/mysoresridhar",
};

export default function Footer() {
  return (
    <Bounded
      as="footer"
      className="relative bg-[#0a0a0f] pb-12 pt-10 text-[#5a5a72] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#2a2a40] before:to-transparent"
    >
      <div className="mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Link
            href="/"
            className="display-font motion-all bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-xl font-bold tracking-tight text-transparent hover:opacity-90"
          >
            {NAME}
          </Link>
          <p className="text-sm text-[#3a3a52]">
            (c) {new Date().getFullYear()} {NAME}
          </p>
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex items-center gap-5">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={label}>
                <Link
                  className="motion-all text-base font-medium text-[#5a5a72] hover:text-[#f0f0ff]"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="inline-flex items-center justify-center gap-1 md:justify-end">
          <a
            href={SOCIAL_LINKS.github}
            className="motion-all p-2 text-2xl text-[#5a5a72] hover:scale-110 hover:text-[#f0f0ff]"
            aria-label={`${NAME} on GitHub`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            href={SOCIAL_LINKS.leetcode}
            className="motion-all p-2 text-2xl text-[#5a5a72] hover:scale-110 hover:text-[#ffa116]"
            aria-label={`${NAME} on LeetCode`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiLeetcode />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            className="motion-all p-2 text-2xl text-[#5a5a72] hover:scale-110 hover:text-[#0077b5]"
            aria-label={`${NAME} on LinkedIn`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </Bounded>
  );
}
