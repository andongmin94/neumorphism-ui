# Neumorphism UI Documentation

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
.github/workflows/ci.yml      Repository CI
docs/                         Independent documentation package
docs/app/                     Localized documentation routes
docs/components/docs/         Documentation navigation and examples
docs/public/r/                Registry endpoints served by the docs site
registry/                     Independent shadcn Registry package
registry/registry.json        Registry catalog
registry/src/                 Source of truth for installable components
registry/public/r/            Canonical generated Registry output
registry/scripts/             Validation, build, and docs synchronization
```

`docs` and `registry` are standalone npm packages with their own manifests and
lockfiles. `registry/src` and `registry/registry.json` are the source of truth.
A Registry build writes the canonical item JSON to `registry/public/r`.
`npm run sync:docs` synchronizes only those JSON endpoints into the
documentation package. The docs uses the sibling Registry package for previews,
so installable UI source is not duplicated. Do not edit `docs/public/r` by hand.

## Development

Requires Node.js 22.13 or newer.

```bash
cd registry
npm ci
npm run build
npm run sync:docs

cd ../docs
npm ci
npm run dev
```

When changing Registry source or metadata, rebuild and synchronize it before
reviewing the docs:

```bash
cd registry
npm run lint
npm run build
npm run sync:docs

cd ../docs
npm run lint
npm run build
npm run test:ssr
```

The Registry build validates and typechecks its source and generates
`registry/public/r`. Synchronization is a separate repository-level integration
step, so the Registry package can also build on its own. Build and synchronize
the Registry before the docs whenever component source or metadata changes.

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
