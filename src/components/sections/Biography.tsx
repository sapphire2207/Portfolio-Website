import Link from "next/link";
import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import RichText from "@/components/RichText";
import type { ImageAsset, LinkData, RichTextBlock } from "@/types";

type BiographyProps = {
  heading: string;
  body: RichTextBlock[];
  avatar: ImageAsset;
  buttonText: string;
  buttonLink: LinkData;
};

export default function Biography({
  heading,
  body,
  avatar,
  buttonText,
  buttonLink,
}: BiographyProps) {
  const ctaClassName =
    "motion-all inline-flex w-fit items-center justify-center rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] px-8 py-3 font-semibold text-white hover:scale-[1.02] hover:opacity-90 hover:shadow-lg hover:shadow-[#6c63ff33]";

  return (
    <Bounded>
      <div className="rounded-3xl border border-white/[0.06] bg-[#13131f] p-8 shadow-[inset_0_0_80px_rgba(108,99,255,0.08)] md:p-12">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[2fr,1fr]">
          <Heading size="xl" className="display-font col-start-1 text-[#f0f0ff]">
            {heading}
          </Heading>

          <div className="prose prose-xl prose-invert col-start-1 max-w-none leading-relaxed text-[#a0a0b8] [&_p]:text-[#a0a0b8] [&_p]:text-[1.15rem] [&_p]:leading-[1.95]">
            <RichText field={body} />
          </div>

          {buttonLink.isExternal ? (
            <a
              href={buttonLink.href}
              target={buttonLink.target ?? "_blank"}
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              {buttonText}
            </a>
          ) : (
            <Link href={buttonLink.href} className={ctaClassName}>
              {buttonText}
            </Link>
          )}

          <Avatar
            image={avatar}
            className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
          />
        </div>
      </div>
    </Bounded>
  );
}
