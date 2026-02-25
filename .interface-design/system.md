# GuardTrack Design System

## Direction

**Domain:** Internal e-learning platform for security guards deployed at events and festivals.

**Who:** Security guards — field workers, not tech people. On a bus after a shift, in a break room, at home before a deployment. Possibly tired. Need to complete training, track certs, prepare for events.

**Feel:** Warm, supportive, encouraging. Like a good training partner, not homework. The satisfaction of leveling up. Organized but never sterile.

**Aesthetic:** Friendly & accessible — rounded shapes, warm surfaces, approachable depth.

**Signature:** Shield-shaped progress/completion indicators inspired by uniform patches and badges. The shield motif appears in course completion marks, achievement badges, and the deployment readiness indicator on the dashboard.

**Language:** Dutch (nl)

---

## Color Primitives

Token names evoke the security/event domain.

### Foundation

| Token | Value | Usage |
|---|---|---|
| `--briefing` | `hsl(40, 33%, 97%)` | Page canvas — warm cream, not sterile white |
| `--briefing-elevated` | `hsl(40, 25%, 99%)` | Card surfaces — whisper above canvas |
| `--briefing-top` | `hsl(0, 0%, 100%)` | Dropdowns, modals — highest elevation |

### Text (Navy hierarchy — from the uniform)

| Token | Value | Usage |
|---|---|---|
| `--uniform` | `hsl(222, 47%, 14%)` | Primary text — deep navy, authoritative but warm |
| `--uniform-secondary` | `hsl(220, 25%, 38%)` | Supporting text — descriptions, metadata |
| `--uniform-tertiary` | `hsl(220, 16%, 54%)` | Tertiary — timestamps, less important labels |
| `--uniform-muted` | `hsl(220, 12%, 70%)` | Disabled text, placeholders |

### Accent (Amber — from hi-vis vests and event wristbands)

| Token | Value | Usage |
|---|---|---|
| `--vest` | `hsl(38, 92%, 50%)` | Primary accent — buttons, active states, progress |
| `--vest-hover` | `hsl(38, 92%, 45%)` | Hover state on accent elements |
| `--vest-light` | `hsl(38, 90%, 93%)` | Light accent backgrounds — tags, badges |
| `--vest-subtle` | `hsl(38, 80%, 96%)` | Subtle accent tint — selected cards, highlights |

### Semantic

| Token | Value | Usage |
|---|---|---|
| `--cleared` | `hsl(152, 56%, 40%)` | Success — course completed, cert valid |
| `--cleared-light` | `hsl(152, 50%, 94%)` | Success background |
| `--alert` | `hsl(4, 72%, 52%)` | Error/danger — overdue, cert expired |
| `--alert-light` | `hsl(4, 65%, 95%)` | Error background |
| `--caution` | `hsl(38, 92%, 50%)` | Warning — shared with vest accent (approaching deadline) |
| `--caution-light` | `hsl(38, 80%, 94%)` | Warning background |
| `--dispatch` | `hsl(215, 65%, 52%)` | Info — upcoming deployment, new assignment |
| `--dispatch-light` | `hsl(215, 60%, 95%)` | Info background |

### Border

| Token | Value | Usage |
|---|---|---|
| `--perimeter` | `hsla(220, 20%, 50%, 0.12)` | Standard border — card edges, dividers |
| `--perimeter-soft` | `hsla(220, 20%, 50%, 0.07)` | Soft separation — within cards, subtle |
| `--perimeter-emphasis` | `hsla(220, 20%, 50%, 0.22)` | Emphasis — active borders, important dividers |
| `--perimeter-focus` | `hsla(38, 92%, 50%, 0.5)` | Focus ring — amber glow from the vest accent |

### Control

| Token | Value | Usage |
|---|---|---|
| `--control-bg` | `hsl(220, 15%, 95%)` | Input backgrounds — slightly inset |
| `--control-border` | `hsla(220, 20%, 50%, 0.18)` | Input borders |
| `--control-focus` | `hsl(38, 92%, 50%)` | Focus border accent |

---

## Typography

**Typeface:** Plus Jakarta Sans

Sturdy but warm — slightly rounded terminals feel friendly without being childish. Excellent readability at all sizes, including on phone screens in bright outdoor light. The weight range supports strong hierarchy.

| Level | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| Display | 2rem (32px) | 700 | -0.02em | Page titles, hero numbers |
| Heading | 1.25rem (20px) | 600 | -0.01em | Section headers, card titles |
| Subheading | 1rem (16px) | 600 | 0 | Subsection headers, labels |
| Body | 0.9375rem (15px) | 400 | 0 | Default text, descriptions |
| Caption | 0.8125rem (13px) | 500 | 0.01em | Metadata, timestamps, badges |
| Micro | 0.6875rem (11px) | 600 | 0.03em | Uppercase labels, tiny badges |

---

## Spacing

**Base unit:** 4px

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Icon-text gaps, micro adjustments |
| `--space-2` | 8px | Tight component internals |
| `--space-3` | 12px | Component padding (buttons, badges) |
| `--space-4` | 16px | Standard card padding, gaps |
| `--space-5` | 20px | Generous card padding |
| `--space-6` | 24px | Section gaps |
| `--space-8` | 32px | Section separation |
| `--space-10` | 40px | Major section breaks |
| `--space-12` | 48px | Page-level spacing |
| `--space-16` | 64px | Hero spacing |

---

## Depth

**Strategy:** Subtle shadows — approachable, not technical.

| Level | Value | Usage |
|---|---|---|
| Flat | none | Canvas, inline elements |
| Lifted | `0 1px 3px hsla(220, 30%, 20%, 0.06), 0 1px 2px hsla(220, 30%, 20%, 0.04)` | Cards, content containers |
| Raised | `0 4px 12px hsla(220, 30%, 20%, 0.08), 0 2px 4px hsla(220, 30%, 20%, 0.04)` | Hover states on cards, active elements |
| Floating | `0 8px 24px hsla(220, 30%, 20%, 0.12), 0 4px 8px hsla(220, 30%, 20%, 0.06)` | Dropdowns, popovers, modals |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Small elements — badges, chips |
| `--radius-md` | 10px | Buttons, inputs, small cards |
| `--radius-lg` | 14px | Content cards, containers |
| `--radius-xl` | 20px | Modals, large containers |
| `--radius-full` | 9999px | Pills, avatars, circular elements |

Rounded enough to feel friendly. Not so round it feels childish.

---

## Signature Patterns

### Shield Progress Indicator

The primary signature element. A shield shape (inspired by security patches/badges) used for:
- Course completion status on cards
- Achievement badges on profile
- Deployment readiness on dashboard
- Skill level indicators on radar chart nodes

The shield contains a fill level (0-100%) and can hold an icon or number.

### Deployment Readiness Bar

A horizontal bar at the top of the dashboard showing readiness for the next event:
- Event name + date
- Required courses completion (shield indicators)
- Status: Ready / In Progress / Overdue
- Warm amber gradient when complete, muted when incomplete

### Course Card

- Thumbnail (event/training imagery)
- Title + duration + difficulty badge
- Shield progress indicator (bottom-right)
- Mandatory tag (amber) or Optional tag (muted)
- Category icon (crowd control, first aid, communication, etc.)

---

## Navigation

**Desktop:** Sidebar (same background as canvas, border separation) with icon + label nav items. Collapsible.

**Mobile:** Bottom tab bar with 4 tabs: Dashboard, Catalog, Lessons (active course), Profile. Contextual badge for notifications.

**Active state:** Amber accent on icon + label, not background fill.

---

## Component Patterns

### Buttons

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `--vest` | white | none |
| Secondary | transparent | `--uniform` | `--perimeter` |
| Ghost | transparent | `--uniform-secondary` | none |
| Danger | `--alert` | white | none |

All buttons: `--radius-md`, padding `--space-3` vertical / `--space-4` horizontal, font-weight 600.

### Cards

Surface: `--briefing-elevated`. Border: `--perimeter`. Radius: `--radius-lg`. Padding: `--space-5`. Shadow: Lifted.

Hover: shadow transitions to Raised. Subtle, not dramatic.

### Input Fields

Background: `--control-bg` (slightly inset). Border: `--control-border`. Focus: border becomes `--control-focus` with `--perimeter-focus` ring. Radius: `--radius-md`.

### Badges/Tags

Background: semantic light color. Text: semantic full color. Radius: `--radius-sm`. Padding: `--space-1` vertical / `--space-2` horizontal. Font: Micro level, uppercase.

---

## Animation

| Type | Duration | Easing |
|---|---|---|
| Micro (hover, focus) | 150ms | ease-out |
| State change | 200ms | ease-in-out |
| Expand/collapse | 250ms | ease-in-out |
| Page transition | 300ms | ease-out |

No spring/bounce. Professional but not stiff.
