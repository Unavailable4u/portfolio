import type { ReactNode } from "react";
import { buttonBase, buttonStyles } from "./buttonStyles";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}

function Button({ href, children, variant = "primary", external = false }: ButtonProps) {
  return (
    <a
      href={href}
      className={`${buttonBase} ${buttonStyles[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default Button;
