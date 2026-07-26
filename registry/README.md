# Neumorphism UI Registry

This directory is the single source of truth for the `@neumorphism-ui` shadcn
registry. The visual language is a general-purpose neumorphic design system; it
does not include stock-market APIs or business logic.

## Commands

```bash
node registry/scripts/validate-registry.mjs
npx tsc --project registry/tsconfig.json
npm run registry:build
```

- `validate-registry.mjs` checks registry metadata, dependencies, paths, and source files.
- The scoped TypeScript check validates only Registry source components.
- `registry:build` delegates to the official shadcn CLI and creates installable
  item JSON in `public/r`.

## Consumer configuration

Add the deployed registry URL to `components.json`:

```bash
npx shadcn@latest registry add @neumorphism-ui=https://YOUR_DOMAIN/r/{name}.json
```

Then install an item:

```bash
npx shadcn@latest add @neumorphism-ui/button
```
