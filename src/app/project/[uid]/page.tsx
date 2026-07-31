import { readFile } from "node:fs/promises";
import path from "node:path";
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
  markdownFile: string;
};

const PROJECTS: Record<string, ProjectConfig> = {
  "researchflow-ai-multi-agent-ai-research-platform": {
    title: "ResearchFlow AI - Multi-Agent AI Research Platform",
    date: "2026-01-01",
    tags: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Mistral AI",
      "Tavily API",
      "Multi-Agent Systems",
    ],
    metaDescription:
      "Multi-agent AI research platform for automated technical research, web search synthesis, and report generation.",
    markdownFile: "researchflow-ai.md",
  },
  "recap-ai-ai-meeting-intelligence-platform": {
    title: "Recap AI - AI Meeting Intelligence Platform",
    date: "2026-01-01",
    tags: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Next.js",
      "ChromaDB",
      "Whisper",
      "Mistral AI",
      "RAG",
    ],
    metaDescription:
      "AI-powered meeting intelligence platform for audio transcription, smart summaries, and meeting query RAG.",
    markdownFile: "recap-ai.md",
  },
  "inkflow-ai-multi-agent-ai-blog-generation-platform": {
    title: "InkFlow AI - Multi-Agent AI Blog Generation Platform",
    date: "2026-01-01",
    tags: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Next.js",
      "Mistral AI",
      "Tavily API",
      "Pollinations AI",
      "Agentic AI",
    ],
    metaDescription:
      "Autonomous multi-agent blog generation platform leveraging agentic AI workflows and dynamic visual generation.",
    markdownFile: "inkflow-ai.md",
  },
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
    markdownFile: "fashora.md",
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
    markdownFile: "secretly.md",
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
    markdownFile: "youtube-twitter-backend.md",
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
    markdown = await readFile(
      path.join(process.cwd(), "src", "content", "projects", project.markdownFile),
      "utf8",
    );
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
