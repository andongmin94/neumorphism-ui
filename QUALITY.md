# Product readiness

Target: a source-owned neumorphic collection with the practical scope and quality
discipline of `andongmin94/neobrutal-ui`. The current catalog has **54 UI
components, six installable blocks, five presets, one base and two shared
libraries: 68 registry items**. A passing build is not directory approval or
production certification.

## Current product surface

Navigation Menu and Menubar provide destination and application-command navigation. Command adds searchable keyboard-first command selection and dialog composition. Context Menu adds pointer-positioned application actions with checkable state. Drawer adds swipeable touch-first task surfaces without duplicating Sheet behavior. Input OTP adds paste-friendly verification-code entry backed by the established input-otp state model. Carousel uses Embla for touch and keyboard navigation, while Resizable uses react-resizable-panels for accessible split-pane sizing. Sidebar adds responsive application navigation with desktop collapse, a mobile Sheet and an application-owned open state.
The existing Settings and Data Manager blocks cover validated profile editing,
failed-save recovery, dirty-state discard, search/filter/sort/paging, stable-ID
selection, column visibility, create/edit, confirmed deletion and asynchronous
application-owned persistence callbacks.

The analytics layer adds:

- `chart`: a reusable Recharts container with linked title/description, tooltip,
  exact-data table and empty state.
- `chart-revenue`: daily revenue with optional goal line.
- `chart-channel`: channel totals with visits/conversions view switching.
- `chart-conversion`: daily conversion rate with a fixed 0–100% scale and missing
  values kept distinct from zero.
- `template-analytics`: 7/14/30-day and channel filters linked to KPI summaries,
  the three charts, exact rows and CSV export.

The dashboard computes filtered conversion from total conversions divided by total
visits, not an unweighted mean of daily percentages. CSV uses the same filtered
records as the visible metrics and table.

Charts use the established neumorphic panel/filter surfaces, but data marks
themselves remain visually flat so depth styling does not distort quantitative
reading.

## Typography and source ownership

Development uses only `main`; `AGENTS.md` records the branch and typography
rules. Body/UI use Pretendard Variable. Code/pre/kbd/samp use
`Consolas, monospace`. Consolas is a system font and is not redistributed.

`registry/src` and `registry/catalog.json` own product source and metadata.
Shared tokens supply previews, CSS export, bootstrap and installation. Generated
registry JSON/CSS/bootstrap files are not hand-edited.

## Executed analytics implementation

On 2026-09-20, materialization run
[35496518332](https://github.com/andongmin94/neumorphism-ui/actions/runs/35496518332)
completed successfully. It started from `a99b3f5916c62a188bace0224546a949c741bd51`,
applied the staged analytics source, refreshed dependency locks and generated
outputs, then published verified implementation commit
`8ba2283a1cdaf161d1a5b64eeefb22e162df6fa2` to `main`.

That run passed:

- dependency installation for registry and docs;
- registry lint/typecheck/build and **35/35 regression tests**;
- generated-source equality for all **61 registry items**;
- docs lint/typecheck/build and **11/11 SSR tests**;
- production dependency audit for the installable registry with **0
  vulnerabilities**;
- real shadcn installs into Vite/Next.js fresh/existing applications;
- Chromium, Firefox and WebKit checks across the four consumer scenarios;
- hydrated documentation browser suite with **124/124 tests** across
  desktop-light and mobile-dark;
- source cleanliness and a final generated-output equality check.

Installed-app verification retained custom aliases, selected theme, application CSS
and customized source in existing-project scenarios. The analytics additions were
installed into each consumer and exercised without documentation CSS.

The documentation browser suite verifies all four locales for charts/dashboard,
range and channel filters, consistency between KPI/table/CSV data, empty analytics
state and the Chart primitive's exact-data table.

The permanent Verify workflow attached to subsequent cleanup commits is the
authoritative check for the final tree; do not assume an earlier run covers later
source changes.

## Verification boundaries

Screenshots and browser assertions are evidence, not exhaustive accessibility
certification. Current tests do not cover every state of all 54 components across
all presets, browsers and assistive technologies. Filling Korean text is not a real
IME-composition test, and Linux does not establish native Consolas rendering.

Aggregate installation is not independent installation coverage for every advertised
item. The published domain and deployed registry endpoints are also separate from
the local generated endpoints used by CI.

## Remaining release work

The installable registry production audit is clean in the analytics materialization
run. The documentation runtime now uses Fumapress and Vite; the obsolete Vinext, Next.js routing, Cloudflare Vite plugin and Wrangler development chain are removed. Verify the static Fumapress output and deployed registry endpoints before release.

Before shadcn directory submission, also verify the live domain/deployed commit,
full README initialization path, individual-item installation coverage,
license/attribution and directory metadata.

Next product work should focus on broad state/accessibility review and any remaining
high-value components/templates revealed by real application composition. Review
text/non-text contrast, controlled/uncontrolled behavior, real touch/IME, nested
overlays, focus behavior and screen-reader use. Keep the working layered system
and remove obsolete paths instead of adding compatibility layers.

## Source and workflow rules

Keep docs and registry modular. Prefer dependencies already in use. Do not add
temporary compatibility APIs. Generated output is source-derived. Temporary
materialization workflows and staged patch files must not remain in the shipped
`main` tree.
