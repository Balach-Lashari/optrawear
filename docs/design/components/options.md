# Option controls: finish pills, eye-size segments, lens list, sort

**Code:** the `Choice` pattern in `components/product/configurator.tsx`, and `CollectionSort` in `components/collection/collection-browser.tsx`.

## Purpose
These let someone choose one value from a small set that's visible all at once.

## Anatomy
```
FINISH
[● Brushed titanium] [● Graphite] [● Champagne]      pill: h-8.5 · px-3 · meta 500 · 1px line-strong · radius-xs

EYE SIZE
┌─────────────┬──────────────┬──────────┐
│ 48 narrow   │ 50 regular   │ 52 wide  │           segments share one border; muted sub-label
└─────────────┴──────────────┴──────────┘

LENSES
┌─────────────────────────────────────────┐
│ ○ Single vision              Included   │         rows h-11, divided by line
│ ○ Progressive             + PKR 9,000   │
└─────────────────────────────────────────┘

8 frames  ┌────────┬───────┬───────┐
          │ Newest │ Price │ Width │                sort: h-9 · small
          └────────┴───────┴───────┘
```

## Variants
The four shapes are pill, segment, list row and sort segment.

## States
The board draws every option unselected, so the selected look is an **extension** kept deliberately minimal:

| Control | Selected look |
|---|---|
| Pill | Border → `ink` |
| Segment and sort | `cream-tint` fill, 500 weight |
| Lens row | Radio ring → ink, with a 8px ink dot that scales in (`duration-fast`) |

In every control, hover shows a `cream-tint/60` wash or an `ink-muted` border. Focus-visible gives the visual a 1px ink outline, driven by `peer-focus-visible` from the hidden native input.

## Tokens
`line-strong`, `ink`, `ink-muted`, `cream-tint`, `text-meta`, `text-small`, `radius-xs`, `duration-fast`

## Props (pattern)
```ts
function Choice(props: { name: string; value: string; checked: boolean; onChange(): void; className?: string; children: React.ReactNode })
```

## Accessibility
- Finish, size and lens are native radio groups inside a `<fieldset>` with a `<legend>` (the tracked label), so arrow keys move within each group.
- Sort is a `role="group"` labelled "Sort frames", holding toggle buttons with `aria-pressed` on the active one.
- **Sort order:** *Newest* (the default) sorts by `addedAt` descending, so the board order (Ravi, Chenab, Kohsar, Meridian, Clifton, Margalla, Hingol, Deosai) is newest first. *Price* and *Width* sort ascending.
- The frame count is `aria-live="polite"`.

## Content
The option label goes first and the qualifier second in muted text: "50 regular", "+ PKR 9,000", "Included".
