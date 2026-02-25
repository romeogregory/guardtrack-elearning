"use client";

import { useState, useCallback } from "react";
import {
  Check,
  X,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { QuizQuestion as QuizQuestionType } from "@/lib/types";

interface QuizQuestionProps {
  questions: QuizQuestionType[];
  passingScore: number;
  onComplete?: (score: number, passed: boolean) => void;
  className?: string;
}

export function QuizQuestion({
  questions,
  passingScore,
  onComplete,
  className,
}: QuizQuestionProps) {
  const [mode, setMode] = useState<"oefenmodus" | "toetsmodus">("oefenmodus");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = answered && selectedOptionId === question?.correctOptionId;
  const totalQuestions = questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswered(false);
    setAnswers(new Map());
    setShowResults(false);
  }, []);

  const handleModeSwitch = (newMode: "oefenmodus" | "toetsmodus") => {
    if (newMode !== mode) {
      setMode(newMode);
      resetQuiz();
    }
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    setAnswered(true);
  };

  const handleNextPractice = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setAnswered(false);
  };

  const handleNextTest = () => {
    if (!selectedOptionId) return;
    const newAnswers = new Map(answers);
    newAnswers.set(question.id, selectedOptionId);
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
    } else {
      setAnswers(newAnswers);
      setShowResults(true);
      const correctCount = Array.from(newAnswers.entries()).filter(
        ([qId, optId]) => {
          const q = questions.find((qq) => qq.id === qId);
          return q && q.correctOptionId === optId;
        }
      ).length;
      const score = Math.round((correctCount / totalQuestions) * 100);
      onComplete?.(score, score >= passingScore);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOptionId(null);
      setAnswered(false);
    }
  };

  // Test mode results
  if (showResults && mode === "toetsmodus") {
    const correctCount = Array.from(answers.entries()).filter(([qId, optId]) => {
      const q = questions.find((qq) => qq.id === qId);
      return q && q.correctOptionId === optId;
    }).length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= passingScore;

    return (
      <div className={cn("flex flex-col", className)} style={{ gap: "var(--space-6)" }}>
        {/* Score header */}
        <div className="text-center" style={{ padding: "var(--space-6) 0" }}>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--uniform)",
            }}
          >
            {correctCount} van {totalQuestions} correct
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--uniform-secondary)",
              marginTop: "var(--space-2)",
            }}
          >
            {score}%
          </p>

          {/* Pass/fail */}
          <div
            className="inline-flex items-center justify-center"
            style={{
              gap: "var(--space-2)",
              marginTop: "var(--space-4)",
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-md)",
              backgroundColor: passed
                ? "var(--cleared-light)"
                : "var(--alert-light)",
              color: passed ? "var(--cleared)" : "var(--alert)",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {passed ? <Check size={20} /> : <X size={20} />}
            {passed ? "Geslaagd!" : "Niet geslaagd"}
          </div>

          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400,
              color: "var(--uniform-tertiary)",
              marginTop: "var(--space-2)",
            }}
          >
            Minimumscore: {passingScore}%
          </p>
        </div>

        {/* Per-question review */}
        <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
          {questions.map((q, i) => {
            const userAnswer = answers.get(q.id);
            const isQCorrect = userAnswer === q.correctOptionId;
            const userOption = q.options.find((o) => o.id === userAnswer);
            const correctOption = q.options.find(
              (o) => o.id === q.correctOptionId
            );

            return (
              <div
                key={q.id}
                className="flex items-start"
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  backgroundColor: "var(--briefing-elevated)",
                  border: "1px solid var(--perimeter)",
                  borderRadius: "var(--radius-md)",
                  gap: "var(--space-3)",
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "var(--radius-full)",
                    backgroundColor: isQCorrect
                      ? "var(--cleared-light)"
                      : "var(--alert-light)",
                  }}
                >
                  {isQCorrect ? (
                    <Check size={14} style={{ color: "var(--cleared)" }} />
                  ) : (
                    <X size={14} style={{ color: "var(--alert)" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "var(--uniform)",
                    }}
                  >
                    Vraag {i + 1}: {q.question}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      color: isQCorrect
                        ? "var(--cleared)"
                        : "var(--alert)",
                      marginTop: "var(--space-1)",
                    }}
                  >
                    Jouw antwoord: {userOption?.text || "Geen antwoord"}
                  </p>
                  {!isQCorrect && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 400,
                        color: "var(--cleared)",
                        marginTop: "var(--space-1)",
                      }}
                    >
                      Correct: {correctOption?.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Retry button */}
        <button
          onClick={resetQuiz}
          className="inline-flex items-center justify-center"
          style={{
            padding: "var(--space-3) var(--space-6)",
            backgroundColor: "var(--vest)",
            color: "white",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            gap: "var(--space-2)",
          }}
        >
          <RotateCcw size={16} />
          Opnieuw proberen
        </button>
      </div>
    );
  }

  // Practice mode completion
  if (showResults && mode === "oefenmodus") {
    return (
      <div
        className={cn("flex flex-col items-center", className)}
        style={{ gap: "var(--space-4)", padding: "var(--space-8) 0" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 56,
            height: 56,
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--cleared-light)",
          }}
        >
          <Check size={28} style={{ color: "var(--cleared)" }} />
        </div>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--uniform)",
          }}
        >
          Oefening voltooid!
        </p>
        <p
          style={{
            fontSize: "0.9375rem",
            fontWeight: 400,
            color: "var(--uniform-secondary)",
          }}
        >
          Je hebt alle {totalQuestions} vragen doorgenomen.
        </p>
        <button
          onClick={resetQuiz}
          className="inline-flex items-center"
          style={{
            padding: "var(--space-3) var(--space-6)",
            backgroundColor: "var(--vest)",
            color: "white",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            gap: "var(--space-2)",
            marginTop: "var(--space-2)",
          }}
        >
          <RotateCcw size={16} />
          Opnieuw oefenen
        </button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className={cn("flex flex-col", className)} style={{ gap: "var(--space-4)" }}>
      {/* Mode toggle */}
      <div
        className="flex"
        style={{
          backgroundColor: "var(--control-bg)",
          borderRadius: "var(--radius-md)",
          padding: 3,
        }}
      >
        {(["oefenmodus", "toetsmodus"] as const).map((m) => (
          <button
            key={m}
            onClick={() => handleModeSwitch(m)}
            className="flex-1 text-center"
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              backgroundColor: mode === m ? "var(--vest)" : "transparent",
              color: mode === m ? "white" : "var(--uniform-tertiary)",
              transition: `all var(--duration-state)`,
            }}
          >
            {m === "oefenmodus" ? "Oefenmodus" : "Toetsmodus"}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--uniform-tertiary)",
          }}
        >
          Vraag {currentIndex + 1} van {totalQuestions}
        </p>
        <Progress value={progressPercent} />
      </div>

      {/* Situation description */}
      {question.situationDescription && (
        <div
          style={{
            backgroundColor: "var(--dispatch-light)",
            borderLeft: "3px solid var(--dispatch)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-4)",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400,
              color: "var(--uniform-secondary)",
              lineHeight: 1.6,
            }}
          >
            {question.situationDescription}
          </p>
        </div>
      )}

      {/* Question */}
      <div>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--uniform)",
          }}
        >
          {question.question}
        </p>
        <span
          className="inline-block"
          style={{
            marginTop: "var(--space-2)",
            padding: "var(--space-1) var(--space-2)",
            backgroundColor: "var(--control-bg)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--uniform-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          }}
        >
          {question.type === "multiple-choice" ? "Meerkeuze" : "Waar/Niet waar"}
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.correctOptionId;
          const showFeedback = answered && mode === "oefenmodus";

          let optionBg = "var(--briefing-elevated)";
          let optionBorder = "var(--perimeter)";
          let icon = null;

          if (showFeedback) {
            if (isSelected && isCorrectOption) {
              optionBg = "var(--cleared-light)";
              optionBorder = "var(--cleared)";
              icon = <Check size={18} style={{ color: "var(--cleared)" }} />;
            } else if (isSelected && !isCorrectOption) {
              optionBg = "var(--alert-light)";
              optionBorder = "var(--alert)";
              icon = <X size={18} style={{ color: "var(--alert)" }} />;
            } else if (isCorrectOption) {
              optionBg = "var(--cleared-light)";
              optionBorder = "var(--cleared)";
              icon = <Check size={18} style={{ color: "var(--cleared)" }} />;
            }
          } else if (isSelected) {
            optionBg = "var(--vest-light)";
            optionBorder = "var(--vest)";
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!answered || mode === "toetsmodus") {
                  setSelectedOptionId(option.id);
                }
              }}
              disabled={answered && mode === "oefenmodus"}
              className="flex items-center w-full text-left"
              style={{
                padding: "var(--space-3) var(--space-4)",
                backgroundColor: optionBg,
                border: `1px solid ${optionBorder}`,
                borderRadius: "var(--radius-md)",
                fontSize: "0.9375rem",
                fontWeight: 400,
                color: "var(--uniform)",
                gap: "var(--space-3)",
                transition: `all var(--duration-state)`,
                cursor:
                  answered && mode === "oefenmodus" ? "default" : "pointer",
                opacity: answered && mode === "oefenmodus" && !isSelected && !isCorrectOption ? 0.6 : 1,
              }}
            >
              <span className="flex-1">{option.text}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Practice mode: explanation */}
      {answered && mode === "oefenmodus" && (
        <div
          className="flex"
          style={{
            backgroundColor: "var(--briefing-elevated)",
            border: "1px solid var(--perimeter)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-4)",
            gap: "var(--space-3)",
          }}
        >
          <Lightbulb
            size={20}
            className="shrink-0 mt-0.5"
            style={{ color: "var(--vest)" }}
          />
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400,
              color: "var(--uniform-secondary)",
              lineHeight: 1.6,
            }}
          >
            {question.explanation}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
        {mode === "oefenmodus" ? (
          <>
            {!answered ? (
              <button
                onClick={handleCheck}
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
                }}
              >
                Controleer
              </button>
            ) : isCorrect ? (
              <button
                onClick={handleNextPractice}
                className="inline-flex items-center"
                style={{
                  padding: "var(--space-3) var(--space-6)",
                  backgroundColor: "var(--vest)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  gap: "var(--space-2)",
                }}
              >
                {currentIndex < totalQuestions - 1
                  ? "Volgende vraag"
                  : "Afronden"}
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="inline-flex items-center"
                style={{
                  padding: "var(--space-3) var(--space-6)",
                  backgroundColor: "var(--vest)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  gap: "var(--space-2)",
                }}
              >
                <RotateCcw size={16} />
                Probeer opnieuw
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="inline-flex items-center"
              style={{
                padding: "var(--space-3) var(--space-4)",
                backgroundColor:
                  currentIndex === 0
                    ? "var(--control-bg)"
                    : "var(--briefing-elevated)",
                border: "1px solid var(--perimeter)",
                color:
                  currentIndex === 0
                    ? "var(--uniform-muted)"
                    : "var(--uniform)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.875rem",
                fontWeight: 500,
                gap: "var(--space-2)",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft size={16} />
              Vorige vraag
            </button>
            <button
              onClick={handleNextTest}
              disabled={!selectedOptionId}
              className="inline-flex items-center"
              style={{
                padding: "var(--space-3) var(--space-6)",
                backgroundColor: selectedOptionId
                  ? "var(--vest)"
                  : "var(--control-bg)",
                color: selectedOptionId ? "white" : "var(--uniform-muted)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                gap: "var(--space-2)",
                cursor: selectedOptionId ? "pointer" : "not-allowed",
              }}
            >
              {currentIndex < totalQuestions - 1
                ? "Volgende"
                : "Resultaten bekijken"}
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
