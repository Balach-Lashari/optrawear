# Account: nav, prescription panel, fit card, orders

**Code:** `components/account/account-client.tsx` (`AccountNav`, `AddReading`, `PrescriptionActions`) and `account-parts.tsx` (`PrescriptionPanel`, `FitCardPanel`, `OrdersPanel`).

## Account nav
- **Layout:** `label` "Account" above links in `body`, `ink-soft`, padded `px-3 py-2`, radius-xs.
- **Selected:** `cream-press` fill with ink text (`aria-current="page"`).
- **Hover:** `cream-tint`.
- **Phones:** a horizontal scroll row.

## Prescription panel
- **Container:** `line-strong`, radius-sm.
- **Head row:** a serif 20 title with a tint tag "Current", and on the right the 11px meta "Taken 14/03/2026 · valid to 03/2027". A hairline sits below.
- **Body:** a `PrescriptionTable` with PRISM, then the text actions:
  - *Use for a new order* (strong) links to the collection.
  - *Print or save PDF* opens the print dialog.
  - *Replace* opens a file picker and shows a confirmation.

## Fit card
- **Head:** `SectionHead` size `sm` with "From your last fitting" on the right.
- **Figures:** three serif 32 values (18.0 / 50 / 140), each with a `label` beneath.
- **Note:** a single-sentence reading in `meta`.

## Orders
Rows are separated by hairlines. Each row has:
- a 74px 4:3 thumbnail,
- the name in serif 17,
- "#OW-4182 · 18/03/2026 · PKR 27,500" in 11px `ink-muted`,
- a tint status tag on the right.

## Other account pages
The nav's other sections (orders, fit card, saved frames, addresses) reuse these panels at `/account/[section]`. Saved frames shows an empty state.
