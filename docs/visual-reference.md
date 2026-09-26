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
