#!/usr/bin/env python3
"""Session-204: the landing's band diff — ours (fresh) vs the ref's stable capture a."""
from PIL import Image, ImageChops
a = Image.open("/tmp/landing-ours-now.png").convert("L")
b = Image.open("/tmp/ref-landing-a.png").convert("L")
w, h = a.size
print("the landing band diff (ours-cured vs ref):")
for i in range(12):
    top = i * (h // 12)
    d = ImageChops.difference(a.crop((0, top, w, top + h//12)), b.crop((0, top, w, top + h//12)))
    hist = d.histogram()
    print(f"  y={top:3d}-{top+h//12:3d}: {sum(hist[16:])/(w*(h//12))*100:5.1f}%  {'#'*int(sum(hist[16:])/(w*(h//12))*50)}")
d = ImageChops.difference(a, b)
hist = d.histogram()
print(f"  TOTAL: {sum(hist[16:])/(w*h)*100:.2f}%")
