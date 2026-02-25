# PLAN: TES-51 Course Catalog Page

## Objective

Build the Course Catalog page (`/catalogus`) with search, multi-filter support, category browsing, a recommended section, and a responsive course grid. Also create a reusable `search-filter-bar` component. Guards should quickly find relevant training -- especially mandatory courses for upcoming deployments.

## Dependencies

- **TES-45** (merged): Project scaffolding, design system tokens in `globals.css`, shadcn/ui base components
- **TES-46** (merged): TypeScript types (`src/lib/types.ts`), constants (`src/lib/constants.ts`), mock data (`src/data/mock/courses.ts`, `src/data/mock/events.ts`, `src/data/mock/guards.ts`)
- **TES-47** (merged): Layout shell (`src/components/layout/layout-shell.tsx`), sidebar, bottom tabs, top bar
- **TES-48** (merged): Shared components -- `CourseCard`, `CategoryCard`, `BadgeTag`, `ShieldProgress`

## Acceptance Criteria

- Search filters courses by title and description in real-time (client-side, case-insensitive)
- Filters work in combination -- selecting a category AND a difficulty level narrows results correctly
- When filters produce no results, a friendly empty state is shown: "Geen cursussen gevonden" with a suggestion to broaden filters

---

## Implementation Steps

### Step 0: Read the design system

Read `.interface-design/system.md` and verify all design tokens are available. Confirm existing components (`CourseCard`, `CategoryCard`, `BadgeTag`) match the design system.

### Step 1: Create `src/components/shared/search-filter-bar.tsx`

A combined search input + filter controls component. Reusable across pages.

**Props:**
- `searchQuery: string` -- current search value
- `onSearchChange: (query: string) => void` -- search change handler
- `filters: FilterState` -- current filter state object
- `onFilterChange: (filters: FilterState) => void` -- filter change handler
- `courseCount: number` -- total filtered results count for display
- `className?: string`

**FilterState type** (define in the component file or inline):
```ts
interface FilterState {
  category: CourseCategory | null;
  difficulty: DifficultyLevel | null;
  type: 'all' | 'mandatory' | 'optional';
  status: CourseStatus | null;
}
```

**Implementation details:**
- `"use client"` -- uses controlled input state and event handlers
- Search bar: shadcn `Input` with Search icon (Lucide `Search`), placeholder "Zoek een cursus...", full width on mobile, max-width ~480px on desktop
- Filter controls: row of dropdown/select buttons for each filter dimension:
  - **Categorie**: all 6 categories from `CATEGORIES` constant, plus "Alle" option
  - **Niveau**: Beginner / Gemiddeld / Gevorderd from `DIFFICULTY_LEVELS`, plus "Alle" option
  - **Type**: Alles / Verplicht / Optioneel (hardcoded, not from constants)
  - **Status**: Alle / Niet gestart / Bezig / Voltooid from `COURSE_STATUSES`
- Each filter renders as a styled `<select>` element using design system tokens for simplicity
- **Active filters as dismissible chips**: below the filter row, render a chip for each active (non-default) filter. Each chip shows the filter label and an X button (Lucide `X` icon) to clear that specific filter. Use `BadgeTag` variant="active" as the chip base with an added X button.
- Responsive layout: on mobile (<768px), search input full-width on its own row, filters wrap below. On desktop, search + filters on one or two rows.
- Colors: input border `var(--control-border)`, focus ring `var(--perimeter-focus)`, filter buttons use `var(--control-bg)` background
- Spacing: `var(--space-3)` gap between filter elements, `var(--space-4)` gap between search row and filter row

### Step 2: Create `src/app/catalogus/page.tsx`

Replace the existing placeholder with the full catalog page. This is a `"use client"` component because it uses `useState` and `useMemo` for filtering.

**State:**
```ts
const [searchQuery, setSearchQuery] = useState('');
const [filters, setFilters] = useState<FilterState>({
  category: null,
  difficulty: null,
  type: 'all',
  status: null,
});
```

**Filtering logic** (in a `useMemo`):
```ts
const filteredCourses = useMemo(() => {
  return courses.filter(course => {
    // Search: match title OR description, case-insensitive
    const query = searchQuery.toLowerCase();
    if (query && !course.title.toLowerCase().includes(query) && !course.description.toLowerCase().includes(query)) {
      return false;
    }
    // Category filter
    if (filters.category && course.category !== filters.category) return false;
    // Difficulty filter
    if (filters.difficulty && course.difficulty !== filters.difficulty) return false;
    // Type filter (mandatory/optional)
    if (filters.type === 'mandatory' && !course.isMandatory) return false;
    if (filters.type === 'optional' && course.isMandatory) return false;
    // Status filter
    if (filters.status && course.status !== filters.status) return false;
    return true;
  });
}, [searchQuery, filters]);
```

**Page sections (top to bottom):**

#### Section 1: Page Header
- Title: "Cursuscatalogus" -- use large heading (e.g., 28px/700, `var(--uniform)`)
- Subtitle: total course count -- e.g., "15 cursussen beschikbaar" using Caption typography (13px/500, `var(--uniform-tertiary)`)
- Padding: `var(--space-6)` bottom margin

#### Section 2: Search + Filters
- Render the `SearchFilterBar` component with state bindings
- Margin bottom: `var(--space-8)`

#### Section 3: Aanbevolen voor jou (Recommended for You)
- Only shown when no search query is active and no filters are applied (default state)
- Show 3-4 courses that are recommended based on:
  1. Mandatory courses for upcoming events that are not yet completed (highest priority)
  2. Courses in categories where the guard has low completion (secondary)
- Each recommended course card uses the existing `CourseCard` component wrapped in a container that adds a **reason tag** below or overlaying the card -- e.g., "Verplicht voor Koningsdag", "Versterk je EHBO kennis"
- Reason tags: use `BadgeTag` variant="mandatory" for event-linked, variant="active" for skill-based
- Layout: horizontal scroll on mobile, 4-column grid on desktop (or 3 if only 3 recommendations)
- Section title: "Aanbevolen voor jou" -- Heading typography
- Margin bottom: `var(--space-8)`

**Recommendation logic:**
```ts
const recommendations = useMemo(() => {
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const recs: Array<{ course: Course; reason: string }> = [];

  // Priority 1: Mandatory incomplete courses for upcoming events
  for (const event of upcomingEvents) {
    for (const courseId of event.requiredCourseIds) {
      const course = courses.find(c => c.id === courseId && c.status !== 'completed');
      if (course && !recs.find(r => r.course.id === course.id)) {
        recs.push({ course, reason: `Verplicht voor ${event.name}` });
      }
      if (recs.length >= 4) break;
    }
    if (recs.length >= 4) break;
  }

  // Priority 2: Fill remaining slots with courses in weak categories
  if (recs.length < 4) {
    const notEnrolled = courses.filter(
      c => !currentGuard.enrolledCourseIds.includes(c.id) && !recs.find(r => r.course.id === c.id)
    );
    for (const course of notEnrolled) {
      const catLabel = CATEGORIES.find(cat => cat.id === course.category)?.label;
      recs.push({ course, reason: `Versterk je ${catLabel} kennis` });
      if (recs.length >= 4) break;
    }
  }

  return recs;
}, []);
```

#### Section 4: Categorieen (Categories)
- Only shown when no category filter is active (hide when a category is already selected to avoid redundancy)
- Grid of 6 `CategoryCard` components, one per category from `CATEGORIES`
- Course count per category: computed from `courses` array by filtering per category
- Clicking a category card sets `filters.category` to that category
- The active category card uses `isActive` prop
- Grid: 3 columns on desktop, 2 columns on tablet, 2 columns on mobile
- Gap: `var(--space-4)`
- Section title: "Categorieen" -- Heading typography
- Margin bottom: `var(--space-8)`

**Category counts:**
```ts
const categoryCounts = useMemo(() => {
  const counts: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    counts[cat.id] = courses.filter(c => c.category === cat.id).length;
  }
  return counts;
}, []);
```

#### Section 5: Alle Cursussen (All Courses)
- Section title: "Alle Cursussen" with filtered count -- e.g., "Alle Cursussen (12)"
- Grid of `CourseCard` components rendered from `filteredCourses`
- Each card's `onClick` navigates to `/cursus/${course.id}` using Next.js `useRouter`
- Grid: 3 columns desktop (>=1024px), 2 columns tablet (>=768px), 1 column mobile (<768px)
- Gap: `var(--space-5)`
- Uses CSS grid with responsive columns

#### Section 6: Empty State
- Shown when `filteredCourses.length === 0`
- Centered container with:
  - Search icon (Lucide `SearchX` or `Search` with muted color), size 48
  - Title: "Geen cursussen gevonden" -- Heading typography, `var(--uniform)`
  - Subtitle: "Probeer andere zoektermen of pas je filters aan" -- Body typography, `var(--uniform-tertiary)`
  - "Wis alle filters" button (shadcn `Button` variant="outline") that resets search and all filters
- Padding: `var(--space-16)` vertical
- Background: `var(--briefing-elevated)`, radius: `var(--radius-lg)`, border: `var(--perimeter)`

### Step 3: Wire up Lucide icons for categories

The `CATEGORIES` constant stores icon names as strings (e.g., `"Users"`, `"Heart"`). In the catalog page, map these strings to actual Lucide components for the `CategoryCard` icon prop:

```ts
import { Users, Heart, MessageSquare, ShieldCheck, Flame, Siren } from 'lucide-react';

const categoryIconMap: Record<string, React.ReactNode> = {
  Users: <Users size={20} />,
  Heart: <Heart size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Flame: <Flame size={20} />,
  Siren: <Siren size={20} />,
};
```

### Step 4: Verify and test

- Run `npx tsc --noEmit` to verify TypeScript compiles
- Run `npm run build` to verify production build succeeds
- Manual verification checklist:
  1. Page loads at `/catalogus` showing all 15 courses
  2. Typing in search bar filters courses by title and description in real-time
  3. Selecting "Crowd Control" category filter shows only 3 courses
  4. Selecting "Gevorderd" difficulty shows only advanced courses
  5. Combining category + difficulty narrows results further
  6. Active filter chips appear below the filter bar and can be dismissed
  7. Clicking a category card sets that category as filter
  8. Recommended section shows mandatory incomplete courses with reason tags
  9. Empty state appears when no courses match filters
  10. "Wis alle filters" button resets everything
  11. Grid is 3 columns on desktop, 2 on tablet, 1 on mobile
  12. Course cards link to `/cursus/[id]`

---

## Files Created/Modified

| File | Action | Purpose |
|------|--------|---------|
| `src/components/shared/search-filter-bar.tsx` | CREATE | Reusable search input + filter dropdowns + active filter chips |
| `src/app/catalogus/page.tsx` | MODIFY (replace placeholder) | Full catalog page with 6 sections |

## Files NOT Modified (read-only dependencies)

| File | Reason |
|------|--------|
| `src/components/shared/course-card.tsx` | Existing shared component, used as-is |
| `src/components/shared/category-card.tsx` | Existing shared component, used as-is |
| `src/components/shared/badge-tag.tsx` | Existing shared component, used as-is |
| `src/data/mock/courses.ts` | Existing mock data, imported read-only |
| `src/data/mock/events.ts` | Existing mock data, imported for recommendations |
| `src/data/mock/guards.ts` | Existing mock data, imported for recommendations |
| `src/lib/types.ts` | Existing types, imported |
| `src/lib/constants.ts` | Existing constants (CATEGORIES, DIFFICULTY_LEVELS, COURSE_STATUSES), imported |

## Test Cases

1. **TypeScript compiles**: `npx tsc --noEmit` passes with no errors
2. **Build succeeds**: `npm run build` completes successfully
3. **Search works**: typing "EHBO" in search bar shows only EHBO-related courses
4. **Search is case-insensitive**: searching "ehbo" matches "EHBO Basiscursus"
5. **Search matches description**: searching "festival" matches courses mentioning festivals in their description
6. **Category filter**: selecting "Crowd Control" shows exactly 3 courses
7. **Difficulty filter**: selecting "Gevorderd" filters to advanced courses only
8. **Type filter**: selecting "Verplicht" shows exactly 4 mandatory courses
9. **Combined filters**: selecting "Crowd Control" + "Gevorderd" narrows to 1 course
10. **Active chips**: each active filter shows a dismissible chip; clicking X removes that filter
11. **Category card click**: clicking a category card activates that category filter
12. **Empty state**: applying impossible filter combination shows "Geen cursussen gevonden"
13. **Reset filters**: "Wis alle filters" button clears search and all filters, showing all 15 courses
14. **Recommendations**: "Aanbevolen voor jou" section shows 3-4 courses with Dutch reason tags
15. **Recommendations hidden during filtering**: recommendations section not visible when search/filters are active
16. **Responsive grid**: desktop shows 3 columns, tablet 2 columns, mobile 1 column
17. **Course card navigation**: clicking a course card navigates to `/cursus/[id]`
18. **No hardcoded colors**: all styling uses design system CSS variables

## Notes

- This is a `"use client"` page because it uses `useState` and `useMemo` for client-side filtering
- All user-facing text is in Dutch
- The `SearchFilterBar` component is created as a shared component in `src/components/shared/` so it can potentially be reused on other pages
- Filter dropdowns use native `<select>` elements styled with design system tokens for simplicity -- no need for complex custom dropdown components
- The recommended section is computed once (empty dependency array in useMemo) since mock data is static
- Category cards remain visible until a category filter is explicitly selected, then they hide to avoid redundancy
- Navigation uses Next.js `useRouter().push()` for course card clicks
- The page header uses the existing pattern from the placeholder (title + subtitle)
