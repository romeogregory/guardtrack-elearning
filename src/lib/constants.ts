import type {
  CourseCategory,
  CourseStatus,
  DifficultyLevel,
  NotificationType,
} from '@/lib/types';

// ---------------------------------------------------------------------------
// Course categories with Dutch labels and Lucide icon names
// ---------------------------------------------------------------------------

export const CATEGORIES: { id: CourseCategory; label: string; icon: string }[] =
  [
    { id: 'crowd-control', label: 'Crowd Control', icon: 'Users' },
    { id: 'ehbo', label: 'EHBO', icon: 'Heart' },
    { id: 'communicatie', label: 'Communicatie', icon: 'MessageSquare' },
    { id: 'toegangscontrole', label: 'Toegangscontrole', icon: 'ShieldCheck' },
    { id: 'brandveiligheid', label: 'Brandveiligheid', icon: 'Flame' },
    { id: 'noodprocedures', label: 'Noodprocedures', icon: 'Siren' },
  ];

// ---------------------------------------------------------------------------
// Difficulty levels with Dutch labels
// ---------------------------------------------------------------------------

export const DIFFICULTY_LEVELS: {
  id: DifficultyLevel;
  label: string;
}[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'gemiddeld', label: 'Gemiddeld' },
  { id: 'gevorderd', label: 'Gevorderd' },
];

// ---------------------------------------------------------------------------
// Course statuses with Dutch labels
// ---------------------------------------------------------------------------

export const COURSE_STATUSES: { id: CourseStatus; label: string }[] = [
  { id: 'not-started', label: 'Niet gestart' },
  { id: 'in-progress', label: 'Bezig' },
  { id: 'completed', label: 'Voltooid' },
];

// ---------------------------------------------------------------------------
// Notification type configuration (icon + semantic color token)
// ---------------------------------------------------------------------------

export const NOTIFICATION_TYPES: Record<
  NotificationType,
  { icon: string; color: string }
> = {
  overdue: { icon: 'AlertTriangle', color: 'alert' },
  assignment: { icon: 'BookOpen', color: 'dispatch' },
  certification: { icon: 'Award', color: 'caution' },
  event: { icon: 'Calendar', color: 'dispatch' },
  achievement: { icon: 'Trophy', color: 'cleared' },
};
