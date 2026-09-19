# Product readiness

The target is an independently installable neumorphic UI collection with the
practical scope and verification discipline of `andongmin94/neobrutal-ui`, not a
visual clone. Directory submission and production readiness are not approved.

## Implemented collection

The catalog has **40 UI components**, five presets, one base and one utility:
47 registry items. This replaces the previous 26-component scope.

The expansion adds Alert Dialog, Popover, Hover Card, Sheet, Collapsible, Toggle,
Toggle Group, Toolbar, Field, Fieldset, Form, Number Field, Meter and Combobox.
Interactive wrappers use the existing Base UI dependency. Source lives under
`registry/src/components/ui`; previews and installation endpoints use those files.
New documentation includes usage, API and accessibility guidance in the four
existing locales. The English displayed examples also compile as consumer code.

The shared theme engine now defines raised/primary surface fills, restrained inner
highlights, hover elevation, floating-overlay shadows, persistent selection fills
and error-label colors. Shadow and fill directions follow the same light setting.
Button hover changes elevation, not text brightness. Momentary press, persistent
selection, keyboard focus and disabled controls have separate visual treatment.
Status alerts retain full-opacity foreground text on their tinted backgrounds.
These changes extend the existing shared preset/token/bootstrap architecture;
there is no second rendering implementation for installed components.

Form examples demonstrate validation, correction, a local saved baseline and reset.
They are examples, not a hosted persistence service or an installable page template.

## Verification boundaries

The foundation's main Verify run 35463037009 passed at commit `08f99d6`.
Expansion work run 35465938462 passed at `5730dbc`. Additional rendered-state and
hydrated-documentation checks passed in work run 35466485617 on materialized tree
`6f70c02555bef0c60e16ef493282f7ca12eecdaf`. Source-loading recovery and exact
Theme Studio CSS output also passed in work run 35466827624 on materialized tree
`2f99bb76e6a29495e4598fbc8f45b0fcc21f4c0d`. Later changes require their own run.
The Verify run attached to the final commit is the authoritative execution record.

Current checks include:

- Registry validation and source/example type checking; 19 regression tests for
  themes, parser/bootstrap behavior, dependency declarations, token supply,
  representative text contrast, source/example equality and CLI process handling.
- Equality of source, built JSON, document tokens, bootstrap and both endpoint copies.
- Documentation lint/type checking/build and 11 server-rendered test cases,
  including the expanded pages across all four locales.
- Real CLI installations in four independent applications: Next.js/Vite each with
  fresh and existing-project scenarios, custom aliases and application-owned source.
  Later installs must retain custom CSS, selected theme and a modified button.
  The test declines only the known overwrite prompt and waits for complete installation;
  an early exit, unexpected prompt or stalled process fails.
- Twenty-four installed-app browser contexts: three engines, both frameworks and
  scenarios, desktop-light/mobile-dark. They operate overlays, searching/selecting,
  empty combobox results, numeric limits, form recovery/reset, keyboard toolbar
  navigation, focus return and disabled controls without documentation CSS.
  Actual computed shadows distinguish hover, held press, keyboard focus and
  persistent toggle selection. Reduced-motion controls are checked in the browser.
- Hydrated document checks for the 14 expanded English pages and representative
  Korean/Japanese/Chinese form and combobox pages. They operate preview/code tabs,
  check horizontal reflow and runtime errors, exercise form save/reset, check
  Theme Studio token/export/persistence consistency, and exercise recovery from a
  source-fetch failure when navigating to another component.
- Default collection captures for all five presets in both modes. These are not
  exhaustive state coverage for every palette, component, browser and viewport.

Browser evidence is saved under `docs/test-results`; CI uploads it as `ui-verification`.
Inspect captures as well as assertions. Reviewed samples include the ten palette
collection views, representative open overlays and form-error states, selected
controls, desktop Korean Form and mobile dark Number Field documentation.
The 14 new default English documentation pages were also inspected together at
desktop-light/mobile-dark. This is not an assistive-technology audit or a full
visual approval of all 40 items. Existing Badge and Dropdown Menu destructive
color states remain part of the full rendered-contrast review; these selected
token tests are not a blanket assertion that all color/state combinations pass.
Korean text filling does not constitute testing real IME composition.

## Remaining release blockers

The last recorded dependency audit found zero registry warnings and nine docs
build/hosting-chain findings (eight high, one low). The old Vinext/Cloudflare/
Wrangler dependency chain is still a release blocker. Functional Verify does not
run or replace a security audit. Inspect supported upstream versions, update the
actual affected dependencies, and rerun the complete product checks; do not hide
findings with arbitrary overrides or blind forced upgrades.

The published domain, deployed commit, live registry endpoints, actual README
`shadcn init` flow and scaffold replacement, license/attribution and directory
metadata still require review. These checks use locally served generated JSON.
The consumer fixture supplies an initialized `components.json`. An aggregate
installation plus import analysis does not prove every item installs independently.

## Next product work

1. Extend the collection with the missing high-value navigation, date selection,
   data-table and feedback components; retain a working installable collection at
   each step rather than adding undocumented stubs for a numerical target.
2. Build an installable settings/profile flow with validation, failed-submit
   recovery, changed-state indication and save/discard. Extend it into data
   management with combined search/filter/sort/selection/pagination.
3. Add registry-owned analytical charts and complete page templates, with exact
   displayed-source/preview/installation contracts.
4. Review all public variants/states at supported widths and palettes, including
   non-text contrast, real touch/IME, nested overlays, controlled/uncontrolled
   behavior, ref/event composition and screen-reader use.
5. Complete the security, independent-installation and production/directory gates.

## Source and workflow rules

Keep docs and registry modular. Prefer the dependencies already in use. Remove
obsolete paths instead of adding compatibility layers or migrations. Generated
JSON/CSS/bootstrap files are never manually edited. Implementation, executed
checks and visual review are separate statuses. Temporary source-edit workflows
must not remain in the shipped main tree.
