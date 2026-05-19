import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};

const headingScale = {
  xl: designTokens.typography.h1,
  lg: designTokens.typography.h2,
  md: designTokens.typography.h3,
  sm: designTokens.typography.bodyLarge,
} as const;

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={cn(
        "display-font font-bold leading-tight tracking-tight text-[#f0f0ff]",
        className,
      )}
      style={{ fontSize: headingScale[size] }}
    >
      {children}
    </Comp>
  );
}
