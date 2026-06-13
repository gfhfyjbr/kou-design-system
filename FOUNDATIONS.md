# Kou design system — foundations

> **KOU dispatch** — a dark, high-contrast console aesthetic: graphite plates lit
> by light (not blur), one vermilion signal (`shu`), Japanese-railway cues, and
> calm, compositor-only motion. This document is the reference for the *token
> system* the kit is built on. Author new styles against the tokens here, not raw
> values.

The CSS entrypoint is **`src/styles/kou.css`** (shipped as `@kou/ui-kit/styles.css`).
It opens with the token layer documented below, then layout, primitives, views,
overlays, and the responsive/motion-reduction guards.

---

## Token architecture

Tokens are organized in three layers, all declared on `:root`:

| Layer | What it holds | Example |
|-------|---------------|---------|
| **L1 · Primitives** | Raw, context-free values: color ramps, RGB channels, and the spacing / radius / type / weight / tracking / motion / blur / elevation / z-index scales. | `--space-4: 16px` |
| **L2 · Semantic** | Role aliases that point at primitives. Use these in app code so intent stays readable. | `--surface: var(--panel)` |
| **L3 · Legacy** | The original flat names, re-pointed at the new system. Kept 1:1 so existing components and downstream apps keep working unchanged. | `--r: var(--radius-xl)` |

**Rule of thumb:** reach for **semantic** tokens first (`--text`, `--surface`,
`--accent`, `--focus-ring`), drop to **primitives** for scales (spacing, radius,
type, motion), and only touch **legacy** names when extending old class contracts.

---

## L1 · Primitives

### Color — neutral ink ramp
Graphite plates, darkest core → warm-white paper.

| Token | Value | Role |
|-------|-------|------|
| `--ink` | `#08090c` | base canvas |
| `--ink-2` | `#0c0e11` | recessed wells (inputs, code) |
| `--panel` | `#101316` | raised plate |
| `--panel-2` | `#15181c` | plate, one step up |
| `--line` | `#23272d` | hairline divider |
| `--line-2` | `#39404a` | visible border / control edge |
| `--faint` | `#666d75` | faint text, disabled glyphs |
| `--mut` | `#a1a8af` | muted / secondary text |
| `--paper` | `#eeebe1` | primary text, warm white |

### Color — accent, providers, status
`shu` is the **only** house signal — never spend it on chrome.

- **Accent:** `--shu #ff4f30`, `--shu-bright #ff5a36`, `--shu-deep #d63a1e`, `--shu-soft rgba(255,79,48,.14)`
- **Providers:** `--claude #e0795a`, `--codex #2bc7a4`, `--violet #8b7cf6`
- **Status:** `--ok #3ddc97`, `--warn #ffb454`, `--err #ff5d5d`

### Color — RGB channels
Space-separated channels for composing translucent washes:
`rgb(var(--shu-rgb) / .14)`.

`--shu-rgb` · `--paper-rgb` · `--ok-rgb` · `--warn-rgb` · `--err-rgb` ·
`--codex-rgb` · `--claude-rgb` · `--violet-rgb`

### Spacing — 4px rhythm
`--space-1 4` · `-2 8` · `-3 12` · `-4 16` · `-5 20` · `-6 24` · `-7 32` ·
`-8 40` · `-9 48` · `-10 64` (px) — plus the two house gutters
`--gutter 18px` (panel interior) and `--gutter-lg 26px` (view padding).

### Radius
`--radius-xs 5` (badges) · `-sm 6` (chips) · `-md 9` (controls) · `-lg 12`
(menus) · `-xl 14` (panels, = legacy `--r`) · `-2xl 16` (modals) ·
`--radius-pill 999px`.

### Type scale
`--text-2xs 8.5` · `-xs 9.5` · `-sm 10.5` · `-base 11.5` · `-md 12.5` ·
`-lg 13.5` · `-xl 15.5` · `-2xl 18` · `-3xl 26` (px).

### Weight & tracking
- Weights: `--weight-normal 400` · `-medium 500` · `-semibold 600` · `-bold 700`
- Tracking: `--track-tight .06em` · `-snug .1` · `-wide .14` · `-wider .18` ·
  `-widest .22` · `-cap .3em` (mono caps lean wide).

### Motion
- **Durations:** `--dur-instant .08s` · `-fast .18` · `-quick .2` · `-base .25` ·
  `-mid .3` · `-slow .35` · `-slower .55` · `-slowest .8`; pulses
  `--dur-pulse 2.2s`, `--dur-pulse-slow 3.2s`.
- **Easings:** `--ease-spring` `cubic-bezier(.34,1.56,.64,1)` (lively overshoot) ·
  `--ease-spring-soft` `cubic-bezier(.34,1.4,.64,1)` (gentle, for modals/menus) ·
  `--ease-expo` `cubic-bezier(.16,1,.3,1)` (fast-in, long settle).

All motion collapses to instant under `prefers-reduced-motion`.

### Blur & elevation
- Backdrop blur: `--blur-sm 10` · `-md 16` · `-lg 18` · `-xl 20` (px).
- Elevation (drop shadow by altitude): `--shadow-card` · `--shadow-pop` ·
  `--shadow-modal` · `--shadow-toast`.

### Z-index ladder
One ladder for the whole app: `--z-header 40` · `--z-rail 50` ·
`--z-dropdown 60` · `--z-overlay 90` · `--z-grain 900` · `--z-toast 920` ·
`--z-fx 940` · `--z-cursor 950`.

---

## L2 · Semantic aliases

| Token | → | Use |
|-------|---|-----|
| `--bg` / `--bg-sunken` | ink / ink-2 | page & recessed surfaces |
| `--surface` / `--surface-raised` | panel / panel-2 | plates |
| `--border` / `--border-strong` | line / line-2 | dividers & edges |
| `--text` / `--text-muted` / `--text-faint` | paper / mut / faint | text hierarchy |
| `--accent` / `--accent-soft` | shu / shu-soft | the one signal |
| `--focus-ring` | `rgb(var(--shu-rgb) / .13)` | the shu focus halo |
| `--status-ok` / `--status-warn` / `--status-err` | ok / warn / err | state |

---

## Components

Thin React wrappers over the class contracts in `kou.css`. The visual language,
fx (cursor ring, magnetic buttons, panel border-light) and motion live in CSS;
components own only class composition and behavior.

- **Layout:** `AppShell` · `MainPane` · `Views` · `ViewSection` · `OverviewGrid` ·
  `SideStack` · `Toolbar` · `Spacer` · `Pad` · `FormRow` · `ModelsGrid` ·
  `SettingsGrid` · `Stack` · `Inline` · `ResponsiveGrid`
- **Surface:** `Panel` · `PanelHeader` · `PanelTitle` · `Card` · `CardHeader` ·
  `CardTitle` · `MetricCard` · `TiltCard`
- **Controls:** `Button` · `Field` · `Input` · `TextArea` · `Select` ·
  `Dropdown` · `MultiDropdown` · `Modal`
- **Display:** `Badge` · `Chip` · `Kbd` · `Divider` · `Lamp` · `Spark` ·
  `Empty` · `MonoText` · `KanaText` · `MutedText` · `DataTable` (+ cells/rows) ·
  status helpers (`ModeChip`, `StatusBadge`, `SignalPost`, `LineDot`,
  `ProviderDot`, `KeyValue`, `DefinitionList`)
- **FX:** `Ambience` / `KouFxLayers` / `useKouAmbience` and the granular
  `AuroraBackground` · `EmberCanvas` · `SparkCanvas` · `PointerSpotlight` ·
  `CustomCursor`
- **Composites:** the kou-router dashboard `views` + `types`
- **Utilities:** `cx` (class composer) · `lineColor` / `lineCode` / `modelColor`
  · `REDUCED` / `FINE` env flags

---

## Conventions

- **One class composer.** Every component routes its class string through
  `cx(...)` from `src/lib/cx.ts` — no hand-rolled `[...].filter(Boolean).join`.
- **Color is a language.** `shu` means "the signal" everywhere; provider and
  status hues are a fixed vocabulary. Never repurpose them for generic chrome.
- **Motion is compositor-only.** Animate `transform` / `opacity`, pulse via a
  pseudo-element's opacity — never `box-shadow` at 60fps. Honor
  `prefers-reduced-motion` and `pointer: coarse`.
- **Backward compatibility.** Adding scales is additive; legacy names stay
  pointed at the new primitives so nothing downstream breaks.
