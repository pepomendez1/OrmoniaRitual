# ORMONIA — Foundation Sprint 00

## Contexto

Este proyecto corre sobre la plataforma Enter, que usa **Vite + React Router** (no Next.js — Next.js no está soportado). Se mantiene todo lo demás pedido: TypeScript, Tailwind CSS, GSAP, ScrollTrigger y Lenis. El objetivo de este sprint es construir la **arquitectura base**, el **sistema de diseño**, los **componentes reutilizables**, el **routing** y el **scaffolding** de secciones para el futuro sitio editorial de ORMONIA — sin conectar Shopify, pagos, CMS, Instagram/YouTube ni APIs externas. Todo el copy será en **español**.

Las imágenes serán **bloques placeholder neutros y claramente rotulados** (ej. "Hero image placeholder", "Product image placeholder", "Ritual video placeholder"): fondo plano en un tono neutro del sistema (sand/beige), borde discreto, sin degradés orgánicos ni texturas decorativas. Ya existen assets reales de ORMONIA que reemplazarán estos placeholders después — el placeholder no debe influir en la dirección de arte final, solo marcar el espacio y su propósito.

El i18n scaffold existente (`i18next`) no se usará en las páginas nuevas: el copy va hardcodeado en español directamente en los componentes, ya que no se pidió soporte multi-idioma.

## Dependencias nuevas

- `gsap` (incluye `ScrollTrigger`)
- `lenis` (smooth scroll)

## Sistema de diseño

**`src/index.css`** — reemplazar los tokens shadcn genéricos (azul/gris) por la paleta cálida y térrea de ORMONIA, expresada como variables HSL:
- `--background` (ivory), `--foreground` (ink cálido casi negro)
- `--primary` (deep-brown), `--secondary` (sand), `--muted` (beige), `--accent` (terracotta)
- `--border`/`--input` (sand oscurecido), `--ring` (olive)
- Tokens de marca adicionales sin mapeo shadcn: `--color-ivory`, `--color-sand`, `--color-beige`, `--color-warm-brown`, `--color-deep-brown`, `--color-ink`, `--color-terracotta`, `--color-olive`, `--color-amber`
- `--font-display: 'Field Studies Flora', 'Fraunces', ui-serif, serif;` con comentario explicando cómo swappear cuando la fuente esté disponible (agregar `@font-face` y anteponerla en el var).
- `--font-sans: 'Inter', ui-sans-serif, sans-serif;`
- `--radius` reducido (bordes casi rectos, nunca "pill" — cumple la regla "no rounded corners grandes")
- Reglas base: `h1-h6` usan `font-display`, `body` usa `font-sans`, `:focus-visible` con anillo visible usando `--ring`, `::selection` con terracotta/ivory, `@media (prefers-reduced-motion: reduce)` que fuerza `scroll-behavior: auto` y anula transiciones largas.

**`tailwind.config.ts`** — extender `colors` con la paleta de marca (`ivory`, `sand`, `beige`, `terracotta`, `olive`, `amber`, `warmBrown`, `deepBrown`, `ink`), extender `fontFamily.display`/`fontFamily.sans` apuntando a las variables CSS, ajustar `container` (más espacioso), agregar `letterSpacing` extendido para titulares editoriales.

**`index.html`** — agregar `<link>` de Google Fonts para `Fraunces` (400/500/600, italic incluido) e `Inter` (400/500/600).

## Placeholder visual (componente compartido)

- `src/components/ui/PlaceholderBlock.tsx`: bloque neutro reutilizable (fondo `beige`/`sand`, borde `border` discreto, sin gradiente ni textura) que recibe una prop `label` (ej. `"Hero image placeholder"`, `"Product image placeholder — CLARITY"`, `"Ritual video placeholder"`) y un `aspectRatio` opcional; muestra el label centrado en `font-sans` uppercase/tracking amplio, tenue, para dejar claro que es un espacio reservado. Se reutiliza dentro de `ProductDisplay` y en cualquier sección que necesite imagen/video (hero, ritual, cycle, instagram, etc.) en vez de crear gradientes decorativos por sección.

## Fuentes / Motion setup

- `src/lib/gsap.ts`: registra `gsap` + `ScrollTrigger` una sola vez, exporta ambos.
- `src/lib/lenis.ts`: `initLenis()` crea la instancia de Lenis, la sincroniza con el ticker de GSAP, revisa `prefers-reduced-motion` (si está activo, no inicializa smooth scroll).
- `src/components/layout/SmoothScrollProvider.tsx`: monta/desmonta Lenis a nivel de app.
- `src/hooks/useScrollReveal.ts`: hook genérico que aplica un fade + translateY sutil vía GSAP/ScrollTrigger al entrar en viewport; si `prefers-reduced-motion` está activo, no anima (contenido visible de inmediato). Se usa como preparación (motion-ready refs) en todas las secciones, sin animaciones complejas todavía (orbit, line-draw, pin) — esas quedan como comentarios `// TODO` marcando dónde irán.

`App.tsx` se envuelve con `SmoothScrollProvider`.

## Routing

**`src/router.tsx`** — agregar rutas antes del catch-all `*`:
- `/` → `Home` (nuevo, reemplaza el contenido genérico de `Index.tsx`; se renombra a `src/pages/Home.tsx` vía `rename_file`)
- `/products` → `src/pages/Products.tsx`
- `/products/:slug` → `src/pages/ProductDetail.tsx`
- `/learn` → `src/pages/Learn.tsx`
- `/discover` → `src/pages/Discover.tsx`
- `/about` → `src/pages/About.tsx`

`src/pages/NotFound.tsx` se restyle mínimamente con los tokens de marca (actualmente usa azul/gris genérico) para mantener coherencia visual.

## Estructura de carpetas

```
src/
  components/
    layout/       Header.tsx, Footer.tsx, SmoothScrollProvider.tsx
    sections/     11 secciones del home
    ui/           componentes editoriales reutilizables + shadcn existentes
  data/           products.ts, content.ts
  lib/            utils.ts (existente), gsap.ts, lenis.ts
  hooks/          use-mobile.tsx, use-toast.ts (existentes), useScrollReveal.ts
  pages/          Home.tsx, Products.tsx, ProductDetail.tsx, Learn.tsx, Discover.tsx, About.tsx, NotFound.tsx
```

## Datos mock

**`src/data/products.ts`**: tipo `Product` (`slug`, `name`, `phase: CyclePhase | null`, `tagline`, `description`, `ingredients: string[]`, `comingSoon?`). Array `products` con CLARITY (Menstrual), BLOOM (Follicular), RADIANCE (Ovulatory), RESTORE (Luteal) con los ingredientes dados; export separado `auraTeaser` (AURA, mist, `comingSoon: true`, sin fase). Mapeo `phaseAccent` por fase → token de color (Menstrual→terracotta, Follicular→olive, Ovulatory→amber, Luteal→deepBrown) para usar en `PhaseMarker`.

**`src/data/content.ts`**: bloques de copy reutilizables (hero, tagline de marca, textos de cada sección) para mantenerlos editables en un solo lugar en vez de hardcodeados dispersos.

## Componentes reutilizables (`src/components/ui/`)

- `SectionWrapper.tsx` — padding vertical generoso, max-width editorial, `id` opcional, reenvía `ref`.
- `EditorialHeading.tsx` — `font-display`, variantes de tamaño (`hero`/`xl`/`lg`/`md`), `eyebrow` opcional.
- `NarrativeText.tsx` — párrafo `font-sans` con medida de lectura controlada, variantes de tamaño.
- `CTAButton.tsx` — variante editorial (línea/subrayado animado, sin pill, sin sombra) construida sobre `buttonVariants` existente (se agrega variante `"editorial"` a `button.tsx`).
- `PlaceholderBlock.tsx` — bloque neutro rotulado descrito arriba.
- `ProductDisplay.tsx` — usa `PlaceholderBlock` (ej. `"Product image placeholder — {name}"`) + nombre del producto en `font-display`.
- `ProductMeta.tsx` — combina `PhaseMarker` + tagline + conteo de ingredientes.
- `PhaseMarker.tsx` — etiqueta rectangular con punto de color de fase (sin pill).
- `IngredientList.tsx` — lista de ingredientes en `font-sans`, tracking amplio, uppercase sutil.
- `SplitConceptSection.tsx` — layout de dos columnas (visual/texto) reutilizable con `reverse` opcional; el lado visual usa `PlaceholderBlock`.
- `RitualWordBlock.tsx` — palabra/frase editorial grande con espaciado generoso.
- `QuizEntryCard.tsx` — tarjeta de invitación al quiz de ritmo.
- `LearnCard.tsx` — tarjeta de artículo/teaser para `/learn`, usa `PlaceholderBlock`.
- `NewsletterBlock.tsx` — formulario "El registro" (placeholder, `preventDefault`, sin envío real).
- `InstagramPlaceholderCard.tsx` — tile placeholder (`PlaceholderBlock` con label `"Instagram placeholder"`) para el grid de Instagram.

## Layout (`src/components/layout/`)

- `Header.tsx` — wordmark "ORMONIA" (`font-display`), nav (Inicio/Tienda/Aprender/Descubre/Nosotros) a las rutas nuevas, versión mobile simple (usa `Sheet` existente), skip-link de accesibilidad.
- `Footer.tsx` — columnas de navegación, referencia a "El registro", línea de cierre editorial.

## Secciones del Home (`src/components/sections/`), en orden

1. `HeroLandscape.tsx` — wordmark ORMONIA, "Lo que cambia adentro se expresa afuera.", `CTAButton` "Descubrir el ritual", `PlaceholderBlock` de fondo ("Hero image placeholder"), ref preparado para animación de "respiración" (comentario TODO).
2. `RhythmSection.tsx` — texto editorial sobre el ritmo cíclico, SVG de línea simple (trazo neutro) con comentario TODO para line-draw animation.
3. `CycleSection.tsx` — diagrama circular placeholder de las 4 fases (marcadores dispuestos en círculo sobre un `PlaceholderBlock` o SVG neutro), comentario TODO para animación orbit + pin.
4. `FourPhasesSection.tsx` — grid de 4 `ProductDisplay` + `ProductMeta` + `PhaseMarker`, usando `products` de mock data.
5. `InsideOutsideSection.tsx` — usa `SplitConceptSection`, concepto adentro/afuera.
6. `RitualSection.tsx` — secuencia de `RitualWordBlock`.
7. `DiscoverYourRhythmSection.tsx` — `QuizEntryCard` que enlaza a `/discover`.
8. `LearnSection.tsx` — grid de `LearnCard` (3 placeholders), enlaza a `/learn`.
9. `RegisterSection.tsx` — `NewsletterBlock` ("El registro").
10. `InstagramUniverseSection.tsx` — grid de `InstagramPlaceholderCard` con nota "Próximamente".
11. `ClosingSection.tsx` — cierre editorial, repite wordmark, ref preparado para animación tipo "ripple".

`Home.tsx` compone `Header` + las 11 secciones + `Footer`.

## Páginas secundarias

- `Products.tsx`: grid de los 4 serums (`ProductDisplay`/`ProductMeta`/`PhaseMarker`) + tarjeta "AURA — Próximamente".
- `ProductDetail.tsx`: `useParams` para `slug`, busca en `products`/`auraTeaser`, muestra `ProductDisplay`, `PhaseMarker`, `IngredientList`, `CTAButton` (deshabilitado/placeholder, sin lógica de carrito).
- `Learn.tsx`, `Discover.tsx`, `About.tsx`: shell con `Header`/`Footer`, `EditorialHeading` + `NarrativeText` de placeholder, listas para desarrollo futuro.

## Accesibilidad y responsive

- HTML semántico (`header`, `nav`, `main`, `section`, `footer`), landmarks con `aria-label` donde aplique.
- Estados de foco visibles (`focus-visible:ring`) en todos los interactivos.
- `prefers-reduced-motion` respetado en Lenis y en `useScrollReveal`.
- Mobile: flujo vertical simplificado, mismas secciones sin pin/orbit complejo (se reserva para fase de animación futura).

## Implementation checklist

- [passed] Agregar dependencias `gsap` y `lenis`.
- [passed] Reescribir `src/index.css` con la paleta térrea, `--font-display`/`--font-sans`, reglas base y `prefers-reduced-motion`.
- [passed] Extender `tailwind.config.ts` con colores de marca, `fontFamily`, `letterSpacing`.
- [passed] Agregar fuentes Google (Fraunces, Inter) en `index.html`.
- [passed] Crear `src/lib/gsap.ts` y `src/lib/lenis.ts`.
- [passed] Crear `src/hooks/useScrollReveal.ts`.
- [passed] Crear `src/components/layout/SmoothScrollProvider.tsx` y montarlo en `App.tsx`.
- [passed] Crear `src/data/products.ts` (4 serums + `auraTeaser`) y `src/data/content.ts`.
- [passed] Crear `PlaceholderBlock.tsx` (bloque neutro rotulado, sin gradientes/decoración) y usarlo en todo el sitio donde se necesite imagen/video.
- [passed] Crear los demás componentes reutilizables en `src/components/ui/` listados arriba.
- [passed] Agregar variante `"editorial"` a `src/components/ui/button.tsx`.
- [passed] Crear `Header.tsx` y `Footer.tsx` en `src/components/layout/`.
- [passed] Crear las 11 secciones en `src/components/sections/`.
- [passed] Renombrar `src/pages/Index.tsx` → `src/pages/Home.tsx` componiendo Header + 11 secciones + Footer.
- [passed] Crear `Products.tsx`, `ProductDetail.tsx`, `Learn.tsx`, `Discover.tsx`, `About.tsx` en `src/pages/`.
- [passed] Actualizar `src/router.tsx` con las nuevas rutas.
- [passed] Restyle mínimo de `src/pages/NotFound.tsx` con tokens de marca.
- [passed] Verificar que ningún componente use `text-white`/`bg-white`/colores directos, ni gradientes decorativos — solo tokens del design system y `PlaceholderBlock` neutro.

## Verification checklist

- [passed] `pnpm lint` / build del framework pasa sin errores.
- [passed] `/` muestra las 11 secciones en orden con el copy en español, la paleta térrea y placeholders neutros rotulados (sin degradés decorativos).
- [passed] `/products`, `/products/clarity`, `/learn`, `/discover`, `/about` renderizan sin errores (slug inválido en `/products/:slug` no rompe la página).
- [manual-required] Navegación del `Header` funciona entre todas las rutas; foco visible con teclado (Tab).
- [passed] Contraste texto/fondo cumple AA sobre la paleta ivory/deep-brown/terracotta.
- [passed] Revisar consola del navegador (`get_console_logs`) sin errores tras cargar cada ruta.
- [manual-required] Captura de pantalla desktop y mobile (`website_screenshot`) de `/` confirma jerarquía editorial, layout responsive y placeholders correctamente rotulados.
- [manual-required] Con `prefers-reduced-motion: reduce` simulado, el contenido es visible sin depender de animaciones.
