#!/usr/bin/env python3
"""Session-206 A4: the terracotta mass's FINE BOUNDARY map — scan the
ref's booking capture at 15px steps over x140-560, y190-360. Classify
each pixel: TERRACOTTA (r>g+60, r>140), DARK-RED (r>g+60, r<=140),
LAWN/GREEN, GLASS/WHITE, OTHER. Print a compact ASCII map + the exact
boundary traces for the painter's geometry."""
from PIL import Image

ref = Image.open("/tmp/ref-206-booking-a.png").convert("RGB")
p = ref.load()

def classify(c):
    r, g, b = c
    if r > g + 60 and r > 170:
        return "T"  # terracotta core (214,81,55)
    if r > g + 50 and r > 120:
        return "t"  # darker red-brown (190,73,50)/(153,60,35)
    if g > r and g > 100:
        return "."  # lawn/green
    if r > 200 and g > 200 and b > 190:
        return " "  # glass/white content
    return "?"      # other (glow/soil/rock)

print("ASCII map (x140-560 step 15, y190-360 step 12):")
print("     " + "".join(str((140 + i * 15) // 100 % 10) for i in range(29)))
for y in range(190, 360, 12):
    row = "".join(classify(p[140 + i * 15, y]) for i in range(29))
    print(f"y{y:3}: {row}")

# boundary traces: for each y, find the leftmost/rightmost T/t pixel
print("\nboundary traces (the mass's left/right edges per row):")
for y in range(200, 340, 10):
    edges = []
    for x in range(140, 700):
        c = p[x, y]
        r, g, b = c
        if r > g + 50 and r > 120:
            edges.append(x)
    if edges:
        print(f"  y{y}: x {edges[0]}-{edges[-1]}  (span {edges[-1]-edges[0]})  core-tone at mid: {p[(edges[0]+edges[-1])//2, y]}")
    else:
        print(f"  y{y}: no red-brown")

# the vertical extent at the core x=320
print("\nvertical trace at x=320 (y180-380 step 8):")
for y in range(180, 380, 8):
    c = p[320, y]
    r, g, b = c
    tag = classify(c)
    print(f"  y{y}: {c} {tag}")
