import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { direction: "up" | "down"; value: string };
  className?: string;
}

export function StatsCard({
  label,
  value,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn("relative flex flex-col", className)}
      style={{
        backgroundColor: "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-lifted)",
      }}
    >
      {icon && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: "var(--space-5)",
            right: "var(--space-5)",
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--vest-light)",
            color: "var(--vest)",
          }}
        >
          {icon}
        </div>
      )}

      <span
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--uniform)",
        }}
      >
        {value}
      </span>

      <span
        style={{
          fontSize: "0.8125rem",
          fontWeight: 500,
          letterSpacing: "0.01em",
          color: "var(--uniform-tertiary)",
          marginTop: "var(--space-1)",
        }}
      >
        {label}
      </span>

      {trend && (
        <div
          className="flex items-center"
          style={{
            marginTop: "var(--space-2)",
            gap: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color:
              trend.direction === "up"
                ? "var(--cleared)"
                : "var(--alert)",
          }}
        >
          {trend.direction === "up" ? (
            <ArrowUp size={14} />
          ) : (
            <ArrowDown size={14} />
          )}
          {trend.value}
        </div>
      )}
    </div>
  );
}
