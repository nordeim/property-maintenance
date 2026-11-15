#!/usr/bin/env python3
"""Session-202 D (F-201c): the four-band STANDING_BASELINES re-derivation
— every entry re-anchored at its post-cure measured floor + headroom
(the s146 volatile-genus precedent, widened for the canvas-animation
pages: the reference's blobs drift between runs, ±5 observed). The
table-scoped walk: each table's block is sliced by its boundaries, the
entries flipped within the slice only (the 0.1 forms repeat across
tables). Assert-first; a re-run is a no-op."""
from pathlib import Path
import re

REPO = Path("/home/z/my-project/property-maintenance")
p = REPO / "scripts" / "sweep.ts"
t = p.read_text()

# the measured post-cure values (the four full-map runs, 2026-11-15)
# and the new entries: measured + ~2.5-4.5 headroom (the canvas-exposed
# public pages carry the wider margin; the CRM pages' ours-vs-soft-404
# genus is byte-stable, +2.5 suffices).
WALK = {
    "desktop": {
        "dashboard": (22.80, 25.5), "landing": (19.54, 24.5),
        "services": (8.77, 12.5), "gallery": (9.77, 13.5),
        "faq": (15.98, 20.0), "booking": (26.68, 31.0),
        "about": (8.60, 12.5), "contact": (15.20, 19.5),
        "accounts": (21.91, 24.5), "contacts": (21.96, 24.5),
        "leads": (21.96, 24.5), "calendar": (22.88, 25.5),
        "activities": (23.17, 26.5), "reports": (22.42, 25.5),
        "settings": (22.31, 25.5), "profile": (22.69, 25.5),
        "login": (0.59, 1.0), "not-found": (0.02, 0.4),
    },
    "phone": {
        "dashboard": (14.28, 17.5), "landing": (4.82, 9.0),
        "services": (11.75, 16.0), "gallery": (9.60, 13.5),
        "faq": (13.10, 17.5), "booking": (16.39, 21.0),
        "about": (3.83, 8.0), "contact": (17.35, 22.0),
        "accounts": (12.46, 16.0), "contacts": (10.86, 14.5),
        "leads": (12.11, 16.5), "calendar": (9.77, 13.5),
        "activities": (11.90, 16.0), "reports": (10.88, 14.5),
        "settings": (9.88, 13.5), "profile": (12.68, 17.0),
        "login": (2.14, 3.0), "not-found": (1.25, 2.0),
    },
    "tablet": {
        "dashboard": (39.42, 43.0), "landing": (5.84, 10.0),
        "services": (4.41, 8.5), "gallery": (7.78, 12.0),
        "faq": (9.79, 13.5), "booking": (18.18, 22.5),
        "about": (5.03, 9.0), "contact": (24.04, 28.0),
        "accounts": (38.52, 42.0), "contacts": (38.42, 42.0),
        "leads": (38.22, 42.0), "calendar": (38.87, 42.5),
        "activities": (39.17, 43.0), "reports": (38.73, 42.5),
        "settings": (39.08, 43.0), "profile": (39.35, 43.0),
        "login": (0.97, 1.5), "not-found": (0.53, 1.5),
    },
    "landscape": {
        "dashboard": (31.79, 35.5), "landing": (12.69, 17.5),
        "services": (12.62, 17.0), "gallery": (8.83, 12.5),
        "faq": (12.37, 16.5), "booking": (22.48, 27.0),
        "about": (12.00, 16.5), "contact": (14.15, 18.5),
        "accounts": (30.72, 34.0), "contacts": (31.32, 34.5),
        "leads": (30.04, 33.5), "calendar": (31.08, 34.5),
        "activities": (31.59, 35.0), "reports": (31.04, 34.5),
        "settings": (30.07, 33.5), "profile": (32.22, 36.0),
        "login": (0.97, 1.5), "not-found": (0.03, 0.5),
    },
}

# the table boundaries: desktop: { ... }, phone: { ... }, tablet,
# landscape — find each table's block by its key.
def table_span(text: str, key: str):
    m = re.search(rf"^  {key}: \{{", text, re.M)
    assert m, f"table {key} not found"
    start = m.start()
    depth = 0
    i = text.index("{", m.start())
    while True:
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return start, i + 1
        i += 1

changed = 0
for table, entries in WALK.items():
    s, e = table_span(t, table)
    block = t[s:e]
    for page, (_, new) in entries.items():
        # the entry line inside THIS table's block
        q = chr(34)  # the optional double-quote (not-found is a quoted JS key)
        m = re.search(r"^(\s+" + q + "?" + re.escape(page) + q + "?: )([0-9.]+)(,?)$", block, re.M)
        assert m, f"{table}/{page}: entry not found"
        old_val = m.group(2)
        new_val = f"{new}" if isinstance(new, int) else f"{new:.1f}".rstrip("0").rstrip(".")
        if old_val == new_val:
            continue
        block = block[:m.start(2)] + new_val + block[m.end(2):]
        changed += 1
        print(f"  {table}/{page}: {old_val} -> {new_val}")
    t = t[:s] + block + t[e:]

p.write_text(t)
print(f"the four-band walk: {changed} entries re-anchored")
