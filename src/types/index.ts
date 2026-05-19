export interface Dimensions {
  width: number;
  height: number;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface LinkData {
  href: string;
  isExternal: boolean;
  target?: string | null;
  text?: string | null;
}

export interface RichTextLinkData {
  link_type?: string | null;
  url?: string | null;
  target?: string | null;
}

export type RichTextSpanType = "strong" | "em" | "hyperlink";

export interface RichTextSpan {
  start: number;
  end: number;
  type: RichTextSpanType;
  data?: RichTextLinkData;
}

export type RichTextBlockType =
  | "paragraph"
  | "preformatted"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "list-item"
  | "o-list-item";

export interface RichTextTextBlock {
  type: RichTextBlockType;
  text: string;
  spans: RichTextSpan[];
  direction?: string;
}

export interface RichTextImageBlock {
  url: string;
  alt: string | null;
  copyright: string | null;
  dimensions: Dimensions | null;
  id?: string;
  edit?: {
    x: number;
    y: number;
    zoom: number;
    background: string;
  };
}

export type RichTextBlock = RichTextTextBlock | RichTextImageBlock;

export interface ExperienceItem {
  title: string;
  timePeriod: string;
  institution: string;
  description: RichTextBlock[];
}

export interface TechItem {
  techName: string;
  techColor: string;
}

export type ContentTypeName = "Blogs" | "Projects";
