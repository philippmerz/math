# Filter UI v2 — Type + Area as two axes

**Status:** DONE — shipped as `5b9998a` (Filter popover: two-axis Type + Area filtering, replacing the chip bar).

## Problem

Make theorems (and any `kind`/`category`) filterable too, but the area chip bar was already big and adding kind would mix two axes.

## Investigation

Two orthogonal axes:
- **Area** — 15+ values, growing; spatial "focus a field", frames the camera.
- **Type** — kind/category; few values; "show only theorems / hide them".

They shouldn't share one flat bar. Options:

- **A. One consolidated Filter popover ⭐** — funnel icon by the gear; popover with labeled Type + Area sections; selections combine (Area AND Type); active-count badge + Clear; remove the always-visible bottom bar. Scales, declutters, unmixes the axes, reuses the settings-popover machinery.
- **B. Two controls** — Type inline as a small segmented control (few, frequent); Area in a dropdown/popover (many).
- **C. Keep the bar** — prefix a labeled Type group + "+N more" for areas. Least change; bar still big.
- **D. Search-driven filtering** — powerful but undiscoverable.

## Decision

**A.** Area stays single-select (focus & frame); Type is multi-select "show only these kinds" (empty = all). Badge = active-filter count. This popover is also the future home for the construction-collapse toggle (shared "view state").

## Outcome

Shipped the consolidated Filter popover (`FilterMenu`). The always-visible chip bar was removed; later partially reintroduced as a focused **frequent-area shortcut bar** (`8c15140`) for one-click access to the busiest areas, sharing `focusTag` with the popover.
