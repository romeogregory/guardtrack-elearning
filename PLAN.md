# PLAN: TES-52 Course Detail & Lesson Page

## Objective

Build the Course Detail page (`/cursus/[id]`) -- the core learning environment. It contains a module sidebar/accordion, lesson content area, and 4 content-type components: video player placeholder, reading content, quiz question (with practice + test modes), and scenario exercise. This is the most complex page in the application.

## Dependencies

- **TES-45** (merged): Project scaffolding, design system tokens, shadcn/ui base components
- **TES-46** (merged): TypeScript types (`src/lib/types.ts`), mock data (`courses.ts`, `quiz-questions.ts`, `scenarios.ts`)
- **TES-47** (merged): Layout shell -- root layout with sidebar/bottom-tabs, top bar
- **TES-48** (merged): Shared components -- ShieldProgress, BadgeTag, CourseCard

## Acceptance Criteria

- Quiz practice mode ("Oefenmodus"): after selecting an answer, immediately shows correct/incorrect feedback with Dutch explanation, allows retrying wrong answers
- Quiz test mode ("Toetsmodus"): no per-question feedback, all answers collected, results shown at end with total score, pass/fail indicator, and per-question review
- Module sidebar shows clear course structure with completion states -- each lesson has a shield mini-icon (empty/half/full) and a type icon (video/reading/quiz/scenario)

---

## Key Data Observations

Lessons in `courses.ts` have structural data only (id, title, type, order, duration, completionStatus) -- NO `content` field populated. Quiz questions are in `quiz-questions.ts` (17 questions across 5 courses, matched by `courseId`). Scenarios are in `scenarios.ts` (5 scenarios, matched by `courseId`). Reading and video content must be generated inline since no content data exists for those lesson types.

---

## Implementation Steps

### Step 1: Create `src/components/shared/video-player-placeholder.tsx`

Placeholder video player component displayed for video-type lessons.

**Props:**
- `title: string` -- lesson/video title
- `durationMinutes: number` -- video duration
- `chapters?: Array<{ title: string; startTime: number }>` -- chapter markers
- `className?: string`

**Implementation details:**
- 16:9 aspect ratio container using `aspect-video` class
- Background: dark gradient (`var(--uniform)` to `var(--uniform-secondary)`) to resemble a video player
- Center: large play button circle (64px, `var(--vest)` background, white triangle icon using Lucide `Play`)
- Below play button: "Video niet beschikbaar in demo" text in `var(--uniform-muted)` color, Caption typography
- Bottom bar (simulating player controls):
  - Fake progress bar: thin line across full width, `var(--uniform-secondary)` track, 0% fill
  - Controls row: Play/Pause icon, time display "00:00 / {duration}", spacer, playback speed dropdown ("1x" default, options 0.5x/1x/1.5x/2x using a simple button group -- no actual functionality), captions toggle (CC icon button)
- Chapter markers section below the video: horizontal list of chapter titles with timestamps, styled as small clickable chips (`var(--briefing-elevated)` bg, `var(--perimeter)` border, `var(--radius-sm)`)
- Border: `var(--perimeter)`, radius: `var(--radius-lg)`
- "use client" directive needed for interactive control state (speed selection)

### Step 2: Create `src/components/shared/reading-content.tsx`

Rich reading content renderer for reading-type lessons. Since no reading content exists in mock data, this component accepts a `sections` prop and the page will pass inline content.

**Props:**
- `sections: ReadingSection[]` -- array of content sections (uses the `ReadingSection` type from `types.ts`)
- `className?: string`

**Implementation details:**
- Renders a list of sections based on the `type` discriminator:
  - `heading`: `<h2>` with Heading typography (20px/600), `var(--uniform)` color, margin-top `var(--space-8)`
  - `paragraph`: `<p>` with Body typography (15px/400), `var(--uniform-secondary)` color, line-height 1.7, margin-top `var(--space-4)`
  - `bullets`: `<ul>` with disc markers, items in Body typography, `var(--uniform-secondary)` color, left padding `var(--space-6)`, gap `var(--space-2)` between items
  - `info-callout`: Box with `var(--dispatch-light)` background, `var(--dispatch)` left border (3px), `var(--radius-md)` radius, padding `var(--space-4)`. Info icon (Lucide `Info`) in `var(--dispatch)` color. Text in Body typography.
  - `warning-callout`: Same layout as info but `var(--alert-light)` background, `var(--alert)` left border, AlertTriangle icon in `var(--alert)` color.
  - `checklist`: List of items with interactive checkboxes. Each item has a checkbox (shadcn-style square, `var(--vest)` when checked) and label text. Items can be toggled (client-side only, no persistence). "use client" needed.
  - `expandable`: Collapsible section using `expandableTitle` as trigger. Chevron icon rotates on open. Content revealed with height transition (`var(--duration-expand)`). Uses `var(--briefing-elevated)` background, `var(--perimeter)` border, `var(--radius-md)`.
- No wrapper card -- content flows naturally within the lesson content area
- "use client" directive for checklist and expandable interactivity

### Step 3: Create `src/components/shared/quiz-question.tsx`

Quiz component supporting two modes: Oefenmodus (practice) and Toetsmodus (test).

**Props:**
- `questions: QuizQuestion[]` -- array of quiz questions
- `passingScore: number` -- percentage to pass (e.g., 70)
- `onComplete?: (score: number, passed: boolean) => void` -- callback when quiz finishes
- `className?: string`

**State management (all `useState`):**
- `mode: "oefenmodus" | "toetsmodus"` -- current quiz mode
- `currentIndex: number` -- current question index
- `selectedOptionId: string | null` -- selected answer for current question
- `answered: boolean` -- whether current question has been answered (practice mode)
- `answers: Map<string, string>` -- all collected answers (question id -> option id)
- `showResults: boolean` -- whether to show end results (test mode)

**Implementation details:**

**Mode toggle (top of component):**
- Two tab buttons: "Oefenmodus" and "Toetsmodus"
- Uses shadcn Tabs component or custom toggle with `var(--vest)` active background, `var(--control-bg)` inactive
- Toggle resets the quiz when switching modes

**Progress indicator:**
- "Vraag {n} van {total}" text in Caption typography
- Progress bar (shadcn Progress) showing completion percentage, `var(--vest)` fill

**Question display:**
- If `situationDescription` exists: render it in a callout box (`var(--dispatch-light)` bg, `var(--dispatch)` left border) above the question text
- Question text: Heading typography (20px/600)
- Type indicator: small badge showing "Meerkeuze" or "Waar/Niet waar"

**Answer options:**
- Radio group layout (shadcn RadioGroup)
- Each option: card-style button with `var(--briefing-elevated)` background, `var(--perimeter)` border, `var(--radius-md)` radius
- Hover: `var(--vest-subtle)` background
- Selected: `var(--vest-light)` background, `var(--vest)` border
- Option text: Body typography

**Practice mode ("Oefenmodus") behavior:**
1. User selects an option -> "Controleer" (Check) button becomes active
2. User clicks "Controleer" -> `answered` set to true
3. If correct: selected option turns green (`var(--cleared-light)` bg, `var(--cleared)` border), checkmark icon
4. If incorrect: selected option turns red (`var(--alert-light)` bg, `var(--alert)` border), X icon; correct option highlighted green
5. Explanation box appears below: `var(--briefing-elevated)` card with `var(--perimeter)` border, showing the `explanation` text with a lightbulb icon
6. If incorrect: "Probeer opnieuw" (Try again) button resets the question. If correct: "Volgende vraag" (Next question) button
7. After last question: show completion summary

**Test mode ("Toetsmodus") behavior:**
1. User selects an option -> "Volgende" (Next) button becomes active
2. User clicks "Volgende" -> answer stored in `answers` map, move to next question
3. No feedback shown per question
4. After last question: `showResults` set to true

**Results view (test mode end screen):**
- Score: large Display typography (32px/700) showing "X van Y correct" and percentage
- Pass/fail indicator: if score >= passingScore, green "Geslaagd!" with checkmark; if below, red "Niet geslaagd" with X icon
- Passing score note: "Minimumscore: {passingScore}%"
- Per-question review: list of all questions with the user's answer and correct answer. Correct answers get green check, incorrect get red X with the correct answer shown
- "Opnieuw proberen" (Try again) button to restart the quiz

**Navigation:**
- "Vorige vraag" (Previous) and "Volgende vraag" (Next) buttons at bottom
- Previous disabled on first question
- On last question in test mode: button text changes to "Resultaten bekijken"
- "use client" directive required

### Step 4: Create `src/components/shared/scenario-exercise.tsx`

Practical scenario exercise component for scenario-type lessons.

**Props:**
- `scenario: Scenario` -- scenario data object (from types.ts)
- `onComplete?: (score: number) => void` -- callback when completed
- `className?: string`

**State management:**
- `selectedOptionId: string | null` -- selected response
- `submitted: boolean` -- whether response has been submitted
- `showExpert: boolean` -- whether expert explanation is expanded

**Implementation details:**

**Situation section:**
- If `eventContext` exists: small badge at top showing context (e.g., "Lowlands Festival, hoofdingang Alpha Stage") using BadgeTag variant="active"
- Title: Display typography or large Heading (24px/700)
- Situation description: Body typography (15px/400), `var(--uniform-secondary)`, in a bordered card (`var(--briefing-elevated)` bg, `var(--perimeter)` border, `var(--radius-lg)`)

**Response options:**
- Card-style options (like quiz but larger): each option is a selectable card with `var(--briefing-elevated)` bg, `var(--perimeter)` border, `var(--radius-lg)` radius
- Each option shows the option letter (A, B, C, D) in a circle at left, option text at right
- Hover: `var(--vest-subtle)` bg
- Selected: `var(--vest-light)` bg, `var(--vest)` border

**Submit button:**
- "Bekijk resultaat" (View result) -- disabled until option selected
- `var(--vest)` background, white text

**After submission -- feedback:**
- Selected option card updates: background becomes colored based on score
  - score >= 80: `var(--cleared-light)` bg, `var(--cleared)` border
  - score 40-79: `var(--caution-light)` bg, `var(--vest)` border
  - score < 40: `var(--alert-light)` bg, `var(--alert)` border
- The option's individual `feedback` text appears inside the selected card
- All other options also show their feedback text and score in muted style
- Best option highlighted with a star icon

**Score indicator:**
- Circular or shield indicator showing the score (0-100) from the selected option
- Color matched to score range (green/amber/red as above)
- "Jouw score: {score}/100" text

**Expert explanation section:**
- Collapsible card below the options: "Uitleg van de expert" header
- `expertExplanation` text in Body typography
- `var(--dispatch-light)` background, `var(--dispatch)` left border
- Auto-expanded after submission

**"use client" directive required**

### Step 5: Create `src/app/cursus/[id]/page.tsx`

The main course detail page. This is the most complex file -- it ties everything together.

**Architecture: "use client" page component**

The page receives `params.id`, finds the course from mock data, manages lesson navigation state, and renders the appropriate content component.

**Imports:**
- `courses` from `@/data/mock/courses`
- `quizQuestions` from `@/data/mock/quiz-questions`
- `scenarios` from `@/data/mock/scenarios`
- All 4 content components (VideoPlayerPlaceholder, ReadingContent, QuizQuestion, ScenarioExercise)
- ShieldProgress, BadgeTag from shared components
- Lucide icons: Video, BookOpen, HelpCircle, Target, ChevronLeft, ChevronRight, ChevronDown, Play, Clock, Layers, ArrowLeft
- `use` from React (for unwrapping params promise)
- `useState` from React

**State:**
- `activeLessonId: string` -- currently active lesson ID (default: first lesson of first module)
- `sidebarOpen: boolean` -- mobile sidebar/accordion open state
- `expandedModuleIds: Set<string>` -- which modules are expanded in the sidebar (default: module containing active lesson)

**Page sections:**

**A. Course Header (top):**
- Back link: "Terug naar catalogus" with ArrowLeft icon, links to `/catalogus`
- Course title: large heading (24px/700)
- Metadata row: category badge (BadgeTag), difficulty badge, mandatory/optional badge, duration with Clock icon, module count with Layers icon
- Overall progress: ShieldProgress (size="lg") with percentage label
- CTA button: "Start cursus" (if not started) or "Ga verder" (if in progress) or "Voltooid" (if completed), `var(--vest)` background

**B. Two-column layout (desktop: sidebar + content, mobile: stacked):**

**B1. Module Sidebar (desktop) / Accordion (mobile):**
- Desktop (>=768px): fixed-width left sidebar (280px), scrollable, sticky
- Mobile (<768px): collapsible accordion above the content area

- Module list: each module is a collapsible section
  - Module header: click to expand/collapse. Shows module order number, title, lesson count, and a small progress indicator (completed lessons / total lessons)
  - ChevronDown icon rotates when expanded, transition `var(--duration-state)`
  - Module containing the active lesson is expanded by default

- Lesson list (within expanded module):
  - Each lesson is a clickable row
  - Left: shield mini-icon (ShieldProgress size="sm"):
    - `completionStatus === 'completed'` -> variant="complete", progress=100
    - `completionStatus === 'in-progress'` -> variant="default", progress=50
    - `completionStatus === 'not-started'` -> variant="default", progress=0
  - Center: lesson title in Caption typography
  - Right: type icon (Lucide icons):
    - video -> `Video` icon
    - reading -> `BookOpen` icon
    - quiz -> `HelpCircle` icon
    - scenario -> `Target` icon
  - Active lesson: `var(--vest-light)` background, `var(--vest)` left border (3px), font-weight 600
  - Completed lesson: title in `var(--uniform-tertiary)` (muted)
  - Duration: small text below title showing minutes

- Sidebar surface: `var(--briefing-elevated)` bg, `var(--perimeter)` right border (desktop), `var(--radius-lg)` for mobile accordion cards

**B2. Lesson Content Area (main):**
- Renders the active lesson's content based on `lesson.type`
- Lesson header at top: lesson title (Heading, 20px/600), lesson type badge, duration

- **Video lesson:** Render `<VideoPlayerPlaceholder>` with the lesson title and duration. Generate chapter data inline:
  ```
  chapters: [
    { title: "Introductie", startTime: 0 },
    { title: "Kernconcepten", startTime: Math.floor(durationMinutes * 60 * 0.3) },
    { title: "Samenvatting", startTime: Math.floor(durationMinutes * 60 * 0.8) },
  ]
  ```

- **Reading lesson:** Render `<ReadingContent>` with inline-generated sections. Create a helper function `generateReadingSections(lessonTitle: string): ReadingSection[]` that produces plausible Dutch content based on the lesson title. Generate 5-7 sections per lesson: heading, 2 paragraphs, bullet list, info-callout, checklist, expandable. All text in Dutch and contextually relevant to the lesson title/topic.

- **Quiz lesson:** Filter `quizQuestions` by `courseId` matching the current course. Render `<QuizQuestion>` with those questions and `passingScore: 70`.

- **Scenario lesson:** Filter `scenarios` by `courseId` matching the current course. Render `<ScenarioExercise>` with the first matching scenario.

**C. Lesson Navigation (bottom of content area):**
- Two buttons: "Vorige les" (Previous) and "Volgende les" (Next)
- Previous: disabled on the first lesson of the first module, uses ChevronLeft icon
- Next: disabled on the last lesson of the last module, uses ChevronRight icon
- Navigation crosses module boundaries (last lesson of module N -> first lesson of module N+1)
- Progress bar for current module: thin bar showing how many lessons in the current module are completed
- Clicking next/previous updates `activeLessonId` and scrolls to top of content area

**Helper functions within the page:**
- `findLessonById(id: string)`: returns `{ module, lesson, moduleIndex, lessonIndex }` for the given lesson ID
- `getAdjacentLesson(direction: 'prev' | 'next')`: returns the previous or next lesson ID, crossing module boundaries
- `getLessonTypeIcon(type: LessonType)`: returns the appropriate Lucide icon component
- `generateReadingSections(title: string)`: generates plausible reading content sections based on lesson title

### Step 6: Verify the implementation

- Run `npx tsc --noEmit` to verify TypeScript compilation
- Run `npm run build` to verify build succeeds
- Verify no hardcoded color values in any of the 5 files
- Verify all components use design system tokens
- Verify responsive behavior: sidebar becomes accordion on mobile (<768px)
- Verify quiz both modes work correctly

---

## Files Created/Modified

| File | Purpose |
|------|---------|
| `src/components/shared/video-player-placeholder.tsx` | Placeholder 16:9 video player with controls UI, chapters, "niet beschikbaar in demo" message |
| `src/components/shared/reading-content.tsx` | Rich text renderer for headings, paragraphs, bullets, callouts, checklists, expandables |
| `src/components/shared/quiz-question.tsx` | Quiz with Oefenmodus (practice, instant feedback) and Toetsmodus (test, end results) |
| `src/components/shared/scenario-exercise.tsx` | Practical scenario with situation, response options, score, expert explanation |
| `src/app/cursus/[id]/page.tsx` | Course detail page with module sidebar/accordion, lesson content, navigation |

## Files NOT Modified

- `src/lib/types.ts` -- existing types are sufficient (ReadingSection, QuizQuestion, Scenario, etc.)
- `src/data/mock/*` -- no changes to mock data files
- `src/components/layout/*` -- no changes to layout shell
- `src/components/shared/shield-progress.tsx` -- reused as-is
- `src/components/shared/badge-tag.tsx` -- reused as-is

## Test Cases

1. **TypeScript compiles**: `npx tsc --noEmit` passes with no errors
2. **Build succeeds**: `npm run build` completes successfully
3. **Route works**: navigating to `/cursus/course-crowd-control` renders the course detail page
4. **Module sidebar**: all modules listed with correct lesson counts; clicking a lesson updates the content area
5. **Lesson type rendering**: video lessons show video placeholder, reading lessons show rich content, quiz lessons show quiz component, scenario lessons show scenario component
6. **Quiz practice mode**: selecting an answer and clicking "Controleer" shows immediate feedback (green/red), explanation text, retry button for wrong answers
7. **Quiz test mode**: selecting answers and clicking "Volgende" collects answers without feedback; after last question, results screen shows score, pass/fail, per-question review
8. **Quiz mode toggle**: switching between Oefenmodus and Toetsmodus resets the quiz
9. **Scenario exercise**: selecting a response and clicking "Bekijk resultaat" shows feedback for all options, score indicator, and expert explanation
10. **Lesson navigation**: "Vorige les" and "Volgende les" buttons navigate correctly, crossing module boundaries
11. **Mobile responsive**: at <768px, sidebar collapses to accordion; at >=768px, sidebar is a fixed left panel
12. **Active lesson highlight**: the active lesson in the sidebar has amber background and left border
13. **Shield completion states**: completed lessons show full green shield, in-progress show half amber, not-started show empty
14. **Course not found**: navigating to `/cursus/nonexistent-id` shows a friendly "Cursus niet gevonden" message
15. **No hardcoded colors**: no hex values, rgb(), or raw px outside design system in any of the 5 new files

## Notes

- All 4 content components need "use client" directive since they manage local state
- The page component itself needs "use client" for lesson navigation state and `use()` to unwrap params
- Reading content is generated inline (no mock data exists for it) -- the `generateReadingSections` helper creates contextually relevant Dutch content based on lesson title
- Quiz questions are matched to courses by `courseId` field -- not all courses have quiz questions in the mock data. If no questions match, show a "Geen vragen beschikbaar" message
- Similarly for scenarios -- not all courses have scenarios. Show "Geen scenario beschikbaar" if no match
- The module sidebar width (280px) is a fixed value on desktop; on mobile it becomes full-width accordion
- Lesson navigation crosses module boundaries seamlessly
- All user-facing text is in Dutch
- Use `cn()` from `@/lib/utils` for all conditional class composition
- Use Lucide icons exclusively
- Use design system CSS variables exclusively -- no hardcoded colors or spacing
