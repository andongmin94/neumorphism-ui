# Neumorphism UI documentation

The documentation site runs on **Fumapress**, React 19 and Tailwind CSS v4.

`src/pages` owns file-based routes. Fumapress i18n reproduces every page under the existing `/ko`, `/en`, `/zh` and `/ja` prefixes. Shared documentation UI stays in `components`, localized copy stays in `i18n`, and installable source remains owned by `../registry/src`.

Run:

```bash
npm ci
npm run dev
```

Each file-based page renders `PageMetadata` from its existing localized heading and introduction. Canonical URLs, Open Graph URLs and the four locale alternates always use `https://neumorphism-ui.andongmin.com`, including local and workers.dev previews. Fumapress's native sitemap and robots plugins generate `/sitemap.xml` and `/robots.txt` from the static routes.

`public/_headers` keeps hashed assets immutable, supplies static API/RSC MIME types and adds `nosniff`, a strict-origin referrer policy and same-origin framing. Its limited CSP covers base URLs, objects and frame ancestors; it does not restrict the framework's inline scripts or the analytics beacon. Only workers.dev hosts receive `X-Robots-Tag: noindex`. HTTPS and HSTS belong to the Cloudflare zone settings.

After `npm run build`, run `npm run test:cloudflare` to verify the local Workers Static Assets preview, including multilingual SEO, the sitemap, robots, host-specific indexing headers and client navigation. Analytics tests stub the public beacon and do not send telemetry.

`npm run build` installs, builds and synchronizes the registry before building the site. `npm run typecheck` also builds and synchronizes the registry first. CI already performs that preparation once, then runs `typecheck:site` and `build:site` against those inputs. Both build commands write the source commit marker; use the complete `build` command for clean local or Cloudflare builds.
