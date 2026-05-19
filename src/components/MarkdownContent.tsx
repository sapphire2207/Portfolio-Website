import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="display-font mb-4 mt-8 text-3xl font-bold text-[#f0f0ff] first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="display-font mb-3 mt-8 text-2xl font-semibold text-[#f0f0ff]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="display-font mb-2 mt-6 text-xl font-semibold text-[#f0f0ff]">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-4 leading-relaxed text-[#a0a0b8]">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-[#c8d1ef]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-6 text-[#c8d1ef]">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6c9dff] underline decoration-[#6c63ff80] underline-offset-2 hover:text-[#9fb8ff]"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-[#20263d] px-1.5 py-0.5 text-[#9ce7ff]">{children}</code>
          ),
          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto rounded-xl border border-white/10">
              <table className="min-w-full border-collapse bg-[#11162b]">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-[#1b2342]">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-white/10 px-4 py-3 text-left text-sm font-semibold text-[#dfe8ff]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-white/5 px-4 py-3 text-sm text-[#b9c4e7]">{children}</td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
