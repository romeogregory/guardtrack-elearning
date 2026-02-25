# Technical Spec: GuardTrack E-Learning Platform (Frontend)

## 1. Initiative Summary

### What
An internal e-learning platform for security guards who are deployed at events and festivals (Koningsdag, Lowlands, Zwarte Cross, etc.). Guards complete mandatory and optional training courses, track certifications, and prepare for upcoming deployments. This initial scope covers **frontend only** — 4 richly detailed pages with realistic Dutch mock data and no backend.

### Why
Security guards need continuous training for field deployments. Currently there is no centralized platform for managing their learning. This initiative establishes the frontend foundation — design system, component library, and page layouts — that can later be connected to a backend.

### End State
A fully navigable Next.js application with 4 pages (Dashboard, Catalogus, Cursus Detail, Profiel), responsive design (mobile + desktop), Dutch UI, rich mock data, interactive quiz functionality, and a cohesive design system built around the security/event domain.

### Scope Boundaries
- **In scope:** 4 frontend pages, design system tokens, shared components, mock data layer, responsive layouts, interactive quizzes (client-side only), Dutch language
- **Out of scope:** Backend/API, authentication, database, real video playback (use placeholder), file uploads, admin panel, team lead/supervisor views, multi-language (i18n), dark mode

---

## 2. Architecture Overview

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (customized with design system tokens)
- **Charts:** Recharts (for skills radar on profile)
- **Icons:** Lucide React
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Package Manager:** npm

### Project Structure
```
src/
  app/
    layout.tsx                    # Root layout — sidebar (desktop) + bottom tabs (mobile)
    page.tsx                      # Dashboard (home)
    catalogus/
      page.tsx                    # Course catalog
    cursus/
      [id]/
        page.tsx                  # Course detail with lessons
    profiel/
      page.tsx                    # User profile
    globals.css                   # Tailwind + design system CSS variables
  components/
    layout/
      app-sidebar.tsx             # Desktop sidebar navigation
      bottom-tabs.tsx             # Mobile bottom tab bar
      top-bar.tsx                 # Top bar with search + notifications
    shared/
      shield-progress.tsx         # Signature: shield-shaped progress indicator
      deployment-readiness.tsx    # Deployment readiness bar component
      course-card.tsx             # Reusable course card (catalog + dashboard)
      category-card.tsx           # Category card with icon
      badge-tag.tsx               # Status badges (mandatory, difficulty, etc.)
      notification-item.tsx       # Single notification row
      quiz-question.tsx           # Quiz question component (practice + test mode)
      quiz-results.tsx            # End-of-quiz results view
      scenario-exercise.tsx       # Practical scenario exercise component
      video-player-placeholder.tsx # Placeholder video player UI
      reading-content.tsx         # Rich text reading material component
      module-sidebar.tsx          # Course module/lesson navigation
      leaderboard-row.tsx         # Single leaderboard entry
      skill-radar.tsx             # Radar chart for skill levels
      cert-card.tsx               # Certification card with expiry
      deployment-card.tsx         # Past deployment entry
      stats-card.tsx              # Statistic display card
    ui/                           # shadcn/ui base components (Button, Card, Input, etc.)
  data/
    mock/
      guards.ts                   # Guard profiles (Dutch names)
      courses.ts                  # Course catalog (Dutch titles, categories)
      events.ts                   # Events/festivals (Koningsdag, Lowlands, etc.)
      certifications.ts           # Certifications with expiry dates
      notifications.ts            # Notification items
      leaderboard.ts              # Leaderboard rankings
      quiz-questions.ts           # Quiz question banks per course
      scenarios.ts                # Practical scenario exercises
      modules.ts                  # Course modules and lessons
  lib/
    types.ts                      # TypeScript interfaces for all data models
    utils.ts                      # Utility functions (date formatting, progress calc)
    constants.ts                  # App-wide constants (categories, difficulty levels)
public/
  images/                         # Placeholder images for courses, events
```

### Design System
Established at `.interface-design/system.md`. Resolvers MUST read it (Step 0.5) and apply its tokens.

Key tokens:
- **Palette:** Amber accent (`--vest`), navy text (`--uniform`), warm cream surfaces (`--briefing`)
- **Depth:** Subtle shadows (approachable)
- **Signature:** Shield-shaped progress indicators
- **Typography:** Plus Jakarta Sans
- **Radius:** 6-14px (friendly, not childish)
- **Spacing:** 4px base unit

---

## 3. Relevant Existing Code

### 3a. Existing Patterns
None — greenfield project.

### 3b. Reusable Code
None — greenfield project. shadcn/ui will provide base components (Button, Card, Input, Dialog, Tabs, Progress, Avatar, Badge, DropdownMenu, Sheet, Tooltip, ScrollArea).

### 3c. Naming Conventions
Establish the following:
- **Files:** kebab-case (`course-card.tsx`, `mock/guards.ts`)
- **Components:** PascalCase (`CourseCard`, `ShieldProgress`)
- **Functions/variables:** camelCase (`calculateProgress`, `courseData`)
- **CSS variables:** kebab-case with domain prefix (`--vest`, `--uniform`, `--briefing`)
- **Routes:** Dutch lowercase (`/catalogus`, `/cursus/[id]`, `/profiel`)
- **Mock data:** Dutch content, English code identifiers

### 3d. Database Schema
Not applicable — frontend only, mock data.

### 3e. Design System & Tokens
Full design system established at `.interface-design/system.md`. Key decisions:

- **Depth:** Subtle shadows — approachable products
- **Spacing:** 4px base, scale: 4/8/12/16/20/24/32/40/48/64
- **Colors:** Amber vest accent, navy uniform text, warm cream briefing surfaces
- **Typography:** Plus Jakarta Sans — sturdy, warm, readable
- **Radius:** sm(6) / md(10) / lg(14) / xl(20) / full(9999)
- **Patterns:** Shield progress indicator, deployment readiness bar, course cards with metadata

---

## 4. Files to Modify/Create

Since this is greenfield, all files are new. See Section 2 (Project Structure) for the complete file tree.

### Critical New Files

| File | Purpose | Pattern | Depends On |
|---|---|---|---|
| `src/app/globals.css` | Design system CSS vars + Tailwind config | CSS custom properties from system.md | — |
| `src/app/layout.tsx` | Root layout with responsive navigation | Next.js App Router layout | shadcn/ui Sheet |
| `src/components/layout/app-sidebar.tsx` | Desktop sidebar (same bg as canvas, border separation) | Collapsible sidebar, icon + label nav items | — |
| `src/components/layout/bottom-tabs.tsx` | Mobile bottom tab bar (4 tabs) | Fixed bottom, active amber accent | — |
| `src/components/layout/top-bar.tsx` | Top bar with search + notification bell + avatar | Sticky, warm cream background | — |
| `src/components/shared/shield-progress.tsx` | Signature shield-shaped progress indicator | SVG shield path with fill level | — |
| `src/components/shared/course-card.tsx` | Rich course card (thumbnail, metadata, shield, tags) | Card pattern from system.md | shield-progress, badge-tag |
| `src/components/shared/quiz-question.tsx` | Quiz component with practice + test modes | State machine: question → answer → feedback | — |
| `src/data/mock/courses.ts` | 12-15 courses with Dutch titles, descriptions | Typed mock data | types.ts |
| `src/data/mock/events.ts` | 6-8 Dutch events/festivals | Typed mock data | types.ts |
| `src/lib/types.ts` | All TypeScript interfaces | Central type definitions | — |
| `src/app/page.tsx` | Dashboard — progress, deployments, notifications, leaderboard | Briefing-style layout | All shared components |
| `src/app/catalogus/page.tsx` | Course catalog — search, filters, categories, grid | Search + filter + grid layout | course-card, category-card |
| `src/app/cursus/[id]/page.tsx` | Course detail — modules, content, quizzes, scenarios | Tabbed/stepped lesson view | quiz-question, video-player, etc. |
| `src/app/profiel/page.tsx` | User profile — certs, history, radar, deployments | Profile sections layout | skill-radar, cert-card, etc. |

---

## 5. Test Strategy

Frontend-only testing:
- **Component tests:** Not in initial scope (defer to after design validation)
- **Visual validation:** Manual review of all 4 pages at mobile (375px), tablet (768px), and desktop (1280px) breakpoints
- **Interactive testing:** Quiz flow (practice + test mode), navigation between pages, search/filter on catalog
- **Accessibility:** Keyboard navigation on all interactive elements, proper ARIA labels, color contrast compliance

---

## 6. State Management Design

All state is client-side with React hooks:
- **Quiz state:** `useState` per quiz instance (current question, answers, mode, score)
- **Catalog filters:** `useState` for search query, category, difficulty filters; `useMemo` for filtered results
- **Navigation:** Next.js App Router (URL-based routing, no client state needed)
- **Mock data:** Imported directly as TypeScript modules (no fetching, no loading states needed for initial scope)
- **Course progress:** Calculated from mock data, not tracked (no persistence)

---

## 7. Dependencies & Required Tools

### npm packages
| Package | Version | Purpose |
|---|---|---|
| `next` | ^15 | Framework |
| `react` / `react-dom` | ^19 | UI library |
| `typescript` | ^5.7 | Type safety |
| `tailwindcss` | ^4 | Styling |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin for Tailwind 4 |
| `lucide-react` | latest | Icon set |
| `recharts` | ^2 | Radar chart for skills profile |
| `class-variance-authority` | latest | Component variant management (shadcn) |
| `clsx` | latest | Conditional class names |
| `tailwind-merge` | latest | Merge Tailwind classes |

### shadcn/ui components to install
Button, Card, Input, Badge, Tabs, Progress, Avatar, DropdownMenu, Sheet, Tooltip, ScrollArea, Dialog, Separator, RadioGroup, Label

### External resources
- Google Fonts: Plus Jakarta Sans (400, 500, 600, 700)
- Placeholder images: Use gradient/pattern SVGs for course thumbnails (no external image service)

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Shield SVG complexity | Medium | Keep shield path simple — a basic shield silhouette, not ornate heraldry |
| Radar chart responsiveness | Medium | Use Recharts ResponsiveContainer, test at all breakpoints |
| Tailwind 4 breaking changes | Low | Pin version, follow official migration guide |
| Mock data volume | Low | Start with 12-15 courses, 6-8 events — enough to feel real, not overwhelming |
| Dutch typography edge cases | Low | Test with long Dutch compound words in all card layouts |

---

## 9. Out of Scope

- Backend API / database / authentication
- Real video playback (placeholder UI only)
- File downloads (PDF links are visual only)
- Push notifications
- Admin / supervisor views
- Multi-language (i18n infrastructure)
- Dark mode
- Actual progress persistence (all data is mock)
- Deployment to production
- E2E / unit tests (defer to post-design-validation)

---

## 10. Implementation Tasks

### Task 1: Project Scaffolding & Design System Setup
**Size:** M (6 files)
**Priority:** P0 — everything depends on this
**Dependencies:** None
**Labels:** Frontend

**Description:**
Initialize a Next.js 15 project with TypeScript, Tailwind CSS 4, and shadcn/ui. Configure the design system tokens from `.interface-design/system.md` as CSS custom properties. Install Plus Jakarta Sans. Set up the project file structure.

**Files to create:**
1. `package.json` — Next.js 15 + all dependencies from Section 7
2. `tsconfig.json` — TypeScript config with path aliases
3. `next.config.ts` — Next.js configuration
4. `postcss.config.mjs` — PostCSS with Tailwind 4
5. `src/app/globals.css` — Tailwind directives + ALL design system CSS variables from system.md (colors, spacing, shadows, radii, typography)
6. `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

**Also:** Install shadcn/ui components listed in Section 7. Configure Tailwind to use the custom CSS variables.

**Acceptance criteria:**
- `npm run dev` starts without errors
- Plus Jakarta Sans loads as the default font
- Design system tokens are available as CSS variables and Tailwind utilities
- shadcn/ui components render with the custom theme (amber accent, warm surfaces)

---

### Task 2: TypeScript Types & Mock Data Layer
**Size:** M (8 files)
**Priority:** P0 — pages depend on this
**Dependencies:** Task 1
**Labels:** Frontend

**Description:**
Define all TypeScript interfaces for the data model and create rich, realistic Dutch mock data. The mock data should feel like a real security training company — Dutch guard names, real Dutch festivals/events, realistic certification names, and proper Dutch course titles and descriptions.

**Files to create:**
1. `src/lib/types.ts` — Interfaces: `Guard`, `Course`, `CourseModule`, `Lesson`, `QuizQuestion`, `Scenario`, `Event`, `Certification`, `Badge`, `Notification`, `LeaderboardEntry`, `Category`, `Deployment`
2. `src/lib/constants.ts` — Course categories (Crowd Control, EHBO, Communicatie, Toegangscontrole, Brandveiligheid, Noodprocedures), difficulty levels (Beginner, Gemiddeld, Gevorderd), course statuses
3. `src/data/mock/guards.ts` — Current guard profile (Jan de Vries) + 8-10 other guards for leaderboard
4. `src/data/mock/courses.ts` — 12-15 courses with Dutch titles, descriptions, modules, durations, categories, difficulty, mandatory/optional flag, thumbnail placeholder
5. `src/data/mock/events.ts` — 6-8 upcoming and past Dutch events (Koningsdag Amsterdam, Lowlands Festival, Zwarte Cross, Bevrijdingsdag, Mysteryland, SAIL Amsterdam, Vierdaagsefeesten)
6. `src/data/mock/notifications.ts` — 8-10 notifications (overdue courses, new assignments, expiring certs, event announcements)
7. `src/data/mock/quiz-questions.ts` — 3-4 questions per course for 4-5 courses (mix of multiple choice, true/false, scenario-based)
8. `src/data/mock/scenarios.ts` — 4-5 practical scenario exercises (crowd surge response, medical emergency at festival, aggressive visitor de-escalation, evacuation procedure, lost child protocol)

**Acceptance criteria:**
- All types are well-documented with JSDoc comments
- Mock data is realistic and fully Dutch (names, events, certifications)
- At least 3 courses are mandatory with deadlines tied to upcoming events
- Each course has 3-5 modules with lessons
- Quiz questions have correct answers and explanations (in Dutch)
- Scenarios have situation description, multiple response options, and feedback

---

### Task 3: Layout Shell & Navigation
**Size:** M (5 files)
**Priority:** P0 — all pages render within this layout
**Dependencies:** Task 1
**Labels:** Frontend

**Description:**
Build the responsive app shell: desktop sidebar (same background as canvas, border separation, collapsible), mobile bottom tab bar (4 tabs: Dashboard, Catalogus, Cursus, Profiel), and top bar (search field, notification bell with badge count, user avatar). Active navigation state uses amber accent on icon + label.

**Files to create:**
1. `src/app/layout.tsx` — Root layout that switches between sidebar (≥768px) and bottom tabs (<768px). Includes top bar. Wraps children in main content area with proper padding.
2. `src/components/layout/app-sidebar.tsx` — Desktop sidebar: logo at top, 4 nav items with Lucide icons (LayoutDashboard, BookOpen, GraduationCap, User), active amber accent, collapsible to icon-only, same background as canvas with right border
3. `src/components/layout/bottom-tabs.tsx` — Mobile: fixed bottom bar, 4 tabs matching sidebar items, active amber accent, notification badge on relevant tab
4. `src/components/layout/top-bar.tsx` — Sticky top: page title (dynamic), search input, notification bell (with unread count badge), user avatar dropdown
5. `src/components/shared/notification-item.tsx` — Single notification row (icon, message, time ago, read/unread state)

**Acceptance criteria:**
- Sidebar visible ≥768px, bottom tabs visible <768px
- Active page highlighted with amber accent
- Sidebar collapses to icon-only with toggle button
- Notification bell shows unread count badge
- Top bar search input styled per design system
- Smooth transitions between collapsed/expanded sidebar
- Navigation links work (even if pages are placeholder)

---

### Task 4: Shared Components
**Size:** L (9 files)
**Priority:** P1 — pages use these components
**Dependencies:** Task 1, Task 2
**Labels:** Frontend

**Description:**
Build all shared components that are used across multiple pages. Every component must follow the design system tokens. The shield progress indicator is the signature element — it must feel unique to this product.

**Files to create:**
1. `src/components/shared/shield-progress.tsx` — SVG shield shape with animated fill level (0-100%), optional icon/number overlay, sizes (sm/md/lg), color variants (amber default, green for complete, red for overdue)
2. `src/components/shared/deployment-readiness.tsx` — Horizontal bar: event name + date on left, required course shields in a row, overall status badge (Gereed/Bezig/Verlopen), warm amber gradient background when complete
3. `src/components/shared/course-card.tsx` — Rich card: placeholder thumbnail area (gradient based on category), title, duration + difficulty badge, shield progress (bottom-right corner), mandatory/optional tag, category icon, enrollment count. Hover lifts shadow.
4. `src/components/shared/category-card.tsx` — Category card: large icon, category name, course count, warm accent on hover. Used in catalog grid.
5. `src/components/shared/badge-tag.tsx` — Versatile badge/tag: variants for mandatory (amber), optional (gray), difficulty levels (green/amber/red), status (active/completed/overdue), certification validity. Uses design system semantic colors.
6. `src/components/shared/stats-card.tsx` — Statistic display: large number (Display type), label (Caption type), optional trend indicator (up/down arrow with percentage), optional icon. Used on dashboard.
7. `src/components/shared/leaderboard-row.tsx` — Row: rank number (1-3 get medal icons), avatar, guard name, points, badges earned count, streak indicator (flame icon). Current user row highlighted.
8. `src/components/shared/cert-card.tsx` — Certification card: cert name, issuing body, earned date, expiry date with countdown, status badge (Geldig/Verloopt Binnenkort/Verlopen), shield icon.
9. `src/components/shared/deployment-card.tsx` — Past deployment entry: event name, date range, location, role, linked courses that were required, status badge.

**Acceptance criteria:**
- Shield progress animates fill on mount (CSS transition)
- All components are responsive (work at 375px and 1280px)
- Components use design system tokens exclusively (no hardcoded colors)
- Shield progress is visually distinctive — clearly a shield, not a circle or bar
- Course card hover state transitions shadow smoothly (150ms)
- Badge/tag variants cover all use cases (mandatory, difficulty, status, cert validity)
- All text content uses the established typography scale

---

### Task 5: Dashboard Page
**Size:** L (1 page file, uses shared components)
**Priority:** P1
**Dependencies:** Task 2, Task 3, Task 4
**Labels:** Frontend

**Description:**
Build the Dashboard (home page) with a briefing-style layout. This is the first thing a guard sees — it should immediately answer "What do I need to do?" and "Am I ready for my next deployment?"

**File to create/modify:**
1. `src/app/page.tsx` — Full dashboard page

**Page sections (top to bottom):**

1. **Greeting + Deployment Readiness** — "Goedemorgen, Jan" with date. Below: the deployment readiness bar for the next upcoming event. Shows which mandatory courses still need completion. This is the hero section.

2. **Mijn Cursussen (My Courses)** — Horizontal scrollable row of course cards showing courses the guard is enrolled in. Each card shows shield progress. "Ga verder" (Continue) button on each. Filter tabs: Alles / Verplicht / Optioneel.

3. **Aankomende Inzetten (Upcoming Deployments)** — Timeline/calendar view of next 3-4 events with dates, locations, and linked required training status. Each event shows small shield indicators for required courses (completed/in-progress/not-started).

4. **Meldingen (Notifications)** — Last 5 notifications: overdue courses (red), new assignments (blue), expiring certifications (amber), announcements. "Bekijk alle meldingen" link.

5. **Klassement (Leaderboard)** — Top 5 guards by points. Current user highlighted even if not in top 5. Medals for top 3. Points, badges count, streak.

6. **Statistieken (Stats)** — 4 stats cards in a grid: Cursussen Voltooid (courses completed), Gemiddelde Score (avg quiz score), Actieve Streak (day streak), Certificaten (valid certs count). Each with trend indicator.

**Acceptance criteria:**
- Deployment readiness bar prominently positioned at top
- Course cards scroll horizontally on mobile, grid on desktop
- Upcoming events show clear connection between event and required training
- Leaderboard highlights current user
- Stats cards use Display typography for numbers
- All content is in Dutch
- Responsive: stacks vertically on mobile, uses grid on desktop
- Empty states: if no upcoming events, show encouraging message

---

### Task 6: Course Catalog Page
**Size:** M (1 page file + 1 component)
**Priority:** P1
**Dependencies:** Task 2, Task 3, Task 4
**Labels:** Frontend

**Description:**
Build the Course Catalog page with search, filtering, category browsing, and a recommended section. Guards should be able to quickly find relevant training — especially mandatory courses for their upcoming deployments.

**Files to create/modify:**
1. `src/app/catalogus/page.tsx` — Full catalog page
2. `src/components/shared/search-filter-bar.tsx` — Combined search input + filter dropdowns (category, difficulty, status, type mandatory/optional)

**Page sections (top to bottom):**

1. **Page Header** — "Cursuscatalogus" title with subtitle showing total course count.

2. **Search + Filters** — Search bar (prominently sized, placeholder: "Zoek een cursus..."), filter pills/dropdowns: Categorie (all categories from constants), Niveau (Beginner/Gemiddeld/Gevorderd), Type (Alles/Verplicht/Optioneel), Status (Alles/Niet gestart/Bezig/Voltooid). Active filters shown as dismissible chips.

3. **Aanbevolen voor jou (Recommended for You)** — Horizontal section of 3-4 courses recommended based on upcoming deployments and incomplete skills. Each has a reason tag ("Verplicht voor Lowlands", "Versterk je EHBO kennis").

4. **Categorieën (Categories)** — Grid of category cards (6 categories): Crowd Control, EHBO (First Aid), Communicatie, Toegangscontrole (Access Control), Brandveiligheid (Fire Safety), Noodprocedures (Emergency Procedures). Each with icon, name, course count. Clicking filters the grid below.

5. **Alle Cursussen (All Courses)** — Grid of course cards (3 columns desktop, 2 tablet, 1 mobile). Filtered by search + active filters. Shows all 12-15 courses. Each card links to `/cursus/[id]`.

6. **Results state** — When filters produce no results, show friendly empty state: "Geen cursussen gevonden" with suggestion to broaden filters.

**Acceptance criteria:**
- Search filters courses by title and description (client-side)
- Filters work in combination (category + difficulty + type)
- Active filters shown as chips that can be dismissed
- Category cards filter the course grid when clicked
- Recommended section shows contextual reason for each recommendation
- Course cards link to course detail page
- Responsive grid adapts columns per breakpoint
- Empty state when no results match filters

---

### Task 7: Course Detail & Lesson Page
**Size:** L (1 page file + 4 component files)
**Priority:** P1
**Dependencies:** Task 2, Task 3, Task 4
**Labels:** Frontend

**Description:**
Build the Course Detail page — the most complex page. It serves as the learning environment where guards consume content (video, reading, quizzes, scenarios). The page has a module sidebar showing course structure, and the main content area displays the active lesson. Quizzes support both practice mode (instant feedback) and test mode (end-of-quiz scoring).

**Files to create/modify:**
1. `src/app/cursus/[id]/page.tsx` — Course detail page with module navigation and lesson content area
2. `src/components/shared/video-player-placeholder.tsx` — Placeholder video player: 16:9 aspect ratio container with play button overlay, chapter markers below, playback speed selector, captions toggle. Shows "Video niet beschikbaar in demo" message.
3. `src/components/shared/reading-content.tsx` — Rich reading content renderer: headings, paragraphs, bullet lists, info callout boxes, warning callout boxes, checklist items (checkable), expandable "Meer informatie" sections
4. `src/components/shared/quiz-question.tsx` — Quiz question component with two modes:
   - **Oefenmodus (Practice):** Show question → user selects answer → instant feedback (correct/incorrect + explanation) → next question. Can retry wrong answers.
   - **Toetsmodus (Test):** Show question → user selects answer → next question (no feedback) → results at end with score, pass/fail, per-question review.
   Multiple choice and true/false question types. Scenario-based questions show a situation description before the options.
5. `src/components/shared/scenario-exercise.tsx` — Practical scenario component: situation description (with context like "Je bent geplaatst bij de hoofdingang van Lowlands Festival..."), multiple response options, user selects approach, feedback with expert explanation of best practice, "Hoe deed je het?" score indicator.

**Page layout:**

- **Course Header:** Course title, category badge, difficulty badge, mandatory/optional tag, duration, module count, overall progress (shield indicator). "Start cursus" / "Ga verder" button.

- **Module Sidebar (desktop) / Accordion (mobile):** Collapsible list of modules, each containing lessons. Shows completion state per lesson (shield mini icons: empty, half, full). Current lesson highlighted. Lesson types indicated by icon (video, reading, quiz, scenario).

- **Lesson Content Area:** Renders the appropriate component based on lesson type:
  - Video lesson → video-player-placeholder
  - Reading lesson → reading-content
  - Quiz lesson → quiz-question (with mode toggle: Oefenmodus / Toetsmodus)
  - Scenario lesson → scenario-exercise

- **Lesson Navigation:** Previous/Next lesson buttons at bottom. Progress bar for current module.

**Acceptance criteria:**
- Module sidebar shows clear course structure with completion states
- Switching between lessons updates content area smoothly
- Quiz practice mode: immediate feedback with explanation per question
- Quiz test mode: no per-question feedback, results shown at end with score
- Quiz mode toggle clearly visible (Oefenmodus / Toetsmodus tabs)
- Scenario exercises show contextual Dutch festival/event situations
- Video placeholder looks like a real video player (not a blank box)
- Reading content supports all rich text elements (callouts, checklists, expandables)
- Previous/Next buttons navigate lessons within and across modules
- Progress updates in module sidebar as lessons are "completed"
- Responsive: sidebar becomes accordion on mobile
- All content is in Dutch

---

### Task 8: User Profile Page
**Size:** M (1 page file + 1 component)
**Priority:** P1
**Dependencies:** Task 2, Task 3, Task 4
**Labels:** Frontend

**Description:**
Build the User Profile page showing the guard's certifications, course history, deployment history, and a skills radar chart. This is the guard's "personal record" — it should feel accomplishment-focused and encouraging.

**Files to create/modify:**
1. `src/app/profiel/page.tsx` — Full profile page
2. `src/components/shared/skill-radar.tsx` — Radar/spider chart showing skill levels across 6 categories (Crowd Control, EHBO, Communicatie, Toegangscontrole, Brandveiligheid, Noodprocedures). Uses Recharts RadarChart. Amber fill, navy outline.

**Page sections (top to bottom):**

1. **Profile Header** — Large avatar (initials-based, amber background), full name, role ("Beveiligingsmedewerker"), company, member since date. 3 key stats inline: Cursussen Voltooid, Gemiddelde Score, Totaal Punten.

2. **Vaardigheden (Skills Radar)** — Radar chart showing competency levels (0-100) across 6 skill categories. Calculated from completed courses in each category. Clean amber fill with slight transparency, navy axis lines. Legend below.

3. **Certificaten & Badges (Certifications & Badges)** — Two sub-sections:
   - **Certificaten:** Grid of cert cards with name, earned date, expiry date, validity status. Sort by expiry (soonest first). Expiring soon gets amber warning, expired gets red alert.
   - **Badges:** Grid of earned achievement badges (shield-shaped): "Eerste Cursus", "5 Cursussen Voltooid", "Perfect Score", "30 Dagen Streak", "EHBO Expert", "Nachtdienst Veteraan". Each with name, date earned, shield icon.

4. **Cursusgeschiedenis (Course History)** — Table/list of completed and in-progress courses: course name, category, completion date, score (quiz average), status badge. Sortable by date or score. Filter tabs: Alles / Voltooid / Bezig.

5. **Inzetgeschiedenis (Deployment History)** — List of past events worked: event name, date range, location, role at event, linked training courses. Most recent first. Shows 5-6 past deployments.

**Acceptance criteria:**
- Radar chart renders correctly with 6 axes and is responsive
- Certifications sorted by expiry, visual warning for expiring/expired
- Badges use shield shape consistent with signature element
- Course history is filterable (all/completed/in-progress)
- Deployment history shows connection between events and training
- Profile header stats use Display typography
- All content is in Dutch
- Responsive: sections stack on mobile, use grid on desktop
