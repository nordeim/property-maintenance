#!/usr/bin/env python3
"""Session-206 A5: does the terracotta mass show on the ref's FAQ and
LANDING at the same zone (x140-560, y190-360)? The s204 record says the
scenes are byte-identical across pages (one painter) — but the CONTENT
coverage differs per page. This decides whether the wedge helps all
pages or needs page-aware masking."""
from PIL import Image

def zone_census(path, label):
    im = Image.open(path).convert("RGB")
    p = im.load()
    # count terracotta-classified pixels in the zone, 5px grid
    terr = dark = other = 0
    for y in range(190, 360, 5):
        for x in range(140, 560, 5):
            r, g, b = p[x, y]
            if r > g + 60 and r > 170:
                terr += 1
            elif r > g + 50 and r > 120:
                dark += 1
            else:
                other += 1
    # sample a few key points
    pts = [(230, 265), (320, 250), (320, 290), (200, 300)]
    samples = " | ".join(f"({x},{y})={p[x,y]}" for x, y in pts)
    print(f"{label}: terracotta={terr} dark-red={dark} other={other}")
    print(f"  samples: {samples}")

zone_census("/tmp/ref-206-booking-a.png", "ref BOOKING")
zone_census("/tmp/ref-206-faq-a.png", "ref FAQ")
zone_census("/tmp/ref-206-landing-a.png", "ref LANDING")
zone_census("/tmp/our-206-booking-a.png", "OUR BOOKING")
zone_census("/tmp/our-206-faq-a.png", "OUR FAQ")
zone_census("/tmp/our-206-landing-a.png", "OUR LANDING")
