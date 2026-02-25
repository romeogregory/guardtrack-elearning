# PLAN: TES-48 Shared UI Components

## Objective

Build 9 shared UI components used across multiple pages (Dashboard, Catalog, Course Detail, Profile). Every component uses design system tokens exclusively -- no hardcoded colors, spacing, or font sizes. The shield progress indicator is the signature element of the product.

## Dependencies

- **TES-45** (merged): Project scaffolding, design system tokens in `globals.css`, shadcn/ui base components
- **TES-46** (must be merged before coding starts): TypeScript types in `src/lib/types.ts` and constants in `src/lib/constants.ts` -- components import these types for props

## Acceptance Criteria

- Shield progress animates fill on mount using a CSS transition (not just a static fill)
- All components are responsive -- render correctly at 375px and 1280px widths
- Components use design system tokens exclusively -- no hardcoded colors, spacing, or font sizes (verify by searching for hex values, `rgb()`, raw px values)

---

## Implementation Steps

### Step 0: Merge TES-46 into this branch

Before any component work, merge the TES-46 branch (types + mock data) into this branch so that `src/lib/types.ts` and `src/lib/constants.ts` are available for component prop typing.

```bash
git merge origin/tes-46-foundation-typescript-types-mock-data-layer
```

### Step 1: Create `src/components/shared/shield-progress.tsx`

The signature element. An SVG shield shape with an animated fill level.

**Props:**
- `progress: number` -- 0-100 fill percentage
- `size?: "sm" | "md" | "lg"` -- sm=32px, md=48px, lg=64px (default: md)
- `variant?: "default" | "complete" | "overdue"` -- default=amber (`--vest`), complete=green (`--cleared`), overdue=red (`--alert`)
- `showLabel?: boolean` -- show percentage number inside shield (default: false)
- `icon?: React.ReactNode` -- optional icon overlay instead of percentage
- `className?: string`

**Implementation details:**
- SVG `<path>` defining a shield silhouette (simple, recognizable -- not ornate heraldry)
- `<clipPath>` using the shield path to clip a filled rectangle
- Fill rectangle height animated from 0% to `progress`% on mount via CSS transition (`transition: height var(--duration-expand) ease-in-out`)
- Use `useEffect` + `useState` pattern: render at 0%, then set to target on mount to trigger animation
- Colors from design system tokens: `var(--vest)` default, `var(--cleared)` complete, `var(--alert)` overdue
- Shield outline stroke uses `var(--perimeter)`
- Label text (if shown) uses `var(--uniform)` color, Caption typography (13px, weight 500)

**Size map:**
| Size | Width | Height | Label font |
|------|-------|--------|------------|
| sm   | 24px  | 28px   | Micro (11px) |
| md   | 36px  | 42px   | Caption (13px) |
| lg   | 48px  | 56px   | Body (15px) |

### Step 2: Create `src/components/shared/deployment-readiness.tsx`

Horizontal bar showing readiness for an upcoming event deployment.

**Props:**
- `eventName: string` -- event name (e.g., "Lowlands Festival")
- `eventDate: string` -- formatted date string
- `courses: Array<{ id: string; title: string; progress: number; required: boolean }>` -- required courses with their progress
- `status: "gereed" | "bezig" | "verlopen"` -- overall readiness status
- `className?: string`

**Implementation details:**
- Full-width card with `var(--briefing-elevated)` surface, `var(--perimeter)` border, `var(--radius-lg)` radius
- Left side: event name (Heading typography, 20px/600) + date (Caption typography, 13px/500, `var(--uniform-tertiary)`)
- Right side: row of small ShieldProgress components (size="sm") for each required course, with tooltip showing course title
- Status badge at far right: "Gereed" (green `--cleared`), "Bezig" (amber `--vest`), "Verlopen" (red `--alert`)
- When status is "gereed", subtle amber gradient background (`var(--vest-subtle)` to transparent)
- Responsive: on mobile (<768px), stack vertically -- event info on top, shields in a row below, status badge below shields
- Shadow: `var(--shadow-lifted)`

### Step 3: Create `src/components/shared/course-card.tsx`

Rich course card used on Dashboard and Catalog pages.

**Props:**
- `course: Course` -- course data object (from types.ts)
- `showProgress?: boolean` -- show shield progress indicator (default: true)
- `onClick?: () => void` -- card click handler (navigation)
- `className?: string`

**Implementation details:**
- Use shadcn `Card` as base with additional styling
- Thumbnail area: gradient placeholder based on category (each category gets a unique gradient using semantic colors -- e.g., Crowd Control = `--dispatch` gradient, EHBO = `--cleared` gradient, Brandveiligheid = `--alert` gradient)
- Title: Heading typography (20px/600), truncate to 2 lines with `line-clamp-2`
- Metadata row: duration (clock icon from Lucide), difficulty badge, category icon
- Shield progress indicator (size="sm") positioned absolute at bottom-right of thumbnail area
- Mandatory tag (amber `--vest-light` bg, `--vest` text) or Optional tag (muted `--control-bg` bg, `--uniform-tertiary` text) at top-left of thumbnail
- Enrollment count: small text with Users icon
- Hover: shadow transitions from `var(--shadow-lifted)` to `var(--shadow-raised)` over 150ms (`var(--duration-micro)`)
- Surface: `var(--briefing-elevated)`, border: `var(--perimeter)`, radius: `var(--radius-lg)`
- Padding: `var(--space-5)` for content area, no padding on thumbnail
- Responsive: card is a flex column, works at any width from parent grid

### Step 4: Create `src/components/shared/category-card.tsx`

Category card with icon, used in the Catalog page category grid.

**Props:**
- `name: string` -- category name (e.g., "Crowd Control")
- `icon: React.ReactNode` -- Lucide icon component
- `courseCount: number` -- number of courses in category
- `isActive?: boolean` -- whether category is currently selected as filter
- `onClick?: () => void`
- `className?: string`

**Implementation details:**
- Surface: `var(--briefing-elevated)`, border: `var(--perimeter)`, radius: `var(--radius-lg)`
- Icon: 40px container with `var(--vest-light)` background, `var(--radius-md)` radius, icon in `var(--vest)` color
- Name: Subheading typography (16px/600)
- Course count: Caption typography (13px/500), `var(--uniform-tertiary)` color -- e.g., "8 cursussen"
- Hover: `var(--vest-subtle)` background, shadow to `var(--shadow-raised)`, transition 150ms
- Active state: `var(--vest-light)` background, `var(--perimeter-emphasis)` border
- Padding: `var(--space-5)`
- Shadow: `var(--shadow-lifted)`
- Cursor: pointer

### Step 5: Create `src/components/shared/badge-tag.tsx`

Versatile badge/tag component with multiple variants.

**Props:**
- `variant: "mandatory" | "optional" | "beginner" | "gemiddeld" | "gevorderd" | "active" | "completed" | "overdue" | "geldig" | "verloopt" | "verlopen"`
- `children: React.ReactNode` -- label text
- `size?: "sm" | "md"` -- sm uses Micro typography, md uses Caption (default: sm)
- `className?: string`

**Implementation details:**
- Uses shadcn `Badge` as base with custom variant styling
- Radius: `var(--radius-sm)` (6px)
- Padding: `var(--space-1)` vertical, `var(--space-2)` horizontal
- Font: Micro level (11px/600, uppercase, tracking 0.03em) for sm, Caption (13px/500) for md
- Variant color map:

| Variant | Background | Text |
|---------|------------|------|
| mandatory | `var(--vest-light)` | `var(--vest-hover)` |
| optional | `var(--control-bg)` | `var(--uniform-tertiary)` |
| beginner | `var(--cleared-light)` | `var(--cleared)` |
| gemiddeld | `var(--caution-light)` | `var(--vest-hover)` |
| gevorderd | `var(--alert-light)` | `var(--alert)` |
| active | `var(--dispatch-light)` | `var(--dispatch)` |
| completed | `var(--cleared-light)` | `var(--cleared)` |
| overdue | `var(--alert-light)` | `var(--alert)` |
| geldig | `var(--cleared-light)` | `var(--cleared)` |
| verloopt | `var(--caution-light)` | `var(--vest-hover)` |
| verlopen | `var(--alert-light)` | `var(--alert)` |

### Step 6: Create `src/components/shared/stats-card.tsx`

Statistic display card used on the Dashboard.

**Props:**
- `label: string` -- stat label (e.g., "Cursussen Voltooid")
- `value: string | number` -- the stat value
- `icon?: React.ReactNode` -- optional Lucide icon
- `trend?: { direction: "up" | "down"; value: string }` -- optional trend indicator (e.g., "+12%")
- `className?: string`

**Implementation details:**
- Surface: `var(--briefing-elevated)`, border: `var(--perimeter)`, radius: `var(--radius-lg)`
- Value: Display typography (32px/700, tracking -0.02em) in `var(--uniform)` color
- Label: Caption typography (13px/500) in `var(--uniform-tertiary)` color
- Icon: placed top-right, 40px container with `var(--vest-light)` bg, `var(--radius-md)` radius, icon in `var(--vest)` color
- Trend indicator: small text below value -- green (`--cleared`) with ArrowUp icon for "up", red (`--alert`) with ArrowDown icon for "down"
- Padding: `var(--space-5)`
- Shadow: `var(--shadow-lifted)`
- Layout: icon top-right, value large below, label below value, trend indicator at bottom

### Step 7: Create `src/components/shared/leaderboard-row.tsx`

Single leaderboard entry row used on the Dashboard.

**Props:**
- `rank: number` -- position (1-based)
- `name: string` -- guard name
- `avatarInitials: string` -- 2-letter initials for avatar
- `points: number` -- total points
- `badgeCount: number` -- number of badges earned
- `streak: number` -- current day streak
- `isCurrentUser?: boolean` -- highlight this row
- `className?: string`

**Implementation details:**
- Full-width row, flex layout, vertically centered items
- Rank: ranks 1-3 get medal icons (gold/silver/bronze using `--vest` / `--uniform-tertiary` / `--vest-hover` colors), ranks 4+ show number in `var(--uniform-tertiary)`
- Avatar: shadcn `Avatar` with initials fallback, 36px, `var(--vest-light)` background
- Name: Subheading typography (16px/600)
- Points: Body typography, `var(--uniform-secondary)`, with small trophy icon
- Badge count: Caption typography with shield icon
- Streak: Caption typography with flame icon (Lucide `Flame`), `var(--vest)` color
- Current user row: `var(--vest-subtle)` background, `var(--perimeter-emphasis)` left border (3px)
- Padding: `var(--space-3)` vertical, `var(--space-4)` horizontal
- Border-bottom: `var(--perimeter-soft)` between rows
- Radius: `var(--radius-md)` for current user row

### Step 8: Create `src/components/shared/cert-card.tsx`

Certification card with expiry status used on the Profile page.

**Props:**
- `name: string` -- certification name
- `issuingBody: string` -- issuing organization
- `earnedDate: string` -- date earned (formatted)
- `expiryDate: string` -- expiry date (formatted)
- `status: "geldig" | "verloopt" | "verlopen"` -- validity status
- `className?: string`

**Implementation details:**
- Surface: `var(--briefing-elevated)`, border: `var(--perimeter)`, radius: `var(--radius-lg)`
- Shield icon (from Lucide `ShieldCheck`) at top-left, colored by status: `var(--cleared)` for geldig, `var(--vest)` for verloopt, `var(--alert)` for verlopen
- Cert name: Heading typography (20px/600)
- Issuing body: Caption typography (13px/500), `var(--uniform-tertiary)`
- Dates section: two columns -- "Behaald" (earned) and "Verloopt" (expires), Caption typography
- Status badge (using BadgeTag component): geldig/verloopt/verlopen
- Expiry countdown: if verloopt, show "Verloopt over X dagen" in `var(--vest)` color; if verlopen, show "Verlopen X dagen geleden" in `var(--alert)` color
- Padding: `var(--space-5)`
- Shadow: `var(--shadow-lifted)`
- Border-left: 3px solid, colored by status (same as shield icon colors)

### Step 9: Create `src/components/shared/deployment-card.tsx`

Past deployment entry card used on the Profile page.

**Props:**
- `eventName: string`
- `dateRange: string` -- formatted date range (e.g., "15-17 jul 2025")
- `location: string`
- `role: string` -- guard's role at the event
- `linkedCourses: Array<{ id: string; title: string; completed: boolean }>`
- `className?: string`

**Implementation details:**
- Surface: `var(--briefing-elevated)`, border: `var(--perimeter)`, radius: `var(--radius-lg)`
- Event name: Heading typography (20px/600)
- Date range: Caption typography (13px/500), `var(--uniform-tertiary)`, with Calendar icon (Lucide)
- Location: Caption typography, `var(--uniform-secondary)`, with MapPin icon (Lucide)
- Role: BadgeTag component with "active" variant showing the role
- Linked courses section: small list of course names with shield mini-icons (green check for completed, amber partial for in-progress)
- Padding: `var(--space-5)`
- Shadow: `var(--shadow-lifted)`
- Layout: flex column, with course list at bottom separated by `var(--perimeter-soft)` divider

### Step 10: Verify all components

- Run `npx tsc --noEmit` to verify TypeScript compilation
- Run `npm run build` to verify build succeeds
- Search codebase for hardcoded values: no hex colors, no `rgb()`, no raw `px` values outside of the design system (shield SVG path coordinates are acceptable)
- Verify each component imports from `@/lib/utils` for `cn()` helper
- Verify each component is a named export (not default export) for tree-shaking

---

## Files Created

| File | Purpose |
|------|---------|
| `src/components/shared/shield-progress.tsx` | Signature shield-shaped SVG progress indicator with animated fill |
| `src/components/shared/deployment-readiness.tsx` | Event deployment readiness bar with shield indicators |
| `src/components/shared/course-card.tsx` | Rich course card with thumbnail, metadata, shield progress, tags |
| `src/components/shared/category-card.tsx` | Category card with icon, name, course count for catalog grid |
| `src/components/shared/badge-tag.tsx` | Versatile badge/tag with 11 semantic variants |
| `src/components/shared/stats-card.tsx` | Statistic display card with value, label, trend, icon |
| `src/components/shared/leaderboard-row.tsx` | Leaderboard entry row with rank, avatar, points, streak |
| `src/components/shared/cert-card.tsx` | Certification card with expiry status and countdown |
| `src/components/shared/deployment-card.tsx` | Past deployment entry with event info and linked courses |

## Test Cases

1. **TypeScript compiles**: `npx tsc --noEmit` passes with no errors
2. **Build succeeds**: `npm run build` completes successfully
3. **No hardcoded colors**: `grep -rn "rgb\|rgba\|#[0-9a-fA-F]" src/components/shared/` returns no matches (except SVG path data)
4. **Shield animates**: ShieldProgress with `progress={75}` shows fill animation on initial render
5. **Shield variants**: ShieldProgress with variant="complete" renders green, variant="overdue" renders red
6. **Badge variants**: All 11 BadgeTag variants render with correct background/text colors
7. **Course card hover**: CourseCard shadow transitions on hover (inspect with dev tools)
8. **Responsive**: All components render without overflow at 375px viewport width
9. **Cert card status**: CertCard with status="verloopt" shows amber warning styling and countdown text
10. **Leaderboard current user**: LeaderboardRow with isCurrentUser=true has highlighted background

## Notes

- TES-46 (types) must be merged before implementation starts. Components import `Course` and other types from `@/lib/types`
- All components are client components (`"use client"`) since they use hooks (useState, useEffect) or event handlers
- ShieldProgress uses `useEffect`+`useState` for mount animation -- initial render at 0, then animate to target
- The shield SVG path should be a simple, recognizable shield shape. Use a basic 5-point path: pointed bottom, curved sides, flat/slightly curved top
- Category-to-gradient mapping for course card thumbnails should be defined as a constant object within the component or in constants.ts
- Components that don't need interactivity (like CertCard, DeploymentCard) can be server components -- only add "use client" where truly needed
- Use `cn()` from `@/lib/utils` for all conditional class composition
- Use Lucide icons exclusively (already installed via TES-45)
- All user-facing text is in Dutch
