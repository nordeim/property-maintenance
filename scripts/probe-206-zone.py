#!/usr/bin/env python3
"""Session-206 A3: the paired drift analysis — overall per-page diff
(ours vs ref, per-channel tolerance 12, the sweep's method) + the
TERRACOTTA ZONE decode (x~230-500, y~240-315 per the s204 record).
Also: the ref's own stability pair (booking-a vs booking-b) to check
whether the scene moved again since s204."""
from PIL import Image
import sys

def load(p):
    return Image.open(p).convert("RGB")

def diff_pct(a_path, b_path, tol=12, region=None):
    a, b = load(a_path), load(b_path)
    if a.size != b.size:
        b = b.resize(a.size)
    w, h = a.size
    pa, pb = a.load(), b.load()
    x0, y0, x1, y1 = region if region else (0, 0, w, h)
    total = max(1, (x1 - x0) * (y1 - y0))
    bad = 0
    for y in range(y0, y1, 2):  # 2px sampling for speed
        for x in range(x0, x1, 2):
            ca, cb = pa[x, y], pb[x, y]
            if abs(ca[0]-cb[0]) > tol or abs(ca[1]-cb[1]) > tol or abs(ca[2]-cb[2]) > tol:
                bad += 1
    return 100.0 * bad / (total / 4)

# 1. the ref's own stability (the moving-target check)
stab = diff_pct("/tmp/ref-206-booking-a.png", "/tmp/ref-206-booking-b.png")
print(f"REF stability (booking a vs b): {stab:.2f}%  {'STABLE' if stab < 1.0 else 'ANIMATING/CHANGED'}")

# 2. the overall per-page drift (ours vs ref)
for page_name in ["booking", "landing", "faq"]:
    d = diff_pct(f"/tmp/our-206-{page_name}-a.png", f"/tmp/ref-206-{page_name}-a.png")
    print(f"{page_name} overall drift (ours vs ref): {d:.2f}%")

# 3. the terracotta zone decode: sample the ref's booking margins at the
#    s204-recorded zone (x 230-500, y 240-315) vs ours
ZONE = (230, 240, 500, 315)
ref = load("/tmp/ref-206-booking-a.png")
our = load("/tmp/our-206-booking-a.png")
pr, po = ref.load(), our.load()
print("\nTERRACOTTA ZONE (x230-500, y240-315) — ref vs ours, 20px grid:")
print(f"{'pos':>12} | {'ref rgb':>15} | {'our rgb':>15}")
for y in range(ZONE[1], ZONE[3], 25):
    row = []
    for x in range(ZONE[0], ZONE[2], 90):
        row.append(f"({x},{y}) r{pr[x,y]} o{po[x,y]}")
    print("  " + " | ".join(row))

# 4. the zone's drift concentration
zd_ref = diff_pct("/tmp/our-206-booking-a.png", "/tmp/ref-206-booking-a.png", region=ZONE)
print(f"\nzone-only drift: {zd_ref:.1f}%")
# left margin band (x 0-230) for comparison
lm = diff_pct("/tmp/our-206-booking-a.png", "/tmp/ref-206-booking-a.png", region=(0, 240, 230, 315))
print(f"left-margin band (x0-230) drift: {lm:.1f}%")
