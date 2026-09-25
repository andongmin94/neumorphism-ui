# Neumorphism UI

Source-owned React components with soft surfaces, clear actions and visible focus.
Install components with the shadcn CLI and edit their source in your application.

The collection includes **56 UI components, sixteen installable blocks and five
light/dark presets**. The registry contains 80 items in total: 56 UI components,
sixteen blocks, five presets, one base and two shared libraries. Documentation and
live examples are available in Korean, English, Japanese and Chinese through Fumapress.

This project is being prepared for the shadcn registry directory. `registry/directory-entry.json` contains the current directory metadata, but the project has not been submitted or approved. See [QUALITY.md](QUALITY.md) for verification scope and
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
does not reinstall the base or selected theme.

The base installs Pretendard. Import its stylesheet **once** from your application
entry: `app/layout.tsx` or `src/app/layout.tsx` for Next.js, or `src/main.tsx`
for Vite. Component installation does not rewrite your layout.

```tsx
import "pretendard/dist/web/variable/pretendardvariable.css";
```

Body and controls use Pretendard Variable. Code blocks, inline code and keyboard
labels use `Consolas, monospace`. Consolas is not redistributed; systems without
it use their generic monospace font.

## Components

The core collection covers forms, overlays, navigation, selection, feedback,
dates, data tables and analytical display. Examples:

```bash
npx shadcn@latest add @neumorphism-ui/calendar
npx shadcn@latest add @neumorphism-ui/date-picker
npx shadcn@latest add @neumorphism-ui/data-table
npx shadcn@latest add @neumorphism-ui/toast
npx shadcn@latest add @neumorphism-ui/navigation-menu
npx shadcn@latest add @neumorphism-ui/menubar
npx shadcn@latest add @neumorphism-ui/command
npx shadcn@latest add @neumorphism-ui/context-menu
npx shadcn@latest add @neumorphism-ui/drawer
npx shadcn@latest add @neumorphism-ui/input-otp
npx shadcn@latest add @neumorphism-ui/carousel
npx shadcn@latest add @neumorphism-ui/resizable
npx shadcn@latest add @neumorphism-ui/sidebar
npx shadcn@latest add @neumorphism-ui/image-card
npx shadcn@latest add @neumorphism-ui/marquee
npx shadcn@latest add @neumorphism-ui/style-sage
```

Raised actions press inward. Persistent selections remain inset after pointer exit.
Directional highlights, hover elevation, overlay shadows and visible keyboard focus
use shared tokens. Reduced motion is separate from depth styling.

Calendar uses DayPicker v10. Data Table renders a caller-owned TanStack Table
instance. Toast and interactive overlays use the existing Base UI primitives.

## Installable workspaces

```bash
npx shadcn@latest add @neumorphism-ui/template-settings
npx shadcn@latest add @neumorphism-ui/template-data-manager
npx shadcn@latest add @neumorphism-ui/template-link-hub
npx shadcn@latest add @neumorphism-ui/template-portfolio
npx shadcn@latest add @neumorphism-ui/template-blog
npx shadcn@latest add @neumorphism-ui/template-blog-post
npx shadcn@latest add @neumorphism-ui/template-cms
```

The settings workspace combines profile validation, live preview, notification
preferences, unsaved-change detection, failed-save recovery and discard. The data
workspace combines search, status filters, sorting, pagination, stable-ID selection,
column visibility, create/edit forms and confirmed deletion.

The Link Hub, Portfolio, Blog and Blog Post templates are data-driven presentation blocks. Link Hub owns only local filtering and clipboard feedback; Portfolio is fully static and uses native disclosure; Blog owns only archive search/filter/sort state. The CMS workspace is a local editor shell with dirty-state recovery and an application-owned onSave callback.

The Settings and Data Manager blocks accept application-owned asynchronous callbacks. Rejected operations
retain edits and original data; resolved operations update the local saved snapshot.
Applications must provide authenticated persistence and server-side authorization.
The bundled examples are local demonstrations and reset on reload.

## Analytical charts and dashboard

Eight chart blocks and one dashboard block are installable source, not
documentation-only mockups:

```bash
npx shadcn@latest add @neumorphism-ui/chart-revenue
npx shadcn@latest add @neumorphism-ui/chart-channel
npx shadcn@latest add @neumorphism-ui/chart-conversion
npx shadcn@latest add @neumorphism-ui/chart-build-duration
npx shadcn@latest add @neumorphism-ui/chart-service-latency
npx shadcn@latest add @neumorphism-ui/chart-release-activity
npx shadcn@latest add @neumorphism-ui/chart-delivery-capacity
npx shadcn@latest add @neumorphism-ui/chart-install-diagnostics
npx shadcn@latest add @neumorphism-ui/template-analytics
```

The shared `chart` primitive uses Recharts and keeps the data marks flat and
legible while the surrounding panel follows the neumorphic surface system.
Each chart exposes an exact-data table for verification and accessible fallback.

The five operational recipes cover build duration, p50/p95 latency, release activity, planned-versus-delivered capacity and sequential installation timing. They accept caller-owned data and keep exact tables beside the chart.

The analytics dashboard links 7/14/30-day range controls and channel filters to
its KPI cards, revenue/goal chart, channel chart, conversion chart, exact table
and CSV export. Conversion is calculated from total conversions divided by total
visits for the active filter rather than averaging daily percentages. Missing
values are not silently converted into zero.

## Development

Work on **`main` only**. Do not create additional branches. Use Node.js 24 or newer and npm.

```bash
npm ci --prefix registry
npm ci --prefix docs
npm run build --prefix registry
npm run sync:docs --prefix registry
npm test --prefix registry
npm run lint --prefix docs
npm run typecheck --prefix docs
npm run build --prefix docs
npm run check:generated --prefix registry
node registry/scripts/verify-independent-items.mjs --shard=1/1
```

For browser verification:

```bash
cd docs
npx playwright install --with-deps chromium firefox webkit
cd ..
npm run consumer:verify --prefix registry
npm run test:browser --prefix docs
```

Independent Next.js/Vite applications install the actual registry JSON, retain
custom aliases and application-owned CSS/source, build and run without docs CSS.
Documentation checks exercise hydrated previews, theme output, forms, date-only
serialization, data management and analytical filtering/export.

## Source ownership

- `registry/src/components/ui`: installable UI primitives.
- `registry/src/components/blocks`: workspaces, charts and dashboard blocks.
- `registry/src/lib`: shared utilities and analytical data model/copy.
- `registry/src/theme.ts`: presets, settings validation and token generation.
- `registry/catalog.json`: registry metadata and dependency declarations.
- `docs`: Fumapress documentation; registry source is synchronized into its ignored `src/registry` build input.

`registry/registry.json`, both `public/r` directories, `docs/src/theme.css`
and the theme bootstrap module are generated. Do not edit generated output by
hand. See [AGENTS.md](AGENTS.md) for branch, typography and source-ownership rules.
