# Filter rail

**Code:** `FilterGroup` and `CollectionBrowser` in `components/collection/collection-browser.tsx`.

## Purpose
The filter rail narrows the collection by shape, bridge width, finish and price. The help card beneath it points undecided shoppers to a house.

## Anatomy
```
SHAPE                              ← legend: label, ink-muted, hairline below
○ Rectangle                    3   ← 14px ring · small text · micro count, ink-faint
○ Panto                        2
…
┌──────────────────────────┐
│ Not sure of your         │       help card: 1px line-strong · p-4.5
│ bridge width?            │       serif 17
│ Adaptive Fit covers …    │       meta, ink-muted
│ [Measure at a house]     │       quiet button, sm
└──────────────────────────┘
```

## Variants
| Viewport | Layout |
|---|---|
| `md` and up | Fixed 232px rail with a right hairline |
| Below `md` | Hidden behind a "Filters (n)" disclosure button in the collection header (**extension**) |

## States
| State | Look |
|---|---|
| Unchecked | `line-strong` ring |
| Checked | Ink ring with an ink dot |
| Focus | Outline on the ring |
| No results | Empty panel: "No frames match these filters.", a hint, and a *Clear filters* button |

## Behaviour
- **Matching:** checkboxes are OR within a group and AND across groups.
- **Counts:** each count is the facet's total across the catalogue, not the filtered count, so the numbers never jump around.
- **Paging:** while any filter is on, every match shows. With no filters, the grid shows 6 frames plus a *Show the remaining two* button.

## Tokens
`line`, `line-strong`, `ink`, `ink-muted`, `ink-faint`, `text-small`, `text-micro`, `label`

## Accessibility
Each group is a `<fieldset>` with a `<legend>`. The inputs are real checkboxes (`sr-only` + `peer`), and each label wraps its row.

## Content
Name facets the way customers measure: "14–16 mm", "Under 15,000". Currency is implied inside the price group.
