# PLAN: TES-50 Dashboard Page

## Objective

Build the Dashboard page (`src/app/page.tsx`) -- the home page of the GuardTrack platform. The dashboard is the first thing a guard sees and must immediately answer: "What do I need to do?" and "Am I ready for my next deployment?" It contains 6 sections arranged in a briefing-style layout. All content is in Dutch.

## Dependencies

- **TES-46** (merged): TypeScript types (`src/lib/types.ts`), constants (`src/lib/constants.ts`), mock data (`src/data/mock/guards.ts`, `courses.ts`, `events.ts`, `notifications.ts`)
- **TES-47** (merged): Layout shell (`layout.tsx`), sidebar, bottom tabs, top bar
- **TES-48** (merged): Shared components -- `DeploymentReadiness`, `CourseCard`, `StatsCard`, `LeaderboardRow`, `NotificationItem`, `BadgeTag`, `ShieldProgress`

## Acceptance Criteria

- Deployment readiness bar is prominently positioned at the top, clearly showing which mandatory courses are complete/incomplete for the next event
- Course cards scroll horizontally on mobile (<768px), display as a grid on desktop (>=768px)
- All content is in Dutch and the layout is fully responsive (stacks vertically on mobile, uses grid on desktop)

---

## Scope Constraints

- **MUST modify**: `src/app/page.tsx` (Dashboard implementation)
- **MUST NOT modify**: components, layout, mock data, types

---

## Implementation Steps

### Step 1: Replace the placeholder `src/app/page.tsx`

Replace the existing placeholder content with a full `"use client"` Dashboard page component. The page imports all needed mock data and shared components, then renders 6 sections top-to-bottom.

**Imports needed:**
- `currentGuard` from `@/data/mock/guards`
- `leaderboard` from `@/data/mock/guards`
- `courses` from `@/data/mock/courses`
- `events` from `@/data/mock/events`
- `notifications` from `@/data/mock/notifications`
- `NOTIFICATION_TYPES` from `@/lib/constants`
- Shared components: `DeploymentReadiness`, `CourseCard`, `StatsCard`, `LeaderboardRow`, `NotificationItem`, `BadgeTag`, `ShieldProgress`
- Lucide icons: `BookOpen`, `Target`, `Flame`, `Award`, `Calendar`, `MapPin`, `AlertTriangle`, `Trophy`, `Bell`, `ChevronRight`
- React: `useState`, `useMemo`

**Page structure:** `"use client"` directive at top. Single default export `DashboardPage`. The component:
1. Uses `useState` for course filter tab state (type: `"all" | "mandatory" | "optional"`, default: `"all"`)
2. Uses `useMemo` to filter enrolled courses based on the active tab
3. Derives the next upcoming event from `events` (first with `status === "upcoming"`, sorted by `startDate`)
4. Derives deployment readiness data by cross-referencing the next event's `requiredCourseIds` with `courses`
5. Determines greeting based on time of day (for display purposes, use a fixed greeting "Goedemorgen" since this is mock data)

### Step 2: Section 1 -- Greeting + Deployment Readiness (Hero)

The top section occupying full width.

**Greeting area:**
- "Goedemorgen, {currentGuard.firstName}" using Display typography (32px/700, tracking -0.02em, color `var(--uniform)`)
- Date string below: formatted as "dinsdag 25 februari 2026" using Caption typography (13px/500, color `var(--uniform-tertiary)`)

**Deployment readiness bar:**
- Rendered directly below the greeting using the `<DeploymentReadiness>` component
- Props derived from the next upcoming event:
  - `eventName`: next event's `name`
  - `eventDate`: next event's `startDate` formatted in Dutch (e.g., "27 april 2026")
  - `courses`: array of `{ id, title, progress, required: true }` objects built by finding each `requiredCourseId` in the `courses` array
  - `status`: "gereed" if all required courses are 100% complete, "verlopen" if any have a past `mandatoryDeadline`, otherwise "bezig"
- Margin-top: `var(--space-5)` between greeting and readiness bar

### Step 3: Section 2 -- Mijn Cursussen (My Courses)

Section with horizontal scrollable course cards.

**Section header:**
- Title "Mijn Cursussen" using Heading typography (20px/600, color `var(--uniform)`)
- Three filter tabs below title: "Alles", "Verplicht", "Optioneel"
  - Tabs styled as inline buttons with `var(--space-2)` gap
  - Active tab: `var(--vest-light)` background, `var(--vest-hover)` text, `var(--radius-sm)` radius
  - Inactive tab: transparent background, `var(--uniform-tertiary)` text
  - Padding: `var(--space-1) var(--space-3)`, font: 13px/500

**Course cards container:**
- Filter courses: only show courses where `currentGuard.enrolledCourseIds` includes the course ID
- Further filter by tab: "Verplicht" shows only `isMandatory === true`, "Optioneel" shows only `isMandatory === false`, "Alles" shows all enrolled
- Mobile (<768px): horizontal scrollable container using `overflow-x: auto`, `display: flex`, `gap: var(--space-4)`, `scroll-snap-type: x mandatory`. Each card gets `min-width: 280px`, `scroll-snap-align: start`, `flex-shrink: 0`
- Desktop (>=768px): CSS grid with `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, `gap: var(--space-4)`
- Use `<CourseCard>` component with `course` prop and `showProgress={true}`
- Each card wraps in a Next.js `<Link>` to `/cursus/{course.id}` (or use `onClick` with `router.push`)
- If no courses match the filter, show "Geen cursussen gevonden" in Caption typography

### Step 4: Section 3 -- Aankomende Inzetten (Upcoming Deployments)

Timeline-style section showing upcoming events.

**Section header:**
- Title "Aankomende Inzetten" using Heading typography

**Timeline layout:**
- Filter `events` to only those with `status === "upcoming"`, sort by `startDate` ascending
- Each event rendered as a card with:
  - Event name: Subheading typography (16px/600)
  - Date range: formatted (e.g., "27 apr 2026") with `Calendar` icon, Caption typography, `var(--uniform-tertiary)`
  - Location: with `MapPin` icon, Caption typography, `var(--uniform-secondary)`
  - Guard role: shown using `<BadgeTag variant="active">` with the `guardRole` value
  - Required courses row: small `<ShieldProgress>` indicators (size="sm") for each required course. Color: `variant="complete"` if course progress is 100%, `variant="overdue"` if course has past deadline and progress < 100%, `variant="default"` otherwise
- Card styling: `var(--briefing-elevated)` background, `var(--perimeter)` border, `var(--radius-lg)` radius, `var(--shadow-lifted)` shadow, `var(--space-4)` padding
- Layout: stack vertically with `var(--space-4)` gap between event cards
- If no upcoming events, show an encouraging message: "Geen aankomende inzetten. Gebruik deze tijd om cursussen af te ronden!" in Caption typography

### Step 5: Section 4 -- Meldingen (Notifications)

Last 5 notifications from the notifications mock data.

**Section header:**
- Title "Meldingen" using Heading typography
- "Bekijk alles" link on the right side, Caption typography, `var(--vest)` color

**Notification list:**
- Take the first 5 items from `notifications` array (already sorted newest-first)
- Render each using `<NotificationItem>` component with:
  - `icon`: render the appropriate Lucide icon based on `NOTIFICATION_TYPES[notification.type].icon` -- use a mapping object to convert string icon names to Lucide components
  - `message`: the notification's `message` field
  - `timeAgo`: computed relative time string in Dutch (e.g., "2 uur geleden", "gisteren", "3 dagen geleden")
  - `isRead`: from notification data
  - `variant`: map notification type to variant -- "overdue" -> "danger", "assignment" -> "info", "certification" -> "warning", "event" -> "info", "achievement" -> "default"
- Container: `var(--briefing-elevated)` background, `var(--perimeter)` border, `var(--radius-lg)` radius, `var(--shadow-lifted)` shadow, overflow hidden

### Step 6: Section 5 -- Klassement (Leaderboard)

Top 5 guards by points, with current user highlighted.

**Section header:**
- Title "Klassement" using Heading typography

**Leaderboard:**
- Take the first 5 entries from `leaderboard` array
- If the current user (Jan de Vries, `isCurrentUser: true`) is NOT in the top 5, append them at the end with a visual separator
- Render each using `<LeaderboardRow>` with:
  - `rank`: from data
  - `name`: from data
  - `avatarInitials`: derive from name (first letter of first name + first letter of last name)
  - `points`: from data
  - `badgeCount`: from `badgesCount` field
  - `streak`: from data
  - `isCurrentUser`: from data
- Container: `var(--briefing-elevated)` background, `var(--perimeter)` border, `var(--radius-lg)` radius, `var(--shadow-lifted)` shadow, overflow hidden

### Step 7: Section 6 -- Statistieken (Statistics)

Four stats cards in a grid.

**Section header:**
- Title "Statistieken" using Heading typography

**Stats grid:**
- 4 `<StatsCard>` components in a grid: 2 columns on mobile, 4 on desktop
- Grid: `grid-template-columns: repeat(2, 1fr)` mobile, `repeat(4, 1fr)` desktop (>=768px), `gap: var(--space-4)`

**Card data (from `currentGuard`):**
1. `value: currentGuard.coursesCompleted`, `label: "Cursussen Voltooid"`, `icon: <BookOpen>`, `trend: { direction: "up", value: "+2 deze maand" }`
2. `value: currentGuard.averageScore + "%"`, `label: "Gemiddelde Score"`, `icon: <Target>`, `trend: { direction: "up", value: "+5%" }`
3. `value: currentGuard.currentStreak`, `label: "Actieve Streak"`, `icon: <Flame>`, `trend: { direction: "up", value: "12 dagen" }`
4. `value: currentGuard.certifications.filter(c => c.status !== "expired").length`, `label: "Certificaten"`, `icon: <Award>`, `trend: undefined` (no trend for certs)

### Step 8: Overall Page Layout

The 6 sections are arranged in a responsive layout.

**Desktop (>=768px):**
- Sections 1 (Greeting + Readiness) spans full width
- Below that, a 2-column grid (`grid-template-columns: 2fr 1fr`, `gap: var(--space-6)`):
  - Left column: Section 2 (Mijn Cursussen), Section 3 (Aankomende Inzetten)
  - Right column: Section 4 (Meldingen), Section 5 (Klassement)
- Section 6 (Statistieken) spans full width below the 2-column grid

**Mobile (<768px):**
- All sections stack vertically with `gap: var(--space-6)` between them

**Page container:**
- Padding: `var(--space-6)` on all sides
- Max-width: none (fills available space within the layout shell)
- Background: inherit from layout (canvas background)

### Step 9: Utility -- Dutch time-ago function

Create a small helper function within `page.tsx` (not exported) to format timestamps as Dutch relative time strings.

```typescript
function formatTimeAgoDutch(timestamp: string): string
```

Logic:
- Compare the notification timestamp with a reference date (use "2026-02-25T12:00:00Z" as "now" since this is mock data)
- Return Dutch strings: "Zojuist" (<1 hour), "X uur geleden" (1-23 hours), "Gisteren" (1 day), "X dagen geleden" (2-6 days), "Vorige week" (7-13 days), "X weken geleden" (14+ days)

### Step 10: Utility -- Icon name to component mapping

Create a small mapping object within `page.tsx` to convert `NOTIFICATION_TYPES` icon string names to actual Lucide React components.

```typescript
const iconMap: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle size={18} />,
  BookOpen: <BookOpen size={18} />,
  Award: <Award size={18} />,
  Calendar: <Calendar size={18} />,
  Trophy: <Trophy size={18} />,
};
```

### Step 11: Verify

- Run `npx tsc --noEmit` to verify TypeScript compilation
- Run `npm run build` to verify build succeeds
- Verify no hardcoded colors (no hex values, no `rgb()`)
- Verify all text content is in Dutch
- Verify the page uses only existing shared components (no new component files created)
- Verify responsive behavior: sections stack on mobile, use grid layout on desktop

---

## Files Modified

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Full Dashboard page with 6 sections, all Dutch content, responsive layout |

## Files NOT Modified (scope boundary)

- `src/components/shared/*` -- use existing components as-is
- `src/components/layout/*` -- layout shell remains unchanged
- `src/data/mock/*` -- consume existing mock data, no modifications
- `src/lib/types.ts` -- use existing types
- `src/lib/constants.ts` -- use existing constants

## Test Cases

1. **TypeScript compiles**: `npx tsc --noEmit` passes with no errors
2. **Build succeeds**: `npm run build` completes successfully
3. **Greeting displays**: Page shows "Goedemorgen, Jan" with today's date in Dutch
4. **Deployment readiness**: Readiness bar shows for the next upcoming event (Koningsdag Amsterdam) with shield indicators for required courses
5. **Course filter tabs**: Clicking "Verplicht" shows only mandatory courses, "Optioneel" shows only optional, "Alles" shows all enrolled
6. **Mobile course scroll**: At <768px, course cards are horizontally scrollable with snap behavior
7. **Desktop course grid**: At >=768px, course cards display in a responsive grid
8. **Upcoming events**: 4 upcoming events displayed with date, location, role, and required course shields
9. **Notifications**: 5 most recent notifications shown with correct type-based icon and color
10. **Leaderboard**: Top 5 guards shown, Jan de Vries (rank 5) is highlighted with amber background
11. **Statistics**: 4 stats cards show correct values from `currentGuard` data
12. **Responsive layout**: Desktop uses 2-column grid for middle sections, mobile stacks everything vertically
13. **No hardcoded colors**: `grep -rn "rgb\|rgba\|#[0-9a-fA-F]" src/app/page.tsx` returns no matches
14. **All Dutch**: No English UI text visible on the page

## Notes

- The page is `"use client"` because it uses `useState` for filter tabs and `useMemo` for filtered course lists
- Mock data is imported as static TypeScript modules -- no fetching or loading states needed
- The `formatTimeAgoDutch` function uses a fixed reference date ("2026-02-25T12:00:00Z") to match the mock notification timestamps, ensuring consistent display
- Course cards should link to `/cursus/{course.id}` but since that page may not be built yet, using the link is fine (it will show a placeholder page)
- The icon mapping for notifications is a simple object within `page.tsx` -- no need for a separate utility file
- All spacing, colors, typography, shadows, and radii use CSS custom properties from the design system (defined in `globals.css`)
