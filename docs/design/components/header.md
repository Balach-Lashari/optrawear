# Site chrome: announcement bar, headers

**Code:** `components/layout/announcement-bar.tsx`, `site-chrome.tsx` (`SiteHeader`, `CheckoutHeader`, `AccountHeader`, `Logo`) and `header-client.tsx` (`HeaderNav`, `HeaderIcons`).

## Purpose
These carry the brand and main navigation. The header changes shape with the job of the page: shopping, checking out, or managing an account.

## Anatomy
```
[ink] ⌓ EYEWEAR MADE IN PAKISTAN SINCE 2019 — THE COUNTRY’S FIRST HOUSE OF FRAMES     FREE LENS FITTING AT ALL FOUR STORES   h-7.5
optrawear.   Adaptive Fit  Optical  Sun  Lenses  Houses                       🔍  👤  👜 2   h-15 · border-b line
             ‾‾‾‾‾‾‾‾‾‾‾‾ active: 1px ink underline
```

## Variants
| Variant | Contents | Routes |
|---|---|---|
| Announcement bar | Ink band of `label` text at `cream/80`. The right-hand message hides below `md` | Home only (`AnnouncementSlot`) |
| `SiteHeader` | Logo, main nav, search, account, bag + count | Shop pages |
| `CheckoutHeader` | Logo + steps: `1 BAG —— 2 PRESCRIPTION —— 3 PAYMENT`. The current step is ink, the others `ink-muted` | `/bag` |
| `AccountHeader` | Logo + 26px slate avatar with initials + name | `/account/*` |

## States
| Element | State | Look |
|---|---|---|
| Nav link | Default | `ink-soft` |
| Nav link | Hover | `ink` |
| Nav link | Current | `ink` with a 1px ink underline. `aria-current="page"` on the link's own route, `"true"` on routes under it (a frame page under Adaptive Fit). Home underlines Adaptive Fit because it's the series launch, but sets no `aria-current` |
| Icon button | Hover | `cream-tint` square |
| Mobile (below `md`, **extension**) | – | The nav collapses behind a Menu button and opens a full-width panel of serif 20 links divided by hairlines |

## Tokens
`ink`, `cream`, `cream/80`, `ink-soft`, `line`, `cream-tint`, `slate`, `label`, `text-body`

## Props
None. The nav list and bag count come from the route and the `useBag()` context.

## Accessibility
- The nav is `nav[aria-label="Main"]`.
- The bag link is labelled "Bag, 2 frames". The visible count appears once the stored bag has been read.
- The menu button has `aria-expanded` and `aria-controls`.
- The checkout steps are an `<ol>` with `aria-current="step"`.

## Notes
The board omits some header icons on some screens; the site uses the full set everywhere so the header stays consistent. The search icon opens the series until search is designed.
