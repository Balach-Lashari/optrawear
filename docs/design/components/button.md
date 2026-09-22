# Button

**Code:** `components/ui/button.tsx` exports `Button`, `ButtonLink`, `buttonVariants` and `textAction`.

## Purpose
Buttons start an action or go to a key destination. Each view has **one** primary action; every other action is outline, quiet or a text action.

## Anatomy
```
┌──────────────────────────────┐
│  ADD TO BAG   [icon]         │  ← label (label-lg or small) + optional trailing Lucide icon, 14px
└──────────────────────────────┘
  rounded-xs (2px) · 1px border · h-12 (lg) / h-10.5 (md) / h-8 (sm)
```

## Variants
| Variant | Look | Board examples |
|---|---|---|
| `primary` | Ink fill, cream `label-lg` text | Add to bag, Continue to payment |
| `outline` | Ink border, ink `label-lg` text. With `border-line-strong` it becomes the quieter partner | Show the remaining two, Try at a house |
| `quiet` | `line-strong` border, `meta` 500, sentence case | Upload a new one, Add a reading, Measure at a house |
| `inverse` | Cream border and text on slate/ink. Sentence case at `md`; add `label-lg` for caps | Shop the series →, Find your house ⌖ |
| `inverse-quiet` | `cream/30` border on slate | Book a fitting |

| Size | Height | Padding |
|---|---|---|
| `lg` (default) | 48 | 32 |
| `md` | 42 | 22 |
| `sm` | 32 | 16 |

## States
| State | primary | outline | quiet | inverse |
|---|---|---|---|---|
| hover | `ink/88` | fills ink, text cream | border → ink | fills cream, text ink |
| focus-visible | 1.5px currentColor outline, 3px offset (global) | same | same | same |
| active | as hover | as hover | as hover | as hover |
| disabled | 40% opacity, no pointer events | same | same | same |
| loading | **extension:** keep the label and add `aria-busy`. Don't swap in a spinner | | | |

## Tokens
`ink`, `cream`, `line-strong`, `radius-xs`, `label-lg`, `text-small`, `text-meta`, `duration-fast`, `ease-out`

## Props
```ts
type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;
// variant: "primary" | "outline" | "quiet" | "inverse" | "inverse-quiet"; size: "sm" | "md" | "lg"
```

## Recipe
```tsx
<Button variant="primary" className="flex-1">
  Add to bag <ShoppingBag aria-hidden className="size-3.5" strokeWidth={1.6} />
</Button>
<ButtonLink href="/houses" variant="inverse" size="md" className="label-lg">
  Find your house <MapPin aria-hidden className="size-3.5" strokeWidth={1.6} />
</ButtonLink>
```

## Text action
`textAction({ tone })` is tracked caps with no box, for secondary verbs next to content:

- `strong` (ink): Book a fitting, Use for a new order, Read the engineering note →
- `muted`: Directions, Change lenses, Remove, Print or save PDF, Replace photo, All frames

## Accessibility
- Use `<button>` for actions and `ButtonLink` for navigation. Never put `onClick` on an `<a>`.
- Mark icons `aria-hidden`. When the visible label is ambiguous in a list, add an `aria-label` ("Remove Ravi").

## Content
Start with a verb and name exactly what happens: "Add to bag", not "Submit". Keep the same wording through the flow ("Added to bag").

## Do / don't
- **Do:** keep one `primary` per view.
- **Don't:** put a primary on slate. Use `inverse` there.
- **Don't:** append "→" to every button. The board uses arrows only on "Shop the series", "Read the engineering note" and "Continue to payment", where the action moves you forward.
