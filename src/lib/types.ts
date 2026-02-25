// ============================================================================
// GuardTrack E-Learning Platform — TypeScript Type Definitions
// ============================================================================

// ---------------------------------------------------------------------------
// Enums / Union Types
// ---------------------------------------------------------------------------

/** Course training category */
export type CourseCategory =
  | 'crowd-control'
  | 'ehbo'
  | 'communicatie'
  | 'toegangscontrole'
  | 'brandveiligheid'
  | 'noodprocedures';

/** Difficulty level (Dutch labels used in UI) */
export type DifficultyLevel = 'beginner' | 'gemiddeld' | 'gevorderd';

/** Overall course progress status */
export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

/** Lesson content type */
export type LessonType = 'video' | 'reading' | 'quiz' | 'scenario';

/** Individual lesson completion status */
export type CompletionStatus = 'not-started' | 'in-progress' | 'completed';

/** Certification validity status */
export type CertificationStatus = 'valid' | 'expiring-soon' | 'expired';

/** Notification category */
export type NotificationType =
  | 'overdue'
  | 'assignment'
  | 'certification'
  | 'event'
  | 'achievement';

// ---------------------------------------------------------------------------
// Core Domain Interfaces
// ---------------------------------------------------------------------------

/** Security guard user profile */
export interface Guard {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  /** Job title, e.g. "Beveiligingsmedewerker" */
  role: string;
  company: string;
  /** URL or initials fallback */
  avatar?: string;
  /** ISO date */
  memberSince: string;
  totalPoints: number;
  /** Consecutive days of activity */
  currentStreak: number;
  coursesCompleted: number;
  /** 0-100 */
  averageScore: number;
  certifications: Certification[];
  badges: Badge[];
  enrolledCourseIds: string[];
}

/** Training course */
export interface Course {
  id: string;
  /** Dutch title */
  title: string;
  /** Dutch description */
  description: string;
  category: CourseCategory;
  difficulty: DifficultyLevel;
  isMandatory: boolean;
  /** Event IDs that require this course */
  mandatoryForEventIds?: string[];
  /** ISO date deadline for mandatory completion */
  mandatoryDeadline?: string;
  durationMinutes: number;
  modules: CourseModule[];
  enrolledCount: number;
  /** CSS gradient for placeholder thumbnail */
  thumbnailGradient: string;
  /** 0-100 completion percentage */
  progress: number;
  status: CourseStatus;
  /** ISO date */
  lastAccessedDate?: string;
  /** ISO date */
  completedDate?: string;
  /** Average quiz score for this course, 0-100 */
  quizAverageScore?: number;
}

/** Module within a course */
export interface CourseModule {
  id: string;
  courseId: string;
  /** Dutch title */
  title: string;
  order: number;
  lessons: Lesson[];
}

/** Individual lesson within a module */
export interface Lesson {
  id: string;
  moduleId: string;
  /** Dutch title */
  title: string;
  type: LessonType;
  order: number;
  durationMinutes: number;
  completionStatus: CompletionStatus;
  /** Type-specific content payload */
  content?: LessonContent;
}

/** Discriminated union for lesson content by type */
export type LessonContent =
  | VideoContent
  | ReadingContent
  | QuizContent
  | ScenarioContent;

export interface VideoContent {
  type: 'video';
  videoUrl: string;
  chapters: VideoChapter[];
  captionsAvailable: boolean;
}

export interface VideoChapter {
  title: string;
  /** Seconds from start */
  startTime: number;
}

export interface ReadingContent {
  type: 'reading';
  sections: ReadingSection[];
}

export interface ReadingSection {
  type:
    | 'heading'
    | 'paragraph'
    | 'bullets'
    | 'info-callout'
    | 'warning-callout'
    | 'checklist'
    | 'expandable';
  content: string;
  /** For bullets, checklist types */
  items?: string[];
  /** For expandable sections */
  expandableTitle?: string;
}

export interface QuizContent {
  type: 'quiz';
  questions: QuizQuestion[];
  /** Minimum percentage to pass, e.g. 70 */
  passingScore: number;
}

export interface ScenarioContent {
  type: 'scenario';
  scenario: Scenario;
}

// ---------------------------------------------------------------------------
// Quiz & Scenario
// ---------------------------------------------------------------------------

/** Quiz question */
export interface QuizQuestion {
  id: string;
  courseId: string;
  /** Dutch question text */
  question: string;
  type: 'multiple-choice' | 'true-false';
  /** Optional situational context for scenario-based questions */
  situationDescription?: string;
  options: QuizOption[];
  correctOptionId: string;
  /** Dutch explanation shown after answering */
  explanation: string;
}

export interface QuizOption {
  id: string;
  /** Dutch option text */
  text: string;
}

/** Practical scenario exercise */
export interface Scenario {
  id: string;
  courseId: string;
  /** Dutch title */
  title: string;
  /** Dutch description setting the scene */
  situationDescription: string;
  /** e.g. "Lowlands Festival, hoofdingang" */
  eventContext?: string;
  responseOptions: ScenarioOption[];
  bestOptionId: string;
  /** Dutch expert feedback */
  expertExplanation: string;
}

export interface ScenarioOption {
  id: string;
  /** Dutch action description */
  text: string;
  /** Dutch feedback for this choice */
  feedback: string;
  /** 0-100 effectiveness rating */
  score: number;
}

// ---------------------------------------------------------------------------
// Events & Deployments
// ---------------------------------------------------------------------------

/** Event or festival deployment */
export interface Event {
  id: string;
  /** e.g. "Koningsdag Amsterdam" */
  name: string;
  location: string;
  /** ISO date */
  startDate: string;
  /** ISO date */
  endDate: string;
  /** Dutch description */
  description: string;
  expectedAttendees: number;
  requiredCourseIds: string[];
  status: 'upcoming' | 'active' | 'completed';
  /** Guard's assigned role, e.g. "Crowd Control Hoofdingang" */
  guardRole?: string;
}

/** Past deployment record */
export interface Deployment {
  id: string;
  eventName: string;
  /** ISO date */
  startDate: string;
  /** ISO date */
  endDate: string;
  location: string;
  /** Dutch role description */
  role: string;
  linkedCourseIds: string[];
  status: 'completed' | 'upcoming';
}

// ---------------------------------------------------------------------------
// Certifications & Badges
// ---------------------------------------------------------------------------

/** Professional certification */
export interface Certification {
  id: string;
  /** e.g. "EHBO Diploma" */
  name: string;
  /** e.g. "Het Oranje Kruis" */
  issuingBody: string;
  /** ISO date */
  earnedDate: string;
  /** ISO date */
  expiryDate: string;
  status: CertificationStatus;
}

/** Achievement badge */
export interface Badge {
  id: string;
  /** Dutch name, e.g. "Eerste Cursus" */
  name: string;
  /** Dutch description */
  description: string;
  /** ISO date */
  earnedDate: string;
  /** Lucide icon name */
  icon: string;
}

// ---------------------------------------------------------------------------
// Notifications & Leaderboard
// ---------------------------------------------------------------------------

/** Notification item */
export interface Notification {
  id: string;
  type: NotificationType;
  /** Dutch title */
  title: string;
  /** Dutch message */
  message: string;
  /** ISO datetime */
  timestamp: string;
  isRead: boolean;
  linkedCourseId?: string;
  linkedEventId?: string;
}

/** Leaderboard entry */
export interface LeaderboardEntry {
  guardId: string;
  rank: number;
  name: string;
  avatar?: string;
  points: number;
  badgesCount: number;
  streak: number;
  isCurrentUser: boolean;
}
