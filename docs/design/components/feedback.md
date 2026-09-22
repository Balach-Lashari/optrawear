# Feedback: status, errors, empty states

These are **extensions**; the board doesn't draw them. They use only the board's tokens.

| Pattern | Look | Example |
|---|---|---|
| Inline status (`role="status"`) | `small`, ink or ink-soft, placed right under the control that caused it | "Added to bag: Meridian, graphite, 50. View bag (3)" |
| Field error | `meta` in `danger` under the input, with the input border turning `danger` | "Enter a mobile number with its country code, like +92 300 000 0000." |
| Empty state | Serif title, one line of `small` muted guidance, one outline or primary button | "No frames match these filters." → *Clear filters* |
| Unbuilt page | `display-lg` title, one sentence, *Find your house* + *Shop Adaptive Fit* | `/optical`, `/sun`, … |
| 404 | Logo, "Page not found", *Shop Adaptive Fit* | `app/not-found.tsx` |

Rules:
- **No toasts or modals.** Feedback appears where the action happened.
- **Write in the interface's voice:** say what happened and what to do next. Never apologise.
- **Timing:** the bag confirmation fades back to `sr-only` 5 seconds after the latest add, unless focus is on its *View bag* link. Errors stay until they're fixed.
- **Live regions stay mounted:** a `role="status"` element is always rendered and toggles `sr-only` when empty, so screen readers pick up the first message.
