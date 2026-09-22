# Order summary rail

**Code:** `Summary` in `components/bag/bag-view.tsx`.

## Anatomy
```
SUMMARY
Frames (2)                 PKR 30,500
Progressive lenses          PKR 9,000
Glazing & fitting            Included
Delivery, Islamabad              Free
──────────────────────────────────────
Total                   PKR 39,500     serif 20 / serif 32
[      CONTINUE TO PAYMENT  →      ]   primary, full width
🔒 Card, bank transfer or cash on delivery.
──────────────────────────────────────
INCLUDED WITH ADAPTIVE FIT
✓ Lifetime pad adjustment at any house
✓ …
```
- **Rail:** 400px wide on a `cream-sunken` fill with a left hairline, 44px padding. On phones it stacks under the bag.
- **Line rows:** `small`, with keys in `ink-soft`.
- **Rules:** `line-strong` at 70%.

## Behaviour
- **Delivery row:** reads "Delivery, {city}", where the city is the last comma-separated part of the *Deliver to* field (trimmed). With no usable part it reads "Delivery".
- **Totals:** come from `useBag().totals`. When no line has progressive lenses, the lens row reads "Single-vision lenses · Included".
- **Continue to payment:** validates the delivery fields first. Payment isn't built on the board, so the preview shows the status line "Payment isn’t connected on this preview yet." (**extension**).
- **Empty bag:** the button is disabled.

## Accessibility
The rail is an `aside[aria-label="Order summary"]` and the totals are a `<dl>`.
