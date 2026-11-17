#!/usr/bin/env python3
"""Session-204 B: band-diff two same-size screenshots — 12 horizontal
bands, each band's changed-pixel ratio printed, the delta mass localized
by region (the canvas zone vs structural rows)."""
import sys
from PIL import Image, ImageChops

ours_p, ref_p, route = sys.argv[1], sys.argv[2], sys.argv[3]
ours = Image.open(ours_p).convert("L")
ref = Image.open(ref_p).convert("L")
assert ours.size == ref.size, f"size mismatch: {ours.size} vs {ref.size}"
w, h = ours.size
BANDS = 12
bh = h // BANDS
total_changed = 0
print(f"[{route}] {w}x{h} — band diff (top to bottom):")
for i in range(BANDS):
    top = i * bh
    box = (0, top, w, top + bh)
    ob = ours.crop(box)
    rb = ref.crop(box)
    diff = ImageChops.difference(ob, rb)
    hist = diff.histogram()
    changed = sum(hist[16:])  # pixels differing by >15 levels
    ratio = changed / (w * bh)
    total_changed += changed
    bar = "#" * int(ratio * 60)
    print(f"  band{i:02d} y={top:4d}-{top+bh:4d}  {ratio*100:5.1f}%  {bar}")
print(f"  TOTAL {total_changed/(w*h)*100:.2f}%")
