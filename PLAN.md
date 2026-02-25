# PLAN: TES-45 Foundation Project Scaffolding & Design System Setup

## Objective

Initialize a Next.js 15 project with TypeScript, Tailwind CSS 4, and shadcn/ui in the worktree. Configure all design system tokens from `.interface-design/system.md` as CSS custom properties. Install Plus Jakarta Sans. Install shadcn/ui components.

## Acceptance Criteria

- `npm run dev` starts without errors
- Plus Jakarta Sans loads as the default font
- Design system tokens from `.interface-design/system.md` are available as CSS custom properties in `globals.css`
- shadcn/ui components render with the custom theme -- amber accent (`--vest`), warm cream surfaces (`--briefing`), navy text (`--uniform`)

---

## Implementation Steps

### Step 1: Initialize Next.js 15 project

Create `package.json` with all required dependencies:

**Dependencies:**
- `next` ^15
- `react` ^19
- `react-dom` ^19
- `lucide-react` latest
- `recharts` ^2
- `class-variance-authority` latest
- `clsx` latest
- `tailwind-merge` latest

**Dev Dependencies:**
- `typescript` ^5.7
- `tailwindcss` ^4
- `@tailwindcss/postcss` ^4
- `@types/node` latest
- `@types/react` latest
- `@types/react-dom` latest

Run `npm install` to install all packages.

### Step 2: Create TypeScript configuration

Create `tsconfig.json` with:
- `target`: `ES2017`
- `lib`: `["dom", "dom.iterable", "esnext"]`
- `module`: `esnext`, `moduleResolution`: `bundler`
- `jsx`: `preserve`
- Path alias: `@/*` -> `./src/*`
- `strict`: true
- Next.js plugin included

### Step 3: Create Next.js configuration

Create `next.config.ts` with minimal configuration (no special plugins needed for initial setup).

### Step 4: Create PostCSS configuration

Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin (Tailwind CSS 4 approach).

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Step 5: Create globals.css with design system tokens

Create `src/app/globals.css` with:

1. Tailwind CSS 4 import: `@import "tailwindcss";`
2. All design system CSS custom properties in `:root` block:

**Colors -- Foundation:**
- `--briefing: hsl(40, 33%, 97%);` -- page canvas
- `--briefing-elevated: hsl(40, 25%, 99%);` -- card surfaces
- `--briefing-top: hsl(0, 0%, 100%);` -- dropdowns, modals

**Colors -- Text (Navy):**
- `--uniform: hsl(222, 47%, 14%);` -- primary text
- `--uniform-secondary: hsl(220, 25%, 38%);` -- supporting text
- `--uniform-tertiary: hsl(220, 16%, 54%);` -- tertiary
- `--uniform-muted: hsl(220, 12%, 70%);` -- disabled/placeholder

**Colors -- Accent (Amber):**
- `--vest: hsl(38, 92%, 50%);` -- primary accent
- `--vest-hover: hsl(38, 92%, 45%);` -- hover
- `--vest-light: hsl(38, 90%, 93%);` -- light backgrounds
- `--vest-subtle: hsl(38, 80%, 96%);` -- subtle tint

**Colors -- Semantic:**
- `--cleared: hsl(152, 56%, 40%);` -- success
- `--cleared-light: hsl(152, 50%, 94%);` -- success bg
- `--alert: hsl(4, 72%, 52%);` -- error/danger
- `--alert-light: hsl(4, 65%, 95%);` -- error bg
- `--caution: hsl(38, 92%, 50%);` -- warning
- `--caution-light: hsl(38, 80%, 94%);` -- warning bg
- `--dispatch: hsl(215, 65%, 52%);` -- info
- `--dispatch-light: hsl(215, 60%, 95%);` -- info bg

**Colors -- Border:**
- `--perimeter: hsla(220, 20%, 50%, 0.12);`
- `--perimeter-soft: hsla(220, 20%, 50%, 0.07);`
- `--perimeter-emphasis: hsla(220, 20%, 50%, 0.22);`
- `--perimeter-focus: hsla(38, 92%, 50%, 0.5);`

**Colors -- Control:**
- `--control-bg: hsl(220, 15%, 95%);`
- `--control-border: hsla(220, 20%, 50%, 0.18);`
- `--control-focus: hsl(38, 92%, 50%);`

**Spacing (4px base):**
- `--space-1` through `--space-16` (4, 8, 12, 16, 20, 24, 32, 40, 48, 64px)

**Depth (shadows):**
- `--shadow-lifted`, `--shadow-raised`, `--shadow-floating`

**Border Radius:**
- `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 14px`, `--radius-xl: 20px`, `--radius-full: 9999px`

**Animation durations:**
- `--duration-micro: 150ms`, `--duration-state: 200ms`, `--duration-expand: 250ms`, `--duration-page: 300ms`

3. Map shadcn/ui CSS variables to design system tokens using `@theme inline` block for Tailwind 4:

Map the following shadcn/ui variables to our tokens:
- `--background` -> `--briefing`
- `--foreground` -> `--uniform`
- `--card` / `--card-foreground` -> `--briefing-elevated` / `--uniform`
- `--popover` / `--popover-foreground` -> `--briefing-top` / `--uniform`
- `--primary` / `--primary-foreground` -> `--vest` / white
- `--secondary` / `--secondary-foreground` -> `--control-bg` / `--uniform`
- `--muted` / `--muted-foreground` -> `--control-bg` / `--uniform-tertiary`
- `--accent` / `--accent-foreground` -> `--vest-subtle` / `--uniform`
- `--destructive` / `--destructive-foreground` -> `--alert` / white
- `--border` -> `--perimeter`
- `--input` -> `--control-border`
- `--ring` -> `--perimeter-focus`
- `--radius` -> `--radius-md` (10px, the default)

4. Base body styles: `background-color: var(--briefing)`, `color: var(--uniform)`, antialiased text rendering.

### Step 6: Create utility function

Create `src/lib/utils.ts` with the `cn()` helper:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 7: Create root layout with Plus Jakarta Sans

Create `src/app/layout.tsx`:
- Import Plus Jakarta Sans via `next/font/google` with weights 400, 500, 600, 700
- Set `<html lang="nl">` (Dutch language)
- Apply font className to body
- Import `globals.css`
- Minimal metadata: title "GuardTrack", description in Dutch

### Step 8: Create minimal page.tsx

Create `src/app/page.tsx` with a minimal placeholder that demonstrates the design system is working:
- Show "GuardTrack" heading
- Use design system colors to verify tokens work
- Keep it minimal -- just enough to verify the setup

### Step 9: Initialize shadcn/ui

Run `npx shadcn@latest init` with the following configuration:
- Style: new-york
- Base color: neutral (will be overridden by our tokens)
- CSS variables: yes
- Tailwind CSS 4: yes (use the v4 compatible setup)
- Components directory: `src/components/ui`

Then install the required shadcn/ui components:
```
npx shadcn@latest add button card input badge tabs progress avatar dropdown-menu sheet tooltip scroll-area dialog separator radio-group label
```

### Step 10: Verify setup

- Run `npm run dev` and confirm no errors
- Verify Plus Jakarta Sans loads
- Verify design system tokens are applied
- Verify a shadcn/ui Button renders with amber accent

---

## Files Created

| File | Purpose |
|---|---|
| `package.json` | Project dependencies (Next.js 15, React 19, Tailwind 4, etc.) |
| `tsconfig.json` | TypeScript config with path aliases |
| `next.config.ts` | Next.js configuration |
| `postcss.config.mjs` | PostCSS with Tailwind CSS 4 |
| `src/app/globals.css` | Tailwind directives + ALL design system CSS variables |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `src/app/layout.tsx` | Root layout with Plus Jakarta Sans, Dutch lang |
| `src/app/page.tsx` | Minimal placeholder page |
| `src/components/ui/*` | shadcn/ui component files (15 components) |
| `components.json` | shadcn/ui configuration |

## Test Cases

1. **Dev server starts**: Run `npm run dev`, expect no errors in terminal output
2. **Font loads**: Inspect rendered HTML, verify Plus Jakarta Sans is applied to body via next/font className
3. **Design tokens exist**: Open browser dev tools, verify `:root` has all `--vest`, `--uniform`, `--briefing` custom properties
4. **shadcn Button renders with amber**: Import and render a `<Button>` component, verify it has amber (`--vest`) background
5. **TypeScript compiles**: Run `npx tsc --noEmit`, expect no type errors
6. **Build succeeds**: Run `npm run build`, expect successful build

## Notes

- This is a greenfield project; all files are new
- Tailwind CSS 4 uses `@import "tailwindcss"` instead of `@tailwind` directives
- Tailwind CSS 4 uses `@theme` blocks instead of `tailwind.config.js` for theme configuration
- shadcn/ui v4-compatible setup uses CSS variables mapped in globals.css
- Font loading via `next/font/google` ensures optimal performance (no FOUT)
- All shadcn/ui CSS variable mappings must point to our design system tokens so components render with the correct theme
