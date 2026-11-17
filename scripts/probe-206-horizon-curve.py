#!/usr/bin/env python3
"""Session-206 A11: the ref's HORIZON CURVE — trace the sky->lawn edge y
for every x (20-1420 step 40) on the ref booking (the only page exposing
the horizon across the full width). Also the same trace on ours for the
delta map."""
from PIL import Image

def horizon(path, label):
    im = Image.open(path).convert("RGB")
    p = im.load()
    pts = []
    for x in range(20, 1420, 40):
        edge = None
        for y in range(200, 400):
            r, g, b = p[x, y]
            sky = b > 200 and g > 200 and r < 200
            lawn = g > 130 and b < 170 and r < 180
            if sky and y > 0:
                prev_sky = y
            if edge is None and lawn and y > 205:
                # confirm the row above was sky-ish (not a red mass)
                r2, g2, b2 = p[x, y - 6]
                if b2 > 180 and g2 > 180:
                    edge = y
                    break
                # or a terracotta/tree mass above (non-sky) — still the edge
                edge = y
                break
        pts.append((x, edge))
    print(f"{label}:")
    print("  " + " | ".join(f"x{x}:{y}" for x, y in pts))
    return pts

ref = horizon("/tmp/ref-206-booking-a.png", "ref BOOKING horizon")
our = horizon("/tmp/our-206-booking-a.png", "OUR BOOKING horizon")
print("\ndeltas (ref - our; positive = ref lower):")
print("  " + " | ".join(f"x{rx}:{(ry or 0)-(oy or 0)}" for (rx, ry), (ox, oy) in zip(ref, our)))
