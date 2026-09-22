# Home sections: promise strip, engineering note, series strip, house-line banner

**Code:** `components/home/sections.tsx`.

## Promise strip
- **Layout:** four cells at 312 : 360 : 360 : 312, with hairlines between and a hairline below. On phones it's a 2 × 2 grid.
- **Cell:** a `label` (ink-muted) above two lines of serif 17 with a fixed line break.
- **Copy:** Est. 2019 · Four houses · In-house lab · Thirty days.

## Engineering note
- **Headline:** serif 44 in a 342px column, breaking as "A frame that stops / asking to be / adjusted". Below it sits the text action "Read the engineering note →".
- **Columns:** three columns headed "01 — The seat", "02 — The metal", "03 — The lens" (`label` with a hairline below). The numbers are justified because the notes follow the mechanism in order.
- **Body:** `small` with 24px leading in `ink-soft`.
- **Evidence:** a single evidence sentence may be set in `ink` for emphasis. The board does this for the 70% claim.

## Series strip
- **Head:** `SectionHead` with "The series", the aside "Eight titanium frames, from PKR 12,000" and the action "All frames".
- **Cards:** four `SeriesCard`s with vertical hairlines between them.

## House-line banner
- **Layout:** 827 : 613 split. The image is on the left (the frame on `slate-deep`, object-cover) and an `ink` panel is on the right.
- **Panel:** padded 48px, containing `label` "The house line", a `display-sm` headline with a fixed break, `body` text at `cream/78` (max 344px), and an `inverse` + `label-lg` button "Find your house ⌖".
- **Phones:** stacks, image first.

## SectionHead (shared)
**Code:** `components/ui/primitives.tsx`.

A heading and optional muted aside on the left, an action on the right, and a hairline below. Sizes are `md` (serif 24) and `sm` (serif 20).
