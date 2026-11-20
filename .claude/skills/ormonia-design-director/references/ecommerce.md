# ORMONIA · Ecommerce UX

## Architecture

Frontend:
React/Vite custom.

Future commerce backend:
Shopify.

Current local commerce adapter may remain during development.

Do not turn the site into a Shopify theme visually.

## Cart

Current frontend cart should support:
- add;
- remove;
- quantity;
- subtotal;
- mini-cart/drawer;
- `/cart`;
- cart count.

Future Shopify integration should replace the adapter, not the views.

## Checkout

Do not fake a checkout before Shopify is connected.

## Product pricing

Known:

El Ritual:
ARS 160.000

Calendario cíclico:
ARS 25.000

Free shipping:
ARS 145.000

Do not invent other final prices unless present in canonical product data.

## El Ritual PDP

Target narrative:

1. Buy box
2. El cuidado como ritual
3. Qué incluye / four formulas as a system
4. Cómo vivir el ritual
5. Test de perfil de piel
6. Calendario complement
7. Details / FAQ / shipping

Do NOT show the four serums as separate clickable ecommerce cards inside El Ritual.

The four formula names may appear editorially:
- CLARITY
- BLOOM
- RADIANCE
- RESTORE

No:
- individual prices;
- quick add for each;
- “ver serum” links.

## Calendar complement

The Calendar is the primary complementary product to El Ritual.

Use language:
**Completá el ritual**
**Sumá tu Calendario cíclico**

Not:
“También podría gustarte”.

## Serum PDPs

Commercial clarity first:
- image;
- name;
- price;
- availability;
- quantity;
- add to cart;
- actives;
- details.

Phase remains secondary context.

Each serum PDP may include a subtle link to Test de perfil de piel.

## Shop

Current conceptual groups:

### Ritual completo
- El Ritual

### Herramientas del ritual
- Calendario cíclico

### Sérums
- CLARITY
- BLOOM
- RADIANCE
- RESTORE

Future:
- AURA and additional products.

Do not create unnecessary filters for a small catalogue.
