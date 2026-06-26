### DELETE ITEMS THAT ARE DONE

### feature agent

- add the frequent tags inline bar, commit and push when done
- filter UI v2 [IMPLEMENTING A]: theorems + any 'kind' filterable too, but the area chip bar is already big and adding kind would mix two axes.

INVESTIGATION — two orthogonal axes: Area (15+ values, growing; spatial "focus a field", frames the camera) vs Type (kind/category; few values; "show only theorems / hide them"). They shouldn't share one flat bar. Options:
A. One consolidated Filter popover ⭐ [IMPLEMENTING] — funnel icon by the gear; popover with labeled Type + Area sections; selections combine (Area AND Type); active-count badge + Clear; remove the always-visible bottom bar. Scales, declutters, unmixes the axes, reuses the settings-popover machinery.
B. Two controls — Type inline as a small segmented control (few, frequent); Area in a dropdown/popover (many).
C. Keep the bar, prefix a labeled Type group + "+N more" for areas. Least change; bar still big.
D. Search-driven filtering — powerful but undiscoverable.
DECISION: A. Area stays single-select (focus & frame); Type is multi-select "show only these kinds" (empty = all). Badge = active-filter count. This popover is also the future home for the construction-collapse toggle (shared 'view state').

### content agent

> If a concept needs prior concepts that don't strictly belong to the area you're working on currently, add them anyway under their respective tags