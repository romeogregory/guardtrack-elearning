"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Target,
  Flame,
  Award,
  Calendar,
  MapPin,
  AlertTriangle,
  Trophy,
  Bell,
  ChevronRight,
} from "lucide-react";

import { currentGuard, leaderboard } from "@/data/mock/guards";
import { courses } from "@/data/mock/courses";
import { events } from "@/data/mock/events";
import { notifications } from "@/data/mock/notifications";
import { NOTIFICATION_TYPES } from "@/lib/constants";

import { DeploymentReadiness } from "@/components/shared/deployment-readiness";
import { CourseCard } from "@/components/shared/course-card";
import { StatsCard } from "@/components/shared/stats-card";
import { LeaderboardRow } from "@/components/shared/leaderboard-row";
import { NotificationItem } from "@/components/shared/notification-item";
import { BadgeTag } from "@/components/shared/badge-tag";
import { ShieldProgress } from "@/components/shared/shield-progress";

// ---------------------------------------------------------------------------
// Utilities (internal)
// ---------------------------------------------------------------------------

const REFERENCE_NOW = new Date("2026-02-25T12:00:00Z");

function formatTimeAgoDutch(timestamp: string): string {
  const diff = REFERENCE_NOW.getTime() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (hours < 1) return "Zojuist";
  if (hours < 24) return `${hours} uur geleden`;
  if (days === 1) return "Gisteren";
  if (days < 7) return `${days} dagen geleden`;
  if (days < 14) return "Vorige week";
  const weeks = Math.floor(days / 7);
  return `${weeks} weken geleden`;
}

const iconMap: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle size={18} />,
  BookOpen: <BookOpen size={18} />,
  Award: <Award size={18} />,
  Calendar: <Calendar size={18} />,
  Trophy: <Trophy size={18} />,
};

const notificationVariantMap: Record<
  string,
  "default" | "warning" | "danger" | "info"
> = {
  overdue: "danger",
  assignment: "info",
  certification: "warning",
  event: "info",
  achievement: "default",
};

const DUTCH_MONTHS = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const DUTCH_DAYS = [
  "zondag",
  "maandag",
  "dinsdag",
  "woensdag",
  "donderdag",
  "vrijdag",
  "zaterdag",
];

function formatDutchDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${DUTCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDutchDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${DUTCH_MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

// ---------------------------------------------------------------------------
// Filter tab type
// ---------------------------------------------------------------------------

type CourseFilter = "all" | "mandatory" | "optional";

// ---------------------------------------------------------------------------
// Dashboard Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [courseFilter, setCourseFilter] = useState<CourseFilter>("all");

  // Enrolled courses only
  const enrolledCourses = useMemo(
    () =>
      courses.filter((c) => currentGuard.enrolledCourseIds.includes(c.id)),
    []
  );

  // Filtered courses based on active tab
  const filteredCourses = useMemo(() => {
    if (courseFilter === "mandatory")
      return enrolledCourses.filter((c) => c.isMandatory);
    if (courseFilter === "optional")
      return enrolledCourses.filter((c) => !c.isMandatory);
    return enrolledCourses;
  }, [courseFilter, enrolledCourses]);

  // Next upcoming event
  const upcomingEvents = useMemo(
    () =>
      events
        .filter((e) => e.status === "upcoming")
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        ),
    []
  );

  const nextEvent = upcomingEvents[0];

  // Deployment readiness data
  const readinessData = useMemo(() => {
    if (!nextEvent) return null;

    const requiredCourses = nextEvent.requiredCourseIds
      .map((id) => courses.find((c) => c.id === id))
      .filter(Boolean)
      .map((c) => ({
        id: c!.id,
        title: c!.title,
        progress: c!.progress,
        required: true as const,
      }));

    const allComplete = requiredCourses.every((c) => c.progress >= 100);
    const anyOverdue = nextEvent.requiredCourseIds.some((id) => {
      const course = courses.find((c) => c.id === id);
      return (
        course &&
        course.mandatoryDeadline &&
        new Date(course.mandatoryDeadline) < REFERENCE_NOW &&
        course.progress < 100
      );
    });

    const status: "gereed" | "verlopen" | "bezig" = allComplete
      ? "gereed"
      : anyOverdue
        ? "verlopen"
        : "bezig";

    return {
      eventName: nextEvent.name,
      eventDate: formatDutchDate(nextEvent.startDate),
      courses: requiredCourses,
      status,
    };
  }, [nextEvent]);

  // Today's date in Dutch
  const todayString = (() => {
    const d = REFERENCE_NOW;
    return `${DUTCH_DAYS[d.getDay()]} ${d.getDate()} ${DUTCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  })();

  // Leaderboard: top 5, plus current user if not in top 5
  const top5 = leaderboard.slice(0, 5);
  const currentUserInTop5 = top5.some((e) => e.isCurrentUser);
  const currentUserEntry = leaderboard.find((e) => e.isCurrentUser);

  // Active certifications count
  const activeCerts = currentGuard.certifications.filter(
    (c) => c.status !== "expired"
  ).length;

  const filterTabs: { key: CourseFilter; label: string }[] = [
    { key: "all", label: "Alles" },
    { key: "mandatory", label: "Verplicht" },
    { key: "optional", label: "Optioneel" },
  ];

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {/* Section 1: Greeting + Deployment Readiness */}
      <section>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--uniform)",
            lineHeight: 1.2,
          }}
        >
          Goedemorgen, {currentGuard.firstName}
        </h1>
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--uniform-tertiary)",
            marginTop: "var(--space-1)",
          }}
        >
          {todayString}
        </p>

        {readinessData && (
          <div style={{ marginTop: "var(--space-5)" }}>
            <DeploymentReadiness
              eventName={readinessData.eventName}
              eventDate={readinessData.eventDate}
              courses={readinessData.courses}
              status={readinessData.status}
            />
          </div>
        )}
      </section>

      {/* Desktop: 2-column grid for middle sections */}
      <div
        className="grid"
        style={{
          marginTop: "var(--space-6)",
          gap: "var(--space-6)",
          gridTemplateColumns: "1fr",
        }}
      >
        <div
          className="desktop-grid"
          style={{
            display: "grid",
            gap: "var(--space-6)",
          }}
        >
          {/* Left column */}
          <div
            className="left-col"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
            }}
          >
            {/* Section 2: Mijn Cursussen */}
            <section>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--uniform)",
                }}
              >
                Mijn Cursussen
              </h2>

              <div
                className="flex items-center"
                style={{
                  gap: "var(--space-2)",
                  marginTop: "var(--space-3)",
                }}
              >
                {filterTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCourseFilter(tab.key)}
                    style={{
                      backgroundColor:
                        courseFilter === tab.key
                          ? "var(--vest-light)"
                          : "transparent",
                      color:
                        courseFilter === tab.key
                          ? "var(--vest-hover)"
                          : "var(--uniform-tertiary)",
                      borderRadius: "var(--radius-sm)",
                      padding: "var(--space-1) var(--space-3)",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {filteredCourses.length === 0 ? (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--uniform-tertiary)",
                    marginTop: "var(--space-4)",
                  }}
                >
                  Geen cursussen gevonden
                </p>
              ) : (
                <div
                  className="course-cards-container"
                  style={{
                    marginTop: "var(--space-4)",
                    gap: "var(--space-4)",
                  }}
                >
                  {filteredCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/cursus/${course.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="course-card-link"
                    >
                      <CourseCard course={course} showProgress />
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Section 3: Aankomende Inzetten */}
            <section>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--uniform)",
                }}
              >
                Aankomende Inzetten
              </h2>

              {upcomingEvents.length === 0 ? (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--uniform-tertiary)",
                    marginTop: "var(--space-4)",
                  }}
                >
                  Geen aankomende inzetten. Gebruik deze tijd om cursussen af te
                  ronden!
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-4)",
                    marginTop: "var(--space-4)",
                  }}
                >
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        backgroundColor: "var(--briefing-elevated)",
                        border: "1px solid var(--perimeter)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lifted)",
                        padding: "var(--space-4)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--uniform)",
                        }}
                      >
                        {event.name}
                      </span>

                      <div
                        className="flex flex-wrap items-center"
                        style={{
                          gap: "var(--space-3)",
                          marginTop: "var(--space-2)",
                        }}
                      >
                        <span
                          className="flex items-center"
                          style={{
                            gap: "var(--space-1)",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            color: "var(--uniform-tertiary)",
                          }}
                        >
                          <Calendar size={14} />
                          {event.startDate === event.endDate
                            ? formatDutchDateShort(event.startDate)
                            : `${formatDutchDateShort(event.startDate)} – ${formatDutchDateShort(event.endDate)}`}
                        </span>

                        <span
                          className="flex items-center"
                          style={{
                            gap: "var(--space-1)",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            color: "var(--uniform-secondary)",
                          }}
                        >
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </div>

                      {event.guardRole && (
                        <div style={{ marginTop: "var(--space-2)" }}>
                          <BadgeTag variant="active">{event.guardRole}</BadgeTag>
                        </div>
                      )}

                      {event.requiredCourseIds.length > 0 && (
                        <div
                          className="flex items-center flex-wrap"
                          style={{
                            gap: "var(--space-2)",
                            marginTop: "var(--space-3)",
                          }}
                        >
                          {event.requiredCourseIds.map((courseId) => {
                            const course = courses.find(
                              (c) => c.id === courseId
                            );
                            if (!course) return null;

                            const variant: "complete" | "overdue" | "default" =
                              course.progress >= 100
                                ? "complete"
                                : course.mandatoryDeadline &&
                                    new Date(course.mandatoryDeadline) <
                                      REFERENCE_NOW &&
                                    course.progress < 100
                                  ? "overdue"
                                  : "default";

                            return (
                              <ShieldProgress
                                key={courseId}
                                progress={course.progress}
                                size="sm"
                                variant={variant}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right column */}
          <div
            className="right-col"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
            }}
          >
            {/* Section 4: Meldingen */}
            <section>
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: "var(--space-3)" }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--uniform)",
                  }}
                >
                  Meldingen
                </h2>
                <span
                  className="flex items-center"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--vest)",
                    cursor: "pointer",
                    gap: "var(--space-1)",
                  }}
                >
                  Bekijk alles
                  <ChevronRight size={14} />
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "var(--briefing-elevated)",
                  border: "1px solid var(--perimeter)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lifted)",
                  overflow: "hidden",
                }}
              >
                {notifications.slice(0, 5).map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    icon={
                      iconMap[NOTIFICATION_TYPES[notif.type].icon] || (
                        <Bell size={18} />
                      )
                    }
                    message={notif.message}
                    timeAgo={formatTimeAgoDutch(notif.timestamp)}
                    isRead={notif.isRead}
                    variant={notificationVariantMap[notif.type]}
                  />
                ))}
              </div>
            </section>

            {/* Section 5: Klassement */}
            <section>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--uniform)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Klassement
              </h2>

              <div
                style={{
                  backgroundColor: "var(--briefing-elevated)",
                  border: "1px solid var(--perimeter)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lifted)",
                  overflow: "hidden",
                }}
              >
                {top5.map((entry) => (
                  <LeaderboardRow
                    key={entry.guardId}
                    rank={entry.rank}
                    name={entry.name}
                    avatarInitials={entry.name
                      .split(" ")
                      .filter((p) => p[0] === p[0].toUpperCase())
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                    points={entry.points}
                    badgeCount={entry.badgesCount}
                    streak={entry.streak}
                    isCurrentUser={entry.isCurrentUser}
                  />
                ))}
                {!currentUserInTop5 && currentUserEntry && (
                  <>
                    <div
                      style={{
                        height: 1,
                        backgroundColor: "var(--perimeter)",
                        margin: "0 var(--space-4)",
                      }}
                    />
                    <LeaderboardRow
                      rank={currentUserEntry.rank}
                      name={currentUserEntry.name}
                      avatarInitials={currentUserEntry.name
                        .split(" ")
                        .filter((p) => p[0] === p[0].toUpperCase())
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                      points={currentUserEntry.points}
                      badgeCount={currentUserEntry.badgesCount}
                      streak={currentUserEntry.streak}
                      isCurrentUser
                    />
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Section 6: Statistieken */}
      <section style={{ marginTop: "var(--space-6)" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--uniform)",
            marginBottom: "var(--space-3)",
          }}
        >
          Statistieken
        </h2>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gap: "var(--space-4)",
          }}
        >
          <StatsCard
            value={currentGuard.coursesCompleted}
            label="Cursussen Voltooid"
            icon={<BookOpen size={20} />}
            trend={{ direction: "up", value: "+2 deze maand" }}
          />
          <StatsCard
            value={`${currentGuard.averageScore}%`}
            label="Gemiddelde Score"
            icon={<Target size={20} />}
            trend={{ direction: "up", value: "+5%" }}
          />
          <StatsCard
            value={currentGuard.currentStreak}
            label="Actieve Streak"
            icon={<Flame size={20} />}
            trend={{ direction: "up", value: "12 dagen" }}
          />
          <StatsCard
            value={activeCerts}
            label="Certificaten"
            icon={<Award size={20} />}
          />
        </div>
      </section>

      {/* Responsive styles */}
      <style jsx>{`
        .desktop-grid {
          grid-template-columns: 1fr;
        }
        .course-cards-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .course-cards-container > :global(.course-card-link) {
          min-width: 280px;
          scroll-snap-align: start;
          flex-shrink: 0;
        }
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .desktop-grid {
            grid-template-columns: 2fr 1fr;
          }
          .course-cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            overflow-x: visible;
            scroll-snap-type: none;
          }
          .course-cards-container > :global(.course-card-link) {
            min-width: unset;
            scroll-snap-align: unset;
            flex-shrink: unset;
          }
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
