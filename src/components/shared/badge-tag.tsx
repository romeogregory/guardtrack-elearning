import { cn } from "@/lib/utils";

type BadgeVariant =
  | "mandatory"
  | "optional"
  | "beginner"
  | "gemiddeld"
  | "gevorderd"
  | "active"
  | "completed"
  | "overdue"
  | "geldig"
  | "verloopt"
  | "verlopen";

interface BadgeTagProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  mandatory: { bg: "var(--vest-light)", color: "var(--vest-hover)" },
  optional: { bg: "var(--control-bg)", color: "var(--uniform-tertiary)" },
  beginner: { bg: "var(--cleared-light)", color: "var(--cleared)" },
  gemiddeld: { bg: "var(--caution-light)", color: "var(--vest-hover)" },
  gevorderd: { bg: "var(--alert-light)", color: "var(--alert)" },
  active: { bg: "var(--dispatch-light)", color: "var(--dispatch)" },
  completed: { bg: "var(--cleared-light)", color: "var(--cleared)" },
  overdue: { bg: "var(--alert-light)", color: "var(--alert)" },
  geldig: { bg: "var(--cleared-light)", color: "var(--cleared)" },
  verloopt: { bg: "var(--caution-light)", color: "var(--vest-hover)" },
  verlopen: { bg: "var(--alert-light)", color: "var(--alert)" },
};

export function BadgeTag({
  variant,
  children,
  size = "sm",
  className,
}: BadgeTagProps) {
  const { bg, color } = variantStyles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center shrink-0",
        size === "sm" && "uppercase",
        className
      )}
      style={{
        backgroundColor: bg,
        color,
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-1) var(--space-2)",
        fontSize: size === "sm" ? "0.6875rem" : "0.8125rem",
        fontWeight: size === "sm" ? 600 : 500,
        letterSpacing: size === "sm" ? "0.03em" : "0.01em",
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
  );
}
