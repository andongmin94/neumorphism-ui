# Sculptural reference review

Reference: [Paran Penguin / Mr. PPT template 04](https://paranpenguin.co.kr/content_shop/item/1379), specifically the [public KPI slide](https://paranpenguin.co.kr/files/thumbnails/663/225/1200x675.ratio.jpg?t=1782089013), not the store UI or a licensed source deck. The picture is a visual source, not a source of exact CSS values or interactive behavior.

The representative screen is the existing Theme Studio price alert. Its plate material, accent face and proportions now also guide the Analytics dashboard, Data Manager, CMS summaries and directory destinations. It does not certify the whole collection as reference-matched.

## Decisions implemented

- The central statistic row is the composition reference: four raised tiles: three neutral faces and one accent-colored target face. Values and labels share a centreline, equal tile dimensions and a common gap.
- The surrounding preview is an open, same-material canvas. It does not put a raised card inside an inset card. Form and conditions use spacing and a separator instead of additional shells.
- Air's default surface corner is 12px. Small statistic tiles use 50% of the selected surface radius so small faces do not look inflated. Other presets remain distinct.
- Installable Card uses a dedicated contact/projection plate shadow, 20px gutters, 16px section gaps, a wrapping title with 24px line height and a wrapping footer. Soft structural cards no longer claim the same raised level.
- Geometry responds to the preview's own width, not just the browser width. Values and labels remain in their cells at 390px and all four document locales.
- Saved numeric readouts are derived from the same local state as the form and progress bar. Drafts do not silently change saved values. Delete, validation and recovery are preserved.

## Reference-derived rules and web decisions

The public KPI slide shows neutral raised tiles as well as one colored raised tile.
An earlier interpretation (one raised plus three recessed) was incorrect and is
removed from the representative screen and its test. Depth is not an importance scale.
The price target now uses the installed `Card variant="accent"`; the other readouts
use `raised`. The small currency part retains the original Intl-formatted text while
giving the numerical value a stronger optical center. No numeric information is hidden.

Web-specific decisions: inputs stay inset, controls retain focus/disabled/validation,
small-screen reflow uses the available container, and dark/preset colors use their
own readable foregrounds. The public slide does not supply those behaviors. Pretendard
and the independent Dark+ code surface remain unchanged. Radius, shadow measurements
and type sizes are authored web adaptations, not values claimed to be sampled from PPT.

`reference-plate.spec.ts`, `sculptural-layout.spec.ts` and the source-only `plate.spec.ts`
separate appearance/state checks from visual approval. Theme tokens and generated
registry items stay synchronized; no new registry item or dependency is added.

## Deliberate boundaries

The diamond infographic and circular gauges are not copied into the documentation or added as new registry components. This pass translates the reference's plate proportions, internal spacing and depth hierarchy into the existing Card and Theme Studio composition. It is not a reproduction of the full deck. Numerical chart marks remain flat.

## Evidence

`tests/detail/sculptural-layout.spec.ts` checks the depth count, nesting, centred readouts, internal bounds, long content, locale reflow and draft/save/delete/recovery behavior. The permanent Verify workflow also runs the existing complete catalog, material and documentation interaction suites. Screenshots are visual-review evidence, not proof that every possible composition is complete.

## Collection-wide application

The source contract now applies beyond Card and the Theme Studio example:

| Family | Material and anatomy |
| --- | --- |
| Actions | Neutral small plates, readable accent lettering, recessed press, separate focus outline. Soft/destructive secondary actions do not all compete at the raised level. |
| Inputs | One recessed face, 40px default height, 12px text gutter, inner controls use a smaller corner. Disabled and read-only states stay distinguishable. |
| Selection | Square checkbox wells with SVG marks; circular radio wells; neutral switch tracks with a colored moving thumb; one segmented tray, not multiple nested raised trays. |
| Readouts | A neutral slider disc with an accent center, rounded linear troughs, flat quantitative marks. No circular-gauge component was added. |
| Disclosure/navigation | Flat closed rows and quiet navigation trays; selected/expanded state owns depth. No raised decorative button surrounding a disclosure icon. |
| Overlays | A single floating plate; typography and corners match the main material. Popup state/focus behavior remains with the existing primitive. |
| Data/media | Planar table rows; image captions share the face material; avatar status markers are not clipped by the photo. |
| Templates | Dashboard, Data Manager and CMS summaries use the installed Card: neutral raised readouts and one stable accent face (revenue, active records, published posts respectively). Values precede their labels visually; all values remain exact. Filters stay inset and the CMS editor shell stays flat. Other workspace layouts are preserved. |
| Documentation | Same sibling shell. Open preview canvases, flat choice/progress wrappers, directory cards raised at rest with inset press and a separate focus outline. No docs-specific large radius overriding the registry geometry. |

`--neu-radius-small`, `--neu-radius-control`, and `--neu-radius-surface` describe distinct sizes. Default Air uses 4px / 8px / 12px. The installed base and docs resolve the same Tailwind radius tokens. Round avatar/radio/slider parts remain round intentionally. Accent lettering is contrast-adjusted against the actual preset surface, including custom accents; data fills keep their original accent.

Every one of the 56 catalog entries remains in the four-viewport/mode catalog suite. Structural primitives such as Label, Separator and Form stay flat; inherited pieces such as Carousel/Date Picker reuse the updated Button or Popover. A component does not need a new shadow to belong to the system. Native select option popups remain platform-owned.

The source-only material fixture now includes selection/readout/disclosure compositions and keyboard checks without loading docs CSS. `surface-system.spec.ts` checks form geometry, checkbox mark alignment, open preview hierarchy, neutral primary pressed/focus state, global search, and all eight template pages. This is a defined regression set, not exhaustive certification of every possible composition.


## Overlay occlusion review

The sticky documentation header is below registry backdrops and popups. Sheet, Dialog and Drawer checks include actual hit testing over the header, not only visible DOM nodes. Sheet title and close control remain unobscured at normal and 500px viewport heights in all four desktop/mobile light/dark projects.


## Composition finish boundaries

The material remains unchanged. Input Group gutters and text line boxes match standalone fields; Number Field expands its numeric area inside full-width groups. Read-only and invalid fields remain visually distinct when composed with Field or Combobox. Narrow cards retain all OTP slots; Date Picker keeps a one-line value with the full accessible label. Vertical tabs retain target heights and let the panel shrink. Dialog and Alert Dialog titles, descriptions and action labels wrap within the task surface. Menu and submenu lists constrain both axes and scroll independently.

The source-only composition specimen covers four desktop/mobile light/dark contexts, 320px reflow in five presets, validation recovery, nested Popover/Combobox and child Dialog focus recovery, and long menu lists at 450px height. This is a defined supported-composition regression set, not a claim about arbitrary application CSS or all assistive technologies.

Native Select owns its complete field geometry, including the preset-colored chevron. A separate full-width wrapper can no longer strand that chevron outside a custom-width select. Multi-select remains a native listbox without a dropdown glyph; forced-colors uses native appearance. Menus and submenus reserve 8px viewport clearance.

Composed Input Group values and both multiline fields declare normal input weight and tracking, so bold parent labels cannot restyle entered text. Nested Combobox tests preserve Base UI's Escape behavior: a selected closed field clears first, then the parent Popover dismisses; the surrounding Dialog retains unsaved edits and restores focus.

Dialog and Alert Dialog footer actions grow for multiline labels without replacing the supported small/default/large minimum heights (32/40/48px). The same source-only tests exercise each real Button size in both modal footers.


## Document boundary ownership

Article headers own the rule before the first section. Only subsequent sibling sections draw a leading rule; sections do not draw trailing rules. Header and section rules share the article width. Article rhythm uses one 32px spacing value, reduced to 24px on narrow screens. Reference labels occupy one actual grid row, not twenty implicit rows; untitled sections keep the full content width. TOC columns exist only when the TOC is displayed. Chart sections follow the same leading-rule contract and leave the final boundary to the site footer.

`tests/detail/document-rhythm.spec.ts` checks all reference pages in desktop/mobile light/dark, intermediate widths and localized layout, plus landing/directory/gallery/chart/theme shells, preview-card boundaries and drawer navigation. The existing 56-component catalog pass also checks first and subsequent section boundaries. Nested table/list/preview separators retain their own semantic boundaries; this is not a blanket removal of borders.

Reference link rows use a single internal separator with no residual rounded-card borders. Credits table headers and rows keep readable gutters and one row rule. The chart recipe grid owns its two/one-column layout, card padding and disclosure spacing explicitly; no missing earlier presentation layer is required.

Initial chart geometry does not guess a desktop width during server rendering. The plot reserves its 256px height while ResponsiveContainer measures the available width. Exact-data disclosure stays available without JavaScript. `chart-boundary.spec.ts` checks unhydrated and hydrated chart/dashboard/gallery pages, resizing to 320px and 820px without clipping plots or tooltips. This closes the transient 521px mobile viewport caught by the full divider review.


## Small-control finishing and registry audit

Button and Toggle glyphs track the supported size without replacing caller-owned icon sizes. Avatar groups retain a separating silhouette and matching counter typography. Long badges wrap, the Slider outlines its visible thumb, and segmented selection uses one raised plate inside one recessed tray. Calendar cells now share their container width, including week-number and multi-month layouts; navigation is vertically centered on the caption. Combobox checks, menu radio marks and submenu chevrons use fixed SVG geometry rather than font glyphs, with logical inline gutters.

The source-only control-anatomy and refinement specimens cover these structures in desktop/mobile light/dark, plus compact calendars and RTL menu marks. Registry verification compares complete generated item objects, not only source file contents, and rejects local dependency cycles. The public endpoint check remains a separate signal: its report must show successful HTTP and exact equality before a deployment is called verified.

Long status badges preserve word boundaries and balance wrapped lines. Multi-month calendars wrap according to available container width instead of forcing a desktop row. Built registry endpoints reject undeclared root properties such as CSS, environment variables or dependencies; style-only items are checked too.

Multi-month calendars use ordinary intrinsic flex layout: months wrap within the host, their tables fill the available plate, and date buttons retain their bounded control size. The source specimen checks narrow hosts, natural flex sizing, plate-to-grid gutters and wide two-month rows. No size-containment wrapper or browser-width workaround is introduced.

Table cells keep status badges on one line; the table scroll container owns narrow-screen overflow instead of splitting short status words into vertical fragments. Standalone badges retain long-label wrapping. Source-only checks cover 228px and 320px hosts in desktop/mobile light/dark, readable labels at the horizontal scroll end, and unchanged long standalone badges.

Carousel examples leave an 8px flat gutter around each raised face inside the existing masked viewport. The viewport still hides adjacent slides; no global overflow override is used. Live previews and all four copied examples share this structure. The English compilation fixture is derived from the displayed source. Navigation and four-edge clearance are checked after real Embla snaps in all four screen/mode projects and locales.

Published registry URLs use the homepage actually configured on the repository, not an unresolvable alternate domain. Complete public JSON equality, the public-origin independent installation matrix and live browser checks run separately from local Verify after a successful main deployment. Shortcut tests wait for an existing client-owned readiness state before asserting a keyboard effect; they do not replay a missed key or remove the focus assertion.

## Micro-design case closure (MD-01–10)

The baseline is `ddb5ff82`. Keep the ten collected cases distinct from an exhaustive design guarantee.

| Case | Shipping responsibility | Completion criterion |
| --- | --- | --- |
| MD-01 | Pagination + docs | Both navigation targets remain visible and operable; narrow containers compact only the labels and decorative ellipsis. No docs-only hidden controls. |
| MD-02 | Marquee | The clip viewport and the control occupy separate flex columns. Reduced motion reveals every original item in a wrapping layout and removes the unnecessary motion control. Duplicate content is inert. |
| MD-03 | Resizable examples + handle | Group fills an explicitly sized parent as required by the upstream inline style contract. The measured baseline was 54px despite `h-40`; the new host owns 160px. Percentage panel sizes are explicit strings. Both handle orientations use SVG. |
| MD-04 | Image preview asset | Full-bleed image; only ImageCard's figure clips the corners. No duplicated radius in the sample SVG. |
| MD-05 | Breadcrumb + every example | BreadcrumbSeparator is a span inside the destination BreadcrumbItem, never a sibling list item. Separators wrap with their destinations; long current names remain readable. |
| MD-06 | Input Group | Textareas occupy a full row; actions follow below on the same inset surface. The native resize affordance stays at the textarea's right edge. Single-line controls keep their existing height. |
| MD-07 | Switch | Active off/on and disabled use the same track contour; disabled opacity and shadow removal reduce prominence rather than adding a stronger border. |
| MD-08 | Controls + preview icons | Pin, Home, Settings, Grip, outward link and toast Close use fixed SVG geometry; accessible labels and control hit areas remain intact. |
| MD-09 | Table / Data Table | Native CSS local/scroll layers disclose remaining columns and disappear at the relevant boundary. No JS observer or client-only Table wrapper. |
| MD-10 | Accordion + Collapsible | One shared visual grammar: plus while collapsed, minus while expanded, driven by the primitive's `aria-expanded`. |

Generation now refreshes the existing compiled examples from the English displayed snippets, in addition to the four live-source workflow examples. Registry metadata, both generated endpoint copies and consumer fixtures are verified together. No new catalog item, package, compatibility mode or alternate origin is introduced. Public verification compares all 80 items and installs from the deployed canonical origin; a local pass alone does not establish publication.


## Remaining control geometry and caller behavior

Sheet close, Sidebar trigger and the copied Button icon example use SVG geometry,
including the documentation copy, close and direction controls and existing
workspace links. SidebarTrigger composes its internal action with the caller's
onClick, respects preventDefault and retains supplied children. Documentation
search reset returns focus to the remaining input instead of removing the focused
button without a destination.

Input Group actions preserve their 30px minimum rather than fixing their height:
long localized multiline labels wrap within the same field and can still submit.
Default short actions keep the 40px field height. Addon and action icons preserve
caller-owned size classes, consistently with Button and Toggle.

The source-only micro completion specimen covers 320/390/1440px in light/dark,
callback/cancellation behavior, SVG size overrides, long action submission and
Sheet close/focus recovery. The existing MD specimen also covers 320px and drags
the actual textarea resize grip instead of assigning an inline test height.
These are defined regression checks, not native-device or assistive-technology
certification. Generated registry and displayed examples remain source-derived.


## Directory material and readable code

Directory cards remain raised at rest with their compact shadow recipe, pressed
inset and a separate keyboard outline. Their typography and composition are unchanged
by the representative Theme Studio pass; do not describe them as reference-approved. Mobile spacing does not remove
the material. Obsolete global card rules are removed; the component stylesheet is
the only owner. The results link keeps its SVG inline with its label.
Directory, template and chart-reference titles use 700 weight; directory descriptions
use 500 weight at 14px. Supporting documentation copy has a stronger contrast. These
are documentation rules, not a new global weight forced onto installed UI previews.

All documentation code panels reuse the existing Fumadocs Shiki renderer with VS Code
Dark+ in both page modes. TSX/TS source, shell commands, CSS and JSON declare their
languages at the call site; ordinary inline code remains inline. The renderer retains
raw copy bytes, keyboard-scrollable pre elements and the original current CSS value
during edits. Source-file headings no longer style descendant code tokens.

`docs-reading.spec.ts` checks idle/pressed/focused cards, all four locales at 320px,
Dark+ token colors and type, exact copied registry source, JSON and shell grammars,
editable CSS, template/chart source, and static highlighted code without client JS.
The same tests also run against the published origin. No installable item or package
is added by this documentation change.

Static documentation is highlighted in the server/static-rendering layer and passed
as content into the client tab and clipboard frame. Only client-edited output and
fetched registry source use the live renderer. Both renderers share the same Dark+
options, pre geometry and clipboard surface. No-JavaScript checks verify that
static usage snippets already contain the actual colored token markup.


## Workspace and directory extension — 2026-09-29

The approved representative composition is extended, not used to add features.
All three summary groups compose the installed Card. Revenue, active-record count
and published-post count are deliberate stable accents, not hover/selection states.
Their labels retain the corresponding preset foreground. Summary type responds to
the individual plate width and exact data is never abbreviated to fit. Long values
may reflow; normal fixture values are checked at 320/390 and desktop widths.

Directory destinations keep their idle plate and pressed inset state, but metadata
no longer appears as a nested control. A larger title, quieter SOURCE metadata,
removed repeated footer rule and wrapping installation identifier separate the
reading hierarchy without dropping information or changing the directory skeleton.
Hover changes the title ink instead of making the plate sink to a weaker shadow.

The two create actions use fixed SVG plus geometry rather than font glyphs.
`workspace-plates.spec.ts` captures four locales in four viewport/mode projects,
checks 320px labels/value bounds and exact number strings, and is included in public
browser verification. Existing analytics CSV, data-manager save/delete recovery and
CMS draft/save/discard tests remain authoritative for behavior. No new registry item,
new dependency, compatibility path, global overflow concealment or fake metric data
is introduced. Other component layouts are not claimed to be re-designed by this pass.

Visual review caught two issues before publication: the longer ko/zh USD marker
wrapped the default revenue value, and a two-line Japanese label shifted its number
relative to its siblings. Currency spans now come from the existing analytics Intl
formatter's formatToParts result, not a duplicate formatter or string replacement.
A shared readout row and two-line balanced-label allowance align same-row numbers.
Tests retain the single-line default-value check, add same-row baseline checks and
verify exact currency text across four locales and four currencies.


## Task copy and composition review — 2026-10-03

The landing page identifies the React collection directly. Components, Charts and
Theme Studio use destination names rather than promotional sentences or comparisons. The workspace example
uses task labels instead of marketing slogans; the duplicated caption and brand
badge are removed, not hidden. The home form retains its real draft/save/reset,
validation and local-only feedback.

Settings, Data Manager and CMS use task headings. Example-only save-failure
controls follow their respective workspaces and remain visible, labeled and
operable. The installed CMS no longer displays an integration warning inside its
product header; its example owns that notice. Template documentation headers are
compact, scoped to template pages, and retain navigation, descriptions, usage
code and the original source panels. The directory no longer repeats a decorative
SOURCE tag; every install identifier and actual source link remains available.

This pass does not change the Card shadow, KPI accent assignments, quantitative
values or the MD-01–10 control implementations. Text and layout checks distinguish
usable task names, visible controls and overflow from subjective visual quality.
`task-composition.spec.ts` exercises four locales and captures home, template and
narrow-screen states; existing save-failure/retry tests still run without replay
or removed assertions. No dependency or registry item is added.

Remaining visual work is not certified by these tests: example articles and
portfolio content, the chart gallery beyond its heading, and native device/assistive
technology review require their own assessment.

## Editorial content and chart reading — 2026-10-03

Portfolio examples now describe dispatch, account-review and equipment screens in
four locales. They are labeled fictional, and no invented business metric is used.
The installed Portfolio removes its generic pitch section, keeps contact links,
and uses a fixed SVG plus/minus on native details. The inset keyboard ring stays
inside the clipped project plate. The header may wrap instead of pushing contact
navigation off a narrow host.

Blog, Blog Post and CMS fixtures use concrete editing, focus and review tasks in
all four locales. CMS keeps its existing save-failure/retry and application-owned
persistence boundary. Blog Post's introduction is a reading paragraph, not a
recessed input-like box. Blog removes its duplicated all-caps masthead. Sample
article routing remains application-owned as documented; this pass adds no router.
Separator keeps both separator orientations and names actual documentation sections
instead of a promotional slogan.

The chart gallery adds three ordinary section links with 44px targets and visible
keyboard focus. Product, operations and installation headings share a 700-weight
hierarchy. All eight installation references have localized titles and descriptions;
the decorative recipe numbers are removed. Operational chart controls retain their
existing English labels. Plot data, axes, flat marks, exact tables, range controls,
source disclosure and copied source bytes are unchanged.

`content-review.spec.ts` covers localized preview content, keyboard disclosure,
320px reflow, CMS recovery, chart anchors and exact source copying, including the
published site. `editorial.spec.ts` runs Portfolio and Blog Post from synchronized
shipping source without documentation CSS at 320/390/1440px, in both modes and four
locales. Existing MD-01–10 tests remain. These assertions do not certify subjective
visual quality or native-device/assistive-technology behavior; inspect the captures
and report actual run results separately. The blocking dependency audit is unchanged.


## Korean article wrapping

At 320px, the default Korean Blog Post split short words across lines, including
"초안" in the title. The installed article uses keep-all only for Korean, with
anywhere wrapping for a single token wider than its container. Other locales and
caller-owned classes remain unchanged. Source-only heading ranges verify complete
words at 320/390/1440px in both modes; the published check verifies the same CSS.


## Resource links and dashboard copy

Dashboard introductions name the metrics and active filters in each locale rather
than a two-part slogan. The analytics model, data, CSV and quantitative styling
are unchanged. Link Hub examples use actual documentation and repository links;
only the demonstration email is fictional and is labeled outside the block.

The installed Link Hub removes the bordered filter shell and decorative repeated
initials on destination tiles. Full caller-owned titles, URLs and handles wrap
within a narrow host, rather than hiding the detail behind an ellipsis. Destination
tiles retain their depth, directional SVG, focus/press state and an 80px minimum
height. The profile monogram remains caller-owned. No prop or dependency is added.

Source-only link-hub tests exercise 320/390/1440px in both modes and four locales,
long unbroken strings, keyboard filtering/navigation and clipboard success/denial.
The matching documentation checks also run on the public origin. Existing exact
analytics table/CSV and MD-01–10 checks stay in the full verification suites.


## Documentation chrome ownership

Remove the left accent pseudo-element from documentation navigation. Current pages
use one selected surface with symmetric gutters; keyboard focus remains separate.
The preview has no outer frame, toolbar rule or clipped shell. Its toolbar reuses
installed Tabs without docs-specific shadows or sizing overrides. The neutral,
open preview canvas matches the controls' material; the Dark+ code surface is separate.
Superseded global preview and language-menu rules are removed, not overridden.

Category and identifier share a 24px row and 20px line height. The category uses
Pretendard; the literal identifier stays case-sensitive Consolas. Language links
use the same 500 weight, 14px size and 40px row; selection uses fill and a fixed SVG
check, never a weight change or per-item divider. The trigger matches the 40px
header controls. Native language names and navigation remain unchanged.

chrome-finish.spec.ts verifies all four document locales in light/dark and narrow
layouts, metadata geometry, the absence of the old marker/borders, real Hover Card
and tab behavior, Dark+ rendering, language menu metrics and keyboard navigation.
The first capture exposed system CJK fonts despite equal CSS weights. Japanese
menu labels now use self-hosted Pretendard JP and Chinese labels self-hosted Noto
Sans SC at weight 500, scoped to this menu. Latin/Hangul UI remains Pretendard.
The Chromium regression verifies actual custom glyph fonts, not just CSS family
names. Font packages are exact locked, bundled by Vite and credited; no remote
font service or artificial bold is used. Installed registry source is unchanged.


## Compact tab states and template boundaries

Installed Tabs retain their 44px rail and 14px labels. A low-contrast inset
rail and short contact shadow replace the wide blurred shadow. The selected
segment uses primary/on-primary tokens, including on hover. Keyboard focus
stays distinct on active and inactive segments. Base UI owns orientation,
disabled tabs, manual activation and controlled/uncontrolled state.
Obsolete installation-tab size, shadow and selected-color overrides are
removed so Preview/Code and CLI/source use the same installed Tabs.

All eight template detail pages use one documentation-owned frame with a
localized preview heading, literal installation identifier and Install/Source
anchors. Its single border and muted toolbar show where the example begins
and ends; the canvas has no added elevation or clipping. The old page-header
rule is removed rather than doubled above the frame. Installation and source
documentation remain outside. Mobile gutters preserve workspace width.
Real examples and state are not replaced by images or iframes. Catalog
thumbnails stay unframed. Prior sidebar, metadata, language-menu and Dark+
fixes remain. No new API, token or dependency is introduced.

Source-only tabs-clarity tests cover both orientations, four locales, disabled
and selected states, active-hover contrast, keyboard activation, long labels
and 320/390/1440px in both themes. They distinguish live panels from inert
exit panels. template-boundary checks every template and separation from
documentation, including the published site. MD-01–10 remain in their
existing suites. Actual runs and visual review are reported separately.

## Selection controls and template catalog finish

ToggleGroup uses the same shallow rail and primary/on-primary selection pair as
Tabs. Standalone Toggle keeps its inset pressed state with a selected tint;
hover does not lift a pressed control. Both retain Base UI state, keyboard and
disabled behavior. Toggle sizes keep their existing minimum heights while long
labels can increase the height instead of escaping the face. Keyboard outlines
stay inside the face and caller classes/icon sizes are preserved.

The template catalog has one CSS module owner. Remove the obsolete global gallery
skins, unused featured-card rules, repeated numbers, tiny glyph arrows and tag
pills. Each card presents a real example, its title/description, literal registry
reference and one labeled navigation link. The title is not repeated in the
visible link; it remains in the link's accessible name. Card footers align even
when descriptions wrap. All four locales use native labels for the count/action.

Thumbnail transforms scale their logical width with their host width. The old
fixed 1040px/920px content widths cropped the right half at intermediate widths.
The preview remains intentionally cropped vertically and inert; detailed live
examples, their frames, source panels and application-owned state are unchanged.
No screenshot/iframe replacement, new dependency or new product API is added.

selection-finish tests run without documentation CSS; gallery-finish checks
320px, 768px and desktop dimensions, actual element bounds, each public item
reference and keyboard navigation. Existing MD-01–10, language-font checks,
Dark+ and template-boundary checks remain. Actual run results and visual review
are reported separately; passing CSS assertions are not a visual approval.


A first-frame composition trace also exposed scale-95 on a newly opened Alert
Dialog despite reduced motion, briefly rendering a 40px action at 38px. Alert
Dialog now scopes scaling to motion-safe and includes the independent scale
property in normal transitions. Native first-mount geometry is recorded by a
MutationObserver regression; existing action-size assertions are retained.


At 320px, the prior mobile header used four grid columns for three visible
children. Its min-width-zero home column allowed the logo to overlap Search
without causing page overflow. The header now reserves a 34px home column
between navigation and actions, with narrower gutters only below 360px.
No destination, star count or control is hidden. header-fit checks all four
locales at 320/360/390/768/1023/1440px, pairwise control bounds and home-mark
containment, then real menu/search/focus return/theme/home navigation. The
published suite includes those checks. Installed source is unchanged by
this header follow-through.
