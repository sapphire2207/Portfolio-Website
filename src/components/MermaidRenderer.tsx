"use client";

import { useEffect, useRef, useState, useId } from "react";

interface MermaidProps {
  code: string;
}

export default function MermaidRenderer({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const rawId = useId();
  // Ensure valid DOM selector ID by replacing non-alphanumeric chars
  const elementId = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      if (!code || !code.trim()) return;

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
          themeVariables: {
            darkMode: true,
            background: "#0f0f1a",
            primaryColor: "#1e1b4b",
            primaryTextColor: "#f0f0ff",
            primaryBorderColor: "#6c63ff",
            lineColor: "#00d4ff",
            secondaryColor: "#13131f",
            tertiaryColor: "#181828",
            nodeBorder: "#a78bfa",
            clusterBkg: "#13131f",
            clusterBorder: "#2a2a40",
            titleColor: "#f0f0ff",
            edgeLabelBackground: "#181828",
          },
        });

        // Unique ID for mermaid render engine
        const { svg: renderedSvg } = await mermaid.render(
          elementId,
          code.trim(),
        );

        if (isMounted) {
          setSvg(renderedSvg);
          setError(false);
        }
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        if (isMounted) {
          setError(true);
        }
      }
    }

    renderMermaid();

    return () => {
      isMounted = false;
    };
  }, [code, elementId]);

  if (error || !svg) {
    if (error) {
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f1a] p-4 text-xs font-mono text-[#c8d1ef]">
          <pre>{code}</pre>
        </div>
      );
    }
    return (
      <div className="my-6 flex min-h-[120px] items-center justify-center rounded-2xl border border-white/10 bg-[#0f0f1a]/60 p-6 text-sm text-[#8888a6]">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#6c63ff] border-t-transparent" />
          <span>Rendering diagram...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f1a]/80 p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-sm transition-all"
    >
      <div
        className="mermaid-svg-container flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
