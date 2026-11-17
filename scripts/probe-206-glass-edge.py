#!/usr/bin/env python3
"""Session-206 A7: our booking vs the ref's — the left margin + the glass
card's left edge. Where does each glass card start? (Ours may be wider —
the (159,214,206) cyan at x230-320 suggests our glass extends left of
the ref's.)"""
from PIL import Image

def hscan(path, label, y):
    im = Image.open(path).convert("RGB")
    p = im.load()
    print(f"\n{label} — horizontal scan at y={y} (x130-460 step 10):")
    vals = []
    for x in range(130, 460, 10):
        vals.append(f"{x}:{p[x,y][0]},{p[x,y][1]},{p[x,y][2]}")
    print("  " + " | ".join(vals))

for y in [250, 290]:
    hscan("/tmp/ref-206-booking-a.png", "ref BOOKING", y)
    hscan("/tmp/our-206-booking-a.png", "OUR BOOKING", y)

# our booking left margin vertical
im = Image.open("/tmp/our-206-booking-a.png").convert("RGB")
p = im.load()
print("\nOUR BOOKING — vertical at x=150 (y190-360 step 10):")
for y in range(190, 360, 10):
    print(f"  y{y}: {p[150, y]}")
