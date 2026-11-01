# Contributing

Work on **`main` only**. Do not create additional branches. Use Node.js 24 or newer and npm.

Read [AGENTS.md](AGENTS.md) before changing source.

## Local development

```bash
npm ci --prefix registry
npm ci --prefix docs
npm run dev --prefix docs
```

The docs development command builds the registry and synchronizes its source
before starting the site. See the [docs guide](docs/README.md) and
[registry guide](registry/README.md) for package-specific commands.

## Verification

Match verification to the change. For README-only edits, check links, installation
examples and product claims. For component changes, run the relevant regressions.
When the change requires integration verification, run the sequence below once
for the final change set.

```bash
npm ci --prefix registry
npm ci --prefix docs
npm run lint --prefix registry
npm run build --prefix registry
npm run sync:docs --prefix registry
npm test --prefix registry
npm run lint --prefix docs
npm run typecheck:site --prefix docs
npm run build:site --prefix docs
npm run check:generated --prefix registry
```

The `:site` commands reuse the registry preparation above. For a standalone
documentation build, use `npm run build --prefix docs` to include that preparation.

For browser verification:

```bash
cd docs
npx playwright install --with-deps chromium firefox webkit
cd ..
npm run consumer:verify --prefix registry
npm run test:browser --prefix docs
npm run test:cloudflare --prefix docs
```

Pushes and pull requests run source contracts, lint, types, a documentation build,
the Chromium desktop/mobile browser suite, component runtime regressions, the
local Wrangler Cloudflare suite and fresh Vite/Next installation smoke checks
for the base, button, input and dialog. The Cloudflare suite checks static routing,
response headers, missing routes and hydrated navigation against Wrangler,
not the Node preview server. Dependency audits remain blocking.
The material/detail presentation suites, all-item installation shards and full
installed-consumer matrix run when manually dispatching `Verify` with
`comprehensive` enabled. To run all-item installations locally after building
the registry, use `node registry/scripts/verify-independent-items.mjs --shard=1/1`.

The manually dispatched `Local platform and accessibility` workflow retains its
six-platform matrix, including full Chromium, Firefox and WebKit catalog passes.
Every check builds and serves locally. To run a platform
check locally, use `npx playwright test --config=playwright.platform.config.ts`
from `docs` (set `PLATFORM_FULL_CATALOG=true` for the catalog pass).

`npm run test:smoke --prefix docs` is the bounded production check. To validate
it against a local build, start the documentation server and set `DOCS_TEST_URL`
to that server's origin. The smoke suite uses one Chromium browser, two page
navigations and three registry JSON requests, without retries or catalog crawls.

Independent Next.js/Vite applications install the actual registry JSON, retain
custom aliases and application-owned CSS/source, build and run without docs CSS.
Documentation checks exercise hydrated previews, theme output, forms, date-only
serialization, data management and analytical filtering/export.

The official Cloudflare Web Analytics beacon loads once on the canonical
production hostname. Development, preview hosts, localhost and automated
browsers do not load it. The token identifies this public site and is not a
credential; the app does not emit custom analytics events.

## Cloudflare deployment

The site uses Fumapress `mode: "static"`. Deploy only `docs/dist/public` with
Workers Static Assets; no Worker runtime, SSR function or SPA fallback is needed.
`docs/wrangler.jsonc` preserves extensionless page URLs and real 404 responses,
and `docs/public/_headers` defines RSC/API MIME types and caches hashed assets.

```bash
npm ci --prefix docs
npm run build --prefix docs
npm run test:cloudflare --prefix docs
npm run deploy:cloudflare --prefix docs
```

For Workers Builds, choose `docs` as the root directory, `npm run build` as the
build command and `npm run deploy:cloudflare` as the deploy command. The native
Cloudflare adapter is detected there; local and GitHub CI builds keep the Node
adapter for `npm run start`. Set the Workers Builds variable `NODE_VERSION=24`
to match this project's engine requirement. No API token is stored in the repository.

Each build writes an ignored `public/build-info.json` marker from its source
commit. The production smoke workflow waits up to five minutes for the expected
marker before testing the canonical domain. Validate a workers.dev preview with
`DOCS_TEST_URL` before moving the custom domain; retain the existing deployment
until that preview passes.

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

## Registry directory

The shadcn directory submission is tracked in
[PR #12535](https://github.com/shadcn-ui/ui/pull/12535).
[registry/directory-entry.json](registry/directory-entry.json) contains its metadata.
See [QUALITY.md](QUALITY.md) for verification scope and release requirements.
