import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import RichText from "@/components/RichText";
import ContentList, { type ContentListItem } from "@/components/sections/ContentList";
import type { ContentTypeName, ImageAsset, RichTextBlock } from "@/types";

type ContentIndexProps = {
  heading: string;
  description: RichTextBlock[];
  items: ContentListItem[];
  contentType: ContentTypeName;
  viewMoreText: string;
  fallbackItemImage: ImageAsset;
};

export default function ContentIndex({
  heading,
  description,
  items,
  contentType,
  viewMoreText,
  fallbackItemImage,
}: ContentIndexProps) {
  return (
    <Bounded>
      <Heading
        size="xl"
        className="display-font mb-6 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] bg-clip-text text-transparent"
      >
        {heading}
      </Heading>
      {description.length > 0 && (
        <div className="prose prose-lg prose-invert mb-10 max-w-3xl [&_p]:text-[#a0a0b8]">
          <RichText field={description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={viewMoreText}
        fallbackItemImage={fallbackItemImage}
      />
    </Bounded>
  );
}
