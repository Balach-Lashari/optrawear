# optrawear.

The Optrawear storefront, built from the design board in `doc/reference/design/Frame.png`.

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide icons.
- **Design system:** `docs/design/`. Start with its README. The theme tokens in `docs/design/tokens/tokens.css` are imported directly by `app/globals.css`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static production build
npm run lint
npm run tokens:check # token files in sync + contrast pairs
```

## Routes

| Route | Screen |
|---|---|
| `/` | Home: Adaptive Fit launch with the interactive Fig. 01 |
| `/adaptive-fit` | Collection: filters, sort, grid |
| `/adaptive-fit/[slug]` | Product detail (8 frames, statically generated) |
| `/bag` | Bag & checkout |
| `/houses` | Four houses, with the store list and map |
| `/account/prescriptions` | Account: prescriptions, fit card, orders |

Other nav and footer links lead to a short holding page until they're designed.

## Where things live

```
app/                 routes; (site) group = announcement/header/footer chrome
components/ui/       Button, Tag, Swatch, Field, SectionHead
components/<area>/   layout, home, collection, product, bag, stores, account
lib/data.ts          catalogue, houses, prescription, orders (static)
lib/bag.tsx          bag context, persisted to localStorage
public/frames/       placeholder frame shots — swap for studio photography
```
