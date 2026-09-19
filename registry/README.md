# Neumorphism UI Registry

The registry provides 44 installable UI components, five light/dark theme presets,
one base, and one class-name utility: 51 catalog items in total.

## Source ownership

`src/components/ui` owns the installable components. `src/theme.ts` owns preset
data and token calculation. `catalog.json` owns metadata and dependency declarations.
`registry.json`, `public/r`, and the synchronized documentation tokens/endpoints
are generated from these sources. Do not edit generated output by hand.

## Commands

```bash
npm ci
npm run lint
npm run build
npm run sync:docs
npm test
npm run check:generated
```

Type checking includes executable examples for the expanded components. Source
contracts verify declared import dependencies and complete theme-token coverage.
With the docs package and browser engines installed, `npm run consumer:verify`
installs the actual generated items into independent Next.js and Vite applications
and checks representative interactions without documentation CSS.

## Installation

Use React 19, Tailwind CSS 4, and an initialized shadcn project. Register the
namespace using the URL of the deployed documentation site. Install the base
once, then add individual components. Adding a component does not reinstall the
base or the currently selected preset.

```bash
npx shadcn@latest add @neumorphism-ui/neumorphism-ui
npx shadcn@latest add @neumorphism-ui/combobox
npx shadcn@latest add @neumorphism-ui/style-sage
```

See the root README for initial setup, including the separate scaffold-button
replacement step, and QUALITY.md for executed checks and remaining release gates.

After installing the base, import the packaged font stylesheet once in the application entry: `app/layout.tsx` (or `src/app/layout.tsx`) for Next.js, and `src/main.tsx` for Vite. This lets the bundler self-host the font assets. Component installation intentionally does not overwrite your layout.

```tsx
import "pretendard/dist/web/variable/pretendardvariable.css";
```
