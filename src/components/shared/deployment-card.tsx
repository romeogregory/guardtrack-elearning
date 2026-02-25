import { Calendar, MapPin, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeTag } from "./badge-tag";

interface LinkedCourse {
  id: string;
  title: string;
  completed: boolean;
}

interface DeploymentCardProps {
  eventName: string;
  dateRange: string;
  location: string;
  role: string;
  linkedCourses: LinkedCourse[];
  className?: string;
}

export function DeploymentCard({
  eventName,
  dateRange,
  location,
  role,
  linkedCourses,
  className,
}: DeploymentCardProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{
        backgroundColor: "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-lifted)",
      }}
    >
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--uniform)",
        }}
      >
        {eventName}
      </h3>

      <div
        className="flex flex-wrap items-center"
        style={{
          marginTop: "var(--space-2)",
          gap: "var(--space-4)",
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "var(--uniform-tertiary)",
          }}
        >
          <Calendar size={14} />
          {dateRange}
        </div>
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--uniform-secondary)",
          }}
        >
          <MapPin size={14} />
          {location}
        </div>
      </div>

      <div style={{ marginTop: "var(--space-3)" }}>
        <BadgeTag variant="active">{role}</BadgeTag>
      </div>

      {linkedCourses.length > 0 && (
        <div
          className="flex flex-col"
          style={{
            marginTop: "var(--space-4)",
            paddingTop: "var(--space-4)",
            borderTop: "1px solid var(--perimeter-soft)",
            gap: "var(--space-2)",
          }}
        >
          {linkedCourses.map((course) => (
            <div
              key={course.id}
              className="flex items-center"
              style={{
                gap: "var(--space-2)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--uniform-secondary)",
              }}
            >
              {course.completed ? (
                <CheckCircle2
                  size={14}
                  style={{ color: "var(--cleared)" }}
                />
              ) : (
                <Circle
                  size={14}
                  style={{ color: "var(--vest)" }}
                />
              )}
              {course.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
