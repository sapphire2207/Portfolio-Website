import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="display-font bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#00d4ff] bg-clip-text text-[clamp(4rem,20vmin,18rem)] font-black leading-none text-transparent">
        404
      </h1>
      <p className="mt-2 text-xl text-[#a0a0b8] md:text-2xl">
        Whoops, we couldn&apos;t find that page.
      </p>
      <Button
        link={{ href: "/", isExternal: false, target: null, text: null }}
        label="Head Home"
        className="mt-8"
      />
    </div>
  );
}
