# Capa de comercio — `src/commerce/`

```
UI (CartDrawer, /cart, BuyBox, QuickAddButton, Header)
        ↓  useCart()            (hooks/useCart.ts)
CartProvider                    (commerce/CartProvider.tsx — estado, carga, errores)
        ↓  commerce             (commerce/index.ts — elige el adapter)
CommerceAdapter                 (commerce/types.ts — contrato)
        ↓
localAdapter  ← HOY             (localStorage, DEMO frontend, sin checkout)
shopifyAdapter ← DESPUÉS        (Storefront Cart API; a crear, no existe todavía)
```

Ninguna vista llama a un backend. Cambiar de local a Shopify es implementar
`CommerceAdapter` y devolverlo en `commerce/index.ts`.

## Qué hace hoy el adapter local
- Guarda `{ id, productId, merchandiseId, quantity }` en `localStorage` (`ormonia:cart:v1`).
- Resuelve precio desde `data/products.ts` en cada lectura.
- Productos con `price: null` no se pueden agregar (`isPurchasable`). El estado "Subtotal parcial" queda como resguardo si un precio desapareciera del catálogo con líneas ya guardadas.
- `checkoutUrl` es siempre `null`: FINALIZAR COMPRA queda deshabilitado con su motivo. No se simula ninguna compra.
- Sincroniza pestañas con el evento `storage`.

## Para conectar Shopify (cuando haya credenciales)
1. Variables: `VITE_SHOPIFY_STORE_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_TOKEN` (token **público** de Storefront; ya tipadas en `env.d.ts`).
2. Cargar en `data/products.ts` el `shopifyProductId` y `shopifyVariantId` de cada producto (hoy una única variante inicial por producto; no se inventaron variantes). `merchandiseIdOf()` ya usa la variante de Shopify si existe.
3. Crear `commerce/shopifyAdapter.ts` implementando `CommerceAdapter` con la **Storefront Cart API**:
   - `getCart` → `cart(id)` con el id guardado en `localStorage` (si no hay, carrito vacío).
   - `addLines` → `cartCreate` (primera vez) o `cartLinesAdd`.
   - `updateLine` → `cartLinesUpdate`; `removeLine` → `cartLinesRemove`.
   - Mapear `cost.subtotalAmount`, `totalQuantity`, `lines[].cost` y `checkoutUrl` a `Cart`.
4. Devolverlo en `commerce/index.ts`. `checkoutEnabled` pasa a `true` solo y el CTA usa `cart.checkoutUrl` (checkout de Shopify).
5. Precio / disponibilidad / inventario: leerlos de Shopify (`Product.priceRange`, `availableForSale`, `quantityAvailable`) y volcarlos al modelo `Product`. `PriceTag` y `BuyBox` ya contemplan `available`, `compareAtPrice` e `inventory`.
6. Búsqueda: reemplazar el cuerpo de `lib/search.ts → searchSite()` por la Predictive Search API (la vista ya maneja `loading`).
7. Cuenta: `commerce/account.ts` documenta el reemplazo por Shopify Customer Accounts (passwordless). Borrar `data/accountDemo.ts`.

## Lo que NO existe a propósito
- Ninguna llamada de red ni credencial inventada.
- Ningún mensaje de "compra realizada".
- Ahorro de El Ritual (id interno `pack-x4`): no se comunica por decisión de marca (es el ritual completo, no un descuento).
