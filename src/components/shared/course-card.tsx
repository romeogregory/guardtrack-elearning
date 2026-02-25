"use client";

import { Clock, Users } from "lucide-react";
import type { Course, CourseCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ShieldProgress } from "./shield-progress";
import { BadgeTag } from "./badge-tag";

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  onClick?: () => void;
  className?: string;
}

const categoryGradients: Record<CourseCategory, string> = {
  "crowd-control": "linear-gradient(135deg, var(--dispatch-light), var(--dispatch))",
  ehbo: "linear-gradient(135deg, var(--cleared-light), var(--cleared))",
  communicatie: "linear-gradient(135deg, var(--vest-light), var(--vest))",
  toegangscontrole: "linear-gradient(135deg, var(--dispatch-light), var(--vest))",
  brandveiligheid: "linear-gradient(135deg, var(--alert-light), var(--alert))",
  noodprocedures: "linear-gradient(135deg, var(--caution-light), var(--alert))",
};

const difficultyVariant = {
  beginner: "beginner",
  gemiddeld: "gemiddeld",
  gevorderd: "gevorderd",
} as const;

export function CourseCard({
  course,
  showProgress = true,
  onClick,
  className,
}: CourseCardProps) {
  const shieldVariant =
    course.status === "completed"
      ? "complete"
      : course.progress === 0
        ? "default"
        : "default";

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden transition-shadow ease-out cursor-pointer",
        className
      )}
      style={{
        backgroundColor: "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lifted)",
        transitionDuration: "var(--duration-micro)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-raised)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lifted)";
      }}
    >
      <div
        className="relative"
        style={{
          background: course.thumbnailGradient || categoryGradients[course.category],
          height: 140,
        }}
      >
        <div
          className="absolute"
          style={{ top: "var(--space-3)", left: "var(--space-3)" }}
        >
          <BadgeTag variant={course.isMandatory ? "mandatory" : "optional"}>
            {course.isMandatory ? "Verplicht" : "Optioneel"}
          </BadgeTag>
        </div>

        {showProgress && (
          <div
            className="absolute"
            style={{
              bottom: "var(--space-3)",
              right: "var(--space-3)",
            }}
          >
            <ShieldProgress
              progress={course.progress}
              size="sm"
              variant={shieldVariant}
            />
          </div>
        )}
      </div>

      <div style={{ padding: "var(--space-5)" }}>
        <h3
          className="line-clamp-2"
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--uniform)",
            lineHeight: 1.3,
          }}
        >
          {course.title}
        </h3>

        <div
          className="flex items-center flex-wrap"
          style={{
            marginTop: "var(--space-3)",
            gap: "var(--space-3)",
          }}
        >
          <div
            className="flex items-center"
            style={{
              gap: "var(--space-1)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--uniform-tertiary)",
            }}
          >
            <Clock size={14} />
            {course.durationMinutes} min
          </div>

          <BadgeTag variant={difficultyVariant[course.difficulty]}>
            {course.difficulty === "beginner"
              ? "Beginner"
              : course.difficulty === "gemiddeld"
                ? "Gemiddeld"
                : "Gevorderd"}
          </BadgeTag>

          <div
            className="flex items-center"
            style={{
              gap: "var(--space-1)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--uniform-tertiary)",
            }}
          >
            <Users size={14} />
            {course.enrolledCount}
          </div>
        </div>
      </div>
    </div>
  );
}
