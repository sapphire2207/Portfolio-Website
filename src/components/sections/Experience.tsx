import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import RichText from "@/components/RichText";
import type { ExperienceItem } from "@/types";

type ExperienceProps = {
  heading: string;
  items: ExperienceItem[];
};

export default function Experience({ heading, items }: ExperienceProps) {
  return (
    <Bounded>
      <Heading as="h2" size="lg" className="display-font mb-8 text-[#f0f0ff]">
        {heading}
      </Heading>

      <div className="space-y-5">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="motion-all rounded-2xl border-l-2 border-[#6c63ff] bg-[#13131f]/70 p-6 pl-6 shadow-[-4px_0_20px_rgba(108,99,255,0.133)] hover:translate-x-1"
          >
            <h3 className="display-font text-xl font-semibold text-[#f0f0ff]">
              {item.title}
            </h3>

            <div className="mt-3 inline-block rounded-full bg-[#6c63ff15] px-3 py-1 text-sm text-[#a78bfa]">
              {item.timePeriod} / {item.institution}
            </div>

            <div className="prose prose-invert mt-4 max-w-none text-[#a0a0b8] [&_p]:text-[#a0a0b8]">
              <RichText field={item.description} />
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
}
