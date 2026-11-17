#!/usr/bin/env python3
"""Session-199: generate src/lib/site-content.ts from the extracted
reference content (/tmp/oasis-content.json + /tmp/oasis-content2.json —
the recon legs 9-11 ground truth)."""
import json
from pathlib import Path

d1 = json.load(open("/tmp/oasis-content.json"))
d2 = json.load(open("/tmp/oasis-content2.json"))

services_groups = d2["services"]["groups"]      # 5 group titles
service_cards = d2["services"]["cards"]         # 12 {title, blurb, img}
gallery = d2["gallery"]["pairs"]                # 6 {label, before, after}
gallery_chips = d2["gallery"]["chips"]
faq = d2["faq"]                                 # 21 {group, question, answer}
contact = d1["contact"]                         # labels/suburbs/radios/placeholders

def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

lines = []
w = lines.append
w("// Session-199 (the property-maintenance checkout round): the OASIS")
w("// SITE CONTENT — every string, list and URL below is the live-recon")
w("// ground truth from the reference deployment (scripts/recon-199*.ts,")
w("// legs 8-11; extracted 2026-11-15). The photography is the reference's")
w("// own hosted stock (Unsplash URLs + the Green Cut base44 media assets)")
w("// — the owner's clone authorization covers referencing them, and the")
w("// same URLs keep the two apps pixel-comparable (the shared-source")
w("// genus, documented in the plan §8).")
w("//")
w("// Content is DATA, not markup: the pages render these constants, so a")
w("// content fix is one edit here (and the e2e marketing battery pins the")
w("// rendered result).")
w("")
w("// ---- The services page: the five groups + the twelve cards ---------")
w("export interface ServiceCard {")
w("  title: string;")
w("  blurb: string;")
w("  img: string;")
w("}")
w("")
w("export const SERVICE_PAGE_GROUPS: readonly string[] = [")
for g in services_groups:
    w(f"  {ts_str(g)},")
w("] as const;")
w("")
w("export const SERVICE_PAGE_CARDS: readonly ServiceCard[] = [")
for c in service_cards:
    w(f"  {{ title: {ts_str(c['title'])}, blurb: {ts_str(c['blurb'])}, img: {ts_str(c['img'])} }},")
w("] as const;")
w("")
w("// ---- The gallery: the six before/after pairs ------------------------")
w("export interface GalleryPair { label: string; before: string; after: string; }")
w("")
w("export const GALLERY_PAIRS: readonly GalleryPair[] = [")
for p in gallery:
    w(f"  {{ label: {ts_str(p['label'])}, before: {ts_str(p['before'])}, after: {ts_str(p['after'])} }},")
w("] as const;")
w("")
w(f"export const GALLERY_CHIPS: readonly string[] = [{', '.join(ts_str(c) for c in gallery_chips)}] as const;")
w("")
w("// ---- The FAQ: the six groups + the twenty-one accordion items -------")
w("export interface FaqItem { group: string; question: string; answer: string; }")
w("")
groups_order = []
for it in faq:
    if it["group"] not in groups_order:
        groups_order.append(it["group"])
w("export const FAQ_GROUPS: readonly string[] = [")
for g in groups_order:
    w(f"  {ts_str(g)},")
w("] as const;")
w("")
w("export const FAQ_ITEMS: readonly FaqItem[] = [")
for it in faq:
    w(f"  {{ group: {ts_str(it['group'])}, question: {ts_str(it['question'])}, answer: {ts_str(it['answer'])} }},")
w("] as const;")
w("")
w("// ---- The contact form inventory --------------------------------------")
w("export const CONTACT_PLACEHOLDERS = {")
w(f"  name: {ts_str(contact['placeholders'][0])},")
w(f"  phone: {ts_str(contact['placeholders'][1])},")
w(f"  email: {ts_str(contact['placeholders'][2])},")
w(f"  message: {ts_str(contact['placeholders'][3])},")
w("} as const;")
w("")
w("export const CONTACT_SERVICE_OPTIONS: readonly string[] = [")
for l in contact["labels"]:
    if l in ("One-off job", "Ongoing/regular service") or "*" in l or l == "Additional Details":
        continue
    w(f"  {ts_str(l)},")
w("] as const;")
w("")
w("export const CONTACT_SERVICE_TYPES: readonly string[] = [")
for r in contact["radios"]:
    w(f"  {ts_str(r)},")
w("] as const;")
w("")
w("export const CONTACT_SUBURBS: readonly string[] = [")
for s in contact["suburbs"]:
    w(f"  {ts_str(s)},")
w("] as const;")
w("")

Path("src/lib/site-content.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"site-content.ts written: {len(lines)} lines "
      f"({len(service_cards)} cards, {len(gallery)} pairs, {len(faq)} faq, {len(contact['suburbs'])} suburbs)")
