# Tag

**Code:** `components/ui/primitives.tsx` exports `Tag` and `tagVariants`.

## Purpose
A tag is a short label attached to an item. It either merchandises the item or reports its status.

## Anatomy
```
┌──────────────┐
│ MOST SEATED  │  h-5.5 (22px) · px-2.5 · micro text, 0.14em tracking, uppercase · radius-xs
└──────────────┘
```

## Variants
| Tone | Look | Examples |
|---|---|---|
| `outline` (default) | 1px ink border, ink text | Series entry, Most seated, Widest seat, Opening ’26 |
| `tint` | `cream-tint` fill, `ink-soft` text | Current, On file · valid to 03/27, In the lab, Delivered |

## States
Tags are static and never interactive. If a tag needs to act as a filter, use the filter group instead.

## Tokens
`ink`, `ink-soft`, `cream-tint`, `radius-xs`, `text-micro`

## Props
```ts
type TagProps = React.ComponentProps<"span"> & { tone?: "outline" | "tint" };
```

## Recipe
`<Tag>Most seated</Tag>` · `<Tag tone="tint">In the lab</Tag>`

## Accessibility
Tags are read inline as text, so place them after the name they describe.

## Content
Two or three words in sentence case (the capitals come from the type style). Status tags use the same words as the process: "In the lab", then "Delivered".
