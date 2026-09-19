# Product readiness

Target: a source-owned neumorphic collection with the practical scope and quality
of `andongmin94/neobrutal-ui`. The registry has 44 UI components, five presets,
one base and one utility: 51 catalog items. Directory approval and production
readiness are not implied by a passing build.

## Current implementation

Calendar uses `@daypicker/react` v10 for date calculations, selection modes and
keyboard navigation. Range endpoints are inset; intermediate dates share a
connected surface. Date Picker composes Calendar with the existing Base UI
Popover, exposes a controlled value and submits local YYYY-MM-DD dates without
UTC conversion. Required-field validation belongs to the caller's form.

Data Table renders a caller-owned TanStack Table instance with semantic captions,
sort states, keyboard-accessible horizontal scrolling and pagination. The example
combines search, status filtering, sorting and stable-ID selection across pages.
Rendering boundaries opt out of React Compiler memoization because the table
instance is a stable mutable handle, not an immutable state snapshot.

Toast uses the existing Base UI dependency for announcements, keyboard entry,
close actions and timers. The example exercises success/error messages, undo and
timed dismissal. Samples use illustrative data and local state, not server storage.

These four additions extend the previous 40-component collection. Their preview
source also produces localized displayed code and executable English examples.
Documentation includes Korean, English, Japanese and Chinese versions.

## Typography and source ownership

Only `main` is used for development. Obsolete work branches have been deleted.
`AGENTS.md` records the branch and typography rules for subsequent sessions.

Body and UI use Pretendard Variable. The base installs the `pretendard` package
and defines shared font tokens. Import the package stylesheet once from the
application entry as shown in the README. Application bundlers self-host the font
assets; component installation does not overwrite a user's layout. The docs use
the same import. Code/pre/kbd/samp use `Consolas, monospace`. Consolas is a local
font and is not distributed; an OS without it uses its generic monospace font.

`registry/src` and `registry/catalog.json` own source and metadata. The theme
engine supplies previews, CSS export, bootstrap and installation tokens. Generated
JSON/CSS and endpoint copies must not be manually edited. Temporary source-edit
scripts and workflows are not part of the final main tree.

## Executed verification and boundaries

Run 35470095989 passed all stages before committing the materialized application
as `9e3413dd6e161555ea7e98b215f4e7c2a5f8bc2c` directly to main. Its artifact
contains 24 successful installed-app contexts and 84 successful documentation
browser tests, with no skipped or unexpected cases. Later commits must be judged
by their own permanent Verify run, not this earlier execution.

The suite includes registry/source/example type checks, 22 regression tests,
generated-source equality checks, documentation lint/type checks/build, and
11 server-rendered tests covering the localized component catalog.

Four independent apps (Next.js and Vite, fresh and existing-project scenarios)
install actual local registry JSON through the shadcn CLI. Existing-project cases
retain custom aliases, a selected theme, application CSS and a modified button.
Each app runs in Chromium, Firefox and WebKit, desktop-light and mobile-dark:
24 contexts. They test the earlier controls plus date selection/ranges, disabled
dates, clearing/reset, table search/filter/sort/selection, empty results, page
sizes, toast keyboard entry, close/undo and timed dismissal. Pretendard must actually
load; presence in a CSS font stack is insufficient. Consolas-first CSS is checked,
not native Consolas rendering on the Linux runner.

The 84 documentation browser cases cover hydrated preview/code switching,
source-fetch recovery, Theme Studio output/persistence, all four new components in
all four locales, compiled Data Table interactions, and date-only form submission
in Asia/Seoul and America/Los_Angeles. Runtime errors and viewport reflow are checked
at desktop-light and mobile-dark widths.

Assertions and screenshots are separate evidence. Captures are emitted under
`docs/test-results` and uploaded as `ui-verification`. These tests are not a blanket
visual or accessibility approval of all 44 components and every state/palette.
Korean text filling is not real IME composition. Aggregate installation does not
prove every item installs independently in every supported environment.

## Remaining release work

The earlier audit reported nine docs toolchain findings in the older
Vinext/Cloudflare/Wrangler dependency chain. This component/typography change does
not resolve or re-certify that chain. Rerun the audit after reviewing supported
upstream upgrades; functional Verify is not a security audit.

The live domain/deployed commit/endpoints, full README initialization path,
individual-item installation coverage, license/attribution and shadcn directory
metadata still need release review. Local generated-registry checks do not establish
that the public deployment serves the new version.

Remaining product work includes missing navigation components, installable
settings/profile and data-management screens, analytical charts and complete page
templates. Extend from the current working collection, not undocumented stubs.
Review all variants/states for text/non-text contrast, controlled/uncontrolled
behavior, touch, real IME, nested overlays, focus and assistive-technology use.
