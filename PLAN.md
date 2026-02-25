# PLAN: TES-53 User Profile Page

## Objective

Build the User Profile page (`/profiel`) -- the guard's personal record showing certifications, course history, deployment history, and a skills radar chart. The page should feel accomplishment-focused and encouraging, showcasing what the guard has achieved. Includes creating a new `SkillRadar` component using Recharts.

## Dependencies

- **TES-45** (merged): Project scaffolding, design system tokens in `globals.css`, shadcn/ui base components, Recharts installed
- **TES-46** (merged): TypeScript types (`src/lib/types.ts`), constants (`src/lib/constants.ts`), mock data (guards, courses, events)
- **TES-47** (merged): Layout shell -- sidebar, top bar, bottom tabs
- **TES-48** (merged): Shared components -- `CertCard`, `DeploymentCard`, `StatsCard`, `ShieldProgress`, `BadgeTag`

## Acceptance Criteria

- Radar chart renders correctly with 6 axes (Crowd Control, EHBO, Communicatie, Toegangscontrole, Brandveiligheid, Noodprocedures) and is responsive at all breakpoints
- Certifications are sorted by expiry date (soonest first), with visual amber warning for expiring soon (`--caution`) and red alert for expired (`--alert`)
- All content is in Dutch and the layout is fully responsive (sections stack on mobile, grid on desktop)

---

## Implementation Steps

### Step 1: Create `src/components/shared/skill-radar.tsx`

Radar/spider chart showing skill levels across the 6 training categories. Uses Recharts `RadarChart`.

**Props:**
- `skills: Array<{ category: string; label: string; value: number }>` -- skill levels (0-100) per category
- `className?: string`

**Implementation details:**
- Mark as `"use client"` (Recharts requires client-side rendering)
- Use Recharts components: `ResponsiveContainer`, `RadarChart`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, `Radar`
- Wrap chart in `ResponsiveContainer` with `width="100%"` and `height={300}` (or 280 on mobile) for responsiveness
- Radar fill: `var(--vest)` (amber) with 30% opacity (`fillOpacity={0.3}`)
- Radar stroke: `var(--vest)` solid line, 2px width
- Polar grid lines: `var(--perimeter)` color
- Angle axis labels (category names): `var(--uniform-secondary)` color, Caption typography (13px/500)
- Radius axis: hidden (`tick={false}`) with domain `[0, 100]`
- No axis numbers displayed -- keep clean
- Outer domain: 0-100
- The component should read CSS variable values at render time using `getComputedStyle` to pass hex values to Recharts (Recharts does not support CSS variables directly), or use hardcoded HSL values matching the design system tokens
- Wrap in a card-like container: `var(--briefing-elevated)` background, `var(--perimeter)` border, `var(--radius-lg)` border-radius, `var(--space-5)` padding, `var(--shadow-lifted)` shadow

### Step 2: Create `src/app/profiel/page.tsx`

Full profile page with 5 sections. Replace the existing placeholder.

**Mark as `"use client"`** -- uses `useState` for course history tab filtering.

**Data sources:**
- `currentGuard` from `@/data/mock/guards`
- `courses` from `@/data/mock/courses`
- `events` from `@/data/mock/events`
- `CATEGORIES` from `@/lib/constants`

#### Section 1: Profile Header

- Large avatar: 80px circle with `var(--vest)` background, white initials (first letter of firstName + lastName), using shadcn `Avatar`
- Full name: Display typography (32px/700), `var(--uniform)`
- Role: Body typography (15px/400), `var(--uniform-secondary)` -- "Beveiligingsmedewerker"
- Company: Caption typography (13px/500), `var(--uniform-tertiary)` -- "SecureForce Nederland"
- Member since: Caption typography, `var(--uniform-tertiary)` -- "Lid sinds maart 2022"
- 3 inline stats using `StatsCard` (existing component) in a 3-column grid:
  - "Cursussen Voltooid" -- `currentGuard.coursesCompleted` (value: 8)
  - "Gemiddelde Score" -- `currentGuard.averageScore` + "%" (value: "82%")
  - "Totaal Punten" -- `currentGuard.totalPoints` (value: 1850)
- Responsive: on mobile, avatar and text stack vertically centered, stats go to a single row with smaller cards

#### Section 2: Vaardigheden (Skills Radar)

- Section heading: "Vaardigheden" -- Heading typography (20px/600)
- Use `SkillRadar` component from Step 1
- Calculate skill values from completed courses: for each of the 6 categories, count how many courses in that category the guard has completed (status === "completed") and calculate a percentage based on progress or use mock values
- Since mock data has `progress` field on courses, compute per-category average progress from enrolled courses:
  - Filter `courses` to those in `currentGuard.enrolledCourseIds`
  - Group by `category`
  - Average the `progress` values per category
- Pass the 6 categories with their Dutch labels from `CATEGORIES` constant
- Render inside a section container

#### Section 3: Certificaten & Badges

Two sub-sections side-by-side on desktop, stacked on mobile.

**Certificaten:**
- Section heading: "Certificaten" -- Heading typography
- Grid of `CertCard` (existing component) -- 1 column mobile, 2 columns desktop
- Data: `currentGuard.certifications` sorted by `expiryDate` ascending (soonest first)
- Map `CertificationStatus` to `CertCard` status prop: `"valid"` -> `"geldig"`, `"expiring-soon"` -> `"verloopt"`, `"expired"` -> `"verlopen"`
- Calculate `daysUntilExpiry` by diffing `expiryDate` against current date
- Format dates as Dutch locale strings (e.g., "10 jun 2023")

**Badges:**
- Section heading: "Badges" -- Heading typography
- Grid of badge cards: 2 columns mobile, 3-4 columns desktop
- Each badge card: shield-shaped icon container (using `ShieldProgress` at 100% with the badge's Lucide icon as overlay, variant="complete"), badge name (Subheading typography), badge description (Caption typography), earned date (Caption, `var(--uniform-tertiary)`)
- Data: `currentGuard.badges`
- Dynamically render Lucide icons from badge `icon` string field using a lookup map

#### Section 4: Cursusgeschiedenis (Course History)

- Section heading: "Cursusgeschiedenis" -- Heading typography
- Filter tabs: "Alles" | "Voltooid" | "Bezig" -- use shadcn `Tabs` component
- Table/list of courses that the guard is enrolled in (`currentGuard.enrolledCourseIds` matched against `courses`)
- Each row shows: course title, category (BadgeTag with category label), completion date (if completed), quiz average score (if available), status badge (BadgeTag: completed/active/overdue based on `course.status`)
- Use a responsive approach: on desktop show as a table with columns, on mobile show as stacked cards
- Sort: completed courses by `completedDate` descending, in-progress courses by `lastAccessedDate` descending
- Filter logic via `useState`:
  - "Alles": show all enrolled courses
  - "Voltooid": `course.status === "completed"`
  - "Bezig": `course.status === "in-progress"`

#### Section 5: Inzetgeschiedenis (Deployment History)

- Section heading: "Inzetgeschiedenis" -- Heading typography
- List of past events where status is "completed" from `events` data
- Use `DeploymentCard` (existing component) for each event
- Map event data to DeploymentCard props:
  - `eventName`: `event.name`
  - `dateRange`: format `startDate` - `endDate` as Dutch date range
  - `location`: `event.location`
  - `role`: `event.guardRole`
  - `linkedCourses`: map `event.requiredCourseIds` to course titles, mark as completed based on `course.status`
- Sort by `startDate` descending (most recent first)
- Show all 3 past deployments from mock data (Bevrijdingsdag, SAIL, Vierdaagse)

### Step 3: Verify

- Run `npx tsc --noEmit` to verify TypeScript compiles
- Run `npm run build` to verify production build succeeds
- Verify no hardcoded colors (except Recharts HSL values matching design tokens)
- Verify responsive layout at 375px, 768px, and 1280px widths

---

## Files Created/Modified

| File | Action | Purpose |
|------|--------|---------|
| `src/components/shared/skill-radar.tsx` | Create | Radar chart component using Recharts for skill visualization |
| `src/app/profiel/page.tsx` | Replace | Full profile page with 5 sections |

## Existing Components Used

| Component | From | Usage |
|-----------|------|-------|
| `CertCard` | `src/components/shared/cert-card.tsx` | Certification cards in Section 3 |
| `DeploymentCard` | `src/components/shared/deployment-card.tsx` | Deployment history in Section 5 |
| `StatsCard` | `src/components/shared/stats-card.tsx` | Profile header inline stats |
| `ShieldProgress` | `src/components/shared/shield-progress.tsx` | Badge shield icons in Section 3 |
| `BadgeTag` | `src/components/shared/badge-tag.tsx` | Category tags, status badges in Section 4 |
| `Avatar` | `src/components/ui/avatar.tsx` | Profile avatar |
| `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` | `src/components/ui/tabs.tsx` | Course history filter tabs |

## Existing Data Used

| Data | From | Usage |
|------|------|-------|
| `currentGuard` | `src/data/mock/guards.ts` | Profile data, certifications, badges, enrolled courses |
| `courses` | `src/data/mock/courses.ts` | Course history, skill calculation |
| `events` | `src/data/mock/events.ts` | Deployment history (past events) |
| `CATEGORIES` | `src/lib/constants.ts` | Category labels for radar chart axes |

## Test Cases

1. **TypeScript compiles**: `npx tsc --noEmit` passes with no errors
2. **Build succeeds**: `npm run build` completes successfully
3. **Radar chart renders**: SkillRadar shows 6 axes with amber fill area, responsive at all sizes
4. **Certifications sorted**: CertCards appear with soonest-expiring first (BHV Certificaat first since it expires 2026-03-27)
5. **Certification warnings**: BHV cert shows amber "Verloopt" badge and countdown text
6. **Course history filter**: Clicking "Voltooid" tab shows only completed courses, "Bezig" shows only in-progress
7. **Deployment history**: Shows 3 past events (Bevrijdingsdag, Vierdaagsefeesten, SAIL) with linked courses
8. **Profile stats**: Header shows 3 stats cards with correct values (8 courses, 82%, 1850 points)
9. **Responsive layout**: Sections stack vertically on mobile (<768px), use grid on desktop (>=1280px)
10. **Dutch content**: All labels, headings, and UI text are in Dutch
11. **Badges render**: 4 badges display with shield icons and earned dates
12. **No hardcoded colors**: Components use design system CSS variables exclusively (Recharts values excepted)

## Notes

- Recharts does not support CSS custom properties (`var(--x)`) as color values. Use the raw HSL values from the design system: `hsl(38, 92%, 50%)` for vest/amber, `hsl(222, 47%, 14%)` for uniform/navy, `hsla(220, 20%, 50%, 0.12)` for perimeter
- The `currentGuard` has 4 certifications, 4 badges, and 8 enrolled courses -- enough to make the page feel populated
- Past events from mock data: Bevrijdingsdag (May 2025), Vierdaagsefeesten (Jul 2025), SAIL Amsterdam (Aug 2025)
- Date formatting should use Dutch locale: `new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })`
- Lucide icon lookup for badges: create a simple map `{ GraduationCap, Award, Heart, Flame }` matching the `icon` strings in badge data
