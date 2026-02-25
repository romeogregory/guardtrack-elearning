"use client";

import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeTag } from "@/components/shared/badge-tag";
import type { Scenario } from "@/lib/types";

interface ScenarioExerciseProps {
  scenario: Scenario;
  onComplete?: (score: number) => void;
  className?: string;
}

const optionLetters = ["A", "B", "C", "D", "E", "F"];

function getScoreColor(score: number) {
  if (score >= 80) return { bg: "var(--cleared-light)", border: "var(--cleared)", text: "var(--cleared)" };
  if (score >= 40) return { bg: "var(--caution-light)", border: "var(--vest)", text: "var(--vest-hover)" };
  return { bg: "var(--alert-light)", border: "var(--alert)", text: "var(--alert)" };
}

export function ScenarioExercise({
  scenario,
  onComplete,
  className,
}: ScenarioExerciseProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExpert, setShowExpert] = useState(false);

  const selectedOption = scenario.responseOptions.find(
    (o) => o.id === selectedOptionId
  );

  const handleSubmit = () => {
    if (!selectedOptionId || !selectedOption) return;
    setSubmitted(true);
    setShowExpert(true);
    onComplete?.(selectedOption.score);
  };

  return (
    <div className={cn("flex flex-col", className)} style={{ gap: "var(--space-6)" }}>
      {/* Context badge */}
      {scenario.eventContext && (
        <div>
          <BadgeTag variant="active">{scenario.eventContext}</BadgeTag>
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--uniform)",
        }}
      >
        {scenario.title}
      </h2>

      {/* Situation description */}
      <div
        style={{
          backgroundColor: "var(--briefing-elevated)",
          border: "1px solid var(--perimeter)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-4)",
        }}
      >
        <p
          style={{
            fontSize: "0.9375rem",
            fontWeight: 400,
            color: "var(--uniform-secondary)",
            lineHeight: 1.7,
          }}
        >
          {scenario.situationDescription}
        </p>
      </div>

      {/* Response options */}
      <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
        {scenario.responseOptions.map((option, i) => {
          const isSelected = selectedOptionId === option.id;
          const isBest = option.id === scenario.bestOptionId;
          const colors = getScoreColor(option.score);

          let optionBg = "var(--briefing-elevated)";
          let optionBorder = "var(--perimeter)";

          if (submitted) {
            if (isSelected) {
              optionBg = colors.bg;
              optionBorder = colors.border;
            }
          } else if (isSelected) {
            optionBg = "var(--vest-light)";
            optionBorder = "var(--vest)";
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!submitted) setSelectedOptionId(option.id);
              }}
              disabled={submitted}
              className="flex items-start w-full text-left"
              style={{
                padding: "var(--space-4)",
                backgroundColor: optionBg,
                border: `1px solid ${optionBorder}`,
                borderRadius: "var(--radius-lg)",
                gap: "var(--space-3)",
                transition: `all var(--duration-state)`,
                cursor: submitted ? "default" : "pointer",
              }}
            >
              {/* Letter circle */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-full)",
                  backgroundColor:
                    isSelected && !submitted
                      ? "var(--vest)"
                      : submitted && isSelected
                        ? colors.border
                        : "var(--control-bg)",
                  color:
                    isSelected
                      ? "white"
                      : "var(--uniform-tertiary)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {optionLetters[i]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start" style={{ gap: "var(--space-2)" }}>
                  <p
                    className="flex-1"
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: isSelected ? 500 : 400,
                      color: "var(--uniform)",
                      lineHeight: 1.5,
                    }}
                  >
                    {option.text}
                  </p>
                  {submitted && isBest && (
                    <Star
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--vest)", fill: "var(--vest)" }}
                    />
                  )}
                </div>

                {/* Feedback after submission */}
                {submitted && (
                  <div style={{ marginTop: "var(--space-2)" }}>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 400,
                        color: isSelected
                          ? colors.text
                          : "var(--uniform-tertiary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {option.feedback}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "var(--space-1)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: getScoreColor(option.score).text,
                      }}
                    >
                      Score: {option.score}/100
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Score indicator (shown after submit) */}
      {submitted && selectedOption && (
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-3)",
            padding: "var(--space-4)",
            backgroundColor: getScoreColor(selectedOption.score).bg,
            border: `1px solid ${getScoreColor(selectedOption.score).border}`,
            borderRadius: "var(--radius-md)",
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-full)",
              border: `3px solid ${getScoreColor(selectedOption.score).border}`,
              fontSize: "1.125rem",
              fontWeight: 700,
              color: getScoreColor(selectedOption.score).text,
            }}
          >
            {selectedOption.score}
          </div>
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: getScoreColor(selectedOption.score).text,
            }}
          >
            Jouw score: {selectedOption.score}/100
          </p>
        </div>
      )}

      {/* Submit button (before submission) */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOptionId}
          style={{
            padding: "var(--space-3) var(--space-6)",
            backgroundColor: selectedOptionId
              ? "var(--vest)"
              : "var(--control-bg)",
            color: selectedOptionId ? "white" : "var(--uniform-muted)",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: selectedOptionId ? "pointer" : "not-allowed",
            alignSelf: "flex-start",
          }}
        >
          Bekijk resultaat
        </button>
      )}

      {/* Expert explanation */}
      {submitted && (
        <div
          style={{
            backgroundColor: "var(--dispatch-light)",
            borderLeft: "3px solid var(--dispatch)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          <button
            className="w-full flex items-center justify-between text-left"
            onClick={() => setShowExpert(!showExpert)}
            style={{
              padding: "var(--space-3) var(--space-4)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--dispatch)",
            }}
          >
            Uitleg van de expert
            <ChevronDown
              size={18}
              style={{
                color: "var(--dispatch)",
                transition: `transform var(--duration-expand)`,
                transform: showExpert ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          <div
            style={{
              maxHeight: showExpert ? 500 : 0,
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
              {scenario.expertExplanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
