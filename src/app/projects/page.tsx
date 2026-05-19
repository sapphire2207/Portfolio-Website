import ContentIndex from "@/components/sections/ContentIndex";
import type { RichTextBlock } from "@/types";

const projectsDescription: RichTextBlock[] = [
  {
    type: "paragraph",
    text: "Selected full stack and backend projects featuring AI integrations and scalable APIs.",
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
          uid: "fashora-ai-powered-full-stack-e-commerce-platform",
          title: "Fashora - AI Powered Full-Stack E-Commerce Platform",
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
          id: "project-2",
          uid: "secretly-ai-powered-anonymous-messaging-platform",
          title: "Secretly - AI Powered Anonymous Messaging Platform",
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
          id: "project-3",
          uid: "youtube-twitter-backend-api",
          title: "YouTube + Twitter Backend API",
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

