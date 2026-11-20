# ORMONIA

Custom skincare ecommerce/editorial website.

## Stack

Vite + React + TypeScript + Tailwind + GSAP + ScrollTrigger + Lenis + React Router.

## Validation

```bash
tsc -p tsconfig.app.json
pnpm lint
pnpm build:prod
```

Do not rely on `pnpm check` as the only typecheck if the root tsconfig still contains `"files": []`.

## Working rules

Before broad edits:

```bash
git status
```

Never:
- force reset;
- discard unrelated user changes;
- rewrite unrelated files during a targeted task;
- globally refactor because one section feels weak.

When a major approved state is reached, recommend a checkpoint/commit.

## Design work

For any UI/UX/visual task, use:

1. current explicit user instruction;
2. current approved repository state;
3. `references/locked-decisions.md`;
4. `ormonia-design-director`;
5. `ui-ux-pro-max`;
6. `frontend-design`;
7. user-provided references such as 21st.dev;
8. generic conventions.

`ui-ux-pro-max` should be used actively for UX and interface quality.

`frontend-design` should challenge generic/AI-looking output.

Neither may override ORMONIA identity or locked decisions.

Before broad visual work, read:

`.claude/skills/ormonia-design-director/references/locked-decisions.md`

Load other reference files only when relevant.

## Brand

Core idea:

**Lo que cambia adentro se expresa afuera.**

Voice:
editorial, organic, calm, sophisticated, intimate, premium, sensory, informed.

Avoid:
- pseudo-scientific claims;
- hormone-balancing claims;
- detox / miracle language;
- mystical femininity clichés;
- unsupported medical claims.

## Product philosophy

Phase is secondary context, not a usage restriction.

Never imply a serum can only be used during one menstrual phase.

## Canonical products

### CLARITY
Reference: menstrual.  
Ingredients: Jojoba, Caléndula, Rosa Mosqueta, Vitamina E.

### BLOOM
Reference: follicular.  
Ingredients: Niacinamida, Glicerina, Sodium Hyaluronate, Acetyl Hexapeptide-8.

### RADIANCE
Reference: ovulatory.  
Ingredients: Magnesium Ascorbyl Phosphate, Glicerina, Panthenol.

### RESTORE
Reference: luteal.  
Ingredients: Glicerina, Centella Asiática, Pentapeptide-18.

## El Ritual

Customer-facing name:

**El Ritual**

Never show customer-facing:
- Pack x4;
- bundle;
- combo.

Internal historical identifiers may remain if technically useful.

Descriptor:

**Las 4 fases, un solo ritual.**

Price:

ARS 160.000.

It is the flagship system, not primarily a savings proposition.

## Calendario cíclico

Price:

ARS 25.000.

It is an observation/recording tool, not a diagnostic or prediction device.

## Shipping

Free shipping threshold:

ARS 145.000.

## Wordmark

The ORMONIA wordmark is an official brand asset.

Never recreate it with ALT Systema, Cardone, Yorick or CSS tracking.

## Typography

- ALT Systema: functional base, UI, body, ecommerce.
- Cardone Light Italic: selective editorial accent / serum names.
- Yorick: sparing technical/editorial accent.
- An existing display serif may remain where it works better.

Do not force all fonts onto every screen.

## Home order

Do not reorder without explicit approval:

1. Hero
2. El Ritual
3. Los esenciales
4. Calendario
5. El Ciclo
6. Test de perfil de piel
7. Lecturas
8. El universo ORMONIA / Instagram
9. Closing + Footer

## Hero

Mostly locked.

Keep:
- current campaign world;
- “Lo que cambia adentro se expresa afuera.”;
- clear CTA;
- transparent smart header.

Do not repeatedly redesign it.

## Header

Keep:
- transparent at top;
- hides on downward scroll after Hero;
- returns on upward scroll;
- declarative tone switching;
- shipping bar only at top.

Do not use pixel sampling for tone.

## El Ciclo

Keep:
- continuous scroll;
- no snap;
- synchronized clickable phase indicator;
- approved material/ingredient-inspired backgrounds.

Do not regress the previous GSAP cleanup fix.

Never use:

```js
ScrollTrigger.killAll()
```

## Test de perfil de piel

Preferred visible naming:

**TEST DE PERFIL DE PIEL**

Headline:

**Conocé cómo responde tu piel.**

CTA:

**HACER EL TEST**

Route may remain `/descubri-tu-piel`.

Do not invent final phenotypes, scoring or medical logic.

## Commerce

Keep the custom React/Vite frontend.

Shopify should later replace commerce/auth adapters without forcing a visual rebuild.

Do not fake checkout before Shopify is connected.

Keep product/pricing data centralized.

## Photography

Real campaign photography is a primary identity asset.

Prefer it over generic placeholders or AI beauty imagery.

Do not cover strong photography with unnecessary gradients, glass panels or decorative UI.

Use intentional crops and per-image object positioning.

## Accessibility / performance

Preserve semantic controls, keyboard navigation, focus, labels, reduced motion and useful alt text.

Do not preload the whole campaign.

Use optimized derivatives for production.

## Final rule

Do not add personality to ORMONIA.

ORMONIA already has personality.

Remove what gets in its way.
