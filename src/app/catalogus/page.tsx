"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Users,
  Heart,
  MessageSquare,
  ShieldCheck,
  Flame,
  Siren,
} from "lucide-react";
import { courses } from "@/data/mock/courses";
import { events } from "@/data/mock/events";
import { currentGuard } from "@/data/mock/guards";
import { CATEGORIES } from "@/lib/constants";
import { CourseCard } from "@/components/shared/course-card";
import { CategoryCard } from "@/components/shared/category-card";
import { BadgeTag } from "@/components/shared/badge-tag";
import {
  SearchFilterBar,
  type FilterState,
} from "@/components/shared/search-filter-bar";

const categoryIconMap: Record<string, React.ReactNode> = {
  Users: <Users size={20} />,
  Heart: <Heart size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Flame: <Flame size={20} />,
  Siren: <Siren size={20} />,
};

export default function CatalogusPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    difficulty: null,
    type: "all",
    status: null,
  });

  const isDefaultState =
    !searchQuery &&
    !filters.category &&
    !filters.difficulty &&
    filters.type === "all" &&
    !filters.status;

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const query = searchQuery.toLowerCase();
      if (
        query &&
        !course.title.toLowerCase().includes(query) &&
        !course.description.toLowerCase().includes(query)
      ) {
        return false;
      }
      if (filters.category && course.category !== filters.category) return false;
      if (filters.difficulty && course.difficulty !== filters.difficulty)
        return false;
      if (filters.type === "mandatory" && !course.isMandatory) return false;
      if (filters.type === "optional" && course.isMandatory) return false;
      if (filters.status && course.status !== filters.status) return false;
      return true;
    });
  }, [searchQuery, filters]);

  // Recommendations
  const recommendations = useMemo(() => {
    const upcomingEvents = events.filter((e) => e.status === "upcoming");
    const recs: Array<{ course: (typeof courses)[number]; reason: string }> = [];

    for (const event of upcomingEvents) {
      for (const courseId of event.requiredCourseIds) {
        const course = courses.find(
          (c) => c.id === courseId && c.status !== "completed"
        );
        if (course && !recs.find((r) => r.course.id === course.id)) {
          recs.push({ course, reason: `Verplicht voor ${event.name}` });
        }
        if (recs.length >= 4) break;
      }
      if (recs.length >= 4) break;
    }

    if (recs.length < 4) {
      const notEnrolled = courses.filter(
        (c) =>
          !currentGuard.enrolledCourseIds.includes(c.id) &&
          !recs.find((r) => r.course.id === c.id)
      );
      for (const course of notEnrolled) {
        const catLabel = CATEGORIES.find(
          (cat) => cat.id === course.category
        )?.label;
        recs.push({ course, reason: `Versterk je ${catLabel} kennis` });
        if (recs.length >= 4) break;
      }
    }

    return recs;
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      counts[cat.id] = courses.filter((c) => c.category === cat.id).length;
    }
    return counts;
  }, []);

  function resetFilters() {
    setSearchQuery("");
    setFilters({
      category: null,
      difficulty: null,
      type: "all",
      status: null,
    });
  }

  return (
    <div>
      {/* Section 1: Page Header */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--uniform)",
          }}
        >
          Cursuscatalogus
        </h1>
        <p
          style={{
            marginTop: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--uniform-tertiary)",
          }}
        >
          {courses.length} cursussen beschikbaar
        </p>
      </div>

      {/* Section 2: Search + Filters */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={setFilters}
        courseCount={filteredCourses.length}
        className=""
      />

      <div style={{ marginBottom: "var(--space-8)" }} />

      {/* Section 3: Aanbevolen voor jou */}
      {isDefaultState && recommendations.length > 0 && (
        <div style={{ marginBottom: "var(--space-8)" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--uniform)",
              marginBottom: "var(--space-4)",
            }}
          >
            Aanbevolen voor jou
          </h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            {recommendations.map((rec) => (
              <div key={rec.course.id} className="flex flex-col">
                <CourseCard
                  course={rec.course}
                  onClick={() => router.push(`/cursus/${rec.course.id}`)}
                />
                <div style={{ marginTop: "var(--space-2)" }}>
                  <BadgeTag
                    variant={
                      rec.reason.startsWith("Verplicht") ? "mandatory" : "active"
                    }
                    size="md"
                  >
                    {rec.reason}
                  </BadgeTag>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Categorieen */}
      {!filters.category && (
        <div style={{ marginBottom: "var(--space-8)" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--uniform)",
              marginBottom: "var(--space-4)",
            }}
          >
            Categorieen
          </h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.label}
                icon={categoryIconMap[cat.icon]}
                courseCount={categoryCounts[cat.id] ?? 0}
                isActive={filters.category === cat.id}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: prev.category === cat.id ? null : cat.id,
                  }))
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Section 5: Alle Cursussen */}
      {filteredCourses.length > 0 && (
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--uniform)",
              marginBottom: "var(--space-4)",
            }}
          >
            Alle Cursussen ({filteredCourses.length})
          </h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => router.push(`/cursus/${course.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section 6: Empty State */}
      {filteredCourses.length === 0 && (
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{
            padding: "var(--space-16) var(--space-6)",
            backgroundColor: "var(--briefing-elevated)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--perimeter)",
          }}
        >
          <Search
            size={48}
            style={{ color: "var(--uniform-muted)", marginBottom: "var(--space-4)" }}
          />
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--uniform)",
            }}
          >
            Geen cursussen gevonden
          </h3>
          <p
            style={{
              marginTop: "var(--space-2)",
              fontSize: "0.9375rem",
              fontWeight: 400,
              color: "var(--uniform-tertiary)",
            }}
          >
            Probeer andere zoektermen of pas je filters aan
          </p>
          <button
            onClick={resetFilters}
            className="cursor-pointer"
            style={{
              marginTop: "var(--space-4)",
              padding: "var(--space-3) var(--space-4)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--uniform)",
              backgroundColor: "transparent",
              border: "1px solid var(--perimeter)",
              borderRadius: "var(--radius-md)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--control-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Wis alle filters
          </button>
        </div>
      )}
    </div>
  );
}
