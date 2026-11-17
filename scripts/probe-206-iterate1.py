#!/usr/bin/env python3
"""Session-206 B2: where does the cured wedge still differ? The ref vs
our cured booking — grid-sample the zone and print ref|our pairs at the
differing points, to find the wedge's remaining geometry error."""
from PIL import Image

ref = Image.open("/tmp/ref-206-booking-a.png").convert("RGB")
our = Image.open("/tmp/our-206-booking-cured.png").convert("RGB")
pr, po = ref.load(), our.load()

print("grid (x180-500 step 40, y215-375 step 20) — only the differing points (tol 12):")
for y in range(215, 375, 20):
    row = []
    for x in range(180, 500, 40):
        ca, cb = pr[x, y], po[x, y]
        if abs(ca[0]-cb[0]) > 12 or abs(ca[1]-cb[1]) > 12 or abs(ca[2]-cb[2]) > 12:
            row.append(f"({x},{y}) r{ca} o{cb}")
    if row:
        print("  " + " | ".join(row))

# our wedge's own edge trace (same method as the ref's decode)
print("\nOUR CURED wedge boundary traces (per y: leftmost-rightmost red-brown):")
for y in range(220, 330, 10):
    edges = [x for x in range(140, 700) if pr_ok(po[x, y])]
    if False: pass
for y in range(220, 330, 10):
    edges = []
    for x in range(140, 700):
        r, g, b = po[x, y]
        if r > g + 50 and r > 120:
            edges.append(x)
    if edges:
        print(f"  y{y}: x {edges[0]}-{edges[-1]} (span {edges[-1]-edges[0]}) mid-tone {po[(edges[0]+edges[-1])//2, y]}")
    else:
        print(f"  y{y}: none")

print("\nREF wedge boundary traces (the target, from the s206 decode):")
for y in range(220, 330, 10):
    edges = []
    for x in range(140, 700):
        r, g, b = pr[x, y]
        if r > g + 50 and r > 120:
            edges.append(x)
    if edges:
        print(f"  y{y}: x {edges[0]}-{edges[-1]} (span {edges[-1]-edges[0]}) mid-tone {pr[(edges[0]+edges[-1])//2, y]}")
    else:
        print(f"  y{y}: none")
