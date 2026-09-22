# Footer

**Code:** `SiteFooter` in `components/layout/site-chrome.tsx`.

## Anatomy
```
optrawear.                     FRAMES          SERVICE          HOUSE
Worth looking at twice.        Adaptive Fit    Book a fitting   Our story
Designed in Karachi, …         Optical         Lens guide       Houses
                               Sun             Repairs          Careers
                               Gift card       Returns          Press
© 2026 Optrawear (Pvt) Ltd   Terms   Privacy          Adaptation figure from independent fitting trials, n=120, 2025
```
- **Columns:** a 1.35 : 1 : 1 : 1 grid on `md`, stacked below that.
- **Links:** `small`, `ink-soft`, turning `ink` on hover.
- **Column heads:** `label`, `ink-muted`.
- **Legal row:** 11px, `ink-muted`.

## Content
The footnote cites the source of the "70% faster" claim. Keep it whenever that claim appears on the site.

## Accessibility
Each column is a `nav` with an `aria-label` that matches its heading.
