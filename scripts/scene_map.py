#!/usr/bin/env python3
"""Session-204 B: the scene map — classify BOTH apps' faq margins into
the legend glyphs (R=rock s=glow S=sun .=lawn b=bush ?=other) and print
them side-by-side per row so the painter's iteration converges visibly.
Also prints the differing-cell count (Δ>10) over the margin grid."""
import sys
from PIL import Image

ours = Image.open("/tmp/grid-faq-ours.png").convert("RGB")
ref = Image.open("/tmp/grid-faq-ref.png").convert("RGB")

def classify(p):
    r, g, b = p
    if abs(r-87) < 14 and abs(g-93) < 14 and abs(b-99) < 14: return "R"
    if r > 185 and 165 < g < 220 and b < 205 and r-g > 4: return "s"
    if g > 185 and r < 165: return "."
    if g < 175 and r < 85 and g > 110: return "b"
    return "?"

XS = list(range(5, 300, 20)) + list(range(1160, 1436, 20))
diff = 0
print("row     ours (left margin | right margin) vs ref — only rows that differ")
for y in range(440, 881, 12):
    o = "".join(classify(ours.getpixel((x, y))) for x in XS)
    r_ = "".join(classify(ref.getpixel((x, y))) for x in XS)
    n_diff = sum(1 for x in XS if max(abs(i-j) for i, j in zip(ours.getpixel((x, y)), ref.getpixel((x, y)))) > 10)
    diff += n_diff
    mark = " <<" if o != r_ else ""
    if o != r_ or n_diff:
        print(f"y={y:3d}  O:{o}  R:{r_}  ({n_diff} cells){mark}")
print(f"total differing margin cells: {diff}")
