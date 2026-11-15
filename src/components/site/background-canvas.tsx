"use client";

// Session-201 (F-201e): the OASIS PUBLIC BACKGROUND CANVAS — the
// reference's own full-viewport painter, decoded live during the
// full-map drift gate's landing adjudication. The reference paints
// its seven public pages' backdrop with a fixed inset-0 <canvas>
// behind the content (found via the point-stack census: a
// DIV.fixed.inset-0 hosting CANVAS 1440x900 beneath MAIN.z-10 —
// invisible to every element-level background census, which is how
// it survived the s199 recon undetected). The decoded scene: a
// stylized sky-over-lawn gradient — the FLAT sky #AEE2FF (0-28%)
// into the lawn #8BC687 (36-100%) — plus a warm sun band around
// 62-74% (216,209,189) and the deep-green foliage blobs at both
// edges (44,147,64 / 46,152,67) + the bottom-right corner
// (43,142,64). The sky runs flat from the very top — the white/70
// header over it decodes as a near-white blue, briefly misread at
// the s201 first pass as a crest band, retired.
// Effectively static (0.47% frame
// drift over 4s — one slow blob, inside the sweep's noise margin),
// so the mirror paints once per resize — no animation loop.
//
// The mount: ONLY the (site) layout — the reference's login and its
// 404 render plain white (the not-found pair sits at the 0.02% drift
// floor proving it), and both live outside the group here.
//
// a11y: aria-hidden + pointer-events-none — decorative by
// construction; the page content paints above it (MAIN.relative.z-10).

import { useEffect, useRef } from "react";

// the decoded palette — every value sampled from the reference's own
// rendered canvas (the uncovered right edge of its landing capture,
// grid-sampled at three columns; see the F-201e pin for the contract).
const SKY = "#AEE2FF";
const LAWN = "#8BC687";
const SUN_BAND = "rgba(216, 209, 189, 0.95)";
// the edge spots (all sampled on the reference's own frame): the
// transition bushes, the sun-band rocks, the bottom-corner soil
const BUSH_LEFT = "rgba(44, 147, 64, 0.95)";
const BUSH_RIGHT = "rgba(46, 152, 67, 0.95)";
const ROCK = "rgba(87, 93, 99, 0.9)";
const SOIL_GREEN = "rgba(16, 96, 28, 0.9)";
const TINT_LEFT = "rgba(174, 212, 158, 0.8)";

/** one soft radial blob fading into the lawn (the foliage genus). */
function blob(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  xFrac: number,
  yFrac: number,
  rFrac: number,
  color: string,
) {
  const cx = xFrac * w;
  const cy = yFrac * h;
  const r = rFrac * Math.max(w, h);
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, color);
  g.addColorStop(0.55, color.replace("0.95", "0.7").replace("0.9", "0.6"));
  g.addColorStop(1, "rgba(139, 198, 135, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export function SiteBackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const paint = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // the sky-over-lawn gradient (the fractional stops scale with
      // the viewport — the reference's own fixed painter)
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0.0, SKY);
      sky.addColorStop(0.28, SKY);
      sky.addColorStop(0.36, LAWN);
      sky.addColorStop(1.0, LAWN);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
      // the warm sun band (~62-74% of the height, soft edges)
      const band = ctx.createLinearGradient(0, h * 0.6, 0, h * 0.76);
      band.addColorStop(0, "rgba(216, 209, 189, 0)");
      band.addColorStop(0.5, SUN_BAND);
      band.addColorStop(1, "rgba(216, 209, 189, 0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, h * 0.6, w, h * 0.16);
      // the edge spots — small and precise (the reference's frame is
      // CLEAN at the edges except these; the first-pass big blobs
      // overpainted the sky/lawn there)
      blob(ctx, w, h, 0.045, 0.33, 0.05, BUSH_LEFT); // the left horizon bush
      blob(ctx, w, h, 0.985, 0.33, 0.05, BUSH_RIGHT); // the right horizon bush
      blob(ctx, w, h, 0.008, 0.665, 0.035, ROCK); // the left sun-band rock
      blob(ctx, w, h, 0.695, 0.665, 0.03, ROCK); // the mid-right rock (x~1000)
      blob(ctx, w, h, 0.995, 0.665, 0.035, ROCK); // the right edge rock
      blob(ctx, w, h, 0.01, 0.75, 0.04, BUSH_LEFT); // the left band green
      blob(ctx, w, h, 0.04, 0.83, 0.04, BUSH_LEFT); // its lower lobe
      blob(ctx, w, h, 0.98, 0.75, 0.045, SOIL_GREEN); // the right band deep green
      blob(ctx, w, h, 0.99, 0.83, 0.04, BUSH_RIGHT); // its lower lobe
      blob(ctx, w, h, 0.02, 0.5, 0.06, TINT_LEFT); // the left mid-height tint
    };
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
