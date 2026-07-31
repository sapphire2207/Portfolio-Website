import {
  FaEnvelope,
  FaFileLines,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Bounded from "@/components/Bounded";

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
    value: "linkedin.com/in/mysore-sridhar",
    href: "https://www.linkedin.com/in/mysore-sridhar",
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
    label: "Full Stack Developer Resume",
    value: "View Full Stack Developer Resume",
    href: "/api/resume",
    icon: FaFileLines,
    hoverColor: "hover:text-[#a78bfa]",
  },
  {
    label: "AI Engineer Resume",
    value: "View AI Engineer Resume",
    href: "#",
    icon: FaFileLines,
    hoverColor: "hover:text-[#00d4ff]",
  },
];

export default function AboutContact() {
  return (
    <Bounded>
      <section className="rounded-3xl border border-white/[0.08] bg-[#101626]/80 p-4 shadow-[0_0_40px_rgba(108,99,255,0.12)] backdrop-blur-xl sm:p-5 md:p-8">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] text-white shadow-lg shadow-[#6c63ff55] sm:h-10 sm:w-10">
              <FaLocationDot />
            </span>
            <div>
              <h2 className="display-font text-xl font-bold text-[#f0f0ff] sm:text-2xl">
                Contact
              </h2>
              <p className="text-xs text-[#9aa5c8] sm:text-sm">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          <div className="py-2 sm:py-4">
            <div className="mx-auto flex max-w-3xl flex-wrap items-start justify-start gap-x-4 gap-y-5">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group inline-flex items-center justify-center rounded-lg border border-white/10 bg-[#131b31]/50 px-3 py-2 text-sm text-[#d7def6] transition-colors duration-300 ${item.hoverColor}`}
              >
                <item.icon className="mr-2 h-4 w-4 text-[#9aa5c8] group-hover:text-current" />
                <span className="text-xs text-[#d7def6] sm:text-sm">{item.value}</span>
              </a>
            ))}
            </div>
          </div>
      </section>
    </Bounded>
  );
}
