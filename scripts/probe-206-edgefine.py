#!/usr/bin/env python3
"""Session-206 A9: the ref's exact edge rows (y226-240 at 1px steps) + the
under-glass extent of the terracotta (how far right does the warm blur
bleed inside the ref's glass card?) — the two last decode facts before
the painter cure."""
from PIL import Image

ref = Image.open("/tmp/ref-206-booking-a.png").convert("RGB")
p = ref.load()

print("ref edge rows (x150, y224-242 step 1):")
for y in range(224, 242):
    print(f"  y{y}: {p[150, y]}")

print("\nref under-glass warm bleed (y250, y280, y300 — x355-460 step 5):")
for y in [250, 280, 300]:
    vals = []
    for x in range(355, 460, 5):
        r, g, b = p[x, y]
        vals.append(f"{x}:{r},{g},{b}")
    print(f"  y{y}: " + " | ".join(vals))

print("\nref glass left edge detection (y250, x340-365 step 1):")
for x in range(340, 366):
    print(f"  x{x}: {p[x, 250]}")
