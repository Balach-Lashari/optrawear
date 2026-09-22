# Breadcrumb

**Code:** `Breadcrumb` in `components/layout/site-chrome.tsx`.

## Anatomy
A band 44px tall with a bottom hairline: `Frames / Adaptive Fit / Meridian`. Ancestors are `meta` in `ink-muted` (turning `ink` on hover); the current page is `ink`.

## Props
```ts
{ items: { label: string; href?: string }[] }  // the last item has no href
```

## Accessibility
`nav[aria-label="Breadcrumb"] > ol`. The current item has `aria-current="page"`, and the slash separators are `aria-hidden`.
