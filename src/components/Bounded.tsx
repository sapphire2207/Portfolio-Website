import React from "react";
import { cn } from "@/lib/utils";

type BoundedProps = {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    const Component = Comp as React.ElementType;

    return React.createElement(
      Component,
      {
        ref,
        className: cn("px-4 py-12 md:px-8 md:py-16 lg:py-20", className),
        ...(restProps as object),
      },
      <div className="mx-auto w-full max-w-7xl">{children}</div>,
    );
  },
);

Bounded.displayName = "Bounded";

export default Bounded;
