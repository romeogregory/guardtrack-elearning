"use client";

import { Search, X } from "lucide-react";
import type { CourseCategory, CourseStatus, DifficultyLevel } from "@/lib/types";
import { CATEGORIES, DIFFICULTY_LEVELS, COURSE_STATUSES } from "@/lib/constants";
import { BadgeTag } from "./badge-tag";

export interface FilterState {
  category: CourseCategory | null;
  difficulty: DifficultyLevel | null;
  type: "all" | "mandatory" | "optional";
  status: CourseStatus | null;
}

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  courseCount: number;
  className?: string;
}

const selectStyle: React.CSSProperties = {
  backgroundColor: "var(--control-bg)",
  border: "1px solid var(--control-border)",
  borderRadius: "var(--radius-md)",
  padding: "var(--space-2) var(--space-3)",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "var(--uniform)",
  cursor: "pointer",
  outline: "none",
};

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  courseCount,
  className,
}: SearchFilterBarProps) {
  const activeFilters: Array<{ key: string; label: string }> = [];

  if (filters.category) {
    const cat = CATEGORIES.find((c) => c.id === filters.category);
    activeFilters.push({ key: "category", label: cat?.label ?? filters.category });
  }
  if (filters.difficulty) {
    const diff = DIFFICULTY_LEVELS.find((d) => d.id === filters.difficulty);
    activeFilters.push({ key: "difficulty", label: diff?.label ?? filters.difficulty });
  }
  if (filters.type !== "all") {
    activeFilters.push({
      key: "type",
      label: filters.type === "mandatory" ? "Verplicht" : "Optioneel",
    });
  }
  if (filters.status) {
    const stat = COURSE_STATUSES.find((s) => s.id === filters.status);
    activeFilters.push({ key: "status", label: stat?.label ?? filters.status });
  }

  function clearFilter(key: string) {
    const next = { ...filters };
    if (key === "category") next.category = null;
    if (key === "difficulty") next.difficulty = null;
    if (key === "type") next.type = "all";
    if (key === "status") next.status = null;
    onFilterChange(next);
  }

  return (
    <div className={className}>
      {/* Search + Filters row */}
      <div
        className="flex flex-wrap items-center"
        style={{ gap: "var(--space-3)" }}
      >
        {/* Search input */}
        <div
          className="relative flex-1"
          style={{ minWidth: 200, maxWidth: 480 }}
        >
          <Search
            size={16}
            className="absolute pointer-events-none"
            style={{
              left: "var(--space-3)",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--uniform-tertiary)",
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Zoek een cursus..."
            style={{
              width: "100%",
              backgroundColor: "var(--control-bg)",
              border: "1px solid var(--control-border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-2) var(--space-3) var(--space-2) var(--space-8)",
              fontSize: "0.9375rem",
              fontWeight: 400,
              color: "var(--uniform)",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--control-focus)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--perimeter-focus)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--control-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Category filter */}
        <select
          value={filters.category ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              category: (e.target.value || null) as CourseCategory | null,
            })
          }
          style={selectStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--control-focus)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--perimeter-focus)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--control-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="">Alle categorieen</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={filters.difficulty ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              difficulty: (e.target.value || null) as DifficultyLevel | null,
            })
          }
          style={selectStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--control-focus)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--perimeter-focus)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--control-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="">Alle niveaus</option>
          {DIFFICULTY_LEVELS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={filters.type}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              type: e.target.value as "all" | "mandatory" | "optional",
            })
          }
          style={selectStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--control-focus)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--perimeter-focus)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--control-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="all">Alles</option>
          <option value="mandatory">Verplicht</option>
          <option value="optional">Optioneel</option>
        </select>

        {/* Status filter */}
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: (e.target.value || null) as CourseStatus | null,
            })
          }
          style={selectStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--control-focus)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--perimeter-focus)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--control-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="">Alle statussen</option>
          {COURSE_STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div
          className="flex flex-wrap items-center"
          style={{ gap: "var(--space-2)", marginTop: "var(--space-3)" }}
        >
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--uniform-tertiary)",
            }}
          >
            {courseCount} resultaten
          </span>
          {activeFilters.map((f) => (
            <BadgeTag key={f.key} variant="active" className="gap-1">
              {f.label}
              <button
                onClick={() => clearFilter(f.key)}
                className="inline-flex items-center justify-center cursor-pointer"
                style={{
                  marginLeft: "var(--space-1)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                }}
                aria-label={`Verwijder filter ${f.label}`}
              >
                <X size={12} />
              </button>
            </BadgeTag>
          ))}
        </div>
      )}
    </div>
  );
}
