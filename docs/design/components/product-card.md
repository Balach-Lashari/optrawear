# Product card

**Code:** `components/collection/product-card.tsx` exports `ProductCard`, `SeriesCard` and `FrameImage`.

## Purpose
A card presents one frame so it can be compared with the others and opened.

## Anatomy
```
Collection (ProductCard)                 Home (SeriesCard)
AF-204                [MOST SEATED]      ┌──────────────────┐
┌──────────────────────────────┐         │   frame on cream │ 4:3
│      frame on cream, 4:3     │         └──────────────────┘
└──────────────────────────────┘         Ravi          PKR 12,000
Meridian               PKR 18,500        Rimless · 51 mm · brushed titanium
Soft rectangle · 50–18–140
● ● ●  3 FINISHES
```

## Variants
| Variant | Name | Price | Meta | Extras | Container |
|---|---|---|---|---|---|
| `ProductCard` | Serif 22 | `body` | Style · eye–bridge–temple | Ref code (micro, faint), optional outline tag, swatch row | A grid with a shared hairline: each cell draws its right and bottom borders, and the grid draws top and left |
| `SeriesCard` | Serif 20 | `small` | Style · eye mm · finish | – | A 4-up strip with vertical hairlines between cells |

## States
- **hover:** the name underlines (1px, 4px offset). The image doesn't scale or lift; there is no card shadow.
- **focus-visible:** the global outline around the whole link.

## Tokens
`cream-tint`, `line`, `ink`, `ink-muted`, `ink-faint`, `heading-sm`, `text-meta`, `text-micro`, `radius-xs`

## Props
```ts
{ product: Product; priority?: boolean }   // priority → eager-loads the first row
```

## Accessibility
- The whole card is one link, with the name as an `h3`.
- The image alt names the frame and finish.
- The swatch row has `sr-only` finish names.

## Content
Always show the measurements, in the order the optician writes them: eye–bridge–temple.
