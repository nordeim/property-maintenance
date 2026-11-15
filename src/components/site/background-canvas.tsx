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
const ROCK = "rgba(87, 93, 99, 0.95)";
const SOIL_GREEN = "rgba(16, 96, 28, 0.9)";
// Session-204 (the faq/booking exposure — the s201 decode never saw
// these zones; the landing's full-bleed content covers them):
const GLOW_WASH = "rgba(193, 185, 166, 0.95)"; // the glow's solid wash (the lawn never shows through)
const SOIL_BROWN = "rgba(89, 67, 37, 0.9)"; // the bottom-left soil patch
const BUSH_DEEP = "rgba(24, 117, 67, 0.95)"; // the mid-left bush (darker)
const MASS = "rgba(95, 143, 51, 0.95)"; // the horizon foliage mass (the landing's exposure)
const MASS_DEEP = "rgba(75, 124, 38, 0.95)"; // its deeper lobe
const EDGE_GREEN = "rgba(30, 116, 48, 0.95)"; // the right-edge descending foliage

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
      sky.addColorStop(0.255, SKY);
      sky.addColorStop(0.285, LAWN);
      sky.addColorStop(1.0, LAWN);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
      // the warm glow zone (~56-75% of the height — softer and wider
      // than the first-pass band: the reference's glow sandwiches the
      // rock stratum, visible above it and through its gaps)
      const glow = ctx.createLinearGradient(0, h * 0.585, 0, h * 0.765);
      glow.addColorStop(0, "rgba(193, 185, 166, 0)");
      glow.addColorStop(0.06, GLOW_WASH);
      glow.addColorStop(0.45, SUN_BAND);
      glow.addColorStop(0.95, GLOW_WASH);
      glow.addColorStop(1, "rgba(193, 185, 166, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, h * 0.585, w, h * 0.18);
      // the STRATUM — the full-width rock band (~61.5-72.5%), solid in
      // the core with soft vertical edges (decoded from the reference's
      // faq margins: solid 87,93,99 across BOTH edges y~560-650)
      const STRATUM = ctx.createLinearGradient(0, h * 0.615, 0, h * 0.725);
      STRATUM.addColorStop(0, "rgba(87, 93, 99, 0)");
      STRATUM.addColorStop(0.04, ROCK);
      STRATUM.addColorStop(0.97, ROCK);
      STRATUM.addColorStop(1, "rgba(87, 93, 99, 0)");
      ctx.fillStyle = STRATUM;
      ctx.fillRect(0, h * 0.615, w, h * 0.11);
      // the horizon foliage mass + the right edge's descent (the
      // landing's exposure — the faq/booking hero bands cover this zone)
      blob(ctx, w, h, 0.795, 0.325, 0.058, MASS); // the big mass (x~1145, y~292 — hard top at y~230)
      blob(ctx, w, h, 0.822, 0.335, 0.046, MASS_DEEP); // its deeper lobe
      blob(ctx, w, h, 0.79, 0.35, 0.04, MASS); // the mass core (density)
      blob(ctx, w, h, 0.985, 0.34, 0.038, EDGE_GREEN); // the right edge's descent (x~1400+, y~300)
      blob(ctx, w, h, 0.99, 0.385, 0.032, MASS_DEEP); // its darker core
      blob(ctx, w, h, 0.978, 0.41, 0.03, SOIL_GREEN); // the deepest descent (y~370)
      // the mid-left bush — a small silhouette against the glow, painted
      // UNDER the stratum (it never punches through the rock)
      blob(ctx, w, h, 0.135, 0.565, 0.024, BUSH_DEEP);
      // the edge foliage — the reference's own spots (horizon bushes,
      // the left hedge, the mid-left bush, the right-corner mass, the
      // soil patches at both bottom corners)
      blob(ctx, w, h, 0.04, 0.34, 0.032, BUSH_LEFT); // the left tree's crown (x~30-80, y~275-340)
      blob(ctx, w, h, 0.042, 0.365, 0.028, EDGE_GREEN); // the lower dark lobe
      blob(ctx, w, h, 0.045, 0.385, 0.03, SOIL_BROWN); // the brown base (y~340-365)
      blob(ctx, w, h, 0.985, 0.33, 0.05, BUSH_RIGHT); // the right horizon bush
      blob(ctx, w, h, 0.035, 0.825, 0.058, BUSH_LEFT); // the left hedge (hugging the edge, x0-105, y~680-775)
      blob(ctx, w, h, 0.985, 0.78, 0.042, SOIL_GREEN); // the right-corner deep green (x~1395-1440, y~680-780)
      blob(ctx, w, h, 0.988, 0.77, 0.024, BUSH_RIGHT); // the far-edge green
      blob(ctx, w, h, 0.958, 0.872, 0.024, SOIL_BROWN); // the bottom-right soil
      blob(ctx, w, h, 0.075, 0.875, 0.024, SOIL_BROWN); // the bottom-left soil patch
      blob(ctx, w, h, 0.975, 0.445, 0.03, BUSH_RIGHT); // the right mid-height green
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
