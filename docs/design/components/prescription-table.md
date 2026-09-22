# Prescription table

**Code:** `components/bag/prescription-table.tsx`, used in the bag and in account.

## Anatomy
```
             SPH     CYL     AXIS    ADD     [PRISM]   PD
────────────────────────────────────────────────────────────
Right (OD)   −2.25   −0.75   175     +1.75   —         63
───────────────────────────────────────────────────── (row rule stops short of PD)
Left (OS)    −1.75   −0.50   010     +1.75   —
────────────────────────────────────────────────────────────
```
- **Heads:** `label` 600 in `ink-soft`.
- **Row labels:** `small` in `ink-muted`, inset 10px.
- **Values:** `small` in `ink`, with tabular figures.
- **PD:** one binocular value in a cell spanning both rows. It's vertically centred, and the middle row rule doesn't cross it.

## Variants
- **Bag:** no PRISM column.
- **Account:** includes PRISM.

## Behaviour
Keeps a minimum width of 34rem and scrolls horizontally inside its own wrapper on phones, so the page never scrolls sideways.

## Accessibility
- The table has a visually hidden caption.
- Column heads use `scope="col"` and row heads `scope="row"`.

## Content
- Negative values use a true minus sign (−), positive values an explicit plus (+).
- The axis is always 3 digits (010).
- An empty value is an em dash.
