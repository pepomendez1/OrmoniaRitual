# ORMONIA · Locked / Approved Decisions

This file is a design lock list.

Claude must read this before broad UI changes.

A locked area may be changed only for:
- explicit user request;
- bug;
- responsive failure;
- accessibility issue;
- necessary integration work.

## GLOBAL

### Brand wordmark — LOCKED PRINCIPLE
The ORMONIA wordmark is an official asset.
Do not recreate it with a font.

### Section transitions — LOCKED PRINCIPLE
No giant fades / foggy gradients between sections.
Clean cuts are allowed.

### Phase communication — LOCKED PRINCIPLE
Phase is secondary context.
Do not imply each serum is only usable in one phase.

### El Ritual naming — LOCKED
Customer-facing name is:
**El Ritual**

Do not show “Pack x4” in customer UI.

Internal technical identifiers may remain.

### Prices — LOCKED
El Ritual:
ARS 160.000

Calendario:
ARS 25.000

Free shipping:
ARS 145.000

## HOME ORDER — LOCKED

1. Hero
2. El Ritual
3. Los esenciales de ORMONIA
4. Calendario cíclico
5. El Ciclo
6. Test de perfil de piel
7. Lecturas para el ritual
8. El universo ORMONIA / Instagram
9. Unite al ritual + Footer

Do not reorder.

## HERO — MOSTLY LOCKED

Core approved:
- current photographic world;
- claim:
  “Lo que cambia adentro se expresa afuera.”
- centered/clear CTA;
- transparent smart header;
- shipping bar top only.

Do not redesign Hero globally.

Photography may evolve with explicit approval.

Typography may be corrected if it regresses from brand identity.

## HEADER — LOCKED BEHAVIOR

- transparent;
- visible at top;
- hides when scrolling down after Hero;
- reappears on scroll up;
- only text tone changes;
- shipping bar does not reappear.

Tone must remain declarative.
No pixel sampling.

## EL CICLO — LOCKED INTERACTION

Headline:
“Tu piel cambia.
Tu ritual también.”

Keep:
- continuous scrub;
- no snap;
- no artificial pauses;
- products visible;
- phase indicator synced and clickable.

Phase labels:
- MENSTRUAL
- FOLICULAR
- OVULATORIA
- LÚTEA

New approved material backgrounds belong to this section.

Do not replace them with campaign photography by default.

## EL RITUAL — LOCKED CONCEPT

It is NOT:
- a discount bundle;
- four products sold together for savings.

It IS:
- complete ritual;
- four formulas as one experience;
- flagship system.

Inside its PDP:
do not show individual serum ecommerce cards/links.

Calendar is the main complementary product.

## LOS ESENCIALES — LOCKED DIRECTION

Headline:
“Los esenciales de ORMONIA.”

Supporting idea:
“Fórmulas pensadas para acompañar lo que tu piel necesita.”

Cards:
- large;
- editorial;
- horizontal rail;
- price;
- actives;
- subtle quick action;
- campaign media on hover where available.

## CALENDARIO — LOCKED ARCHITECTURE

Two distinct experiences:

### `/calendario`
Editorial/product storytelling page.

### Calendar PDP
Commercial purchase page.

Do not merge them.

## TEST DE PERFIL — LOCKED DIRECTION

Preferred visible naming:
TEST DE PERFIL DE PIEL

Headline:
Conocé cómo responde tu piel.

CTA:
HACER EL TEST

Do not invent scoring or phenotypes.

## AGUA + EL REGISTRO — NOT IN HOME

The previous large Agua + El Registro section is not part of current Home architecture.

Do not remount it automatically.

Newsletter can exist secondarily.

## SHOP — LOCKED BASIC STRUCTURE

Ritual completo:
- El Ritual

Herramientas del ritual:
- Calendario

Sérums:
- CLARITY
- BLOOM
- RADIANCE
- RESTORE

No unnecessary filter system.

## COMMERCE ARCHITECTURE — LOCKED

Keep custom React/Vite frontend.

Current local adapter can later become Shopify Storefront integration.

Do not rebuild cart/account UI solely because Shopify will be connected later.

## CURRENT TECH DEBT — DO NOT CONFUSE WITH DESIGN

Known items:
- Lenis GSAP ticker callback cleanup may still be pending.
- Router creation architecture may have historical technical debt.
- Bundle size should be monitored.
- Production source images should not remain huge in deployment.

Do not turn technical debt cleanup into a visual redesign.
