# PLAN: TES-50 Dashboard Page

## Objective

Build the Dashboard (home page) -- the first thing a guard sees when opening GuardTrack. It answers "What do I need to do?" and "Am I ready for my next deployment?" Layout follows a briefing-style approach with 6 sections. Single file: src/app/page.tsx.

## Dependencies

- **TES-45** (merged): Project scaffolding, design system tokens in globals.css, shadcn/ui base components
- **TES-46** (merged): TypeScript types in src/lib/types.ts, constants in src/lib/constants.ts, mock data in src/data/mock/
- **TES-47** (merged): Layout shell -- sidebar, top bar, bottom tabs
- **TES-48** (merged): Shared UI components -- ShieldProgress, DeploymentReadiness, CourseCard, StatsCard, LeaderboardRow, BadgeTag, NotificationItem

## Acceptance Criteria

- Deployment readiness bar is prominently positioned at the top, clearly showing which mandatory courses are complete/incomplete for the next event
- Course cards scroll horizontally on mobile (<768px), display as a grid on desktop (>=768px)
- All content is in Dutch and the layout is fully responsive (stacks vertically on mobile, uses grid on desktop)
