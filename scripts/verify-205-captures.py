#!/usr/bin/env python3
"""Session-205: machine-verify the round's captures are non-blank."""
from PIL import Image
import sys

OUT = "/home/z/my-project/property-maintenance/docs/screenshots"
names = [
    "32-s205-home-desktop-1440.png",
    "33-s205-services-desktop-1440.png",
    "34-s205-gallery-desktop-1440.png",
    "35-s205-about-desktop-1440.png",
    "36-s205-faq-desktop-1440.png",
    "37-s205-booking-desktop-1440.png",
    "38-s205-contact-desktop-1440.png",
    "39-s205-login-desktop-1440.png",
    "40-s205-booking-step2-desktop-1440.png",
    "41-s205-mobile-menu-open-390.png",
    "42-s205-home-390.png",
    "43-s205-dashboard-desktop-1440.png",
]
fail = 0
for n in names:
    try:
        im = Image.open(f"{OUT}/{n}").convert("L")
        h = im.histogram()
        nonwhite = 1 - h[255] / sum(h)
        size = im.size
        ok = nonwhite > 0.02 and size[0] > 0
        print(f"{'OK ' if ok else 'BLANK'} {n} {size} non-white={nonwhite:.3f}")
        if not ok:
            fail += 1
    except Exception as e:
        print(f"FAIL {n}: {e}")
        fail += 1
sys.exit(1 if fail else 0)
