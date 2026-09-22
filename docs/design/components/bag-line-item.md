# Bag line item

**Code:** `LineItem` in `components/bag/bag-view.tsx`.

## Anatomy
```
┌──────────┐  Meridian  AF-204 · Brushed titanium · 50                     PKR 27,500
│  frame   │  Progressive lenses · anti-reflective · your reading of 14/03/2026   Frame 18,500 + lenses 9,000
└──────────┘  CHANGE LENSES   REMOVE
150 × 112     serif 24 · micro faint meta · meta ink-soft · text actions         body-lg · 11px ink-muted
```
- **Grid:** 150px image, content, then price aligned right. On phones the price moves under the content.
- **Spacing:** rows are separated by hairlines with 26px vertical padding.

## Behaviour
- **Change lenses:** toggles single vision ↔ progressive (**extension**; the board shows the button, not the flow), and the price updates.
- **Remove:** takes the line out of the bag straight away.
- **Persistence:** the bag is saved to `localStorage` through `useBag()`. On read, lines are kept only if their slug, lens and finish are known; line ids are `crypto.randomUUID()`.
- **Hydration:** until storage has been read (`useBag().hydrated`), the bag page renders an empty placeholder and the header hides its count, so the seed bag never flashes.

## Accessibility
The action labels are made unique: "Remove Ravi", "Change lenses on Meridian to single vision".

## Content
The description line reads lens type · coating · prescription source, joined by middle dots.
