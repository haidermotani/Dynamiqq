import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-mist",
  outline:
    "border-2 border-line text-mist hover:border-brand hover:text-brand",
  white: "bg-mist text-ink hover:bg-brand",
  ghost: "text-mist hover:text-brand",
};

export function Button({
  children,
  href,
  external,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  className,
  fullWidth,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2 font-display font-extrabold uppercase leading-none tracking-wider transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40",
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className,
  );

  const inner = <>{children}</>;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4 transition-transform duration-200 group-hover:translate-x-1", className)}
    >
      <path
        d="M3 10h13M11 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
}