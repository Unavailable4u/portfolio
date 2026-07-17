import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base =
    "font-mono text-sm px-6 py-3.5 rounded-sm transition-all duration-200 inline-flex items-center gap-2";

  const styles =
    variant === "primary"
      ? "bg-cyan text-bg font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan/20"
      : "border border-line text-text hover:border-text-dim hover:bg-bg-elevated";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

export default Button;