import Image from "next/image";
import React from "react";
import type {
  RichTextBlock,
  RichTextBlockType,
  RichTextImageBlock,
  RichTextSpan,
  RichTextTextBlock,
} from "@/types";

function isTextBlock(block: RichTextBlock): block is RichTextTextBlock {
  return "type" in block;
}

function isImageBlock(block: RichTextBlock): block is RichTextImageBlock {
  return "url" in block;
}

function applyInlineFormatting(
  text: string,
  spans: RichTextSpan[],
  keyPrefix: string,
): React.ReactNode[] {
  if (!text.length) {
    return [];
  }

  const bounds = new Set<number>([0, text.length]);

  spans.forEach((span) => {
    bounds.add(Math.max(0, Math.min(text.length, span.start)));
    bounds.add(Math.max(0, Math.min(text.length, span.end)));
  });

  const sortedBounds = [...bounds].sort((a, b) => a - b);

  return sortedBounds
    .slice(0, -1)
    .flatMap((start, index): React.ReactNode[] => {
      const end = sortedBounds[index + 1];
      if (start === end) {
        return [];
      }

      const segmentText = text.slice(start, end);
      const activeSpans = spans.filter(
        (span) => span.start <= start && span.end >= end,
      );

      const orderedSpans = [...activeSpans].sort((a, b) => {
        const rank = { strong: 0, em: 1, hyperlink: 2 } as const;
        return rank[a.type] - rank[b.type];
      });

      let content: React.ReactNode = segmentText;

      orderedSpans.forEach((span, spanIndex) => {
        const key = `${keyPrefix}-${start}-${end}-${span.type}-${spanIndex}`;

        if (span.type === "strong") {
          content = <strong key={key}>{content}</strong>;
          return;
        }

        if (span.type === "em") {
          content = <em key={key}>{content}</em>;
          return;
        }

        if (span.type === "hyperlink" && span.data?.url) {
          content = (
            <a
              key={key}
              href={span.data.url}
              target={span.data.target ?? undefined}
              rel="noopener noreferrer"
              className="motion-all underline decoration-[#6c63ff] decoration-2 underline-offset-2 hover:text-[#a78bfa]"
            >
              {content}
            </a>
          );
        }
      });

      return [<React.Fragment key={`${keyPrefix}-${start}-${end}`}>{content}</React.Fragment>];
    });
}

function renderTextBlock(
  block: RichTextTextBlock,
  key: string,
  asListItem = false,
): React.ReactNode {
  const formattedChildren = applyInlineFormatting(block.text, block.spans, key);

  const blockMap: Record<RichTextBlockType, keyof React.JSX.IntrinsicElements> = {
    paragraph: "p",
    preformatted: "pre",
    heading1: "h1",
    heading2: "h2",
    heading3: "h3",
    heading4: "h4",
    heading5: "h5",
    heading6: "h6",
    "list-item": "li",
    "o-list-item": "li",
  };

  const tag = asListItem ? "li" : blockMap[block.type];
  return React.createElement(tag, { key }, formattedChildren);
}

export default function RichText({ field }: { field: RichTextBlock[] }) {
  const nodes: React.ReactNode[] = [];

  for (let index = 0; index < field.length; index += 1) {
    const block = field[index];

    if (isImageBlock(block)) {
      nodes.push(
        <Image
          key={`image-${index}`}
          src={block.url}
          alt={block.alt ?? ""}
          width={block.dimensions?.width ?? 1200}
          height={block.dimensions?.height ?? 800}
          loading="lazy"
          className="not-prose my-10 h-full w-full rounded-md md:my-14 lg:my-16"
        />,
      );
      continue;
    }

    if (!isTextBlock(block)) {
      continue;
    }

    if (block.type === "list-item" || block.type === "o-list-item") {
      const listType = block.type;
      const listItems: RichTextTextBlock[] = [block];

      while (index + 1 < field.length) {
        const nextBlock = field[index + 1];
        if (!isTextBlock(nextBlock) || nextBlock.type !== listType) {
          break;
        }

        listItems.push(nextBlock);
        index += 1;
      }

      const listTag = listType === "o-list-item" ? "ol" : "ul";
      nodes.push(
        React.createElement(
          listTag,
          { key: `list-${index}` },
          listItems.map((item, listIndex) =>
            renderTextBlock(item, `list-item-${index}-${listIndex}`, true),
          ),
        ),
      );

      continue;
    }

    nodes.push(renderTextBlock(block, `block-${index}`));
  }

  return <>{nodes}</>;
}
