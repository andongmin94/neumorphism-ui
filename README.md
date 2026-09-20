# Neumorphism UI

Source-owned React components with soft surfaces, clear actions and visible focus.
Install components with the shadcn CLI and edit their source in your application.

The collection includes **46 UI components, two workspace templates and five light/dark presets**. Calendar,
Date Picker, Data Table and Toast join the existing form, selection, navigation,
overlay and feedback controls. Documentation and live examples are available in
Korean, English, Japanese and Chinese.

This project is being prepared for the shadcn registry directory. It has not been
submitted or approved. See [QUALITY.md](QUALITY.md) for verification scope and
remaining release work.

## First installation

Use React 19, Tailwind CSS 4 and an initialized shadcn project. Select Base UI:

```bash
npx shadcn@latest init
npx shadcn@latest registry add @neumorphism-ui=https://neumorphism-ui.dev/r/{name}.json
npx shadcn@latest add @neumorphism-ui/neumorphism-ui
npx shadcn@latest add @neumorphism-ui/button --overwrite
```

The shared base changes project-wide tokens and CSS. Commit existing work first.
`--overwrite` is for replacing the initially scaffolded button; review and commit
an already customized button before replacing it. Later component installation
does not reinstall the base or the selected theme.

The base installs the Pretendard package. Import its stylesheet **once** in your
application entry: `app/layout.tsx` or `src/app/layout.tsx` for Next.js, or
`src/main.tsx` for Vite. Your bundler self-hosts the font files. Component installation
does not rewrite your layout.

```tsx
import "pretendard/dist/web/variable/pretendardvariable.css";
```

Then render a component:

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button variant="primary">Save changes</Button>;
}
```

Body and controls use Pretendard Variable. Code blocks, inline code and keyboard
labels use `Consolas, monospace`. Consolas is not distributed; systems without it
use their default monospace font.

Add components or change the visual preset:

```bash
npx shadcn@latest add @neumorphism-ui/calendar
npx shadcn@latest add @neumorphism-ui/date-picker
npx shadcn@latest add @neumorphism-ui/data-table
npx shadcn@latest add @neumorphism-ui/toast
npx shadcn@latest add @neumorphism-ui/style-sage
```

The URL above is the configured public domain. Repository verification uses the
locally built registry; it does not establish that a production deployment has
already updated.

## Design and composition

Raised actions press inward. Persistent selections stay inset after pointer exit.
Directional highlights, hover elevation, overlay shadows and visible keyboard
focus use shared tokens. Reduced motion is separate from depth styling.

Calendar uses DayPicker v10. Date Picker is controlled and submits local date-only
values. Data Table renders a caller-owned TanStack Table instance rather than
introducing another state API. Toast uses the existing Base UI implementation.
The examples show actual date selection, filtering, sorting, pagination, selection,
notification dismissal and undo. Example data and saved state are local only.

## Development

Work on **`main` only**; do not create additional branches. Use Node.js 22.13 or
newer in the Node 22 release line and npm.

```bash
npm ci --prefix registry
npm ci --prefix docs
npm run build --prefix registry
npm run sync:docs --prefix registry
npm test --prefix registry
npm run lint --prefix docs
npm run typecheck --prefix docs
npm run build --prefix docs
npm run test:ssr --prefix docs
npm run check:generated --prefix registry
```

Install the browser engines and run interaction checks:

```bash
cd docs
npx playwright install --with-deps chromium firefox webkit
cd ..
npm run consumer:verify --prefix registry
npm run test:browser --prefix docs
```

Independent Next.js/Vite applications install the actual registry JSON, retain
custom aliases and application-owned CSS/source, build and run without docs CSS.
Documentation checks exercise hydrated previews, theme output, form recovery,
local date serialization and combined data-table operations.

## Source ownership

`registry/src/components/ui` owns components. `registry/src/theme.ts` owns presets,
settings validation and token generation. `registry/catalog.json` owns metadata
and dependency declarations. `docs` imports these sources for its live previews.

`registry/registry.json`, both `public/r` directories, `docs/app/theme.css` and the
theme bootstrap module are generated. Do not edit them manually. Docs dev/build
scripts regenerate and synchronize these outputs first. See [AGENTS.md](AGENTS.md)
for the branch and typography rules used by subsequent development sessions.
