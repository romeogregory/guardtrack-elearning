"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { cn } from "@/lib/utils";

interface SkillRadarProps {
  skills: Array<{ category: string; label: string; value: number }>;
  className?: string;
}

export function SkillRadar({ skills, className }: SkillRadarProps) {
  return (
    <div
      className={cn(className)}
      style={{
        backgroundColor: "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-lifted)",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
          <PolarGrid stroke="hsla(220, 20%, 50%, 0.12)" />
          <PolarAngleAxis
            dataKey="label"
            tick={{
              fill: "hsl(220, 25%, 38%)",
              fontSize: 13,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Vaardigheden"
            dataKey="value"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth={2}
            fill="hsl(38, 92%, 50%)"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
