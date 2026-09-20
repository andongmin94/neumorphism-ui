# Product readiness

Target: a source-owned neumorphic collection with the practical scope and quality
of `andongmin94/neobrutal-ui`. The collection now has 46 UI components, two
installable workspace blocks, five presets, one base and one utility: 55 registry
items. A passing build is not directory approval or production certification.

## Navigation and installable workspaces

Navigation Menu uses Base UI for destination links and keyboard-aware floating
panels. Menubar adds application-command navigation while reusing the existing
Dropdown Menu parts. These are separate installable UI items, not documentation
mockups. Both have usage, API and accessibility guidance in four locales; the
English usage examples are included in source type checking.

`template-settings` installs a settings/profile block with input validation,
notification preferences, a live profile preview, unsaved-change detection,
asynchronous save, failed-save recovery and discard. The saved baseline changes
only after the provided save callback resolves. Pending work disables changes
and prevents duplicate submission; failures retain the user's edits.

`template-data-manager` installs a data workspace and a small pure record model.
It combines search, status filtering, sorting, paging, stable-ID selection,
column visibility, create/edit in a Sheet, a nested date picker, dirty-draft
confirmation, confirmed deletion and local recent activity. Changing search or
status clears selection so filtered-out rows are not silently left selected.
Save and delete update the local records only after the corresponding callback
resolves; failed requests retain the original list and current edits. Deletion
returns focus to the surviving command trigger rather than a removed row.

The blocks require application-owned asynchronous callbacks. The bundled example
wrappers are explicitly local, offer a fail-next-operation control and reset on
reload. They are not account/database services. Applications must provide their
own authenticated persistence and server-side authorization. Initial props are
snapshots; change the component key when switching accounts or data sets.

The four-locale template gallery renders inert previews of the actual installed
example components. Detail pages use those same registry block sources and show
the exact source payload from the built registry JSON. Blocks install under the
consumer's configured component alias; they do not replace page routes or global
CSS. Template pages have responsive gutters; multiline copy controls no longer
stretch to the full code block height on narrow screens.

## Typography and source ownership

Development uses only `main`; no additional branches were created for these
workspaces. `AGENTS.md` records the branch and typography rules.

Body and UI use Pretendard Variable. The base installs the `pretendard` package;
import its stylesheet once from the application entry as shown in the README.
The bundler self-hosts the font assets without replacing the consumer's layout.
Code/pre/kbd/samp use `Consolas, monospace`. Consolas is an installed system font,
not a redistributed asset; systems without it use their generic monospace font.

`registry/src` and `registry/catalog.json` own source and metadata. Shared tokens
supply previews, CSS export, bootstrap and installation. Do not edit generated
JSON/CSS or endpoint copies. Temporary integration scripts and implementation
workflows are removed from the final main tree.

## Executed workspace implementation

On 2026-09-20, workspace run
[35492998649](https://github.com/andongmin94/neumorphism-ui/actions/runs/35492998649)
passed registry/model, documentation, installed-application and documentation-browser
checks before publishing commit `f7933ab22f33e6106d38d40b41d8902ebdf7f22c` to main.
The run started from `db63c72990f2cacc1994847d8c5b5b5a19b35fc5`, materialized
candidate `cbf6b2e7b1a547ca07cf43f8e2d32ecbe979a8eb`, and published only after those
checks succeeded. Its trigger SHA is not the published implementation SHA.
The subsequent cleanup changes README/QUALITY documentation and removes the
one-time workflow; it does not change product source or generated endpoints.
Consult the permanent Verify run attached to each subsequent commit for its own
execution status, rather than assuming an earlier green run applies to new code.

## Verification scope

The suite includes registry/source/example type checking, 25 regression tests
(including immutable record updates, confirmed-ID deletion and local date
validation), generated-source equality, docs lint/type checking/build, and 11
server-rendered tests against the source-owned catalog.

Four independent applications (Next.js/Vite, fresh/existing) install real local
registry JSON through the shadcn CLI. Existing-project scenarios retain custom
aliases, their selected theme, application CSS and a customized button. They run
in Chromium, Firefox and WebKit at desktop-light and mobile-dark: 24 contexts.
The extended suite exercises settings validation, failure/retry and discard;
record search/filter/selection/paging; navigation and column visibility;
create/edit failure/retry; nested date picker dismissal; dirty-draft confirmation;
delete failure/retry; focus restoration; notification dismissal; page errors and
page-level horizontal overflow. Notification close tests first enter the toast,
matching Base UI's hover/focus accessibility behavior rather than overriding it.

The documentation suite has 110 cases across its two Chromium viewport/theme
projects. It includes the four-locale gallery and both block pages, new menu
preview/code tabs, installed-source disclosures and settings failure recovery,
as well as the earlier component, Theme Studio and date-serialization checks.
Pretendard loading and the Consolas-first stack remain part of the installed-app
checks. A Linux runner does not establish actual native Consolas rendering.

Screenshots are review evidence, not automatic visual approval. Artifacts are
written under `docs/test-results`. The tests are not exhaustive coverage of all
46 component variants, every palette, browser and assistive technology. Filling
Korean text is not a real IME-composition test. Aggregate installation is not an
independent installation test for every advertised item.

## Remaining release work

The earlier audit reported nine findings in the old docs Vinext/Cloudflare/
Wrangler dependency chain. This change does not resolve or re-certify that chain.
Review supported upstream upgrades and rerun the audit; functional Verify does
not replace security review.

The live domain, deployed commit/endpoints, full README initialization path,
individual-item install coverage, licensing/attribution and shadcn directory
metadata still need release review. Locally served generated JSON does not prove
that the public deployment serves this version. No directory submission was made.

Next product work is analytical charts and an installable dashboard composed from
the current working collection, followed by broader state/accessibility review.
Review text and non-text contrast, controlled/uncontrolled behavior, real touch
and IME, nested overlays, focus behavior and screen-reader use. Keep existing
working layers and remove obsolete paths instead of adding compatibility layers.
