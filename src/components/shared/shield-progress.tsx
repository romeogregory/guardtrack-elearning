"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ShieldProgressProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "complete" | "overdue";
  showLabel?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const sizeMap = {
  sm: { width: 24, height: 28, fontSize: "0.6875rem", fontWeight: 600 },
  md: { width: 36, height: 42, fontSize: "0.8125rem", fontWeight: 500 },
  lg: { width: 48, height: 56, fontSize: "0.9375rem", fontWeight: 400 },
} as const;

const variantColors = {
  default: "var(--vest)",
  complete: "var(--cleared)",
  overdue: "var(--alert)",
} as const;

const SHIELD_PATH =
  "M12 1L2 5v6c0 6.627 4.477 12 10 14 5.523-2 10-7.373 10-14V5L12 1z";

export function ShieldProgress({
  progress,
  size = "md",
  variant = "default",
  showLabel = false,
  icon,
  className,
}: ShieldProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimatedProgress(Math.min(100, Math.max(0, progress)));
    });
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  const { width, height, fontSize, fontWeight } = sizeMap[size];
  const fillColor = variantColors[variant];
  const fillPercent = 100 - animatedProgress;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 24 22"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`shield-clip-${size}-${progress}`}>
            <path d={SHIELD_PATH} transform="translate(0, -1)" />
          </clipPath>
        </defs>

        <path
          d={SHIELD_PATH}
          transform="translate(0, -1)"
          stroke="var(--perimeter)"
          strokeWidth={1.5}
          fill="var(--briefing-elevated)"
        />

        <rect
          x="0"
          y={`${fillPercent}%`}
          width="24"
          height={`${100 - fillPercent}%`}
          fill={fillColor}
          clipPath={`url(#shield-clip-${size}-${progress})`}
          className="transition-[y,height] ease-in-out"
          style={{ transitionDuration: "var(--duration-expand)" }}
        />
      </svg>

      {(showLabel || icon) && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: "var(--uniform)",
            fontSize,
            fontWeight,
            lineHeight: 1,
          }}
        >
          {icon || `${Math.round(progress)}%`}
        </div>
      )}
    </div>
  );
}
