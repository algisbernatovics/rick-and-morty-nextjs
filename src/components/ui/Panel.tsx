import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps<TElement extends ElementType> = {
  as?: TElement;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function Panel<TElement extends ElementType = "div">({
  as,
  interactive = false,
  className,
  children,
  ...props
}: PanelProps<TElement>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("panel", interactive && "panel-interactive", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
