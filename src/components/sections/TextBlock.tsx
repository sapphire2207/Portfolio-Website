import RichText from "@/components/RichText";
import type { RichTextBlock } from "@/types";

export default function TextBlock({ text }: { text: RichTextBlock[] }) {
  return (
    <div className="max-w-prose">
      <RichText field={text} />
    </div>
  );
}
