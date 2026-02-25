"use client";

import { cn } from "@/lib/utils";
import { ShieldProgress } from "./shield-progress";
import { BadgeTag } from "./badge-tag";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeploymentCourse {
  id: string;
  title: string;
  progress: number;
  required: boolean;
}

interface DeploymentReadinessProps {
  eventName: string;
  eventDate: string;
  courses: DeploymentCourse[];
  status: "gereed" | "bezig" | "verlopen";
  className?: string;
}

const statusConfig = {
  gereed: { label: "Gereed", variant: "completed" as const },
  bezig: { label: "Bezig", variant: "active" as const },
  verlopen: { label: "Verlopen", variant: "overdue" as const },
};

export function DeploymentReadiness({
  eventName,
  eventDate,
  courses,
  status,
  className,
}: DeploymentReadinessProps) {
  const { label, variant } = statusConfig[status];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center",
        className
      )}
      style={{
        backgroundColor:
          status === "gereed"
            ? "var(--vest-subtle)"
            : "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-lifted)",
        gap: "var(--space-4)",
      }}
    >
      <div className="flex flex-col min-w-0 flex-1">
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--uniform)",
          }}
        >
          {eventName}
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
          {eventDate}
        </span>
      </div>

      <TooltipProvider>
        <div className="flex items-center flex-wrap" style={{ gap: "var(--space-2)" }}>
          {courses.map((course) => (
            <Tooltip key={course.id}>
              <TooltipTrigger asChild>
                <div>
                  <ShieldProgress
                    progress={course.progress}
                    size="sm"
                    variant={
                      course.progress >= 100
                        ? "complete"
                        : course.progress === 0
                          ? "default"
                          : "default"
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{course.title}</p>
                <p className="opacity-70">{course.progress}%</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <div className="shrink-0">
        <BadgeTag variant={variant} size="md">
          {label}
        </BadgeTag>
      </div>
    </div>
  );
}
