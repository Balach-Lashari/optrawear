# House list and map

**Code:** `components/stores/store-list.tsx` and `components/stores/store-map.tsx`.

## House list anatomy
```
[ City, area or postcode            ]      search input
──────────────────────────────────────
Karachi                              —     serif 22 · distance 11px faint ("—" = nearest)
14-C, Khayaban-e-Shahbaz, Clifton Block 4  small, ink-soft
◷ 11:00 — 21:00   ✆ 021 3530 0000          11px ink-muted (phone is a tel: link)
BOOK A FITTING   DIRECTIONS                text actions (strong / muted)
──────────────────────────────────────
Multan [OPENING ’26]                780 km  outline tag for a house not yet open
```

## House list behaviour
- **Search:** filters by city or address as you type. With no match it reads: "No house matches “…”. We deliver nationwide, glazed in Karachi." That message sits in a `role="status"` element that is always mounted (`sr-only` while there are results).
- **Nearest house:** the "—" is `aria-hidden`, followed by sr-only "Nearest to you".
- **Book a fitting:** calls the house. The appointment flow isn't designed yet.
- **Directions:** opens Google Maps in a new tab.

## Map
- **Geometry:** Natural Earth 1:50m (`world-atlas`), rendered to SVG on the server. Only the markup ships.
- **Projection:** Mercator, scale 1758, translate (−1628.7, 1280), fitted to the board's pin positions.
- **Fills:**

| Layer | Fill | Stroke |
|---|---|---|
| Sea | `#FFFCE8` | – |
| Land | `#F5F0DC` | 0.8px `#D8D2BF` borders |
| Pakistan | `#F3EEDB` | 1.3px ink outline at 82% |
| Graticule (5°) | – | `#EFE9D4` |

- **House pins:** a 6.5px cream ring (`ink-muted` stroke) around a 2.6px ink dot. The label is the city in 11px 600 caps in `ink-soft`, with the street note below in 9.5px faint. Multan's label sits to the left of its pin.
- **Other cities:** a 1.6px faint dot with a 9.5px name.
- **Credit:** "FOUR HOUSES · NATURAL EARTH GEOMETRY", bottom-left.
- **Coverage card:** above the map sits a `line-strong` box containing a `label` and a serif line, "Nationwide delivery, glazed in Karachi".

## Accessibility
- The map is `role="img"` with a title that lists all four houses. The list next to it carries the same information in text.
- The search input has an `sr-only` label.
