import Image from "next/image";
import type { ImageAsset } from "@/types";

export default function ImageSection({ image }: { image: ImageAsset }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      className="not-prose my-10 h-full w-full rounded-md md:my-14 lg:my-16"
    />
  );
}
