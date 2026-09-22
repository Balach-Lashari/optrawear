# Optrawear design system

This system is taken from the design board `doc/reference/design/Frame.png`. It covers six desktop screens at 1440px: home, collection, product detail, bag & checkout, houses and account prescriptions. **The board is the spec.** Tokens and measurements were sampled from it pixel for pixel, the mockups are 1:1 at 1440, and all copy is taken from it word for word.

The stack is Next.js 16 (App Router) with TypeScript and Tailwind CSS v4. `docs/design/tokens/tokens.css` *is* the site's theme: `app/globals.css` imports it, so the docs and the code can't drift apart.

## Principles

1. **Cream is the ground.** Slate and ink appear in exactly two bands: the Adaptive Fit hero and the house-line banner.
2. **The blueprint is the loud thing.** Fig. 01 explains the product with a working, annotated drawing. Nothing else on a page competes with it for attention or motion.
3. **Measurements are content.** Eye–bridge–temple, 17.0 mm, ±12°, reference codes and tabular figures are shown plainly, the way an optician writes them.
4. **Hairlines, not boxes.** Structure comes from 1px rules, tracked-capital labels and shared grid borders. There are no shadows, gradients in UI chrome or big radii (2–3px at most).
5. **Serif for names and numbers, sans for doing.** Newsreader carries titles, product names and figures. Archivo carries everything you read in passing or interact with.
6. **Quiet, exact copy.** Sentence case, verbs on buttons, and the same word for an action through the whole flow.

## File map

| Path | What |
|---|---|
| `style-guide.md` | Colour (with contrast table), type scale, layout grid, structure devices, imagery, icons, voice, motion, accessibility |
| `tokens/tokens.json` | **Source of truth** (W3C Design Tokens format) |
| `tokens/tokens.css` | Tailwind v4 `@theme` plus the `label`, `label-lg`, `surface-slate` and `surface-ink` utilities. Imported by the app |
| `tokens/tokens.ts` | Typed tokens for JS (SVG fills, charts) |
| `components/button.md` | Button, ButtonLink, text action |
| `components/tag.md` | Merchandising and status tags |
| `components/swatch.md` | Finish swatch |
| `components/field.md` | Field, input, search |
| `components/options.md` | Finish pills, eye-size segments, lens list, sort control |
| `components/filter-group.md` | Collection filter rail and help card |
| `components/header.md` | Announcement bar, site, checkout and account headers |
| `components/footer.md` | Footer |
| `components/breadcrumb.md` | Breadcrumb |
| `components/product-card.md` | Collection card, series card, frame image well |
| `components/gallery.md` | PDP gallery with the worn-shot dropzone |
| `components/product-details.md` | Specification table, "In the box" |
| `components/fit-diagram.md` | Home hero and the interactive Fig. 01 |
| `components/marketing-sections.md` | Promise strip, engineering note, series strip, house-line banner, SectionHead |
| `components/bag-line-item.md` | Bag line |
| `components/prescription-table.md` | Right/left reading table with the spanning PD cell |
| `components/order-summary.md` | Summary rail |
| `components/store-list.md` | House list and Natural Earth map |
| `components/account.md` | Account nav, prescription panel, fit card, orders |
| `components/feedback.md` | Status, errors, empty states, unbuilt pages |

## Using it

```tsx
// Colours, type and radii are ordinary Tailwind utilities generated from the tokens:
<h1 className="text-display-lg">Optra Adaptive Fit</h1>
<p className="label text-ink-muted">Finish</p>
<section className="surface-slate">…</section>

// Variants go through cva; class merging goes through cn() (it knows the custom type scale):
import { Button } from "@/components/ui/button";
<Button variant="primary">Add to bag</Button>
```

To change a token:
1. Edit `tokens.json`.
2. Mirror the change in `tokens.css` and `tokens.ts`.
3. Run `npm run tokens:check`, which fails if the three files disagree.

## Beyond the board (review these)

The board shows desktop screens in their resting state. These additions stay inside its tokens and were kept minimal:

- **Selected states.** The board draws no selected option, so selection is marked minimally: an ink border for finish pills, a `cream-tint` fill for eye-size and sort segments, and an ink dot for radios and filters.
- **Mobile layout.** Below 1024px the columns stack. Below 768px the nav moves behind a Menu button, filters sit behind a "Filters" button, and wide tables scroll inside their own box.
- **Fit diagram.** The narrow and wide captions are new copy; the board only has "Nominal seat — …". A Play/Pause toggle was added. The diagram starts paused for reduced-motion users.
- **Header.** The same icons appear everywhere; some board screens drop the account or bag icon. The search icon opens the series until search is designed. The announcement bar shows on home only, as on the board.
- **Placeholder frames.** "The remaining two" are Hingol (AF-207) and Deosai (AF-208), because the board names only six. Their data was chosen so the filter counts match the board. The exception is Finish, which shows 7/5/5 against the board's 8/5/4: the board's own Clifton card has no titanium, so 8/5/4 isn't reachable.
- **Flows the board doesn't cover:**
  - "Change lenses" toggles single vision ↔ progressive.
  - "Continue to payment" validates the fields, then says payment isn't connected yet.
  - "Book a fitting" calls the house.
  - "Upload a new one", "Replace" and "Add a reading" confirm the file name.
  - "Print or save PDF" opens the browser print dialog.
- **Feedback.** All status, error and empty states are new (see `components/feedback.md`), as are the unbuilt nav and footer pages (`/optical`, `/lens-guide` and the rest) and the 404.
- **Demo bag.** A first visit starts with the board's two-frame bag (Meridian progressive and Ravi graphite) so `/bag` matches the board. Delete `SEED` in `lib/bag.tsx` to start empty.
- **Contrast.** `ink-muted` is one step darker than the sampled grey so it reaches AA. `ink-faint` was darkened from the sampled `#8F8C80` to `#76736A` (4.5 : 1 on cream) so facet counts and reference codes reach AA too.

## Assets

- **Frame shots:** `public/frames/*.webp` are cropped from the board as placeholders. Replace them with studio photography at the same names and ratios (4:3 cards, 712:537 hero, 1:1 details, 3:2 house line).
- **Fonts:** Newsreader and Archivo stand in for Footlight MT and Haas Grotesk. To use the licensed faces, load them with `next/font/local` under the same CSS variables (`--font-newsreader`, `--font-archivo`) in `app/layout.tsx`.
