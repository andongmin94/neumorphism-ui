# Sculptural reference review

Reference: the public example image in Paran Penguin item 1379, not the store UI or a licensed source deck.

## Decisions implemented

- The central statistic row is the composition reference: one raised accent tile and three recessed, neutral tiles. Values and labels share a centreline, equal tile dimensions and a common gap.
- The surrounding preview is an open, same-material canvas. It does not put a raised card inside an inset card. Form and conditions use spacing and a separator instead of additional shells.
- Air's default surface corner is 12px. Small statistic tiles use 60% of the selected surface radius so small faces do not look inflated. Other presets remain distinct.
- Installable Card uses the small contact shadow, 20px gutters, 16px section gaps, a wrapping title with 24px line height and a wrapping footer. Soft structural cards no longer claim the same raised level.
- Geometry responds to the preview's own width, not just the browser width. Values and labels remain in their cells at 390px and all four document locales.
- Saved numeric readouts are derived from the same local state as the form and progress bar. Drafts do not silently change saved values. Delete, validation and recovery are preserved.

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
| Templates | Dashboard/data-manager/CMS summaries use one raised readout and supporting recessed readouts. Filter fields no longer sit inside another inset box. |
| Documentation | Same sibling shell. Open preview canvases, flat choice/progress wrappers, quiet directory cards that raise on interaction. No docs-specific large radius overriding the registry geometry. |

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
