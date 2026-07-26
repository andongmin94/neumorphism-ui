# Neumorphism UI

An installable shadcn Registry and documentation site built around a tactile
neumorphic design system.

The visual language is derived from the `stock` reference application: soft
surfaces, paired light and dark shadows, inset controls, rounded geometry, and
blue focus states. Market APIs, polling, watchlists, and other stock-specific
business logic are intentionally not part of this project.

## Install from the Registry

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

Available items:

- `neumorphism-ui` (`registry:base`)
- `button`
- `card`
- `input`
- `badge`
- `skeleton`
- `tooltip`

## Project Structure

```text
app/                         Documentation site
components/docs/             Documentation interactions and navigation
registry/registry.json       Source Registry catalog
registry/src/                Single source for installable components
public/r/                    Generated Registry JSON endpoints
scripts/build-registry.mjs   Validation, typecheck, and Registry build
```

The documentation imports components directly from `registry/src`, so previews
and installed source cannot drift into separate implementations.

## Development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run registry:validate
npm run registry:typecheck
npm run registry:build
npm run lint
npm test
```

`npm run build` generates `public/r` with the official shadcn CLI before
building the Vinext documentation site for Sites.
