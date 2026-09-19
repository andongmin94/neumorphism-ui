# Neumorphism UI

Source-owned React components with soft surfaces, clear actions, and visible focus.
Install the source with the shadcn CLI, then edit it in your application.

This project is being prepared for the shadcn registry directory. It has not been
submitted or approved. See [QUALITY.md](QUALITY.md) for implemented work and remaining gates.

## Components and interaction design

The collection includes 40 UI components and five light/dark presets. Alongside
actions, navigation and data-display basics, it now includes confirmation dialogs,
popovers, hover cards, sheets, collapsible content, toggles and toggle groups,
toolbars, field/fieldset/form primitives, number fields, meters and a searchable
combobox. These are installable components, not documentation-only mockups.

Raised actions press inward; persistent selections remain inset after the pointer
leaves. Shared tokens control directional highlights, hover elevation, floating
overlays and error labels. Visible keyboard focus and reduced motion remain distinct
from these depth effects. See the component documentation for composition and states.

## First installation

Use React 19 and Tailwind CSS 4. Initialize shadcn and select Base UI:

```bash
npx shadcn@latest init
npx shadcn@latest registry add @neumorphism-ui=https://neumorphism-ui.dev/r/{name}.json
npx shadcn@latest add @neumorphism-ui/neumorphism-ui
npx shadcn@latest add @neumorphism-ui/button --overwrite
```

The shared base changes project-wide design tokens and CSS. Install it deliberately,
not every time a new component is added. Commit existing work first. `--overwrite`
is only for replacing the button scaffold created by initialization; review an
already customized button before replacing it.

```tsx
import { Button } from "@/components/ui/button";
export default function Example() {
  return <Button variant="primary">Save changes</Button>;
}
```

Add more components or select a preset without reinstalling the base:

```bash
npx shadcn@latest add @neumorphism-ui/dialog
npx shadcn@latest add @neumorphism-ui/style-sage
```

The namespace above uses the configured public domain. Repository checks use the
built local registry; passing them alone is not evidence that production has deployed it.

## Development

Use Node.js 22.13 or newer in the Node 22 release line and npm.

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

For installed-consumer and documentation-browser verification:

```bash
cd docs
npx playwright install --with-deps chromium firefox webkit
cd ..
npm run consumer:verify --prefix registry
npm run test:browser --prefix docs
```

This creates independent Next.js and Vite applications with custom aliases. It installs
actual registry JSON through the CLI, checks source/CSS preservation, builds the apps,
and exercises representative controls in Chromium, Firefox, and WebKit without docs CSS.
The docs browser suite also exercises hydrated previews, mobile reflow, form recovery,
Theme Studio output and source-loading navigation. It is not an exhaustive
independent-install or accessibility audit for every component and state.

## Source ownership

- `registry/src/theme.ts`: preset data, settings validation, token calculation, CSS export.
- `registry/catalog.json`: registry metadata and source/dependency declarations.
- `registry/src/components/ui`: installable component source.
- `registry/scripts`: generation, source contracts, and installed-application checks.
- `docs`: localized documentation and previews, using the same theme and UI sources.

`registry/registry.json`, both `public/r` directories, `docs/app/theme.css`, and the
theme bootstrap module are generated. Never edit them by hand. Rebuild and sync the
registry before reviewing docs; the docs dev/build scripts do this automatically.
