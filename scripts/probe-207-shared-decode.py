#!/usr/bin/env python3
"""Session-207 A3: (1) the shared-canvas check — does the right
underlayer band (the G band x1060-1230 y316-370) show on the ref's
faq/landing at the same zone? (2) the hedge gradient's exact stops;
(3) the remaining right-mass zone diff (ours vs ref at y218-310)."""
from PIL import Image

def zone_census(path, label):
    im = Image.open(path).convert("RGB")
    p = im.load()
    g = t = b = 0
    for y in range(316, 370, 4):
        for x in range(1060, 1230, 4):
            r, gg, bb = p[x, y]
            if abs(r-173) < 14 and abs(gg-174) < 14 and abs(bb-129) < 16:
                g += 1
            elif abs(r-130) < 14 and abs(gg-166) < 14 and abs(bb-153) < 14:
                t += 1
            elif abs(r-30) < 20 and abs(gg-54) < 20 and abs(bb-89) < 25:
                b += 1
    print(f"{label}: gray-green={g} teal={t} blue={b}")

print("=== the G band across pages (the shared-canvas check) ===")
zone_census("/tmp/ref-207-booking-a.png", "ref BOOKING")
zone_census("/tmp/ref-207-faq-a.png", "ref FAQ   ")
zone_census("/tmp/ref-207-landing-a.png", "ref LANDING")
zone_census("/tmp/our-207-booking-a.png", "OUR BOOKING")

print()
print("=== the hedge gradient stops (ref, x60 column) ===")
p = Image.open("/tmp/ref-207-booking-a.png").convert("RGB").load()
for y in range(668, 796, 6):
    print(f"  y{y}: {p[60, y]}")

print()
print("=== the mass zone remaining diff rows (ours vs ref) ===")
pr = Image.open("/tmp/ref-207-booking-a.png").convert("RGB").load()
po = Image.open("/tmp/our-207-booking-a.png").convert("RGB").load()
for y in range(222, 312, 15):
    diffs = []
    for x in range(1080, 1270, 10):
        ca, cb = pr[x, y], po[x, y]
        if abs(ca[0]-cb[0]) > 12 or abs(ca[1]-cb[1]) > 12 or abs(ca[2]-cb[2]) > 12:
            diffs.append((x, ca, cb))
    if diffs:
        print(f"  y{y}: {len(diff for diff in []) if False else len(diffs)} diffs, first 3: " + " | ".join(f"x{d[0]} r{d[1]} o{d[2]}" for d in diffs[:3]))
