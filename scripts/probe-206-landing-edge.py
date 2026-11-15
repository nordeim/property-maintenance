#!/usr/bin/env python3
"""Session-206 A10: (1) the ref LANDING's left-edge column — is the
horizon edge also at y231 there (the shared-painter check)? (2) the
under-mass gray-green zone (y316-372 at x320 on the booking) — its
horizontal extent + tone map. (3) OUR horizon stops on the landing."""
from PIL import Image

def col(path, label, x, y0, y1, step=4):
    im = Image.open(path).convert("RGB")
    p = im.load()
    print(f"\n{label} — x={x} (y{y0}-{y1} step {step}):")
    for y in range(y0, y1, step):
        print(f"  y{y}: {p[x, y]}")

# 1. the ref landing's left margin (x20 — inside the page padding, likely canvas)
col("/tmp/ref-206-landing-a.png", "ref LANDING", 20, 215, 265, 4)
col("/tmp/ref-206-booking-a.png", "ref BOOKING", 20, 215, 265, 4)

# 2. the under-mass zone on the ref booking: horizontal scans
im = Image.open("/tmp/ref-206-booking-a.png").convert("RGB")
p = im.load()
print("\nref BOOKING — the under-mass zone (y330, x120-420 step 15):")
print("  " + " | ".join(f"{x}:{p[x,330][0]},{p[x,330][1]},{p[x,330][2]}" for x in range(120, 420, 15)))
print("ref BOOKING — (y355, x120-420 step 15):")
print("  " + " | ".join(f"{x}:{p[x,355][0]},{p[x,355][1]},{p[x,355][2]}" for x in range(120, 420, 15)))

# 3. our landing left margin for comparison
col("/tmp/our-206-landing-a.png", "OUR LANDING", 20, 215, 265, 4)
