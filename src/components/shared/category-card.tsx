"use client";

import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  courseCount: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({
  name,
  icon,
  courseCount,
  isActive = false,
  onClick,
  className,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-start text-left transition-all ease-out cursor-pointer",
        className
      )}
      style={{
        backgroundColor: isActive ? "var(--vest-light)" : "var(--briefing-elevated)",
        border: `1px solid ${isActive ? "var(--perimeter-emphasis)" : "var(--perimeter)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-lifted)",
        transitionDuration: "var(--duration-micro)",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--vest-subtle)";
          e.currentTarget.style.boxShadow = "var(--shadow-raised)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--briefing-elevated)";
          e.currentTarget.style.boxShadow = "var(--shadow-lifted)";
        }
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--vest-light)",
          color: "var(--vest)",
        }}
      >
        {icon}
      </div>

      <span
        style={{
          marginTop: "var(--space-3)",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--uniform)",
        }}
      >
        {name}
      </span>

      <span
        style={{
          marginTop: "var(--space-1)",
          fontSize: "0.8125rem",
          fontWeight: 500,
          letterSpacing: "0.01em",
          color: "var(--uniform-tertiary)",
        }}
      >
        {courseCount} cursussen
      </span>
    </button>
  );
}
