"use client";

import { useState, useMemo } from "react";
import { GraduationCap, Award, Heart, Flame } from "lucide-react";
import { currentGuard } from "@/data/mock/guards";
import { courses } from "@/data/mock/courses";
import { events } from "@/data/mock/events";
import { CATEGORIES } from "@/lib/constants";
import { StatsCard } from "@/components/shared/stats-card";
import { CertCard } from "@/components/shared/cert-card";
import { DeploymentCard } from "@/components/shared/deployment-card";
import { ShieldProgress } from "@/components/shared/shield-progress";
import { BadgeTag } from "@/components/shared/badge-tag";
import { SkillRadar } from "@/components/shared/skill-radar";
import type { CertificationStatus } from "@/lib/types";

const badgeIconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={14} />,
  Award: <Award size={14} />,
  Heart: <Heart size={14} />,
  Flame: <Flame size={14} />,
};

const certStatusMap: Record<CertificationStatus, "geldig" | "verloopt" | "verlopen"> = {
  valid: "geldig",
  "expiring-soon": "verloopt",
  expired: "verlopen",
};

function formatDateNL(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateRangeNL(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  if (s.getTime() === e.getTime()) return formatDateNL(start);
  return `${formatDateNL(start)} - ${formatDateNL(end)}`;
}

function daysUntil(iso: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

type CourseTab = "all" | "completed" | "in-progress";

export default function ProfielPage() {
  const [courseTab, setCourseTab] = useState<CourseTab>("all");

  // Skill radar data
  const skillData = useMemo(() => {
    const enrolledCourses = courses.filter((c) =>
      currentGuard.enrolledCourseIds.includes(c.id)
    );
    return CATEGORIES.map((cat) => {
      const catCourses = enrolledCourses.filter((c) => c.category === cat.id);
      const avg =
        catCourses.length > 0
          ? catCourses.reduce((sum, c) => sum + c.progress, 0) / catCourses.length
          : 0;
      return { category: cat.id, label: cat.label, value: Math.round(avg) };
    });
  }, []);

  // Sorted certifications (soonest expiry first)
  const sortedCerts = useMemo(() => {
    return [...currentGuard.certifications].sort(
      (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
    );
  }, []);

  // Course history
  const enrolledCourses = useMemo(() => {
    return courses.filter((c) => currentGuard.enrolledCourseIds.includes(c.id));
  }, []);

  const filteredCourses = useMemo(() => {
    let filtered = enrolledCourses;
    if (courseTab === "completed") {
      filtered = filtered.filter((c) => c.status === "completed");
    } else if (courseTab === "in-progress") {
      filtered = filtered.filter((c) => c.status === "in-progress");
    }
    return [...filtered].sort((a, b) => {
      if (a.status === "completed" && b.status === "completed") {
        return (
          new Date(b.completedDate ?? "").getTime() -
          new Date(a.completedDate ?? "").getTime()
        );
      }
      if (a.status === "in-progress" && b.status === "in-progress") {
        return (
          new Date(b.lastAccessedDate ?? "").getTime() -
          new Date(a.lastAccessedDate ?? "").getTime()
        );
      }
      if (a.status === "completed") return -1;
      if (b.status === "completed") return 1;
      if (a.status === "in-progress") return -1;
      if (b.status === "in-progress") return 1;
      return 0;
    });
  }, [enrolledCourses, courseTab]);

  // Past deployments
  const pastDeployments = useMemo(() => {
    return events
      .filter((e) => e.status === "completed")
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }, []);

  // Member since formatted
  const memberSince = useMemo(() => {
    const d = new Date(currentGuard.memberSince);
    return d.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });
  }, []);

  const initials = `${currentGuard.firstName[0]}${currentGuard.lastName[0]}`;

  const tabs: Array<{ key: CourseTab; label: string }> = [
    { key: "all", label: "Alles" },
    { key: "completed", label: "Voltooid" },
    { key: "in-progress", label: "Bezig" },
  ];

  return (
    <div>
      {/* Section 1: Profile Header */}
      <div
        className="flex flex-col items-center text-center"
        style={{ marginBottom: "var(--space-8)" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 80,
            height: 80,
            borderRadius: "9999px",
            backgroundColor: "var(--vest)",
            color: "white",
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {initials}
        </div>
        <h1
          style={{
            marginTop: "var(--space-4)",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--uniform)",
          }}
        >
          {currentGuard.firstName} {currentGuard.lastName}
        </h1>
        <p
          style={{
            marginTop: "var(--space-1)",
            fontSize: "0.9375rem",
            fontWeight: 400,
            color: "var(--uniform-secondary)",
          }}
        >
          {currentGuard.role}
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "var(--uniform-tertiary)",
          }}
        >
          {currentGuard.company}
        </p>
        <p
          style={{
            marginTop: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "var(--uniform-tertiary)",
          }}
        >
          Lid sinds {memberSince}
        </p>

        <div
          className="grid w-full"
          style={{
            marginTop: "var(--space-6)",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-4)",
            maxWidth: 640,
          }}
        >
          <StatsCard label="Cursussen Voltooid" value={currentGuard.coursesCompleted} />
          <StatsCard label="Gemiddelde Score" value={`${currentGuard.averageScore}%`} />
          <StatsCard label="Totaal Punten" value={currentGuard.totalPoints} />
        </div>
      </div>

      {/* Section 2: Vaardigheden */}
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
          Vaardigheden
        </h2>
        <SkillRadar skills={skillData} />
      </div>

      {/* Section 3: Certificaten & Badges */}
      <div
        className="grid"
        style={{
          marginBottom: "var(--space-8)",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-8)",
        }}
      >
        {/* Certificaten */}
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
            Certificaten
          </h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr",
              gap: "var(--space-4)",
            }}
          >
            {sortedCerts.map((cert) => {
              const days = daysUntil(cert.expiryDate);
              return (
                <CertCard
                  key={cert.id}
                  name={cert.name}
                  issuingBody={cert.issuingBody}
                  earnedDate={formatDateNL(cert.earnedDate)}
                  expiryDate={formatDateNL(cert.expiryDate)}
                  status={certStatusMap[cert.status]}
                  daysUntilExpiry={days}
                />
              );
            })}
          </div>
        </div>

        {/* Badges */}
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
            Badges
          </h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {currentGuard.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center"
                style={{
                  backgroundColor: "var(--briefing-elevated)",
                  border: "1px solid var(--perimeter)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-5)",
                  boxShadow: "var(--shadow-lifted)",
                }}
              >
                <ShieldProgress
                  progress={100}
                  size="lg"
                  variant="complete"
                  icon={badgeIconMap[badge.icon]}
                />
                <span
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--uniform)",
                  }}
                >
                  {badge.name}
                </span>
                <span
                  style={{
                    marginTop: "var(--space-1)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: "var(--uniform-tertiary)",
                  }}
                >
                  {badge.description}
                </span>
                <span
                  style={{
                    marginTop: "var(--space-2)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: "var(--uniform-tertiary)",
                  }}
                >
                  {formatDateNL(badge.earnedDate)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Cursusgeschiedenis */}
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
          Cursusgeschiedenis
        </h2>

        {/* Tabs */}
        <div
          className="flex"
          style={{
            gap: "var(--space-2)",
            marginBottom: "var(--space-4)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCourseTab(tab.key)}
              className="cursor-pointer"
              style={{
                padding: "var(--space-2) var(--space-4)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--perimeter)",
                backgroundColor:
                  courseTab === tab.key
                    ? "var(--vest-light)"
                    : "transparent",
                color:
                  courseTab === tab.key
                    ? "var(--vest-hover)"
                    : "var(--uniform-secondary)",
                borderColor:
                  courseTab === tab.key
                    ? "var(--perimeter-emphasis)"
                    : "var(--perimeter)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course list */}
        <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
          {filteredCourses.map((course) => {
            const catLabel = CATEGORIES.find(
              (c) => c.id === course.category
            )?.label;
            const statusVariant =
              course.status === "completed"
                ? "completed"
                : course.status === "in-progress"
                  ? "active"
                  : "optional";
            const statusLabel =
              course.status === "completed"
                ? "Voltooid"
                : course.status === "in-progress"
                  ? "Bezig"
                  : "Niet gestart";
            return (
              <div
                key={course.id}
                className="flex flex-col"
                style={{
                  backgroundColor: "var(--briefing-elevated)",
                  border: "1px solid var(--perimeter)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-4) var(--space-5)",
                  boxShadow: "var(--shadow-lifted)",
                }}
              >
                <div
                  className="flex items-start justify-between flex-wrap"
                  style={{ gap: "var(--space-3)" }}
                >
                  <div className="flex-1 min-w-0">
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--uniform)",
                      }}
                    >
                      {course.title}
                    </h3>
                    <div
                      className="flex items-center flex-wrap"
                      style={{
                        marginTop: "var(--space-2)",
                        gap: "var(--space-2)",
                      }}
                    >
                      {catLabel && (
                        <BadgeTag variant="active">{catLabel}</BadgeTag>
                      )}
                      <BadgeTag variant={statusVariant as "completed" | "active" | "optional"}>
                        {statusLabel}
                      </BadgeTag>
                      {course.completedDate && (
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                            color: "var(--uniform-tertiary)",
                          }}
                        >
                          {formatDateNL(course.completedDate)}
                        </span>
                      )}
                      {course.quizAverageScore !== undefined && (
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                            color: "var(--uniform-tertiary)",
                          }}
                        >
                          Score: {course.quizAverageScore}%
                        </span>
                      )}
                    </div>
                  </div>
                  <ShieldProgress
                    progress={course.progress}
                    size="sm"
                    variant={course.status === "completed" ? "complete" : "default"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 5: Inzetgeschiedenis */}
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
          Inzetgeschiedenis
        </h2>
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {pastDeployments.map((event) => {
            const linkedCourses = event.requiredCourseIds.map((cid) => {
              const course = courses.find((c) => c.id === cid);
              return {
                id: cid,
                title: course?.title ?? cid,
                completed: course?.status === "completed",
              };
            });
            return (
              <DeploymentCard
                key={event.id}
                eventName={event.name}
                dateRange={formatDateRangeNL(event.startDate, event.endDate)}
                location={event.location}
                role={event.guardRole ?? "Beveiliging"}
                linkedCourses={linkedCourses}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
