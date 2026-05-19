import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/formatDate";
import type { CSSProperties } from "react";

type ContentBodyProps = {
  title: string;
  date: string;
  tags: readonly string[];
  children: React.ReactNode;
};

export default function ContentBody({
  title,
  date,
  tags,
  children,
}: ContentBodyProps) {
  const formattedDate = formatDate(date);

  return (
    <Bounded as="article">
      <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#13131f]">
        <div className="h-1 w-full bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff]" />
        <div className="px-5 py-10 md:px-10 md:py-16">
          <Heading as="h1" className="display-font mb-5 text-[#f0f0ff]" size="xl">
            {title}
          </Heading>

          <div className="mb-6 flex flex-wrap gap-2.5">
            {tags.map((tag, index) => (
              <span
                key={`${title}-${tag}-${index}`}
                className="rounded-full border border-[#ff6b6b30] bg-[#ff6b6b15] px-3 py-0.5 text-sm font-medium text-[#ff6b6b]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#5a5a72]">{formattedDate}</p>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#2a2a40] to-transparent md:my-10" />

          <div
            className="prose prose-lg prose-invert w-full max-w-none"
            style={
              {
                "--tw-prose-body": "#a0a0b8",
                "--tw-prose-headings": "#f0f0ff",
                "--tw-prose-links": "#6c63ff",
                "--tw-prose-bold": "#f0f0ff",
                "--tw-prose-code": "#00d4ff",
              } as CSSProperties
            }
          >
            {children}
          </div>
        </div>
      </div>
    </Bounded>
  );
}
