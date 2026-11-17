#!/usr/bin/env python3
"""Session-206 A8: the ref's HORIZON EDGE fine scan — at 2px steps across
several x positions on the booking's left margin (the only page exposing
it). Establish: the exact edge y per x, and the edge SHARPNESS (rows from
sky to pure lawn). Ours vs the ref's."""
from PIL import Image

def edge_scan(path, label, xs):
    im = Image.open(path).convert("RGB")
    p = im.load()
    print(f"\n{label}:")
    for x in xs:
        # find the transition band: from sky-ish (>200 blue, g>200) to lawn (g>130, b<160, r~139)
        rows = []
        for y in range(215, 265, 2):
            r, g, b = p[x, y]
            if b > 200 and g > 200:
                rows.append((y, "sky"))
            elif g > 180 and b < 170:
                rows.append((y, "lawn"))
            else:
                rows.append((y, "mix"))
        # compress to a signature
        sig = []
        prev = None
        for y, tag in rows:
            if tag != prev:
                sig.append(f"y{y}:{tag}")
                prev = tag
        print(f"  x={x}: {' -> '.join(sig)}")

edge_scan("/tmp/ref-206-booking-a.png", "ref BOOKING (the sharp edge?)", [150, 180, 210, 240])
edge_scan("/tmp/our-206-booking-a.png", "OUR BOOKING (the soft edge?)", [150, 180, 210, 240])
