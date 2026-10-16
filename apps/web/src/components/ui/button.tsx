import { type ButtonHTMLAttributes, forwardRef } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-surface border border-transparent font-medium shadow-[0_0_0_0_var(--accent-glow)] hover:bg-accent-hover hover:shadow-[0_8px_32px_-6px_var(--accent-glow)]",
  secondary:
    "bg-white/[0.03] text-ink border border-hairline backdrop-blur-md hover:border-accent/50 hover:bg-accent-soft/30",
  ghost: "bg-transparent text-ink hover:bg-accent-soft/60 border border-transparent",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  /** Trailing arrow that nudges right on hover */
  arrow?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { className = "", variant = "primary", type = "button", arrow = false, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={`group/btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
          aria-hidden
        />
      )}
    </button>
  ),
);
Button.displayName = "Button";
