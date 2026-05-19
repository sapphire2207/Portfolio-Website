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
    label: "Resume",
    value: "Available On Request",
    href: "mailto:mysoresridhar72@gmail.com?subject=Resume%20Request",
    icon: FaFileLines,
    hoverColor: "hover:text-[#a78bfa]",
  },
];

export default function AboutContact() {
  return (
    <Bounded>
      <section className="rounded-3xl border border-white/[0.08] bg-[#101626]/80 p-6 shadow-[0_0_40px_rgba(108,99,255,0.12)] backdrop-blur-xl md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] text-white shadow-lg shadow-[#6c63ff55]">
              <FaLocationDot />
            </span>
            <div>
              <h2 className="display-font text-2xl font-bold text-[#f0f0ff]">
                Contact
              </h2>
              <p className="text-sm text-[#9aa5c8]">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group motion-all rounded-2xl border border-white/[0.08] bg-[#131b31]/70 p-4 hover:-translate-y-0.5 hover:border-[#6c63ff66] ${item.hoverColor}`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1f2a4f] to-[#273768] text-[#d9e2ff] transition-colors duration-300 group-hover:from-[#6c63ff] group-hover:to-[#00d4ff] group-hover:text-white">
                    <item.icon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7f8db5]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#d7def6]">
                      {item.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
      </section>
    </Bounded>
  );
}
