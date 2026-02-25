"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import {
  Video,
  BookOpen,
  HelpCircle,
  Target,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { courses } from "@/data/mock/courses";
import { quizQuestions } from "@/data/mock/quiz-questions";
import { scenarios } from "@/data/mock/scenarios";
import { ShieldProgress } from "@/components/shared/shield-progress";
import { BadgeTag } from "@/components/shared/badge-tag";
import { VideoPlayerPlaceholder } from "@/components/shared/video-player-placeholder";
import { ReadingContent } from "@/components/shared/reading-content";
import { QuizQuestion } from "@/components/shared/quiz-question";
import { ScenarioExercise } from "@/components/shared/scenario-exercise";
import type {
  LessonType,
  CourseModule,
  Lesson,
  ReadingSection,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getLessonTypeIcon(type: LessonType) {
  switch (type) {
    case "video":
      return Video;
    case "reading":
      return BookOpen;
    case "quiz":
      return HelpCircle;
    case "scenario":
      return Target;
  }
}

function findLessonById(
  modules: CourseModule[],
  id: string
): {
  module: CourseModule;
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
} | null {
  for (let mi = 0; mi < modules.length; mi++) {
    const mod = modules[mi];
    for (let li = 0; li < mod.lessons.length; li++) {
      if (mod.lessons[li].id === id) {
        return {
          module: mod,
          lesson: mod.lessons[li],
          moduleIndex: mi,
          lessonIndex: li,
        };
      }
    }
  }
  return null;
}

function getAdjacentLesson(
  modules: CourseModule[],
  currentId: string,
  direction: "prev" | "next"
): string | null {
  const found = findLessonById(modules, currentId);
  if (!found) return null;

  const { moduleIndex, lessonIndex } = found;

  if (direction === "next") {
    const mod = modules[moduleIndex];
    if (lessonIndex < mod.lessons.length - 1) {
      return mod.lessons[lessonIndex + 1].id;
    }
    if (moduleIndex < modules.length - 1) {
      return modules[moduleIndex + 1].lessons[0]?.id ?? null;
    }
    return null;
  }

  // prev
  if (lessonIndex > 0) {
    return modules[moduleIndex].lessons[lessonIndex - 1].id;
  }
  if (moduleIndex > 0) {
    const prevMod = modules[moduleIndex - 1];
    return prevMod.lessons[prevMod.lessons.length - 1]?.id ?? null;
  }
  return null;
}

function generateReadingSections(title: string): ReadingSection[] {
  return [
    {
      type: "heading",
      content: title,
    },
    {
      type: "paragraph",
      content: `In deze les behandelen we de belangrijkste aspecten van ${title.toLowerCase()}. Als beveiligingsmedewerker is het essentieel dat je deze kennis paraat hebt tijdens je werkzaamheden bij evenementen en festivals.`,
    },
    {
      type: "paragraph",
      content: `De theorie in deze module is gebaseerd op de nieuwste richtlijnen en best practices uit de beveiligingsbranche. Neem de tijd om elk onderdeel goed door te nemen en maak aantekeningen waar nodig.`,
    },
    {
      type: "bullets",
      content: "Kernpunten",
      items: [
        "Ken de geldende protocollen en richtlijnen voor jouw specifieke rol",
        "Communiceer altijd helder en tijdig met de controlekamer en collega's",
        "Handel proactief — wacht niet tot een situatie escaleert",
        "Documenteer incidenten direct na afloop volgens het standaardformulier",
      ],
    },
    {
      type: "info-callout",
      content: `Tip: Bespreek deze lesstof met je collega's tijdens de briefing voorafgaand aan een evenement. Gezamenlijke kennis verhoogt de veiligheid voor iedereen op het terrein.`,
    },
    {
      type: "checklist",
      content: "Controlelijst",
      items: [
        "Ik heb de kernbegrippen begrepen",
        "Ik ken de meldingsprocedure",
        "Ik weet hoe ik moet handelen in een noodsituatie",
        "Ik heb de praktijkvoorbeelden doorgenomen",
      ],
    },
    {
      type: "expandable",
      content: `Voor meer diepgaande informatie over ${title.toLowerCase()} kun je de aanvullende documentatie raadplegen in het kenniscentrum van GuardTrack. Daar vind je ook links naar externe bronnen van het NIBHV en het CCV die relevant zijn voor dit onderwerp.`,
      expandableTitle: "Aanvullende bronnen en verdieping",
    },
  ];
}

// Category display name mapping
const categoryLabels: Record<string, string> = {
  "crowd-control": "Crowd Control",
  ehbo: "EHBO",
  communicatie: "Communicatie",
  toegangscontrole: "Toegangscontrole",
  brandveiligheid: "Brandveiligheid",
  noodprocedures: "Noodprocedures",
};

const difficultyLabels: Record<string, string> = {
  beginner: "Beginner",
  gemiddeld: "Gemiddeld",
  gevorderd: "Gevorderd",
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CursusDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === id);

  const firstLessonId =
    course?.modules[0]?.lessons[0]?.id ?? "";

  const [activeLessonId, setActiveLessonId] = useState(firstLessonId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModuleIds, setExpandedModuleIds] = useState<Set<string>>(
    () => {
      if (!course) return new Set<string>();
      // Expand the module containing the first lesson
      const firstMod = course.modules[0];
      return firstMod ? new Set([firstMod.id]) : new Set<string>();
    }
  );

  const toggleModule = useCallback((moduleId: string) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  }, []);

  const handleLessonSelect = useCallback(
    (lessonId: string, moduleId: string) => {
      setActiveLessonId(lessonId);
      setSidebarOpen(false);
      // Ensure the module is expanded
      setExpandedModuleIds((prev) => {
        if (prev.has(moduleId)) return prev;
        const next = new Set(prev);
        next.add(moduleId);
        return next;
      });
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  // Not found
  if (!course) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ padding: "var(--space-16)", gap: "var(--space-4)" }}
      >
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--uniform)",
          }}
        >
          Cursus niet gevonden
        </p>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--uniform-secondary)",
          }}
        >
          De gevraagde cursus bestaat niet of is niet meer beschikbaar.
        </p>
        <Link
          href="/catalogus"
          className="inline-flex items-center"
          style={{
            gap: "var(--space-2)",
            color: "var(--vest)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            marginTop: "var(--space-4)",
          }}
        >
          <ArrowLeft size={16} />
          Terug naar catalogus
        </Link>
      </div>
    );
  }

  const activeFound = findLessonById(course.modules, activeLessonId);
  const activeLesson = activeFound?.lesson;
  const prevLessonId = getAdjacentLesson(
    course.modules,
    activeLessonId,
    "prev"
  );
  const nextLessonId = getAdjacentLesson(
    course.modules,
    activeLessonId,
    "next"
  );

  // Current module progress
  const currentModuleLessons = activeFound?.module.lessons ?? [];
  const completedInModule = currentModuleLessons.filter(
    (l) => l.completionStatus === "completed"
  ).length;
  const moduleProgressPercent =
    currentModuleLessons.length > 0
      ? Math.round((completedInModule / currentModuleLessons.length) * 100)
      : 0;

  // Course quiz questions and scenarios
  const courseQuizQuestions = quizQuestions.filter(
    (q) => q.courseId === course.id
  );
  const courseScenarios = scenarios.filter((s) => s.courseId === course.id);

  // Total lessons for the whole course
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );

  // ---------------------------------------------------------------------------
  // Sidebar / Accordion content (shared between desktop and mobile)
  // ---------------------------------------------------------------------------
  const sidebarContent = (
    <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
      {course.modules.map((mod) => {
        const isExpanded = expandedModuleIds.has(mod.id);
        const completedLessons = mod.lessons.filter(
          (l) => l.completionStatus === "completed"
        ).length;

        return (
          <div key={mod.id}>
            {/* Module header */}
            <button
              className="w-full flex items-center text-left"
              onClick={() => toggleModule(mod.id)}
              style={{
                padding: "var(--space-3) var(--space-4)",
                gap: "var(--space-3)",
              }}
            >
              <span
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--control-bg)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--uniform-tertiary)",
                }}
              >
                {mod.order}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="truncate"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--uniform)",
                  }}
                >
                  {mod.title}
                </p>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 400,
                    color: "var(--uniform-tertiary)",
                  }}
                >
                  {completedLessons}/{mod.lessons.length} lessen
                </p>
              </div>
              <ChevronDown
                size={16}
                style={{
                  color: "var(--uniform-tertiary)",
                  transition: `transform var(--duration-state)`,
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Lessons */}
            {isExpanded && (
              <div className="flex flex-col" style={{ paddingBottom: "var(--space-2)" }}>
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const TypeIcon = getLessonTypeIcon(lesson.type);

                  let shieldProgress = 0;
                  let shieldVariant: "default" | "complete" = "default";
                  if (lesson.completionStatus === "completed") {
                    shieldProgress = 100;
                    shieldVariant = "complete";
                  } else if (lesson.completionStatus === "in-progress") {
                    shieldProgress = 50;
                  }

                  return (
                    <button
                      key={lesson.id}
                      onClick={() =>
                        handleLessonSelect(lesson.id, mod.id)
                      }
                      className="w-full flex items-center text-left"
                      style={{
                        padding:
                          "var(--space-2) var(--space-4) var(--space-2) var(--space-8)",
                        gap: "var(--space-2)",
                        backgroundColor: isActive
                          ? "var(--vest-light)"
                          : "transparent",
                        borderLeft: isActive
                          ? "3px solid var(--vest)"
                          : "3px solid transparent",
                        transition: `all var(--duration-state)`,
                      }}
                    >
                      <ShieldProgress
                        progress={shieldProgress}
                        variant={shieldVariant}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="truncate"
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: isActive ? 600 : 400,
                            color:
                              lesson.completionStatus === "completed"
                                ? "var(--uniform-tertiary)"
                                : "var(--uniform)",
                          }}
                        >
                          {lesson.title}
                        </p>
                        <p
                          style={{
                            fontSize: "0.625rem",
                            fontWeight: 400,
                            color: "var(--uniform-muted)",
                          }}
                        >
                          {lesson.durationMinutes} min
                        </p>
                      </div>
                      <TypeIcon
                        size={14}
                        style={{ color: "var(--uniform-muted)" }}
                        className="shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ---------------------------------------------------------------------------
  // Lesson content rendering
  // ---------------------------------------------------------------------------
  function renderLessonContent() {
    if (!activeLesson) return null;

    switch (activeLesson.type) {
      case "video":
        return (
          <VideoPlayerPlaceholder
            title={activeLesson.title}
            durationMinutes={activeLesson.durationMinutes}
            chapters={[
              { title: "Introductie", startTime: 0 },
              {
                title: "Kernconcepten",
                startTime: Math.floor(
                  activeLesson.durationMinutes * 60 * 0.3
                ),
              },
              {
                title: "Samenvatting",
                startTime: Math.floor(
                  activeLesson.durationMinutes * 60 * 0.8
                ),
              },
            ]}
          />
        );

      case "reading":
        return (
          <ReadingContent
            sections={generateReadingSections(activeLesson.title)}
          />
        );

      case "quiz":
        if (courseQuizQuestions.length === 0) {
          return (
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 400,
                color: "var(--uniform-tertiary)",
                padding: "var(--space-8) 0",
                textAlign: "center",
              }}
            >
              Geen vragen beschikbaar voor deze cursus.
            </p>
          );
        }
        return (
          <QuizQuestion
            key={activeLessonId}
            questions={courseQuizQuestions}
            passingScore={70}
          />
        );

      case "scenario": {
        const scenario = courseScenarios[0];
        if (!scenario) {
          return (
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 400,
                color: "var(--uniform-tertiary)",
                padding: "var(--space-8) 0",
                textAlign: "center",
              }}
            >
              Geen scenario beschikbaar voor deze cursus.
            </p>
          );
        }
        return <ScenarioExercise key={activeLessonId} scenario={scenario} />;
      }
    }
  }

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-6)" }}>
      {/* A. Course Header */}
      <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
        {/* Back link */}
        <Link
          href="/catalogus"
          className="inline-flex items-center self-start"
          style={{
            gap: "var(--space-2)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--uniform-tertiary)",
          }}
        >
          <ArrowLeft size={16} />
          Terug naar catalogus
        </Link>

        {/* Title row */}
        <div className="flex items-start justify-between flex-wrap" style={{ gap: "var(--space-4)" }}>
          <div className="flex-1 min-w-0">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--uniform)",
              }}
            >
              {course.title}
            </h1>

            {/* Metadata row */}
            <div
              className="flex items-center flex-wrap"
              style={{
                gap: "var(--space-2)",
                marginTop: "var(--space-3)",
              }}
            >
              <BadgeTag variant="active">
                {categoryLabels[course.category] || course.category}
              </BadgeTag>
              <BadgeTag variant={course.difficulty}>
                {difficultyLabels[course.difficulty]}
              </BadgeTag>
              <BadgeTag variant={course.isMandatory ? "mandatory" : "optional"}>
                {course.isMandatory ? "Verplicht" : "Optioneel"}
              </BadgeTag>
              <span
                className="inline-flex items-center"
                style={{
                  gap: "var(--space-1)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--uniform-tertiary)",
                }}
              >
                <Clock size={14} />
                {course.durationMinutes} min
              </span>
              <span
                className="inline-flex items-center"
                style={{
                  gap: "var(--space-1)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--uniform-tertiary)",
                }}
              >
                <Layers size={14} />
                {course.modules.length} modules, {totalLessons} lessen
              </span>
            </div>
          </div>

          {/* Progress and CTA */}
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <ShieldProgress
                progress={course.progress}
                variant={course.status === "completed" ? "complete" : "default"}
                size="lg"
                showLabel
              />
            </div>
            <button
              style={{
                padding: "var(--space-2) var(--space-6)",
                backgroundColor:
                  course.status === "completed"
                    ? "var(--cleared)"
                    : "var(--vest)",
                color: "white",
                borderRadius: "var(--radius-md)",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {course.status === "not-started"
                ? "Start cursus"
                : course.status === "in-progress"
                  ? "Ga verder"
                  : "Voltooid"}
            </button>
          </div>
        </div>
      </div>

      {/* B. Two-column layout */}
      <div className="flex" style={{ gap: "var(--space-6)" }}>
        {/* B1. Sidebar — desktop only */}
        <aside
          className="hidden md:block shrink-0 self-start sticky top-4"
          style={{
            width: 280,
            backgroundColor: "var(--briefing-elevated)",
            borderRight: "1px solid var(--perimeter)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "var(--space-4)",
              borderBottom: "1px solid var(--perimeter)",
            }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--uniform)",
              }}
            >
              Cursusinhoud
            </p>
          </div>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {sidebarContent}
          </div>
        </aside>

        {/* B1-mobile. Accordion — mobile only */}
        <div className="md:hidden w-full flex flex-col" style={{ gap: "var(--space-4)" }}>
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: "var(--space-3) var(--space-4)",
              backgroundColor: "var(--briefing-elevated)",
              border: "1px solid var(--perimeter)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--uniform)",
              }}
            >
              Cursusinhoud ({totalLessons} lessen)
            </span>
            <ChevronDown
              size={18}
              style={{
                color: "var(--uniform-tertiary)",
                transition: `transform var(--duration-expand)`,
                transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          {sidebarOpen && (
            <div
              style={{
                backgroundColor: "var(--briefing-elevated)",
                border: "1px solid var(--perimeter)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {sidebarContent}
            </div>
          )}

          {/* Lesson content (mobile renders below accordion) */}
          <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
            {/* Lesson header */}
            {activeLesson && (
              <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
                <div className="flex items-center flex-wrap" style={{ gap: "var(--space-2)" }}>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "var(--uniform)",
                    }}
                  >
                    {activeLesson.title}
                  </h2>
                </div>
                <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                  <BadgeTag variant="active">
                    {activeLesson.type === "video"
                      ? "Video"
                      : activeLesson.type === "reading"
                        ? "Leesmateriaal"
                        : activeLesson.type === "quiz"
                          ? "Quiz"
                          : "Scenario"}
                  </BadgeTag>
                  <span
                    className="inline-flex items-center"
                    style={{
                      gap: "var(--space-1)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--uniform-tertiary)",
                    }}
                  >
                    <Clock size={14} />
                    {activeLesson.durationMinutes} min
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            {renderLessonContent()}

            {/* Navigation */}
            <div className="flex flex-col" style={{ gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
              {/* Module progress bar */}
              <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                <div
                  className="flex-1"
                  style={{
                    height: 4,
                    backgroundColor: "var(--control-bg)",
                    borderRadius: "var(--radius-full)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${moduleProgressPercent}%`,
                      backgroundColor: "var(--vest)",
                      borderRadius: "var(--radius-full)",
                      transition: `width var(--duration-expand)`,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: "var(--uniform-tertiary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {completedInModule}/{currentModuleLessons.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (prevLessonId) {
                      const found = findLessonById(course.modules, prevLessonId);
                      handleLessonSelect(prevLessonId, found?.module.id ?? "");
                    }
                  }}
                  disabled={!prevLessonId}
                  className="inline-flex items-center"
                  style={{
                    padding: "var(--space-2) var(--space-4)",
                    backgroundColor: prevLessonId
                      ? "var(--briefing-elevated)"
                      : "var(--control-bg)",
                    border: "1px solid var(--perimeter)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: prevLessonId
                      ? "var(--uniform)"
                      : "var(--uniform-muted)",
                    gap: "var(--space-2)",
                    cursor: prevLessonId ? "pointer" : "not-allowed",
                  }}
                >
                  <ChevronLeft size={16} />
                  Vorige les
                </button>
                <button
                  onClick={() => {
                    if (nextLessonId) {
                      const found = findLessonById(course.modules, nextLessonId);
                      handleLessonSelect(nextLessonId, found?.module.id ?? "");
                    }
                  }}
                  disabled={!nextLessonId}
                  className="inline-flex items-center"
                  style={{
                    padding: "var(--space-2) var(--space-4)",
                    backgroundColor: nextLessonId
                      ? "var(--vest)"
                      : "var(--control-bg)",
                    color: nextLessonId ? "white" : "var(--uniform-muted)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    gap: "var(--space-2)",
                    cursor: nextLessonId ? "pointer" : "not-allowed",
                  }}
                >
                  Volgende les
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* B2. Lesson content area — desktop only */}
        <main className="hidden md:flex flex-col flex-1 min-w-0" style={{ gap: "var(--space-4)" }}>
          {/* Lesson header */}
          {activeLesson && (
            <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--uniform)",
                }}
              >
                {activeLesson.title}
              </h2>
              <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                <BadgeTag variant="active">
                  {activeLesson.type === "video"
                    ? "Video"
                    : activeLesson.type === "reading"
                      ? "Leesmateriaal"
                      : activeLesson.type === "quiz"
                        ? "Quiz"
                        : "Scenario"}
                </BadgeTag>
                <span
                  className="inline-flex items-center"
                  style={{
                    gap: "var(--space-1)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--uniform-tertiary)",
                  }}
                >
                  <Clock size={14} />
                  {activeLesson.durationMinutes} min
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          {renderLessonContent()}

          {/* C. Lesson Navigation */}
          <div className="flex flex-col" style={{ gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
            {/* Module progress bar */}
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <div
                className="flex-1"
                style={{
                  height: 4,
                  backgroundColor: "var(--control-bg)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${moduleProgressPercent}%`,
                    backgroundColor: "var(--vest)",
                    borderRadius: "var(--radius-full)",
                    transition: `width var(--duration-expand)`,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  color: "var(--uniform-tertiary)",
                  whiteSpace: "nowrap",
                }}
              >
                {completedInModule}/{currentModuleLessons.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (prevLessonId) {
                    const found = findLessonById(course.modules, prevLessonId);
                    handleLessonSelect(prevLessonId, found?.module.id ?? "");
                  }
                }}
                disabled={!prevLessonId}
                className="inline-flex items-center"
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  backgroundColor: prevLessonId
                    ? "var(--briefing-elevated)"
                    : "var(--control-bg)",
                  border: "1px solid var(--perimeter)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: prevLessonId
                    ? "var(--uniform)"
                    : "var(--uniform-muted)",
                  gap: "var(--space-2)",
                  cursor: prevLessonId ? "pointer" : "not-allowed",
                }}
              >
                <ChevronLeft size={16} />
                Vorige les
              </button>
              <button
                onClick={() => {
                  if (nextLessonId) {
                    const found = findLessonById(course.modules, nextLessonId);
                    handleLessonSelect(nextLessonId, found?.module.id ?? "");
                  }
                }}
                disabled={!nextLessonId}
                className="inline-flex items-center"
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  backgroundColor: nextLessonId
                    ? "var(--vest)"
                    : "var(--control-bg)",
                  color: nextLessonId ? "white" : "var(--uniform-muted)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  gap: "var(--space-2)",
                  cursor: nextLessonId ? "pointer" : "not-allowed",
                }}
              >
                Volgende les
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
