import { readFile } from "node:fs/promises";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentBody from "@/components/ContentBody";
import MarkdownContent from "@/components/MarkdownContent";

type Params = { uid: string };

type ProjectConfig = {
  title: string;
  date: string;
  tags: readonly string[];
  metaDescription: string;
  markdownPath: string;
};

const PROJECTS: Record<string, ProjectConfig> = {
  "fashora-ai-powered-full-stack-e-commerce-platform": {
    title: "Fashora - AI Powered Full-Stack E-Commerce Platform",
    date: "2025-01-01",
    tags: [
      "MERN",
      "Gemini AI",
      "Stripe",
      "Redux Toolkit",
      "BullMQ",
      "Redis",
      "Socket.IO",
      "Cloudinary",
    ],
    metaDescription:
      "AI powered full-stack e-commerce platform with MERN, Gemini AI workflows, and Stripe checkout.",
    markdownPath: "C:\\Users\\sreem\\Desktop\\E-Commerce Website\\Fashora.md",
  },
  "secretly-ai-powered-anonymous-messaging-platform": {
    title: "Secretly - AI Powered Anonymous Messaging Platform",
    date: "2025-01-01",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "NextAuth",
      "MongoDB",
      "Zod",
      "Resend",
      "Gemini AI",
    ],
    metaDescription:
      "Anonymous messaging platform with secure sessions, OTP verification, and AI-assisted message suggestions.",
    markdownPath: "C:\\Users\\sreem\\Desktop\\secretlyy\\Secretly.md",
  },
  "youtube-twitter-backend-api": {
    title: "YouTube + Twitter Backend API",
    date: "2024-01-01",
    tags: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT Auth",
      "Cloudinary",
      "Multer",
      "Aggregation Pipelines",
    ],
    metaDescription:
      "Feature-rich backend system with JWT auth, media optimization, and core social features.",
    markdownPath: "C:\\Users\\sreem\\Desktop\\yt-backend\\YoutubeTwitter.md",
  },
};

function getProject(uid: string) {
  return PROJECTS[uid] ?? null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((uid) => ({ uid }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const project = getProject(uid);

  if (!project) {
    notFound();
  }

  let markdown = "";
  try {
    markdown = await readFile(project.markdownPath, "utf8");
  } catch {
    notFound();
  }

  return (
    <ContentBody title={project.title} date={project.date} tags={project.tags}>
      <MarkdownContent markdown={markdown} />
    </ContentBody>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const project = getProject(uid);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.metaDescription,
  };
}
