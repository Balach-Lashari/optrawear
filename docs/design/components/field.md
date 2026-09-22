# Field and input

**Code:** `components/ui/primitives.tsx` exports `Field` and `inputClass`.

## Purpose
Single-line text entry: delivery address, mobile number, house search.

## Anatomy
```
Deliver to                          ← meta, ink-soft, 8px above
┌───────────────────────────────┐
│ House 14, Street 7, F-7/3 …   │   h-9 (36px) · px-2.5 · small text · 1px line-strong · radius-xs · cream fill
└───────────────────────────────┘
Add a delivery address so …         ← error, meta, danger (extension)
```

## Variants
| Variant | Use |
|---|---|
| Labelled (`Field`) | Checkout |
| Search (`inputClass` + visually hidden label) | Houses: placeholder "City, area or postcode" |

## States
| State | Look |
|---|---|
| default | `line-strong` border |
| hover | `ink-muted` border |
| focus-visible | `ink` border, no outline ring |
| invalid (`aria-invalid`) | `danger` border, with the message below linked by `aria-describedby` |
| disabled | 40% opacity (**extension**) |

## Tokens
`line-strong`, `ink-muted`, `ink`, `danger`, `cream`, `text-small`, `text-meta`, `radius-xs`

## Props
```ts
type FieldProps = React.ComponentProps<"input"> & { id: string; label: string; error?: string };
```

## Recipe
`<Field id="mobile" label="Mobile" type="tel" autoComplete="tel" value={v} onChange={…} error={err} />`

## Accessibility
- Every input has a `<label>`. A placeholder is never the only label.
- Errors appear after the user submits, not on every keystroke.

## Content
Labels are nouns ("Deliver to", "Mobile"). An error states the fix and gives an example.
