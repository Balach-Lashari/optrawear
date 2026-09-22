# Swatch

**Code:** `components/ui/primitives.tsx` exports `Swatch`.

## Purpose
A swatch shows a frame finish. Swatches appear in product cards (as a row), finish pills and filter chips.

## Anatomy
A circle 14–16px across, filled with a `finish-*` token, with an inset `ink/10` ring so pale finishes stay visible on cream.

## Variants
| Size | Where |
|---|---|
| 15 | Cards, finish pills |
| 14 | Default |

The colours are `finish-titanium`, `finish-graphite` and `finish-champagne`.

## States
Static. Selection belongs to the pill that contains the swatch (see `options.md`).

## Props
```ts
{ color: string; size?: number; label?: string; className?: string }
```
Pass `label` only when the swatch stands alone. It then becomes `role="img"` with that label; otherwise it's `aria-hidden`.

## Recipe
```tsx
{product.finishes.map((f) => <Swatch key={f} color={finishes[f].swatch} size={15} />)}
<span className="text-micro uppercase text-ink-faint">3 finishes<span className="sr-only">: Brushed titanium, Graphite, Champagne</span></span>
```

## Accessibility
A row of swatches is decorative. Always pair it with the finish count and the finish names (visible or `sr-only`).

## Do / don't
**Don't** use finish colours for UI state or anything other than swatches.
