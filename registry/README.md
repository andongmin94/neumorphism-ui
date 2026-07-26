# Neumorphism UI Registry

This directory is the single source of truth for the `@neumorphism-ui` shadcn
registry. The visual language is a general-purpose neumorphic design system; it
does not include stock-market APIs or business logic.

The catalog currently contains 26 installable UI components plus the base
theme and class-name utility.

## Commands

From this directory:

```bash
npm run validate
npm run typecheck
npm run build
npm run sync:docs
```

- `validate-registry.mjs` checks registry metadata, dependencies, paths, and source files.
- The scoped TypeScript check validates only Registry source components.
- `build` delegates to the official shadcn CLI, creates canonical installable
  item JSON in `public/r`.
- `sync:docs` is the repository integration step that copies generated JSON to
  `../docs/public/r`.
- The docs imports this sibling package for live previews; UI source is not
  copied into the docs app.

## Consumer configuration

Add the deployed registry URL to `components.json`:

```bash
npx shadcn@latest registry add @neumorphism-ui=https://YOUR_DOMAIN/r/{name}.json
```

Then install an item:

```bash
npx shadcn@latest add @neumorphism-ui/button
```
