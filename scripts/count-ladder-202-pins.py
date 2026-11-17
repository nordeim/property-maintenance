#!/usr/bin/env python3
"""Session-202 D (the sweep-tool pin re-anchoring): the STANDING_BASELINES
walk (72 entries, the Oasis re-pointing) trips the pin family that holds
the neo-crm-era values. Every failing assertion re-anchored to the
walked table (the s202 values), with the s202 re-pointing notes where
the historical tests pin LIVE values. Assert-first."""
from pathlib import Path

p = Path("/home/z/my-project/property-maintenance/tests/sweep-tool.test.ts")
t = p.read_text()

def flip(old, new, count=1):
    global t
    n = t.count(old)
    assert n == count, f"{n}x {old[:64]!r}"
    t = t.replace(old, new, count if count else -1)
    print(f"  {old[:52]!r}")

# ── 1. the not-found family floor ×4 ────────────────────────────────
flip('    expect(standingBaseline(1440)["not-found"]).toBe(0.1);\n'
     '    expect(standingBaseline(390)["not-found"]).toBe(0.1);\n'
     '    expect(standingBaseline(768)["not-found"]).toBe(0.1);\n'
     '    expect(standingBaseline(1024)["not-found"]).toBe(0.1);',
     '    // s202 (the Oasis re-pointing): the reference\'s 404 rides ITS\n'
     '    // site chrome over the canvas — the genus measured 0.02/1.25/\n'
     '    // 0.53/0.03 (the desktop pair byte-close, the bands carrying\n'
     '    // the canvas/404-content shares)\n'
     '    expect(standingBaseline(1440)["not-found"]).toBe(0.4);\n'
     '    expect(standingBaseline(390)["not-found"]).toBe(2);\n'
     '    expect(standingBaseline(768)["not-found"]).toBe(1.5);\n'
     '    expect(standingBaseline(1024)["not-found"]).toBe(0.5);')

# ── 2. the desktop table ────────────────────────────────────────────
flip('    expect(b.settings).toBeGreaterThanOrEqual(2.4);\n'
     '    expect(b.settings).toBeLessThanOrEqual(3.6);',
     '    // s202: the whole desktop family re-derived against the Oasis\n'
     '    // reference — the CRM pages\' ours-superset-vs-soft-404 genus\n'
     '    // (~22-23 measured) replaces the neo-crm-era floors\n'
     '    expect(b.settings).toBeGreaterThanOrEqual(24);\n'
     '    expect(b.settings).toBeLessThanOrEqual(27);')
flip('    expect(b.dashboard).toBeGreaterThanOrEqual(0.1);\n'
     '    expect(b.contacts).toBeGreaterThanOrEqual(0.05);',
     '    expect(b.dashboard).toBeGreaterThanOrEqual(20);\n'
     '    expect(b.contacts).toBeGreaterThanOrEqual(20);')

# ── 3. the phone table ──────────────────────────────────────────────
flip('    expect(b390.settings).toBeGreaterThanOrEqual(3.4);\n'
     '    expect(b375.settings).toBeGreaterThanOrEqual(3.5);',
     '    // s202: the phone family re-derived (the CRM genus ~10-13 at\n'
     '    // the phone share; the canvas pages at their floors)\n'
     '    expect(b390.settings).toBeGreaterThanOrEqual(12);\n'
 '    expect(b375.settings).toBeGreaterThanOrEqual(12);')
flip('    expect(b390.login).toBeGreaterThanOrEqual(0.7);',
     '    expect(b390.login).toBeGreaterThanOrEqual(2);')
flip('    for (const name of ["dashboard", "leads", "reports", "calendar"])\n'
     '      expect(b390[name]).toBeLessThanOrEqual(0.3);',
     '    for (const name of ["dashboard", "leads", "reports", "calendar"])\n'
     '      expect(b390[name]).toBeLessThanOrEqual(18);')

# ── 4. the tablet table ─────────────────────────────────────────────
flip('    expect(b.accounts).toBeGreaterThanOrEqual(0.1);\n'
     '    expect(b.accounts).toBeLessThanOrEqual(0.3);\n'
     '    expect(b.settings).toBeGreaterThanOrEqual(3.7);\n'
     '    expect(b.settings).toBeLessThanOrEqual(4.7);\n'
     '    expect(b.login).toBeGreaterThanOrEqual(0.4);\n'
     '    expect(b.login).toBeLessThanOrEqual(0.7);',
     '    // s202: the tablet family re-derived — the CRM genus at its\n'
     '    // tablet share (~38-39 measured, the widest band: the\n'
     '    // reference\'s soft-404 at 768 differs most from our CRM)\n'
     '    expect(b.accounts).toBeGreaterThanOrEqual(40);\n'
     '    expect(b.accounts).toBeLessThanOrEqual(44);\n'
     '    expect(b.settings).toBeGreaterThanOrEqual(40);\n'
     '    expect(b.settings).toBeLessThanOrEqual(45);\n'
     '    expect(b.login).toBeGreaterThanOrEqual(1);\n'
     '    expect(b.login).toBeLessThanOrEqual(2);')

# ── 5. the tablet driftVerdict ──────────────────────────────────────
flip('    const rows = [["settings", 3.92]] as Array<[string, number]>;\n'
     '    expect(driftVerdict(rows, standingBaseline(768), 0.5).ok).toBe(true);\n'
     '    // judged against the DESKTOP table (settings 2.9 + 0.5) it FAILS —\n'
     '    // the genus\'s share is class-specific, not drift\n'
     '    expect(driftVerdict(rows, standingBaseline(1440), 0.5).ok).toBe(false);',
     '    // s202: the planted row rides the new shares — the tablet\n'
     '    // genus (43 baseline) vs the desktop (25.5 + 0.5)\n'
     '    const rows = [["settings", 30]] as Array<[string, number]>;\n'
     '    expect(driftVerdict(rows, standingBaseline(768), 0.5).ok).toBe(true);\n'
     '    // judged against the DESKTOP table (settings 25.5 + 0.5) it FAILS —\n'
     '    // the genus\'s share is class-specific, not drift\n'
     '    expect(driftVerdict(rows, standingBaseline(1440), 0.5).ok).toBe(false);')

# ── 6. the landscape table ──────────────────────────────────────────
flip('    expect(b.accounts).toBeGreaterThanOrEqual(1.5);\n'
     '    expect(b.accounts).toBeLessThanOrEqual(2.1);\n'
     '    expect(b.settings).toBeGreaterThanOrEqual(1.7);\n'
     '    expect(b.settings).toBeLessThanOrEqual(2.7);\n'
     '    expect(b.login).toBeGreaterThanOrEqual(0.4);\n'
     '    expect(b.login).toBeLessThanOrEqual(0.7);\n'
     '    expect(b.dashboard).toBeGreaterThanOrEqual(0.05);\n'
     '    expect(b.dashboard).toBeLessThanOrEqual(0.15);',
     '    // s202: the landscape family re-derived — the CRM genus at its\n'
     '    // lg share (~30-32 measured)\n'
     '    expect(b.accounts).toBeGreaterThanOrEqual(32);\n'
     '    expect(b.accounts).toBeLessThanOrEqual(36);\n'
     '    expect(b.settings).toBeGreaterThanOrEqual(31);\n'
     '    expect(b.settings).toBeLessThanOrEqual(35);\n'
     '    expect(b.login).toBeGreaterThanOrEqual(1);\n'
     '    expect(b.login).toBeLessThanOrEqual(2);\n'
     '    expect(b.dashboard).toBeGreaterThanOrEqual(33);\n'
     '    expect(b.dashboard).toBeLessThanOrEqual(38);')

# ── 7. the landscape driftVerdict (the relationship INVERTED: the
#    tablet share is now the loosest, the landscape tighter) ──────────
flip('''  it("driftVerdict: the landscape accounts row passes ITS OWN class where the desktop/tablet tables would fail it (s148 re-derived: the 1.67 row — the PURE s95 overflow genus, the chips share retired with the mirror)", async () => {
    const { driftVerdict, standingBaseline } = await sweep();
    // the measured s148 row: accounts 1.67 at 1024x768 (the pure
    // overflow genus — 1.9 baseline)
    const rows = [["accounts", 1.67]] as Array<[string, number]>;
    expect(driftVerdict(rows, standingBaseline(1024), 0.5).ok).toBe(true);
    // judged against the DESKTOP table (accounts 0.1) it would FAIL —
    // and against the TABLET table (accounts 0.2) too
    expect(driftVerdict(rows, standingBaseline(1440), 0.5).ok).toBe(false);
    expect(driftVerdict(rows, standingBaseline(768), 0.5).ok).toBe(false);
  });''',
     '''  it("driftVerdict: the landscape accounts row FAILS its own class where the TABLET table is looser — s202 inverted the shares (the tablet band now carries the CRM genus's widest share, the landscape tighter; the class banding still matters per class)", async () => {
    const { driftVerdict, standingBaseline } = await sweep();
    // s202: the re-derived shares — landscape accounts 34 + 0.5, the
    // tablet 42 + 0.5, the desktop 24.5 + 0.5. A row of 38 fails the
    // landscape AND the desktop but passes the tablet — the share is
    // class-specific, not drift
    const rows = [["accounts", 38]] as Array<[string, number]>;
    expect(driftVerdict(rows, standingBaseline(1024), 0.5).ok).toBe(false);
    expect(driftVerdict(rows, standingBaseline(1440), 0.5).ok).toBe(false);
    expect(driftVerdict(rows, standingBaseline(768), 0.5).ok).toBe(true);
  });''')

# ── 8. the s146 three-entries ───────────────────────────────────────
flip('    expect(phone.landing).toBe(0.1);\n'
     '    // the desktop dashboard: 0.4 → 0.15 (s146) → 0.1 (s148 — the\n'
     '    // mirrored KPI delta chips + middle select + More... ghost)\n'
     '    expect(desktop.dashboard).toBe(0.1);\n'
     '    // the desktop contacts: 0.1 → 3.0 (s147) → 0.1 (s148 — the "+0"\n'
     '    // chip mirrored)\n'
     '    expect(desktop.contacts).toBe(0.1);',
     '    // s202 (the Oasis re-pointing): the entries re-derived against\n'
     '    // the Oasis reference — the landing rides the canvas-drift\n'
     '    // floor (9 phone / 24.5 desktop) + the CRM pages ride the\n'
     '    // ours-superset-vs-soft-404 genus (~25 at desktop)\n'
     '    expect(phone.landing).toBe(9);\n'
     '    expect(desktop.dashboard).toBe(25.5);\n'
     '    expect(desktop.contacts).toBe(24.5);')

# ── 9. the s146 byte-stable family ──────────────────────────────────
flip('    expect(tablet.landing).toBe(0.1);\n'
     '    expect(landscape.landing).toBe(0.1);\n'
     '    expect(desktop.landing).toBe(0.1);\n'
     '    // the settings picklist genus family at its new shape (the s148\n'
     '    // dead-slack tightening)\n'
     '    expect(desktop.settings).toBe(2.9);\n'
     '    expect(phone.settings).toBe(3.8);\n'
     '    expect(tablet.settings).toBe(4.2);\n'
     '    expect(landscape.settings).toBe(2.1);\n'
     '    // the login logo genus family (the TRUE byte-stable genus)\n'
     '    expect(desktop.login).toBe(0.3);\n'
     '    expect(phone.login).toBe(1.4);\n'
     '    // the phone floor family COLLAPSED (the reference\'s own hamburger)\n'
     '    expect(phone.about).toBe(0.1);\n'
     '    expect(phone.contact).toBe(0.1);',
     '    // s202: the whole family re-derived against the Oasis reference\n'
     '    expect(tablet.landing).toBe(10);\n'
     '    expect(landscape.landing).toBe(17.5);\n'
     '    expect(desktop.landing).toBe(24.5);\n'
     '    // the CRM-genus settings family at its per-class shares\n'
     '    expect(desktop.settings).toBe(25.5);\n'
     '    expect(phone.settings).toBe(13.5);\n'
     '    expect(tablet.settings).toBe(43);\n'
     '    expect(landscape.settings).toBe(33.5);\n'
     '    // the login genus (the Oasis logo share, the widest at phone)\n'
     '    expect(desktop.login).toBe(1);\n'
     '    expect(phone.login).toBe(3);\n'
     '    // the phone public pages at their canvas floors\n'
     '    expect(phone.about).toBe(8);\n'
     '    expect(phone.contact).toBe(22);')

# ── 10. the s147 COLLAPSED family ───────────────────────────────────
flip('    expect(desktop.accounts).toBe(0.1);\n'
     '    expect(desktop.contacts).toBe(0.1);\n'
     '    expect(desktop.activities).toBe(0.1);\n'
     '    // the family at the other classes — all collapsed\n'
     '    const phone = standingBaseline(390);\n'
     '    expect(phone.contacts).toBe(0.1);\n'
     '    expect(phone.accounts).toBe(0.1);\n'
     '    const tablet = standingBaseline(768);\n'
     '    expect(tablet.contacts).toBe(0.1);\n'
     '    expect(tablet.activities).toBe(0.1);\n'
     '    const landscape = standingBaseline(1024);\n'
     '    expect(landscape.activities).toBe(0.1);\n'
     '    expect(landscape.accounts).toBe(1.9);',
     '    // s202: the family re-derived — the reference 404s every CRM\n'
     '    // route (the ours-only superset genus, ~22-26 desktop / the\n'
     '    // per-class shares below)\n'
     '    expect(desktop.accounts).toBe(24.5);\n'
     '    expect(desktop.contacts).toBe(24.5);\n'
     '    expect(desktop.activities).toBe(26.5);\n'
     '    const phone = standingBaseline(390);\n'
     '    expect(phone.contacts).toBe(14.5);\n'
     '    expect(phone.accounts).toBe(16);\n'
     '    const tablet = standingBaseline(768);\n'
     '    expect(tablet.contacts).toBe(42);\n'
     '    expect(tablet.activities).toBe(43);\n'
     '    const landscape = standingBaseline(1024);\n'
     '    expect(landscape.activities).toBe(35);\n'
     '    expect(landscape.accounts).toBe(34);')

# ── 11. the s147 phone family ───────────────────────────────────────
flip('    expect(phone.landing).toBe(0.1);\n'
     '    // the floor family: 0.75-0.95 → 0.1-0.25 (the s93 genus retired —\n'
     '    // the reference\'s topbar now matches ours byte-for-byte; s148: the\n'
     '    // F-147c3 chips family collapsed the 0.2 entries to the floor)\n'
     '    expect(phone.dashboard).toBe(0.1);\n'
     '    expect(phone.leads).toBe(0.1);\n'
     '    expect(phone.calendar).toBe(0.1);\n'
     '    expect(phone.activities).toBe(0.1);\n'
     '    expect(phone.reports).toBe(0.25);\n'
     '    expect(phone.profile).toBe(0.1);',
     '    // s202: the phone family re-derived against the Oasis reference\n'
     '    expect(phone.landing).toBe(9);\n'
     '    expect(phone.dashboard).toBe(17.5);\n'
     '    expect(phone.leads).toBe(16.5);\n'
     '    expect(phone.calendar).toBe(13.5);\n'
     '    expect(phone.activities).toBe(16);\n'
     '    expect(phone.reports).toBe(14.5);\n'
     '    expect(phone.profile).toBe(17);')

# ── 12. the s150 phone settings comment pin ─────────────────────────
flip('    expect(entry).toMatch(/settings:\\s*3\\.8,/);',
     '    // s202: the entry re-derived against the Oasis reference\n'
     '    expect(entry).toMatch(/settings:\\s*13\\.5,/);')

p.write_text(t)
print("the sweep-tool pin family re-anchored (12 tests)")
