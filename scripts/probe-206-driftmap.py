#!/usr/bin/env python3
"""Session-206 B3: the full-page drift DISTRIBUTION — divide our-cured
vs ref booking into a 12x8 grid of 120x112px cells, measure each cell's
drift, print the map. This finds where the 10.82% actually lives."""
from PIL import Image

a = Image.open("/tmp/our-206-booking-cured.png").convert("RGB")
b = Image.open("/tmp/ref-206-booking-a.png").convert("RGB")
pa, pb = a.load(), b.load()
w, hgt = a.size
CW, CH = 120, 112

print("drift map (each cell = 120x112px; value = % pixels differing >tol12):")
print("      " + "".join(f"x{x:4}-{x+CW:4}" for x in range(0, w, CW)))
for y in range(0, hgt, CH):
    row = []
    for x in range(0, w, CW):
        bad = tot = 0
        for yy in range(y, min(y + CH, hgt), 3):
            for xx in range(x, min(x + CW, w), 3):
                ca, cb = pa[xx, yy], pb[xx, yy]
                if abs(ca[0]-cb[0]) > 12 or abs(ca[1]-cb[1]) > 12 or abs(ca[2]-cb[2]) > 12:
                    bad += 1
                tot += 1
        row.append(f"{100.0*bad/max(1,tot):5.1f}")
    print(f"y{y:4}: " + "".join(row))
