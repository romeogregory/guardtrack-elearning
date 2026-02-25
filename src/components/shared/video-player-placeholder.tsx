"use client";

import { useState } from "react";
import { Play, Pause, Captions } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerPlaceholderProps {
  title: string;
  durationMinutes: number;
  chapters?: Array<{ title: string; startTime: number }>;
  className?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const speeds = ["0.5x", "1x", "1.5x", "2x"] as const;

export function VideoPlayerPlaceholder({
  title,
  durationMinutes,
  chapters,
  className,
}: VideoPlayerPlaceholderProps) {
  const [speedIndex, setSpeedIndex] = useState(1);

  const totalSeconds = durationMinutes * 60;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Video area */}
      <div
        className="relative aspect-video flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--uniform), var(--uniform-secondary))`,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--perimeter)",
        }}
      >
        {/* Play button */}
        <button
          className="flex items-center justify-center"
          style={{
            width: 64,
            height: 64,
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--vest)",
          }}
          aria-label="Afspelen"
          tabIndex={-1}
        >
          <Play className="ml-1 text-white" size={28} fill="white" />
        </button>

        {/* Not available text */}
        <p
          className="mt-3"
          style={{
            color: "var(--uniform-muted)",
            fontSize: "0.8125rem",
            fontWeight: 400,
          }}
        >
          Video niet beschikbaar in demo
        </p>

        {/* Bottom controls bar */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col"
          style={{ padding: "0 var(--space-3) var(--space-3)" }}
        >
          {/* Progress bar */}
          <div
            className="w-full"
            style={{
              height: 3,
              backgroundColor: "var(--uniform-secondary)",
              borderRadius: "var(--radius-full)",
              marginBottom: "var(--space-2)",
            }}
          />

          {/* Controls row */}
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <Pause size={16} style={{ color: "var(--uniform-muted)" }} />

            <span
              style={{
                color: "var(--uniform-muted)",
                fontSize: "0.75rem",
                fontWeight: 400,
              }}
            >
              00:00 / {formatTime(totalSeconds)}
            </span>

            <div className="flex-1" />

            {/* Speed buttons */}
            <div
              className="flex items-center"
              style={{ gap: "var(--space-1)" }}
            >
              {speeds.map((speed, i) => (
                <button
                  key={speed}
                  onClick={() => setSpeedIndex(i)}
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: i === speedIndex ? 600 : 400,
                    color:
                      i === speedIndex
                        ? "var(--vest)"
                        : "var(--uniform-muted)",
                    padding: "var(--space-1)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor:
                      i === speedIndex
                        ? "var(--vest-light)"
                        : "transparent",
                  }}
                >
                  {speed}
                </button>
              ))}
            </div>

            {/* Captions toggle */}
            <button aria-label="Ondertiteling" tabIndex={-1}>
              <Captions size={16} style={{ color: "var(--uniform-muted)" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Chapter markers */}
      {chapters && chapters.length > 0 && (
        <div
          className="flex flex-wrap"
          style={{
            gap: "var(--space-2)",
            marginTop: "var(--space-3)",
          }}
        >
          {chapters.map((chapter) => (
            <button
              key={chapter.startTime}
              className="inline-flex items-center"
              style={{
                backgroundColor: "var(--briefing-elevated)",
                border: "1px solid var(--perimeter)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--space-1) var(--space-2)",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--uniform-secondary)",
                gap: "var(--space-1)",
              }}
            >
              <span style={{ color: "var(--uniform-muted)" }}>
                {formatTime(chapter.startTime)}
              </span>
              {chapter.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
