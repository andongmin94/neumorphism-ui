# Neumorphism UI Registry

The registry provides **47 installable UI components, six blocks, five light/dark
presets, one base and two shared libraries: 61 catalog items in total**.

## Source ownership

`src/components/ui` owns installable UI primitives. `src/components/blocks`
owns settings/data workspaces, three analytical charts and the analytics dashboard.
`src/lib` owns shared utilities plus the analytics model/copy. `src/theme.ts`
owns preset data and token calculation. `catalog.json` owns metadata and dependency
declarations.

`registry.json`, `public/r`, and synchronized docs tokens/endpoints are generated.
Do not edit generated output by hand.

## Commands

```bash
npm ci
npm run lint
npm run build
npm run sync:docs
npm test
npm run check:generated
```

With the docs package and browser engines installed, `npm run consumer:verify`
installs the actual generated registry into independent Next.js and Vite
applications and checks representative interactions without documentation CSS.

## Installation

Use React 19, Tailwind CSS 4 and an initialized shadcn project. Install the base
once, then add individual components or blocks. Later installs do not reinstall
the base or selected preset.

```bash
npx shadcn@latest add @neumorphism-ui/neumorphism-ui
npx shadcn@latest add @neumorphism-ui/combobox
npx shadcn@latest add @neumorphism-ui/template-settings
npx shadcn@latest add @neumorphism-ui/template-data-manager
npx shadcn@latest add @neumorphism-ui/chart-revenue
npx shadcn@latest add @neumorphism-ui/chart-channel
npx shadcn@latest add @neumorphism-ui/chart-conversion
npx shadcn@latest add @neumorphism-ui/template-analytics
npx shadcn@latest add @neumorphism-ui/style-sage
```

After installing the base, import the packaged Pretendard stylesheet once in the
application entry. Component installation intentionally does not overwrite your
layout.

```tsx
import "pretendard/dist/web/variable/pretendardvariable.css";
```

Code/pre/kbd/samp use the Consolas-first system stack. See the root README for
initial setup and QUALITY.md for executed checks and remaining release gates.
