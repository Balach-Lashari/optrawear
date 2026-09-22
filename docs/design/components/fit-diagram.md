# Hero and fit diagram (Fig. 01)

**Code:** `Hero` in `components/home/sections.tsx`, and `components/home/fit-diagram.tsx`.

## Purpose
The diagram is the signature element. It explains Adaptive Fit with a working, annotated blueprint of the self-seating pads instead of a lifestyle photo.

## Anatomy
```
[slate band]
LIMITED SERIES —— 01 / 04          ┌ FIG. 01  PAD GEOMETRY, FRONT ELEVATION        Scale 2:1 ┐
Adaptive                            │  ⌐                                                   ¬  │
Fit            (display-xl, 300)    │   ╭────────╮ ⌒ ╭────────╮   front elevation          │
Titanium frames whose nose pads…    │  PIVOT ±12° ──╮    ╭── SPRUNG β-TITANIUM ARM        │
─────────────────────────────       │              ╭─○  ○─╮   SELF-SEATING PAD            │
4.8 g   ±4 mm   12,000              │              ⬮      ⬮                                │
FRAME WEIGHT  PAD TRAVEL  FROM, PKR │              |—17.0 mm—|  BRIDGE WIDTH, SEATED      │
[Shop the series →] [Book a fitting]│ ─────────────────────────────────────────────────── │
                                    │ BRIDGE WIDTH ────●──────────  17.0 mm  [↔ PAUSE]    │
                                    │ Nominal seat — pad pressure equalised left and right.│
                                    └──────────────────────────────────────────────────────┘
```

## Geometry
The drawing is traced 1:1 from the board's 868px figure (SVG viewBox `0 0 868 566`).

- **Pivots:** at (351, 326) and (516, 326).
- **Arms:** 97px long. Each pad is an ellipse with radii 13 × 29.
- **Scale:** 10.74 px/mm, so 17.0 mm = 182.6px between the pad faces.
- **Arm angle:** solved from the width, `sin θ = (w·10.74 − 139) / 194`. Pads rotate with their arm, and the dimension line follows the inner pad faces.

## Behaviour
- **Animation:** the width sweeps sinusoidally from 14 to 22 mm with a 7-second period.
- **Slider:** dragging the range input (14–22, step 0.1) pauses the animation and sets the width.
- **Play/Pause:** the button toggles the animation. Its label (Play or Pause) carries the state, so it has no `aria-pressed`.
- **Caption:** always describes the current seat: narrow, nominal or wide (**extension** copy).
- **Reduced motion:** with `prefers-reduced-motion` the diagram starts paused at 17.0 mm.

## Tokens
- **Surface:** `slate`, with `cream` strokes and text.
- **Muted text:** `cream` at 58%.
- **Leader lines:** `cream` at 38%.
- **Dashed lines:** `cream` at 34%.
- **Pads:** `slate-pad` fill.
- **Panel:** `radius-sm` with a `cream/18` border.

## Accessibility
- The SVG is `role="img"` with a `<title>`, and a `<desc>` that includes the live width.
- The slider has a visible label and `aria-valuetext` in millimetres; the value is also an `<output>`.
- The `<output>` and the caption are `aria-live="off"` while playing and `"polite"` when paused, so the animation doesn't flood screen readers but a slider change is announced.

## Do / don't
- **Don't** add other motion to the page. This is the page's one orchestrated moment.
- **Don't** swap the drawing for a photo.
