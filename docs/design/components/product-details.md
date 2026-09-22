# Product details: specification table and "In the box"

**Code:** `app/(site)/adaptive-fit/[slug]/page.tsx`.

## Anatomy
```
Specification                              In the box
Material          β-titanium, 0.9 mm       ┌─────────────────┬─────────────────┐
───────────────────────────────────        │ Fitting card    │ Hard case       │
Weight            4.8 g                    │ Your bridge, …  │ Recycled board… │
…                                          ├─────────────────┼─────────────────┤
                                           │ Cloth           │ Warranty        │
                                           └─────────────────┴─────────────────┘
```

| Part | Layout | Type | Colour |
|---|---|---|---|
| Spec table | Two equal columns, rows 40px tall with a bottom hairline, keys inset 10px | `small` | Keys `ink-muted`, values `ink` |
| In the box | 2 × 2 grid with shared `line-strong` borders | Title serif 17, body `meta` | Body `ink-muted` |

## Accessibility
- The spec table is a `<dl>`, since it holds key-value pairs rather than tabular data.
- In the box is a `<ul>` of `<h3>` + `<p>`.

## Content
Values carry their units and qualifiers inline: "18 mm (seats 14–22)", "±4 mm, ±12° pivot".
