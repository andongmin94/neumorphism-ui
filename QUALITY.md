# Product readiness and handoff

Target: a shadcn-installable neumorphic UI product with the practical scope and
verification discipline of `andongmin94/neobrutal-ui`, not a visual clone.
No directory submission or production-readiness approval is implied by this file.

## Foundation implementation

One shared theme engine supplies presets, CSS export, documentation defaults,
pre-hydration initialization, and the registry's installable tokens. Site-only
aliases no longer repurpose the application's muted/accent semantics. Sage control
radius is consistently 12px. Destructive buttons use an explicit foreground token.
Muted text colors are checked against both surface and muted backgrounds.

Base installation is explicit. Adding a UI item or changing a preset must not
reinstall the base. React 19 is the declared consumer range. Installed controls
honor reduced motion. Dialog supports a custom close label and viewport-bounded scrolling.

The existing four documentation locales and five visual presets remain in scope.
The current documentation framework is retained. Component source is not duplicated.
The catalog still has 26 UI components, five presets, one base, and one utility.
No installable settings template, data-management template, or chart is added by
this foundation change.

## Executed foundation checks

Work run [35462576686](https://github.com/andongmin94/neumorphism-ui/actions/runs/35462576686)
passed all steps. It started at `0d6610ee96683f1f3f69c920af85138cbb8dbac4`,
materialized and committed `a915be87602dc87e07e3224378d4278697423a30`, then
executed the checks on that materialized tree. The temporary materialization
workflow is removed from the final foundation commit. Use that commit's own
Verify run, not the older work-run trigger SHA, for subsequent changes.

Executed checks include:

- Registry validation/type checking/build, six theme and settings test cases, and
  source/content/token/endpoint consistency for all 33 registry items.
- Documentation lint, explicit TypeScript checking, production build, and the
  existing localized server-rendered HTML suite.
- Four independent consumer applications: Next.js and Vite, each with a fresh and
  an existing-project scenario. Actual shadcn CLI installation, custom aliases,
  application-owned source/CSS preservation, and production builds passed.
- Twenty-four browser contexts: the four applications in Chromium, Firefox, and
  WebKit, each at desktop-light and mobile-dark. Checks cover installed theme
  colors/radius/shadows, reduced motion, text entry, long-dialog scrolling and
  viewport bounds, Escape dismissal, trigger-focus restoration, page errors,
  and horizontal overflow.
- Regeneration left tracked files unchanged and introduced no untracked files.

The `foundation-consumer-evidence` artifact contains the 24 captures and measured
results. A contact-sheet inspection of all captures found no obvious differences
between matching Next.js/Vite scenarios or browser engines. These are simple
installed-component fixtures, not product templates or a full visual audit.
The captures are taken after closing the dialog; its open state was checked by
automated bounds/scroll/focus assertions, not approved from these captures.

Consumer fixtures currently supply an initialized `components.json`. The
README's `shadcn init` and scaffold-button replacement flow is not yet executed
by this suite. Filling an input with Korean text is not an actual IME composition
test. Token contrast checks do not establish WCAG conformance, non-text contrast,
or accessibility of all component states.

## Known release blockers and next handoff

The latest work-run dependency audit reported zero registry vulnerabilities and
nine documentation-toolchain findings (one low and eight high). Core React/RSC,
Next.js, Vite, and compatible transitive fixes were applied, but the older
Vinext/Cloudflare/Wrangler dependency chain still reports image parsing and
transitive dependency advisories. Passing Verify is not a passing security audit.

Next work must inspect supported upstream releases, update the affected hosting
and build dependencies without blind `audit fix --force` or arbitrary overrides,
and rerun documentation and installed-consumer checks. The audit recommended
Vinext `1.0.0-beta.10` and Cloudflare's Vite plugin `1.56.0` at the time of this
run; verify their current documentation and migration requirements before use.
An obsolete experimental runtime must not be retained solely for compatibility.
Record a clean audit or a specifically reviewed remaining exposure before release.

After that, proceed with the product gates below. Do not interpret this foundation
as feature parity with neobrutal-ui or readiness for the directory submission.

## Remaining product gates

1. Review every public component variant/state at relevant widths in all themes.
   Check non-text contrast, keyboard/touch, real IME, disabled/error/loading states,
   nested overlays, ref/event composition, and form reset behavior.
2. Build one installable settings/profile flow end to end with validation, recovery,
   dirty state, and save/discard; add only the shared pieces needed for that flow.
3. Extend to data management with combined search/filter/sort/selection/pagination.
4. Add installable analytical charts and complete page templates using registry-owned
   sources; make preview, displayed code, and installation demonstrably identical.
5. Extend independent installation coverage to every advertised component and run the
   documented init flow with the current CLI, including an existing scaffold button.
6. Audit remaining installation copy/API examples, legal licensing and attribution,
   directory metadata, domain ownership, deployed commit/endpoints/headers, and live installs.

## Operating rules

Keep `docs` and `registry` modular. Do not introduce compatibility paths, legacy
migrations, or temporary product abstractions. Do not copy neobrutal styling or
add components solely to increase the count. Do not edit generated output manually.
A phase is complete only after implementation, actual execution, and explicit review
are recorded separately. Prepared checks are not passed checks.
