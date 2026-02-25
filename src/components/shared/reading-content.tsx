"use client";

import { useState } from "react";
import { Info, AlertTriangle, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReadingSection } from "@/lib/types";

interface ReadingContentProps {
  sections: ReadingSection[];
  className?: string;
}

function ChecklistItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className="flex items-start cursor-pointer"
      style={{ gap: "var(--space-2)" }}
    >
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className="mt-0.5 shrink-0 flex items-center justify-center"
        style={{
          width: 18,
          height: 18,
          borderRadius: "var(--radius-sm)",
          border: checked
            ? "2px solid var(--vest)"
            : "2px solid var(--perimeter-emphasis)",
          backgroundColor: checked ? "var(--vest)" : "transparent",
          transition: `all var(--duration-state)`,
        }}
      >
        {checked && <Check size={12} className="text-white" />}
      </button>
      <span
        style={{
          fontSize: "0.9375rem",
          fontWeight: 400,
          color: "var(--uniform-secondary)",
          lineHeight: 1.7,
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.6 : 1,
        }}
      >
        {label}
      </span>
    </label>
  );
}

function ExpandableSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        marginTop: "var(--space-4)",
      }}
    >
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setOpen(!open)}
        style={{
          padding: "var(--space-3) var(--space-4)",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "var(--uniform)",
        }}
      >
        {title}
        <ChevronDown
          size={18}
          style={{
            color: "var(--uniform-tertiary)",
            transition: `transform var(--duration-expand)`,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? 500 : 0,
          overflow: "hidden",
          transition: `max-height var(--duration-expand) ease`,
        }}
      >
        <div
          style={{
            padding: "0 var(--space-4) var(--space-4)",
            fontSize: "0.9375rem",
            fontWeight: 400,
            color: "var(--uniform-secondary)",
            lineHeight: 1.7,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export function ReadingContent({ sections, className }: ReadingContentProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {sections.map((section, index) => {
        switch (section.type) {
          case "heading":
            return (
              <h2
                key={index}
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--uniform)",
                  marginTop: index === 0 ? 0 : "var(--space-8)",
                }}
              >
                {section.content}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={index}
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  color: "var(--uniform-secondary)",
                  lineHeight: 1.7,
                  marginTop: "var(--space-4)",
                }}
              >
                {section.content}
              </p>
            );

          case "bullets":
            return (
              <ul
                key={index}
                className="list-disc"
                style={{
                  paddingLeft: "var(--space-6)",
                  marginTop: "var(--space-4)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                }}
              >
                {section.items?.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 400,
                      color: "var(--uniform-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "info-callout":
            return (
              <div
                key={index}
                className="flex"
                style={{
                  backgroundColor: "var(--dispatch-light)",
                  borderLeft: "3px solid var(--dispatch)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-4)",
                  marginTop: "var(--space-4)",
                  gap: "var(--space-3)",
                }}
              >
                <Info
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--dispatch)" }}
                />
                <p
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 400,
                    color: "var(--uniform-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {section.content}
                </p>
              </div>
            );

          case "warning-callout":
            return (
              <div
                key={index}
                className="flex"
                style={{
                  backgroundColor: "var(--alert-light)",
                  borderLeft: "3px solid var(--alert)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-4)",
                  marginTop: "var(--space-4)",
                  gap: "var(--space-3)",
                }}
              >
                <AlertTriangle
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--alert)" }}
                />
                <p
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 400,
                    color: "var(--uniform-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {section.content}
                </p>
              </div>
            );

          case "checklist":
            return (
              <div
                key={index}
                className="flex flex-col"
                style={{
                  gap: "var(--space-3)",
                  marginTop: "var(--space-4)",
                }}
              >
                {section.items?.map((item, i) => (
                  <ChecklistItem key={i} label={item} />
                ))}
              </div>
            );

          case "expandable":
            return (
              <ExpandableSection
                key={index}
                title={section.expandableTitle || "Meer informatie"}
                content={section.content}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
