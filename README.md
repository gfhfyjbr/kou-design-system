# @kou/ui-kit

Shared React UI kit for the kou-router frontend. The package exposes granular
foundation components: buttons, cards, layout containers, fields, dropdowns,
tables, status indicators, custom cursor/background fx, toasts, and Kou-specific
dashboard composites.

It is built on a documented, three-layer design-token system (primitives →
semantic → legacy aliases). See **[FOUNDATIONS.md](./FOUNDATIONS.md)** for the
full token reference and the `Foundation/Tokens` stories in Storybook for a live
view of every scale.

## Local Development

```sh
bun install
bun run build
bun run storybook
```

## Usage

```tsx
import { AppShell, Button, Card, ModeChip, ToastProvider } from '@kou/ui-kit'
import '@kou/ui-kit/styles.css'
```

The CSS entrypoint contains the kou-router design tokens, themes, animation
keyframes, layout primitives, and class contracts used by the exported
components.

### Design tokens

Author new styles against the tokens, not raw values:

```css
.my-thing {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text);
  transition: transform var(--dur-base) var(--ease-spring);
}
.my-thing:focus-visible { box-shadow: 0 0 0 3px var(--focus-ring); }
```

Prefer **semantic** tokens (`--surface`, `--text`, `--accent`, `--focus-ring`),
drop to **primitive** scales (`--space-*`, `--radius-*`, `--text-*`, `--dur-*`,
`--ease-*`, `--z-*`) for measurements, and compose translucent washes from the
RGB channels: `rgb(var(--shu-rgb) / .14)`. The original flat names (`--shu`,
`--r`, `--ink`, …) still resolve, so existing code keeps working.

In TS, compose class names with the shared `cx` helper instead of hand-rolling
`.filter(Boolean).join(' ')`:

```tsx
import { cx, Kbd, Divider } from '@kou/ui-kit'
const cls = cx('btn', primary && 'primary', className)
```

In the kou-router frontend this package is linked as a local `file:`
dependency and resolved through Vite/TypeScript aliases to `src/`, so app
development does not require rebuilding the library after every source edit.
Run the library build before publishing or validating package exports.

## Storybook

```sh
bun run storybook
bun run storybook:build
```

Storybook imports `src/styles/kou.css`, loads the same Kou fonts as the router
frontend, and includes stories for tokens, granular primitives, controls, modals,
fx layers, and the main kou-router composite views with static demo data.
