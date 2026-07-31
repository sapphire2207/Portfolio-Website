import clsx from "clsx";
import type { Metadata } from "next";
import { Space_Grotesk, Urbanist } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { designTokenCssVariables } from "@/lib/design-tokens";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mysore Sridhar | AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Mysore Sridhar, an AI Engineer & Full Stack Developer specializing in Generative AI, Agentic AI, LangGraph, FastAPI, Next.js, and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(urbanist.variable, spaceGrotesk.variable)}
      style={designTokenCssVariables}
    >
      <body
        className={clsx(
          urbanist.className,
          "relative min-h-screen overflow-x-clip bg-[#0a0a0f] text-[#f0f0ff] antialiased",
        )}
      >
        <SmoothScroll />
        <div className="pointer-events-none fixed inset-0 -z-50">
          <div className="background-gradient absolute inset-0" />
          <div className="absolute -left-28 -top-32 h-[40rem] w-[40rem] rounded-full bg-[#6c63ff]/20 blur-[120px]" />
          <div className="absolute -bottom-24 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#00d4ff]/16 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
        </div>
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
