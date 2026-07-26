# Neumorphism UI

An installable shadcn Registry and its documentation site, built around a
tactile neumorphic design system.

The visual language is derived from the `stock` reference application: soft
surfaces, paired light and dark shadows, inset controls, rounded geometry, and
blue focus states. Market APIs, polling, watchlists, and other stock-specific
business logic are intentionally not part of this project.

## Install

Initialize shadcn if the target project does not have a `components.json` file:

```bash
npx shadcn@latest init
```

Register the namespace:

```bash
npx shadcn@latest registry add @neumorphism-ui=https://neumorphism-ui.dev/r/{name}.json
```

Then install only the source you need:

```bash
npx shadcn@latest add @neumorphism-ui/button
```

Available items include the base theme, utility, and 26 UI components:

- `neumorphism-ui` (`registry:base`)
- Actions and overlays: `button`, `dialog`, `dropdown-menu`
- Forms and selection: `input`, `input-group`, `textarea`, `label`,
  `checkbox`, `switch`, `radio-group`, `select`, `slider`
- Navigation and disclosure: `accordion`, `breadcrumb`, `pagination`, `tabs`,
  `tooltip`
- Data and feedback: `alert`, `avatar`, `badge`, `card`, `progress`,
  `scroll-area`, `separator`, `skeleton`, `table`

## Project Structure

```text
.github/workflows/ci.yml      Workspace CI
docs/                         Vinext documentation and preview application
docs/app/                     Localized documentation routes
docs/components/docs/         Documentation navigation and examples
docs/public/r/                Registry endpoints served by the docs site
registry/                     Standalone shadcn Registry workspace
registry/registry.json        Registry catalog
registry/src/                 Source of truth for installable components
registry/public/r/            Canonical generated Registry output
registry/scripts/             Validation, build, and docs synchronization
```

The npm workspaces are intentionally separate. `registry/src` and
`registry/registry.json` are the source of truth. A Registry build writes the
canonical item JSON to `registry/public/r`, then synchronizes only those JSON
endpoints into the documentation workspace. The docs imports the private
Registry workspace directly for previews, so installable UI source is not
duplicated. Do not edit `docs/public/r` by hand.

## Development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

The root scripts delegate to the appropriate workspace:

```bash
npm run build
npm run start
npm run lint
npm test
```

When changing Registry source or metadata, rebuild and synchronize it before
reviewing the docs:

```bash
npm run registry:validate
npm run registry:typecheck
npm run registry:build
npm run registry:sync-docs
```

Workspace commands can also be run directly:

```bash
npm run dev --workspace @neumorphism-ui/docs
npm run build --workspace @neumorphism-ui/registry
```

`npm run build` rebuilds the Registry, synchronizes
`registry/public/r` to `docs/public/r`, and then builds the Vinext documentation
site. `npm test` runs the Registry checks and the documentation SSR regression
suite through the root workspace lockfile.

## Local Registry

While the docs development server is running, Registry items are available from
the same origin:

```text
/r/registry.json
/r/button.json
```

For example, if the docs site is running at `http://localhost:3000`, configure a
local namespace with:

```bash
npx shadcn@latest registry add @neumorphism-ui=http://localhost:3000/r/{name}.json
```
