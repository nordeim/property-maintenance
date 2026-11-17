#!/usr/bin/env python3
"""Session-206 A6: what covers the mass zone on the ref's FAQ vs BOOKING?
Vertical scans of the left margin (x150) + the x320 column on the ref's
faq + booking, to decide: is the mass painted everywhere and covered by
faq content (shared wedge = safe), or page-specific?"""
from PIL import Image

def scan(path, label, x):
    im = Image.open(path).convert("RGB")
    p = im.load()
    print(f"\n{label} — vertical scan at x={x} (y190-360 step 10):")
    for y in range(190, 360, 10):
        print(f"  y{y}: {p[x, y]}")

# the ref's faq left margin + the mass's core column
scan("/tmp/ref-206-faq-a.png", "ref FAQ", 150)
scan("/tmp/ref-206-booking-a.png", "ref BOOKING", 150)
# the x=320 column on the ref's faq (where booking shows the solid core)
scan("/tmp/ref-206-faq-a.png", "ref FAQ", 320)

# OUR faq at the same columns (for the post-cure comparison baseline)
scan("/tmp/our-206-faq-a.png", "OUR FAQ", 150)
scan("/tmp/our-206-faq-a.png", "OUR FAQ", 320)
