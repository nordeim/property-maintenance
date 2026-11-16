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
// the sun-band rocks (all sampled on the reference's own frame)
// Session-207 (F-207a): the five s201-era constants orphaned by the
// s206 solid re-derivation (MASS · MASS_DEEP · BUSH_LEFT · SOIL_GREEN
// · EDGE_GREEN) RETIRED — the dead-code doctrine; their tones live on
// only inside the *_SOLID constants + the pin's family pins.
const ROCK = "rgba(87, 93, 99, 0.95)";
// Session-204 (the faq/booking exposure — the s201 decode never saw
// these zones; the landing's full-bleed content covers them):
const GLOW_WASH = "rgba(193, 185, 166, 0.95)"; // the glow's solid wash (the lawn never shows through)
const SOIL_BROWN = "rgba(89, 67, 37, 0.9)"; // the bottom-left soil patch
const BUSH_DEEP = "rgba(24, 117, 67, 0.95)"; // the mid-left bush (darker)
// Session-206 (F-204d retired — the terracotta mass, decoded fresh from
// the ref's booking margins at fine granularity): the two-tone wedge —
// the bright sunlit core + the darker left/bottom shade.
const TERRACOTTA = "rgba(214, 81, 55, 0.97)"; // the core (the solid wedge body)
const TERRACOTTA_SHADE = "rgba(153, 60, 35, 0.97)"; // the lower-left shade
const TERRACOTTA_MID = "rgba(190, 73, 50, 0.97)"; // the left-slope lining
const UNDERMASS = "rgba(175, 180, 141, 0.9)"; // the gray-green underlayer
const UNDERMASS_DEEP = "rgba(130, 166, 153, 0.9)"; // its darker patches
// Session-206 (F-206e — the SOLID-FOLIAGE genus): the ref's foliage
// structures are CRISP SOLID SHAPES (the right mass reads a flat
// (95,143,51) core with a 1-2px boundary), not radial fades — our
// blobs washed every edge. The decoded solid tones:
const MASS_CORE_SOLID = "rgba(95, 143, 51, 0.97)"; // the right mass's flat core
const MASS_DEEP_SOLID = "rgba(75, 124, 38, 0.97)"; // its deeper under-band
const EDGE_DARK_SOLID = "rgba(21, 103, 39, 0.97)"; // the right-edge descent's dark band
// Session-210 (F-210c): the descent's dark band is a vertical
// GRADIENT — (24,106,42) at its top fading to (14,90,20) by y346 (the
// hi-dpi decode at CSS x1390: y302 (24,106,42) -> y346 (14,90,20)).
// Session-211 (F-211a): the s210 "light cap wedge" RETIRED — an 8-
// frame-averaged hi-dpi decode shows the descent-top is a CONCAVE
// ARC (1370,306)->(1386,288)->(1402,280)->(1430,280), not a wedge;
// the (35,117,52) tones were the dark band's gradient top + AA.
const EDGE_DARK_DEEP = "rgba(14, 90, 20, 0.97)"; // the descent gradient's bottom tone
// Session-211 (F-211a): the DESCENT_ARC — the descent-top's concave
// curve, decoded from the 8-frame-averaged hi-dpi capture:
// (1370,306)->(1386,288)->(1402,280)->(1430,280). Painted as two
// bezier segments in the descent block.
const DESCENT_ARC: Array<[number, number]> = [
  [1370, 306],
  [1386, 288],
  [1402, 280],
  [1430, 280],
];
// Session-211 (F-211d): the left tree's crown darkens downward —
// (50,159,72) at its top (y278) to (13,93,21) at its foot (y338) —
// decoded on the tree's axis (x43); the s206 flat HEDGE_SOLID crown
// retired. The trunk widens: x54-78, y334-363.
const CROWN_GRAD_TOP = "rgba(50, 159, 72, 0.97)";
const CROWN_GRAD_BOTTOM = "rgba(13, 93, 21, 0.97)";
const HEDGE_SOLID = "rgba(47, 151, 68, 0.97)"; // the bottom-left hedge's core
// Session-207 (F-207c — the right side's underlayer band): the G band
// + its teal top-edge patches + the stable blue slab, all decoded from
// the ref's booking + landing margins (page-shared; faq covers them).
const G_BAND = "rgba(173, 174, 129, 0.97)"; // the gray-green underlayer band (x1080-1255, y318-370)
const G_BAND_TEAL = "rgba(130, 166, 153, 0.97)"; // the teal patches along its top edge
const BLUE_SLAB = "rgba(30, 54, 89, 0.97)"; // the vertical blue slab (1143-1173, y334-370)
// Session-207 (F-207b): the hedge's vertical-gradient stops + the
// soil patch at its foot (the flat-fill + under-band retired).
const HEDGE_GRAD_TOP = "rgba(49, 160, 72, 0.97)"; // the gradient's top (y~698)
const HEDGE_GRAD_BOTTOM = "rgba(15, 95, 26, 0.97)"; // the gradient's bottom (y~788)
const SOIL_PATCH = "rgba(96, 71, 40, 0.97)"; // the solid soil patch (x73-110, y780-805)
// Session-207 (F-207c): the mass's sunlit rim — the diagonal band
// inside the right slope ((1140,225)->(1252,297)).
const SUNLIT_RIM = "rgba(108, 162, 59, 0.97)";
// Session-208 (F-208c): the far-left horizon DIAGONAL — the ref's sky
// holds over the far-left corner (sky to y278@x0 -> 266@x20 ->
// 253@x40 -> 241@x60 -> flat 231@x80+; page-shared) — painted as a
// sky-colored polygon patch OVER the flat gradient.
const HORIZON_DIAGONAL = "rgba(174, 226, 255, 0.97)"; // the flat SKY tone (#AEE2FF)
// Session-208 (F-208e): the right-side bush (x1310-1430, y440-500) —
// the light-green mass + the brown patches + the dark spot.
const RIGHT_BUSH = "rgba(187, 220, 170, 0.97)"; // the light-green mass
const RIGHT_BUSH_BROWN = "rgba(98, 62, 14, 0.97)"; // the brown patches
const RIGHT_BUSH_DARK = "rgba(26, 30, 27, 0.97)"; // the dark spot
const RIGHT_BUSH_RED = "rgba(183, 99, 42, 0.97)"; // the red blossoms ((183,99,42) + the (146,51,42) foot)
// Session-208 (F-208f): the mid-distance structures behind the glass
// (decoded by unmixing the booking card's white/85) — the dark-green
// tree mass + the blue-gray structure. The tones are the UNMIXED
// values: under the card's 0.85 white they render as the observed
// (225,228,232)-family grays.
const MID_TREE = "rgba(70, 155, 80, 0.95)"; // the dark-green mid tree (x460-620, y265-315)
const MID_BLUE = "rgba(55, 75, 100, 0.95)"; // the blue-gray structure (x660-800, y265-310)
// Session-209 (F-209a — the flying birds, decoded by the 22-frame
// rapid-fire tracker): a two-part red sprite — the leading band
// (~13x8 @y356-362) + the wing-spread body (~48x16 @y382-394) —
// translating right at ~46px/s, entering at x~-60, exiting x~420,
// cycling every ~17s; the cycle's SECOND pass is the two-bird flock
// (both shapes side-by-side at y408-424).
const BIRD_RED = "rgba(199, 66, 62, 0.97)"; // the bird's core tone
const BIRD_RED_EDGE = "rgba(185, 100, 82, 0.97)"; // the wing-edge tone
const BIRD_CYCLE_MS = 22_000; // the full cycle (two passes: single + flock, ~11s each)
const BIRD_SPEED = 46 / 1000; // px per ms (~46px/s per the tracker)
// Session-209 (F-209b — the growing bush strip): the light-green
// strip (y430-502) grows from the right edge leftward — the right
// edge FIXED at x1419, the left edge sweeping x1317 -> x1080 over 5s
// (~47px/s), holding 3s, VANISHING 8s, then regrowing (a 16s cycle;
// the 22-frame decode: f0 seed -> f5 full -> f8 held -> f9-f16 gone
// -> f17 regrowing).
const STRIP_CYCLE_MS = 16_000; // grow 5s + hold 3s + vanish 8s
const STRIP_GROW_MS = 5_000;
const STRIP_HOLD_MS = 3_000;

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

// Session-206 (F-206e): the solid-foliage polygon painter — the ref's
// structures are crisp shapes with hard boundaries; the radial blob's
// fade was the wrong genus for them. Points are fractional (x,y) pairs.
function polygon(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: Array<[number, number]>,
  color: string,
) {
  ctx.beginPath();
  points.forEach(([fx, fy], i) => {
    const x = fx * w;
    const y = fy * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

// Session-207 (F-207b): the polygon painter with a VERTICAL GRADIENT
// fill — the ref's hedge dome darkens smoothly (49,160,72)->(15,95,26)
// over its full height; the y0/y1 fractions are the gradient's span.
function polygonGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: Array<[number, number]>,
  stops: Array<[number, string]>,
) {
  ctx.beginPath();
  points.forEach(([fx, fy], i) => {
    const x = fx * w;
    const y = fy * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, stops[0][0] * h, 0, stops[stops.length - 1][0] * h);
  const span = stops[stops.length - 1][0] - stops[0][0];
  stops.forEach(([yFrac, color]) => {
    grad.addColorStop(span > 0 ? (yFrac - stops[0][0]) / span : 0, color);
  });
  ctx.fillStyle = grad;
  ctx.fill();
}

// Session-208: the HORIZONTAL gradient variant — the right corner
// mass lightens toward the right edge (a left->right blend).
function polygonHGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: Array<[number, number]>,
  leftColor: string,
  rightColor: string,
  x0Frac: number,
  x1Frac: number,
) {
  ctx.beginPath();
  points.forEach(([fx, fy], i) => {
    const x = fx * w;
    const y = fy * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  const grad = ctx.createLinearGradient(x0Frac * w, 0, x1Frac * w, 0);
  grad.addColorStop(0, leftColor);
  grad.addColorStop(1, rightColor);
  ctx.fillStyle = grad;
  ctx.fill();
}

// Session-209 (F-209a): the BIRD painter — the two-part sprite from
// the 22-frame decode. The leading band (a small wedge ~13x8) rides
// ~26px ahead of the body; the body is the wing-spread shape (~48x16:
// two wings sweeping down-out + a round body between). Both drawn at
// an ABSOLUTE pixel offset from the sprite's left edge (the decode's
// coordinates, 1440x900-relative but position-independent).
function drawBird(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
) {
  // the leading band (the decode: x+~4..+17, y356-362 — a wedge)
  polygon(
    ctx,
    1,
    1, // the absolute-pixel mode: fractions ARE pixels (w=h=1)
    [
      [x + 4, y - 24],
      [x + 17, y - 22],
      [x + 14, y - 18],
      [x + 2, y - 19],
    ],
    BIRD_RED,
  );
  // the body's left wing (sweeping down-left)
  polygon(
    ctx,
    1,
    1,
    [
      [x + 47, y - 2], // the left wing's tip (down)
      [x + 30, y - 8], // the wing's root
      [x + 38, y - 14], // the shoulder
      [x + 49, y - 11], // the wing's top edge
    ],
    BIRD_RED,
  );
  // the body's right wing (sweeping down-right, the deeper stroke)
  polygon(
    ctx,
    1,
    1,
    [
      [x + 60, y - 2], // the right wing's tip
      [x + 58, y - 12], // the wing's top
      [x + 46, y - 15], // the shoulder
      [x + 40, y - 8], // the root
    ],
    BIRD_RED_EDGE,
  );
  // the body between the wings
  polygon(
    ctx,
    1,
    1,
    [
      [x + 36, y - 12], // the body's top
      [x + 50, y - 12], //
      [x + 54, y - 6], // the belly's right
      [x + 40, y - 2], // the belly
    ],
    BIRD_RED,
  );
}

// Session-209 (F-209b): the BUSH-STRIP painter — the strip at a given
// growth fraction. The RIGHT bush (the s208 decode's shape + accents)
// stays FIXED; the LEFT lobe GROWS leftward — its right edge anchored
// at the right bush's left knee (x1264), its left edge sweeping
// x1317 (the seed, hidden) -> x1080 (full). The growth front carries
// its own red-blossom + dark-spot cluster (the decode: x1078-1130,
// y428-460). The gap (x1240-1264) shows the G band underneath.
function drawBushStrip(
  ctx: CanvasRenderingContext2D,
  growFrac: number,
) {
  // ---- the RIGHT bush (the fixed base + an expanding right lobe) ---
  // the seed state (the ref's standing captures): the compact bush
  // x1325-1410; as the strip grows the right lobe extends to x1435.
  const rLobe = 1410 + 25 * growFrac; // the right lobe's out-point
  const rBottom = 1410 + 21 * growFrac; // the bottom-right
  polygon(
    ctx,
    1,
    1,
    [
      [1323, 440], // the body's top-left
      [1364, 437], // the top
      [1371, 443], // the shoulder
      [1361, 462], // the inner knee
      [1375, 470], // the re-widening
      [rLobe, 475], // the right lobe out (1410@seed -> 1435@full)
      [rBottom, 502], // the bottom-right
      [1328, 505], // the bottom-left
      [1315, 470], // the left knee
    ],
    RIGHT_BUSH,
  );
  // the accents per the s209 a-shot decode (the seed phase): the
  // blossom cluster x1348-1377 y444-477 (red + brown) + the dark band
  // x1320-1367 y471-477 + the red foot x1320-1364 y480-486 + the
  // dark spot x1331-1340 y489
  polygon(
    ctx,
    1,
    1,
    [
      [1352, 453],
      [1374, 444],
      [1377, 460],
      [1348, 477],
    ],
    RIGHT_BUSH_RED,
  );
  polygon(
    ctx,
    1,
    1,
    [
      [1359, 459],
      [1375, 459],
      [1374, 468],
      [1357, 468],
    ],
    RIGHT_BUSH_BROWN,
  );
  polygon(
    ctx,
    1,
    1,
    [
      [1320, 471],
      [1367, 471],
      [1364, 477],
      [1320, 477],
    ],
    RIGHT_BUSH_DARK,
  );
  polygon(
    ctx,
    1,
    1,
    [
      [1320, 480],
      [1364, 480],
      [1363, 486],
      [1320, 486],
    ],
    RIGHT_BUSH_RED,
  );
  polygon(
    ctx,
    1,
    1,
    [
      [1331, 489],
      [1340, 489],
      [1340, 492],
      [1331, 492],
    ],
    RIGHT_BUSH_DARK,
  );

  // ---- the growth front's own cluster (rides the left lobe) --------
  const lx = 1317 + (1080 - 1317) * growFrac;
  if (lx < 1300) {
    // the lobe's green mass — the top band SLOPES down toward the
    // front (y455 at x1210 -> y468 at the front knee), the bottom
    // sweeps from the gap's edge (x1256) to the front's foot
    polygon(
      ctx,
      1,
      1,
      [
        [lx, 468], // the growth front (the left knee)
        [lx + 32, 452], // the shoulder (the tip's base)
        [1160, 455], // the top band's mid
        [1218, 455], // the top band's right end (the gap's edge)
        [1264, 470], // the right anchor (the gap's right edge)
        [1264, 502], // down to the bottom
        [lx + 25, 505], // the wavy bottom's left
      ],
      RIGHT_BUSH,
    );
    // the growth tip's compact blossom cluster (the ref: x1080-1105,
    // y428-452 — a tall red/dark cluster riding the very top of the
    // front, ABOVE the lobe's top band)
    polygon(
      ctx,
      1,
      1,
      [
        [lx + 3, 431],
        [lx + 14, 428],
        [lx + 20, 433],
        [lx + 14, 438],
        [lx + 19, 444],
        [lx + 5, 450],
        [lx + 7, 440],
      ],
      RIGHT_BUSH_RED,
    );
    polygon(
      ctx,
      1,
      1,
      [
        [lx + 21, 429],
        [lx + 27, 429],
        [lx + 27, 437],
        [lx + 21, 437],
      ],
      RIGHT_BUSH_DARK,
    );
    polygon(
      ctx,
      1,
      1,
      [
        [lx + 4, 446],
        [lx + 11, 446],
        [lx + 11, 452],
        [lx + 4, 452],
      ],
      RIGHT_BUSH_DARK,
    );
    // the front's brown patch (the ref's nnnn column x1097-1105)
    polygon(
      ctx,
      1,
      1,
      [
        [lx + 17, 439],
        [lx + 25, 439],
        [lx + 25, 451],
        [lx + 17, 451],
      ],
      RIGHT_BUSH_BROWN,
    );
  }
}

// Session-206 (F-204d): the TERRACOTTA WEDGE — the reference's big
// red-brown structure on the left-center horizon, decoded fresh from
// its booking margins (the only page exposing it — the faq/landing
// content covers the zone; their floors are safe by construction).
// The geometry (the boundary + tone traces, 1440x900): a rounded cap
// rising from (286,230) through the dome top (311,222) to (340,231),
// the right edge running straight down UNDER the booking's glass card
// at x~359, the bottom at y~310-312, the left slope through (247,250)
// + (206,280) to the toe (172,310). THREE tones (the row-scans): the
// bright CORE (214,81,55) fills the whole upper body, the DARK shade
// (153,60,35) wraps the bottom-left (its top tip ~(258,268), its
// right boundary a diagonal running (265,270)->(340,300)->(355,306)),
// and the MID band (190,73,50) lines the left slope (~15-20px wide).
// Painted CORE-first (the full hull), then D and M over it — the
// crisp polygon edges are the point: the s204 quick attempts failed
// exactly because a radial BLOB's soft edges blurred through the
// glass. The underlayer blobs are painted BEFORE the wedge so their
// upward fade never contaminates the wedge's bottom edge.
function terracottaWedge(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const X = (v: number) => v * w;
  const Y = (v: number) => v * h;
  // 1. the full hull in the bright CORE
  ctx.beginPath();
  ctx.moveTo(X(0.199), Y(0.256)); // the cap's left shoulder (287,231)
  ctx.lineTo(X(0.216), Y(0.247)); // the dome top (311,222)
  ctx.lineTo(X(0.236), Y(0.256)); // the cap's right shoulder (340,231)
  ctx.lineTo(X(0.249), Y(0.26)); // the right top — under the glass (359,234)
  ctx.lineTo(X(0.249), Y(0.347)); // straight down the right edge (359,312)
  ctx.lineTo(X(0.119), Y(0.344)); // the left toe (172,310)
  ctx.lineTo(X(0.143), Y(0.311)); // the left slope, lower knee (206,280)
  ctx.lineTo(X(0.172), Y(0.278)); // the left slope, upper knee (247,250)
  ctx.closePath();
  ctx.fillStyle = TERRACOTTA;
  ctx.fill();
  // 2. the DARK shade — the bottom-left wrap: top tip (258,268), the
  // right boundary diagonal down to (355,306), the bottom edge, back
  // up the M/D line
  ctx.beginPath();
  ctx.moveTo(X(0.179), Y(0.298)); // the top tip (258,268)
  ctx.lineTo(X(0.184), Y(0.311)); // (265,280)
  ctx.lineTo(X(0.201), Y(0.322)); // (290,290)
  ctx.lineTo(X(0.219), Y(0.333)); // (315,300)
  ctx.lineTo(X(0.236), Y(0.34)); // (340,306)
  ctx.lineTo(X(0.249), Y(0.347)); // the bottom-right (359,312)
  ctx.lineTo(X(0.119), Y(0.344)); // the bottom-left (172,310)
  ctx.lineTo(X(0.135), Y(0.333)); // (194,300) — the M/D line back up
  ctx.lineTo(X(0.149), Y(0.322)); // (215,290)
  ctx.lineTo(X(0.163), Y(0.311)); // (235,280)
  ctx.closePath();
  ctx.fillStyle = TERRACOTTA_SHADE;
  ctx.fill();
  // 3. the MID band — the left-slope lining (~15-20px wide), from the
  // cap's shoulder down to the toe
  ctx.beginPath();
  ctx.moveTo(X(0.199), Y(0.256)); // the cap's left shoulder
  ctx.lineTo(X(0.172), Y(0.278)); // the upper knee (247,250)
  ctx.lineTo(X(0.143), Y(0.311)); // the lower knee (206,280)
  ctx.lineTo(X(0.119), Y(0.344)); // the toe (172,310)
  ctx.lineTo(X(0.132), Y(0.344)); // the toe's inner corner (190,310)
  ctx.lineTo(X(0.135), Y(0.333)); // (194,300)
  ctx.lineTo(X(0.149), Y(0.322)); // (215,290)
  ctx.lineTo(X(0.163), Y(0.311)); // (235,280)
  ctx.lineTo(X(0.177), Y(0.298)); // (255,268)
  ctx.lineTo(X(0.184), Y(0.289)); // (265,260)
  ctx.lineTo(X(0.194), Y(0.278)); // (280,250)
  ctx.lineTo(X(0.205), Y(0.261)); // (295,235)
  ctx.closePath();
  ctx.fillStyle = TERRACOTTA_MID;
  ctx.fill();
}

export function SiteBackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  // Session-212 (F-212c): the reference's MOBILE brown tip — the
  // decoded right-edge wedge (x384-390, y314-335 @390, live
  // pixel-probed 2026-11-16: solid rgb(62,48,23)), painted below the
  // mobile mini-descent gradient. In 390/844 fractions.
  const MOBILE_BROWN_TIP: Array<[number, number]> = [
    [0.9974, 0.372], // the top tip (389,314)
    [1.0, 0.372], // the corner (390,314)
    [1.0, 0.397], // down the right edge (390,335)
    [0.9846, 0.397], // the bottom-left knee (384,335)
  ];

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    // Session-212 (F-212e): the offscreen static buffer — the static
    // scene renders ONCE per resize into staticCanvas; the RAF frame
    // blits it and draws the two sprites on top (the s209
    // full-repaint-per-frame posture retired: the per-frame
    // canvas.width reset cleared + reallocated the backing store and
    // repainted the ~40-shape scene at display refresh rate for two
    // moving sprites).
    const staticCanvas = document.createElement("canvas");
    const paint = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      staticCanvas.width = Math.round(w * dpr);
      staticCanvas.height = Math.round(h * dpr);
      const ctx = staticCanvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // the sky-over-lawn gradient (the fractional stops scale with
      // the viewport — the reference's own fixed painter). Session-206
      // (F-206c): the edge tightened to the ref's SHARP horizon — its
      // sky->lawn transition is 1px at y231 (0.257 of 900); the old
      // 0.255/0.285 stops blended over ~27px.
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0.0, SKY);
      sky.addColorStop(0.257, SKY);
      sky.addColorStop(0.262, LAWN);
      sky.addColorStop(1.0, LAWN);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
      // Session-208 (F-208c): the far-left horizon DIAGONAL — the flat
      // gradient puts the sky->lawn edge at y231 everywhere, but the
      // ref's corner holds SKY much lower (y278@x0 -> 241@x60, flat
      // 231 from x80). A sky-colored polygon paints the corner back:
      // the boundary runs (0,278)->(20,266)->(40,253)->(60,241)->
      // (80,231), closing along the top.
      // Session-211 (F-211c): the diagonals are DESKTOP-ONLY — the
      // ref's 390 scene has a flat horizon at ~y215 (844-fraction
      // 0.254) with no corner diagonals.
      if (w >= 1024) {
        polygon(
          ctx,
          w,
          h,
          [
            [0.0, 0.0], // the top-left corner
            [0.055, 0.0], // along the top (x80)
            [0.055, 0.257], // down to the flat horizon (80,231)
            [0.042, 0.268], // (60,241)
            [0.028, 0.281], // (40,253)
            [0.014, 0.296], // (20,266)
            [0.0, 0.309], // (0,278)
          ],
          HORIZON_DIAGONAL,
        );
      }
      // the far-RIGHT horizon diagonal (the same genus, mirrored):
      // flat 231 to x~1370 then descending (1370,235)->(1390,248)->
      // (1410,260)->(1430,273) — the sky patch closes the top-right
      // corner (page-shared: booking + landing agree). Session-211
      // (F-211c): DESKTOP-ONLY (the ref's 390 scene: no diagonal).
      if (w >= 1024) {
        polygon(
          ctx,
          w,
          h,
          [
            [1.0, 0.0], // the top-right corner
            [0.952, 0.0], // along the top (x1370)
            [0.952, 0.261], // down to the boundary's start (1370,235)
            [0.965, 0.269], // (1390,242)
            [0.979, 0.276], // (1410,248)
            [0.993, 0.283], // (1430,255)
            [1.0, 0.287], // (1440,258)
          ],
          HORIZON_DIAGONAL,
        );
      }
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
      // landing's exposure — the faq/booking hero bands cover this zone).
      // Session-206 (F-206e): the SOLID re-derivation — the ref's mass
      // is a crisp dome (top (1123,218), the right slope widening down
      // to (1265,308), the left clipped at the booking card's x~1080),
      // a flat (95,143,51) core over a (75,124,38) under-band — not a
      // radial fade. The descent: the dark band hugging the right edge
      // (x~1392-1440) from y~284 down, plus the lower lobe at y~680-800.
      // Session-210 (F-210b): the bottom edge re-cut as the V — the
      // hi-dpi decode shows the core's bottom DESCENDS from (1080,308)
      // to the apex (1178,270) then RISES to (1262,307); the old flat
      // y310 foot lost the whole y270-308 wedge under the dome's
      // right slope to the dark under-band.
      polygon(
        ctx,
        w,
        h,
        [
          [0.784, 0.238], // the apex — NARROW (1129,214; ref spans just 1128-1130 at y218)
          [0.801, 0.256], // the right slope's first knee (1153,230)
          [0.828, 0.278], // (1192,250)
          [0.849, 0.302], // (1223,272) — the slope bends flatter here
          [0.876, 0.336], // (1262,302)
          [0.876, 0.34], // the foot's right (1262,307) — the V's right rise
          [0.818, 0.3], // the V's apex (1178,270)
          [0.75, 0.342], // the V's left rise (1080,308)
          [0.75, 0.269], // straight up the left edge to (1080,242)
          [0.763, 0.256], // the left slope's knee (1099,230)
        ],
        MASS_CORE_SOLID,
      );
      // Session-207 (F-207c): the SUNLIT RIM — the ref's diagonal band
      // (108,162,59) inside the right slope, running (1140,225) ->
      // (1252,297); the DEEP band re-confined BELOW y~275 (the s206
      // version started at y270 — the ref's core tones hold to y~282).
      polygon(
        ctx,
        w,
        h,
        [
          [0.792, 0.25], // the rim's top (1140,225)
          [0.809, 0.258], // its right knee (1164,232)
          [0.876, 0.332], // the bottom (1252,299)
          [0.861, 0.336], // (1240,302)
          [0.797, 0.269], // back up the inner edge (1147,242)
        ],
        SUNLIT_RIM,
      );
      polygon(
        ctx,
        w,
        h,
        [
          // Session-210 (F-210b): the under-band's top edge follows the
          // SAME V as the core's bottom — the ref's dark band is thin
          // (7px) at x1090 where the light band is thick, thick from
          // y286 at x1140 where the light band is thin; the two bands
          // share the V boundary (1080,308)->(1178,270)->(1262,306).
          [0.75, 0.342], // the V's left end (1080,308)
          [0.818, 0.3], // the V's apex (1178,270)
          [0.876, 0.34], // the V's right rise (1262,306)
          [0.879, 0.347], // the foot's right (1265,312)
          [0.75, 0.347], // the foot's left (1080,312)
        ],
        MASS_DEEP_SOLID,
      );
      // the right-edge descent: the dark band from y~278 (its left
      // edge sloping: 1411@278 -> 1386@290 -> 1391@302). Session-207
      // (F-207c): the band's LOWER ANATOMY decoded — WIDE to y~355
      // (x1365@335 -> 1374@350, right edge 1439 -> 1435), narrowing
      // to the lobe (1384-1418)@360, then the BROWN tip (1380-1398,
      // y365-378, (71,54,27)); the s206 version ran to y364 full-width.
      // Session-210 (F-210c): the band re-cut as a vertical GRADIENT —
      // (24,106,42) at the top fading to (14,90,20) by y346.
      // Session-211 (F-211a): the top edge re-cut as the CONCAVE ARC
      // (the 8-frame-averaged decode: (1370,306)->(1386,288)->
      // (1402,280)->(1430,280)); the s210 cap wedge RETIRED.
      // Session-211 (F-211c): the whole right-edge descent family is
      // DESKTOP-ONLY — the ref's 390 scene omits it entirely (lawn
      // holds at the right edge below 1024; the ref's mobile scene is
      // a different composition, not a scaled desktop).
      if (w >= 1024) {
        const descentGrad = ctx.createLinearGradient(0, 277, 0, 346);
        descentGrad.addColorStop(0, EDGE_DARK_SOLID);
        descentGrad.addColorStop(1, EDGE_DARK_DEEP);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(DESCENT_ARC[3][0], DESCENT_ARC[3][1]); // the arc's right end (1430,280)
        ctx.lineTo(w, 283); // the top edge out to the corner
        ctx.lineTo(w, 355); // down the right edge to y~355
        ctx.lineTo(1375, 355); // the wide bottom-left
        ctx.lineTo(1366, 335); // the left edge's mid knee
        // the CONCAVE ARC back up the top (DESCENT_ARC's decoded
        // points): (1370,306)->(1386,288)->(1402,280)
        ctx.bezierCurveTo(DESCENT_ARC[0][0], DESCENT_ARC[0][1] + 14, DESCENT_ARC[0][0] + 2, DESCENT_ARC[0][1] - 6, DESCENT_ARC[1][0], DESCENT_ARC[1][1]);
        ctx.bezierCurveTo(DESCENT_ARC[1][0] + 8, DESCENT_ARC[1][1] - 6, DESCENT_ARC[2][0] - 4, DESCENT_ARC[2][1], DESCENT_ARC[2][0], DESCENT_ARC[2][1]);
        ctx.closePath();
        ctx.fillStyle = descentGrad;
        ctx.fill();
        ctx.restore();
      }
      // Session-211 (F-211c): the ref's MOBILE mini-descent — its own
      // smaller element at the right edge (x374-390, y256-310 @390:
      // the gradient (41,136,61)->(15,95,26) + the brown tip y310-318).
      if (w < 1024) {
        // in 844-tall fractions: the top tip y0.303, the bottom y0.367
        const miniGrad = ctx.createLinearGradient(0, h * 0.303, 0, h * 0.367);
        miniGrad.addColorStop(0, "rgba(41, 136, 61, 0.97)");
        miniGrad.addColorStop(1, "rgba(15, 95, 26, 0.97)");
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(w * 0.995, h * 0.303); // the top tip (388,256 @390)
        ctx.lineTo(w, h * 0.308); // out to the corner
        ctx.lineTo(w, h * 0.367); // down the right edge (y310)
        ctx.lineTo(w * 0.956, h * 0.362); // the inner edge's knee (374,306)
        ctx.lineTo(w * 0.949, h * 0.324); // the inner edge, upper (370,274)
        ctx.closePath();
        ctx.fillStyle = miniGrad;
        ctx.fill();
        ctx.restore();
        // Session-212 (F-212c): the mobile brown tip — the decoded
        // wedge the s211 comment documented but never painted (the
        // live probe shows it at x384-390, y314-335, solid
        // rgb(62,48,23) — the s211 note's "y310-318" was the
        // pre-measurement guess; this is the measured extent).
        polygon(ctx, w, h, MOBILE_BROWN_TIP, "rgba(62, 48, 23, 1)");
      }
      // the descent's lower lobe + the brown tip (desktop-only too)
      if (w >= 1024) {
        polygon(
          ctx,
          w,
          h,
          [
            [0.958, 0.394], // the lobe's left (1380,355)
            [0.993, 0.394], // its right (1430,355)
            [0.985, 0.406], // the lobe's bottom-right (1418,365)
            [0.958, 0.402], // the lobe's bottom-left (1381,362)
          ],
          EDGE_DARK_SOLID,
        );
        polygon(
          ctx,
          w,
          h,
          [
            [0.958, 0.402], // the brown tip's top-left (1380,362)
            [0.972, 0.402], // (1400,362)
            [0.972, 0.42], // the tip's bottom (1400,378)
            [0.958, 0.42], // (1380,378)
          ],
          "rgba(71, 54, 27, 0.97)",
        );
      }
      // Session-207 (F-207c): the right side's UNDERLAYER BAND — the
      // gray-green G band (x1080-1255 -> x1080-1240, y318-370) with
      // TEAL patches along its top edge + the stable BLUE slab
      // (1143-1173, y334-370). Page-shared (booking + landing expose
      // it; the faq's content covers it). Painted UNDER the descent
      // band's tip.
      polygon(
        ctx,
        w,
        h,
        [
          [0.75, 0.349], // the band's top-left (1080,314)
          [0.872, 0.349], // the top-right (1255,314)
          [0.861, 0.411], // the bottom-right (1240,370)
          [0.75, 0.411], // the bottom-left (1080,370)
        ],
        G_BAND,
      );
      // the teal patches along the G band's top edge (the ref's own
      // spots: (1095-1125, y332-358) + (1185-1215, y332-358))
      blob(ctx, w, h, 0.776, 0.376, 0.014, G_BAND_TEAL); // the left patch (1117,338)
      blob(ctx, w, h, 0.786, 0.388, 0.013, G_BAND_TEAL); // its lower companion (1132,349)
      blob(ctx, w, h, 0.833, 0.376, 0.013, G_BAND_TEAL); // the right patch (1200,338)
      // the BLUE SLAB — a vertical element (1143-1173, y334-370)
      polygon(
        ctx,
        w,
        h,
        [
          [0.794, 0.371], // (1143,334)
          [0.815, 0.371], // (1173,334)
          [0.812, 0.411], // (1169,370)
          [0.797, 0.411], // (1147,370)
        ],
        BLUE_SLAB,
      );
      // the slab's light bottom CAP (1140-1173, y369-375 — the ref's
      // own light-warm strip (237,234,224), page-shared)
      polygon(
        ctx,
        w,
        h,
        [
          [0.792, 0.41], // (1140,369)
          [0.815, 0.41], // (1173,369)
          [0.815, 0.417], // (1173,375)
          [0.792, 0.417], // (1140,375)
        ],
        "rgba(237, 234, 224, 0.97)",
      );
      // Session-206 (F-204d): the TERRACOTTA WEDGE (the left-center
      // horizon — the booking's exposure) + its gray-green UNDERLAYER
      // (y~316-372: a SOLID band, left edge (184,316)->(203,370), the
      // right at x~359 under the glass) + the small dark-green bush
      // (23,117,67) at its foot. The UNDERLAYER paints FIRST (solid,
      // below the wedge's crisp bottom edge).
      polygon(
        ctx,
        w,
        h,
        [
          [0.128, 0.351], // the band's top-left (184,316)
          [0.25, 0.351], // the top-right, under the glass (360,316)
          [0.25, 0.419], // the bottom-right (360,377)
          [0.141, 0.411], // the bottom-left (203,370)
        ],
        UNDERMASS,
      );
      blob(ctx, w, h, 0.152, 0.362, 0.028, UNDERMASS_DEEP); // the darker left patch (x~218, y~326)
      blob(ctx, w, h, 0.238, 0.362, 0.026, UNDERMASS_DEEP); // the darker right patch
      // the dark-green bush at the mass's foot — a SOLID oval (ref
      // (23,117,67) at (270-295, y335-360); the s204 blob was too weak)
      polygon(
        ctx,
        w,
        h,
        [
          [0.182, 0.372], // the bush's top-left (262,335)
          [0.196, 0.367], // the top (282,330)
          [0.209, 0.373], // the top-right (301,336)
          [0.207, 0.398], // the bottom-right (298,358)
          [0.193, 0.402], // the bottom (278,362)
          [0.181, 0.394], // the bottom-left (260,355)
        ],
        "rgba(23, 117, 67, 0.97)",
      );
      terracottaWedge(ctx, w, h);
      // the mid-left bush — a small silhouette against the glow, painted
      // UNDER the stratum (it never punches through the rock)
      blob(ctx, w, h, 0.135, 0.565, 0.024, BUSH_DEEP);
      // the left TREE + the hedges + the corners (Session-206 F-206e: the
      // SOLID re-derivation — the ref's tree is a crisp oval crown
      // (x12-82, y278-335) + a brown trunk base; the hedge a solid
      // band x0-116 y678-790; the right-corner mass x1352-1439 y676-800)
      // Session-211 (F-211d): the crown re-painted as a VERTICAL
      // GRADIENT — (50,159,72)@y278 darkening to (13,93,21)@y338 (the
      // axis decode at x43); the s206 flat HEDGE_SOLID crown retired.
      // The trunk widens: x54-78, y334-363 (was x55-75, y344-366).
      polygonGradient(
        ctx,
        w,
        h,
        [
          [0.014, 0.316], // the crown's top-left (20,284)
          [0.03, 0.302], // the crown's top (43,272)
          [0.057, 0.316], // the top-right (82,284)
          [0.058, 0.35], // the right edge down (84,315)
          [0.03, 0.376], // the bottom (43,338)
          [0.008, 0.35], // the left edge (12,315)
        ],
        [
          [0.316, CROWN_GRAD_TOP], // the crown's top (y~284)
          [0.376, CROWN_GRAD_BOTTOM], // the foot (y~338)
        ],
      );
      // Session-211 (F-211c): at narrow widths the ref's tree renders
      // as a SLIM DARK COLUMN hugging the left edge (x0-14 at 390,
      // green y240-330 + the brown base) — the crown's left edge
      // extends to x0 below 1024 (the mobile composition).
      if (w < 1024) {
        // the sliver uses the crown's own gradient (the ref's mobile
        // tree column runs (50,159,72)@top -> (13,93,21)@foot, the
        // same family as the desktop crown)
        polygonGradient(
          ctx,
          w,
          h,
          [
            [0.0, 0.272], // the sliver's left, top (the canvas edge, y~230 @390)
            [0.014, 0.302], // its top-right (the crown's top)
            [0.02, 0.376], // down the inner edge
            [0.0, 0.393], // the sliver's bottom-left (the brown base's left)
          ],
          [
            [0.272, CROWN_GRAD_TOP], // the sliver's top
            [0.393, CROWN_GRAD_BOTTOM], // its foot
          ],
        );
        // the sliver's brown foot (the ref's mobile tree carries its
        // trunk base at the left edge — brown (96,71,39), y328-333 @390)
        polygon(
          ctx,
          w,
          h,
          [
            [0.0, 0.388], // the foot's left, top (the canvas edge, y~328 @390)
            [0.016, 0.386], // its top-right (the trunk's top)
            [0.016, 0.397], // down the inner edge (y~335)
            [0.0, 0.398], // the foot's bottom-left (y~336)
          ],
          SOIL_BROWN,
        );
      }
      polygon(
        ctx,
        w,
        h,
        [
          [0.0375, 0.371], // the brown base's top-left (54,334)
          [0.054, 0.371], // the top-right (78,334)
          [0.054, 0.403], // the bottom (78,363)
          [0.0375, 0.403], // (54,363)
        ],
        SOIL_BROWN,
      );
      // the left HEDGE — a gradient DOME (Session-207 F-207b: the ref
      // darkens smoothly (49,160,72)@y698 -> (15,95,26)@y788; the flat
      // fill + the hard under-band both RETIRED). The bottom taper per
      // the fresh decode: the right edge 101@770 -> 85@785 -> the toe
      // 55@790, narrowing on the left too below y766.
      polygonGradient(
        ctx,
        w,
        h,
        [
          [0.043, 0.742], // the dome's peak (62,668)
          [0.068, 0.756], // the right slope's upper knee (98,680)
          [0.081, 0.778], // (116,700) — widened per the fresh decode
          [0.087, 0.808], // the right band's widest (125,727)
          [0.075, 0.868], // the right edge narrowing (108,781)
          [0.059, 0.876], // (85,788)
          [0.038, 0.878], // the toe (55,790)
          [0.028, 0.874], // the bottom-left (40,786)
          [0.014, 0.868], // (20,781) — the left edge holds GREEN to y~786
          [0.0, 0.83], // the left edge's narrow bottom (0,747)
          [0.0, 0.786], // the left edge, upper (0,707)
          [0.018, 0.755], // the left slope (26,680)
        ],
        [
          [0.776, HEDGE_GRAD_TOP], // the flat hold's top (y~698)
          [0.802, HEDGE_GRAD_TOP], // the hold ends (y~722) — the ref's convex profile
          [0.838, "rgba(41, 141, 60, 0.97)"], // the convex mid knee (y~754)
          [0.876, HEDGE_GRAD_BOTTOM], // the bottom (y~788)
        ],
      );
      // the solid brown SOIL PATCH at the hedge's foot (x73-110,
      // y780-805, (96,71,40) — the ref's own spot; the s201 soil blob
      // beneath retired)
      polygon(
        ctx,
        w,
        h,
        [
          [0.065, 0.867], // the rounded top's left (94,780)
          [0.071, 0.867], // the top's right (102,780)
          [0.076, 0.878], // the right widening (110,790)
          [0.076, 0.889], // (110,800)
          [0.071, 0.9], // the bottom's right (102,810)
          [0.056, 0.9], // the bottom's left (81,810)
          [0.051, 0.878], // the left (73,790)
          [0.058, 0.869], // up to the top's left (84,782)
        ],
        SOIL_PATCH,
      );
      // the right-CORNER mass (x1352-1439, y674-795; the inner edge
      // bulging left to x1352 at y720 then curving back right to the
      // bottom toe (1396,795)). Session-208 (decoded mid-round): the
      // ref LIGHTENS toward the right edge — (19,100,33) at the inner
      // edge -> (44,144,65) at x1438 — the horizontal gradient.
      // Session-211 (F-211c): DESKTOP-ONLY — the ref's 390 scene
      // shows plain lawn through the whole corner zone (verified:
      // x380, y680-800 all lawn-family tones).
      if (w >= 1024) {
        polygonHGradient(
          ctx,
          w,
          h,
          [
            [0.956, 0.749], // (1376,674) — the top tip
            [1.0, 0.742], // the top-right corner
            [1.0, 0.888], // the bottom-right (y800)
            [0.972, 0.882], // the bottom toe (1396,794)
            [0.95, 0.822], // (1368,740) the inner bulge's lower leg
            [0.939, 0.792], // the inner bulge (1352,713)
            [0.939, 0.756], // the inner edge, upper (1352,680)
          ],
          "rgba(24, 107, 43, 1)", // the TOP tones' left (x1352)
          "rgba(43, 143, 65, 1)", // the TOP tones' right (x1438)
          0.939, // the gradient's left
          1.0, // the gradient's right
        );
        // the VERTICAL DARKENING VEIL over the same shape — the ref's
        // field declines convexly to (16,96) at the bottom (the fitted
        // alpha profile: 0@y676 -> 0.22@y724 -> 0.44@y756 -> 0.89@y788)
        polygonGradient(
          ctx,
          w,
          h,
          [
            [0.956, 0.749], // (1376,674) — the top tip
            [1.0, 0.742], // the top-right corner
            [1.0, 0.888], // the bottom-right (y800)
            [0.972, 0.882], // the bottom toe (1396,794)
            [0.95, 0.822], // (1368,740) the inner bulge's lower leg
            [0.939, 0.792], // the inner bulge (1352,713)
            [0.939, 0.756], // the inner edge, upper (1352,680)
          ],
          [
            [0.751, "rgba(16, 96, 32, 0)"], // the top (y676) — the base shows
            [0.805, "rgba(16, 96, 32, 0.22)"], // y724
            [0.84, "rgba(16, 96, 32, 0.44)"], // y756
            [0.858, "rgba(16, 96, 32, 0.59)"], // y772
            [0.876, "rgba(16, 96, 32, 0.89)"], // y788
            [0.883, "rgba(16, 96, 32, 0.95)"], // the bottom (y795)
          ],
        );
        blob(ctx, w, h, 0.958, 0.872, 0.024, SOIL_BROWN); // the bottom-right soil
      }
      // Session-209 (F-209b): the static bush RETIRED — the strip is
      // now ANIMATED (the RAF loop below): it grows from the right
      // edge leftward, holds, vanishes, regrows. The s208 static
      // decode's geometry + accents live on in drawBushStrip().
      // Session-208 (F-208f): the MID-DISTANCE structures — painted
      // AFTER the horizon but BEFORE nothing else covers them (they sit
      // mid-canvas, behind the glass cards). The dark-green tree mass
      // (x460-620, y265-315) + the blue-gray structure (x660-800,
      // y265-310).
      polygon(
        ctx,
        w,
        h,
        [
          [0.32, 0.294], // the tree's top-left (460,265)
          [0.39, 0.282], // the top (562,254)
          [0.43, 0.294], // the top-right (620,265)
          [0.43, 0.35], // the bottom-right (620,315)
          [0.32, 0.35], // the bottom-left (460,315)
        ],
        MID_TREE,
      );
      polygon(
        ctx,
        w,
        h,
        [
          [0.458, 0.294], // the structure's top-left (660,265)
          [0.556, 0.294], // the top-right (800,265)
          [0.556, 0.344], // the bottom-right (800,310)
          [0.458, 0.344], // the bottom-left (660,310)
        ],
        MID_BLUE,
      );
    };
    // the blit: a 1:1 device-pixel copy of the static buffer onto the
    // visible canvas, restoring the dpr transform for the sprites.
    // The buffer fills the canvas opaquely, so it doubles as the
    // per-frame clear (old sprite positions are covered).
    const blit = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
      if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(staticCanvas, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const render = () => {
      paint();
      blit();
    };
    // Session-213 (F-214): the SEED-STATE paint — the bush strip's base
    // (a standing scene element, visible even at growFrac 0) drawn once
    // over the blitted static buffer. Under the reduced-motion gate the
    // RAF loop never runs, and the strip painted ONLY inside the loop —
    // the s212 F-212d gate therefore dropped it entirely, contradicting
    // its own contract ("the sprites hold their first-frame state"; the
    // first frame paints drawBushStrip(ctx, 0)). The birds are
    // legitimately absent (t=0 starts them offscreen).
    const drawSeedSprites = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (window.innerWidth >= 1024) drawBushStrip(ctx, 0);
    };
    // the mid-session stop lands the frozen scene on the seed posture:
    // a FRESH blit first (never an overlay — a mid-grown frame would
    // silhouette through), then the seed sprites.
    const landSeedState = () => {
      blit();
      drawSeedSprites();
    };
    // the resize re-render keeps the seed posture under the gate (the
    // live matchMedia read — this registers before the motionQuery
    // const below)
    const onResize = () => {
      render();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) drawSeedSprites();
    };
    window.addEventListener("resize", onResize);

    // Session-209 (the ANIMATION PORT): the two sprites run as a RAF
    // loop over the static paint — each frame repaints the full scene
    // (paint()) then draws the animated sprites on top, so nothing
    // trails. The bird: a 22s cycle — the FIRST pass a single bird
    // (y384 baseline), the SECOND the two-bird flock (y417, the two
    // bodies offset ~30px). The strip: grow 5s (the left edge
    // sweeping x1317->x1080) + hold 3s + vanish 8s, repeating. Both
    // keyed off performance.now() from the mount.
    const start = performance.now();
    let raf = 0;
    const frame = () => {
      // blit the static buffer (covering the previous frame's
      // sprites), then the animated sprites on top
      blit();
      const canvasEl = ref.current;
      const ctx2 = canvasEl?.getContext("2d");
      if (ctx2) {
        const t = performance.now() - start;
        const w = window.innerWidth;

        // ---- the bird cycle ----------------------------------------
        // each pass gets half the cycle; within a pass the bird
        // crosses in ~11s (x-60 -> x420 at ~46px/s)
        const passMs = BIRD_CYCLE_MS / 2;
        const pass = Math.floor(t / passMs) % 2;
        const tp = t % passMs;
        const bx = -60 + BIRD_SPEED * tp;
        if (bx < 420) {
          const by = pass === 0 ? 384 : 417;
          drawBird(ctx2, bx, by);
          if (pass === 1) {
            drawBird(ctx2, bx + 30, by - 2); // the flock's second bird
          }
        }

        // ---- the strip cycle ---------------------------------------
        // Session-212 (the audit's F-05 rider): the strip is
        // desktop-space geometry (x1080-1435) — now explicitly gated
        // like the descent family instead of implicitly off-canvas
        // on phones.
        const ts = t % STRIP_CYCLE_MS;
        if (w >= 1024 && ts < STRIP_GROW_MS + STRIP_HOLD_MS) {
          // growing (or at full): the growth fraction 0 -> 1
          const growFrac = Math.min(1, ts / STRIP_GROW_MS);
          drawBushStrip(ctx2, growFrac);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    // the first static render immediately (the t=0 state), then the
    // RAF loop takes over (blitting the buffer + the sprites)
    render();
    // Session-212 (F-212d): the reduced-motion gate — the birds/bush
    // simply hold their first-frame state when the visitor prefers
    // reduced motion (the globals.css reduce block freezes CSS
    // animations only; the canvas loop is this gate's own
    // responsibility). A live preference change starts/stops the loop
    // without a remount.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const startLoop = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        // F-214: land on the seed posture, not the frozen mid-flight
        // frame (the gate's documented first-frame contract)
        landSeedState();
      }
    };
    const onMotionChange = () => (motionQuery.matches ? stopLoop() : startLoop());
    motionQuery.addEventListener("change", onMotionChange);
    if (motionQuery.matches) drawSeedSprites();
    else startLoop();

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      stopLoop();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
