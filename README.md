# @kou/ui-kit

Shared React UI kit for the kou-router frontend. The package exposes granular
foundation components: buttons, cards, layout containers, fields, dropdowns,
tables, status indicators, custom cursor/background fx, toasts, and Kou-specific
dashboard composites.

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
