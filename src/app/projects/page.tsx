import ContentIndex from "@/components/sections/ContentIndex";
import type { RichTextBlock } from "@/types";

const projectsDescription: RichTextBlock[] = [
  {
    type: "paragraph",
    text: "Selected AI engineering and full-stack projects featuring multi-agent systems, Generative AI, and production-ready architectures.",
    spans: [],
    direction: "ltr",
  },
];

export default function ProjectsPage() {
  return (
    <ContentIndex
      heading="Projects"
      contentType="Projects"
      description={projectsDescription}
      viewMoreText="View Project"
      fallbackItemImage={{
        src: "/images/fallback/projects-fallback.jpg",
        alt: "project fallback",
        width: 4000,
        height: 5000,
      }}
      items={[
        {
          id: "project-1",
          uid: "researchflow-ai-multi-agent-ai-research-platform",
          title: "ResearchFlow AI - Multi-Agent AI Research Platform",
          githubUrl: "https://github.com/sapphire2207/research-flow-ai",
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
          image: {
            src: "/images/fallback/projects-fallback.jpg",
            alt: "ResearchFlow AI - Multi-Agent AI Research Platform",
            width: 4000,
            height: 5000,
          },
        },
        {
          id: "project-2",
          uid: "recap-ai-ai-meeting-intelligence-platform",
          title: "Recap AI - AI Meeting Intelligence Platform",
          githubUrl: "https://github.com/sapphire2207/recap-ai",
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
          image: {
            src: "/images/projects/nextjs-todo-cover.jpg",
            alt: "Recap AI - AI Meeting Intelligence Platform",
            width: 5304,
            height: 7952,
          },
        },
        {
          id: "project-3",
          uid: "inkflow-ai-multi-agent-ai-blog-generation-platform",
          title: "InkFlow AI - Multi-Agent AI Blog Generation Platform",
          githubUrl: "https://github.com/sapphire2207/inkflow-ai",
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
          image: {
            src: "/images/projects/nextjs-todo-inline-1.jpg",
            alt: "InkFlow AI - Multi-Agent AI Blog Generation Platform",
            width: 6000,
            height: 4000,
          },
        },
        {
          id: "project-4",
          uid: "fashora-ai-powered-full-stack-e-commerce-platform",
          title: "Fashora - AI Powered Full-Stack E-Commerce Platform",
          githubUrl: "https://github.com/sapphire2207/E-Commerce-Website-Fashora",
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
          image: {
            src: "/images/projects/nextjs-todo-cover.jpg",
            alt: "e-commerce application",
            width: 5304,
            height: 7952,
          },
        },
        {
          id: "project-5",
          uid: "secretly-ai-powered-anonymous-messaging-platform",
          title: "Secretly - AI Powered Anonymous Messaging Platform",
          githubUrl: "https://github.com/sapphire2207/secretly",
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
          image: {
            src: "/images/projects/nextjs-todo-inline-1.jpg",
            alt: "anonymous feedback platform",
            width: 6000,
            height: 4000,
          },
        },
        {
          id: "project-6",
          uid: "youtube-twitter-backend-api",
          title: "YouTube + Twitter Backend API",
          githubUrl: "https://github.com/sapphire2207/youtube-twitter-backend",
          tags: [
            "Node.js",
            "Express",
            "MongoDB",
            "JWT Auth",
            "Cloudinary",
            "Multer",
            "Aggregation Pipelines",
          ],
          image: {
            src: "/images/fallback/blog-fallback.jpg",
            alt: "youtube backend api",
            width: 6000,
            height: 4000,
          },
        },
      ]}
    />
  );
}

