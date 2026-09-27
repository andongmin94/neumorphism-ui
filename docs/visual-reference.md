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
