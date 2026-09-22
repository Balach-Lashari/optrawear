# Product gallery

**Code:** `components/product/gallery.tsx`.

## Anatomy
```
┌──────────────────────────────────────┐
│                hero                  │  aspect 712:537 · cream-tint · 1px line
└──────────────────────────────────────┘
[detail 1] [detail 2] [detail 3] [┆ Drop a worn shot ┆]   4-up squares, 11px gaps
```

## Behaviour
- **Detail thumbnails:** pressing one shows it in the hero, and pressing it again returns to the hero shot. The selected thumbnail has an ink border.
- **Drop a worn shot:** a dashed `ink-faint` well with an ImagePlus icon. Click it to pick a file, or drag an image onto it (the border turns ink while dragging). The photo previews locally and is never uploaded. Once added, the tile toggles between the hero and your shot. Picking the same file again works, because the input is cleared after each pick.
- **Replace photo:** once a worn shot is set, a muted `textAction` button under the grid reopens the file picker.

## States
Thumbnails show default, hover (`line-strong`), selected (`ink`) and focus-visible. The dropzone has idle, drag-over and filled states.

## Accessibility
- Thumbnails are buttons with `aria-pressed` and "Show detail view n".
- The dropzone button says what it does.
- The file input is `sr-only` with `tabIndex=-1`; the dropzone and *Replace photo* buttons proxy to it.
