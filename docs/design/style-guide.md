# Optrawear style guide

This guide is taken from the design board `doc/reference/design/Frame.png`, which shows six screens at 1440px. The board is the spec: where this guide and the board disagree, the board wins. Anything the board doesn't show (states, mobile, errors) is marked **extension**.

The board's own brief says:

> Six screens on the brand's own ground (cream #FFFAE5, ink #191919, slate #2A3138), with the limited titanium series carried by an annotated blueprint rather than borrowed photography.

---

## 1. Character

Optrawear is a house of frames, and the site reads like an optician's working drawings printed on warm paper:

- Cream is the ground everywhere. Slate and ink appear only in two deliberate bands: the Adaptive Fit hero and the house-line banner.
- The memorable element is the **blueprint**: *Fig. 01, pad geometry*, an annotated technical drawing that explains the product instead of an aspirational photo. Keep it the one loud thing on the page.
- Structure comes from hairline rules, tracked-capital labels and reference codes (AF-204). Measurements are content: 50–18–140, 17.0 mm, ±12°.
- Everything else is quiet: square corners (2–3px), no shadows, no gradients in UI chrome, and no decorative motion.

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FFFAE5` | Page ground, header, cards, inputs |
| `cream-sunken` | `#F7F1D8` | Order-summary rail |
| `cream-tint` | `#F4EDD2` | Image wells, status tags, hover wash, selected segment |
| `cream-press` | `#EAE6D5` | Selected account-nav row |
| `ink` | `#191919` | Headlines, values, primary button, announcement bar, house-line panel |
| `ink-soft` | `#4D4C46` | Body copy |
| `ink-muted` | `#6F6D64` | Meta lines, labels, inactive nav |
| `ink-faint` | `#76736A` | Facet counts, reference codes |
| `line` | `#E2DECD` | Hairlines: section rules, grid dividers, table rows |
| `line-strong` | `#C9C6B7` | Input, panel and quiet-button borders |
| `slate` | `#2A3138` | Hero ground, avatar |
| `slate-deep` | `#262B31` | House-line image ground |
| `slate-pad` | `#474D52` | Pad fill in the fit diagram |
| `finish-titanium` / `-graphite` / `-champagne` | `#B9B4A8` / `#3D4249` / `#D8C9A6` | Finish swatches only |
| `danger` | `#9B2C1F` | Form errors (**extension**) |

On slate and ink surfaces, text is `cream`. Secondary text is `cream/62` (the Tailwind opacity modifier), and rules are `cream/18`.

### Contrast (WCAG 2.2)

| Pair | Ratio | Result |
|---|---|---|
| ink on cream | 16.8 : 1 | AAA |
| ink-soft on cream | 8.2 : 1 | AAA |
| ink-muted on cream | 5.0 : 1 | AA |
| ink-muted on cream-sunken | 4.6 : 1 | AA |
| ink-faint on cream | 4.5 : 1 | AA |
| cream on slate | 12.6 : 1 | AAA |
| cream/62 on slate | 5.9 : 1 | AA |
| cream/62 on ink | 7.1 : 1 | AAA |

The grey sampled from the board for meta text (`#7A786E`) measured 4.2 : 1, so `ink-muted` is one step darker to reach AA. The sampled faint grey (`#8F8C80`, 3.2 : 1) was likewise darkened: `ink-faint` now reaches AA on cream, so facet counts and reference codes are readable text. It is not checked on the darker creams; keep it on `cream`.

## 3. Typography

The board names **Footlight MT** for display and **Haas Grotesk** for text. The site uses the board's own open stand-ins, loaded with `next/font/google`:

- **Newsreader** (serif) for page titles, section titles, product names, prices in context, and figures (4.8 g, 18.0).
- **Archivo** (sans) for body copy, navigation, controls, labels and tables.

| Token | Size / leading | Tracking | Face | Used for |
|---|---|---|---|---|
| `display-xl` | 96 / 0.84 | −0.025em | Newsreader 300 | Home hero, "Adaptive Fit" |
| `display-lg` | 64 / 1.0 | −0.02em | Newsreader 400 | Collection and product titles |
| `display-md` | 56 / 1.0 | −0.02em | Newsreader 400 | Your bag, Four houses, Prescriptions |
| `display-sm` | 48 / 1.04 | −0.015em | Newsreader 400 | "Frames worth looking twice at." |
| `heading-xl` | 44 / 1.05 | −0.015em | Newsreader 400 | Editorial headline |
| `heading-lg` | 32 / 1.1 | −0.01em | Newsreader 400 | Total, fit-card figures |
| `heading-md` | 24 / 1.2 | – | Newsreader 400 | Section titles, PDP price, bag names |
| `heading-sm` | 20 / 1.25 | – | Newsreader 400 | Card names, panel titles |
| `heading-xs` | 17 / 1.3 | – | Newsreader 400 | Promise strip, coverage card |
| `body-lg` | 15 / 1.7 | – | Archivo 400 | Hero and collection intros |
| `body` | 14 / 1.72 | – | Archivo 400 | Default copy, nav |
| `small` | 13 / 1.5 | – | Archivo 400 | Table cells, controls |
| `meta` | 12 / 1.5 | – | Archivo 400 | Meta lines, captions |
| `label` | 11 / 1.3 | 0.16em, uppercase | Archivo 500 | Section and field labels (`label` utility) |
| `label-lg` | 13 / 1.2 | 0.14em, uppercase | Archivo 500 | Commit buttons: Add to bag (`label-lg` utility) |
| `micro` | 10 / 1.3 | 0.12em | Archivo 400 | Facet counts, ref codes, tags |

Type rules:

- **Numbers are tabular** site-wide (`font-variant-numeric: tabular-nums`), so prices and prescriptions line up.
- **Measure:** intros are capped at about 70 characters (`max-w-[32rem]`–`[34.5rem]`).
- **Wrapping:** display titles balance their line breaks. The editorial headline opts out, because the board breaks it as "A frame that stops / asking to be / adjusted".
- **Logo:** the logo is set type, not an image: "optrawear." in Newsreader 500 at 21px with −0.055em tracking.

## 4. Layout

- **Grid:** at 1440 the content is 1344px wide with 48px gutters (`page-x` utility). Gutters step down to 32px at `md` and 16px on phones.
- **Full-bleed splits:** bands that split the viewport (PDP, bag, houses, account, collection) use a 1440 max-width with a hairline column rule:

| Screen | Columns at 1440 |
|---|---|
| Collection | 232 filter rail + grid |
| PDP | 800 gallery + details |
| Bag | content + 400 summary rail |
| Houses | 440 list + map |
| Account | 236 nav + content |

- **Home hero:** a 420 text column, a 56px gap, then the diagram.
- **Promise strip:** four cells in the ratio 312 : 360 : 360 : 312, divided by hairlines.
- **Engineering note:** a 342 headline column plus three 300px columns, with 34px gaps.
- **Alignment:** everything is left-aligned. The only centred text is inside the fit diagram (dimension labels) and the "Show the remaining two" divider.
- **Spacing:** multiples of 4px. Section tops are 64px (`pt-16`), panel padding is 18–26px, and rows in list tables are 40px.
- **Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`. The board is `1440`.

## 5. Structure devices

These carry information, not decoration:

- **Hairline rules** (`line`) sit under section titles, between grid cells, under table rows and under filter-group legends.
- **Tracked-capital labels** name a region or field: FINISH, SUMMARY, COVERAGE.
- **Reference codes** (AF-201…AF-208) identify a frame in the catalogue.
- **Numbered notes** (01 — The seat, 02 — The metal, 03 — The lens) are used only because the three notes explain the mechanism in order: seat, then metal, then lens.
- **Tags** come in two tones:
  - *outline ink* for merchandising: Series entry, Most seated, Widest seat, Opening ’26.
  - *tint* for status: Current, On file, In the lab, Delivered.

## 6. Imagery

- Frame shots are rendered on a cream vignette in a `cream-tint` well at a 4 : 3 ratio. The house-line image is the same frame on slate.
- The shots in `public/frames/` are cropped from the board as placeholders. The board says to swap real studio files into `assets/frames/`, and nothing in the code needs to change when you do.
- The map is real Natural Earth 1:50m geometry (`world-atlas`). It's projected with Mercator, and the projection is fitted so the pins land where the board puts them.

## 7. Iconography

Use **Lucide** (as the board specifies) at a 1.5–1.6 stroke, 14–16px. Always pair an icon with a text label; the only icon-only controls are the header controls (search, account, bag), and each has an `aria-label`.

The icons in use: Glasses, Search, User, ShoppingBag, ArrowRight, MapPin, MoveHorizontal, Info, Truck, CircleCheck, ImagePlus, Lock, Check, Clock, Phone, Menu, X and SlidersHorizontal.

## 8. Voice and copy

- **Plain and exact.** Give measurements and what they mean: "Adaptive Fit covers 14–22 mm on every frame in the series."
- **Sentence case** everywhere. Tracked capitals are a type style (`label`), not typed capitals, so the source text stays sentence case.
- **Keep an action's name through the flow.** "Add to bag" → "Added to bag: …"; "Continue to payment"; "Book a fitting".
- **Prices:** always `PKR 18,500` from `formatPKR()`. Breakdowns drop the currency: "Frame 18,500 + lenses 9,000". There are no decimals.
- **Dates:** DD/MM/YYYY (14/03/2026). A validity date is MM/YY or MM/YYYY.
- **Prescription values** use a true minus sign (−2.25), not a hyphen. An empty value is an em dash (—).
- **Errors say what to do**, never apologise: "Enter a mobile number with its country code, like +92 300 000 0000."
- **Empty states invite the next step:** "Your bag is empty. Every Adaptive Fit frame is glazed to your prescription in four working days." followed by a *Browse Adaptive Fit* button.

## 9. Motion

- There is **one orchestrated moment**: the fit diagram's pads sweep 14 ↔ 22 mm on a 7-second sine.
  - It **starts paused** when `prefers-reduced-motion: reduce` is set.
  - It pauses as soon as someone drags the slider, and the Pause/Play button toggles it.
- Everything else is response only. Colour transitions last `duration-fast` (120ms) on `ease-out`, and the radio dot scales in on selection. There are no entrance animations or scroll effects.
- A global reduced-motion rule caps all transitions.

## 10. Accessibility floor

- Every control is a native element: `button`, `a`, `input type=radio|checkbox|range|file|search`. Custom visuals sit on `sr-only` inputs through `peer-*` styles, so the keyboard and screen-reader behaviour stays native.
- **Focus:** a visible 1.5px `currentColor` outline with a 3px offset.
- **Landmarks:** `header`, `nav[aria-label]`, `main#main`, `aside[aria-label]` and `footer`. A "Skip to content" link, first in `<body>`, targets `#main` on every route and shows on focus.
- **Live regions:** the bag confirmation, the frame count after filtering, the fit-diagram caption and form status. Status elements stay mounted and toggle `sr-only` when empty.
- **Tables:** prescription tables have a caption, `scope` on the heads, and a PD cell that spans both rows.
- **Minimum widths:** every page is checked at 390px with no horizontal scroll. Wide tables scroll inside their own container.
