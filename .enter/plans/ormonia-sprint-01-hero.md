# ORMONIA — Sprint 01: Hero / El Paisaje

## Contexto

Foundation Sprint 00 dejó `HeroLandscape` como un placeholder centrado y genérico. Este sprint reemplaza **solo** ese componente (y su transición hacia `RhythmSection`) por una entrada cinematográfica: imagen de paisaje a pantalla completa, composición editorial asimétrica, entrada sutil por scroll-load, y una transición de scroll que "profundiza" en el paisaje en vez de cortar seco hacia la siguiente sección. No se toca el sistema de diseño, tipografía, tokens, rutas, ni el resto de las secciones del home.

Decisiones confirmadas contigo:
1. **Cursor personalizado**: no existía en Sprint 00 pese a que el brief lo asume. Se construye ahora, minimal, solo desktop (un punto que sigue el mouse con leve retraso y se expande al pasar sobre el CTA del hero).
2. **CTA del hero**: deja de navegar a `/discover`. Ahora hace scroll suave dentro de la misma página hasta `RhythmSection` (`#ritmo`). No se toca `CTAButton` (usado en otras secciones/páginas); se crea un componente nuevo y aislado solo para este caso.
3. **Imagen**: se usa ya la imagen adjunta (pradera con caballo) como asset real del hero, no como `PlaceholderBlock`. La URL vive en un único lugar (`src/data/content.ts`) para que cambiarla después sea una sola línea.

## Archivos

**Nuevos:**
- `src/components/ui/ScrollCTAButton.tsx` — CTA de scroll interno (ancla `href="#id"`), mismo lenguaje visual que `CTAButton` (línea + subrayado animado, variante `editorial` de `Button`), con prop `tone` (`"light" | "dark"`) para funcionar sobre fondos oscuros/imagen. `onClick` hace `preventDefault` y llama a `getLenis()?.scrollTo(target, {...})`; si Lenis no está activo (reduced motion / aún no montado), usa `element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })`. Accesible por teclado por ser un `<a>` real.
- `src/components/layout/CustomCursor.tsx` — punto fijo que sigue al mouse (GSAP `quickTo`, leve lag), oculta el cursor nativo solo cuando `(pointer: fine) and (hover: hover)` (se retorna `null` en touch, dejando el cursor nativo intacto). Se expande (`scale`) cuando el puntero pasa sobre cualquier elemento con `data-cursor-expand`. Desactivado por completo si `prefers-reduced-motion: reduce` (no se monta). Colores desde tokens (`bg-foreground`/`mix-blend` nada de novelty, sin texto dentro del cursor).

**Editados:**
- `src/lib/lenis.ts` — guardar la instancia en una variable de módulo y exportar `getLenis()` para que `ScrollCTAButton` pueda pedir el scroll sin acoplarse a `SmoothScrollProvider`.
- `src/data/content.ts` — `heroCopy` se recorta a `{ line1, line2, cta }` (se quitan `eyebrow`/`body`, que ya no se usan en el nuevo hero); se agrega `heroMedia = { src, alt }` con la URL pública de la imagen adjunta.
- `src/components/sections/HeroLandscape.tsx` — reescritura completa del interior (ver diseño abajo). Se mantiene el nombre/export del componente, por lo que `Home.tsx` no cambia.
- `src/App.tsx` — se monta `<CustomCursor />` una vez, junto a `SmoothScrollProvider` (una línea, no se reestructura nada más).

**Sin cambios (confirmado):** `Header.tsx` (ya es transparente/minimal, no se toca), `RhythmSection.tsx` y el resto de secciones/páginas/rutas, `index.css`, `tailwind.config.ts`, `CTAButton.tsx`, `button.tsx`.

## Diseño de `HeroLandscape`

Estructura (`h: 100svh`, `min-h-screen` de respaldo):

```
<section aria-label="Portada — El paisaje" className="relative h-[100svh] min-h-screen w-full overflow-hidden">
  <div ref={mediaWrapRef} className="absolute inset-0">      {/* respiración ambiental (scale 1 → 1.04) */}
    <img ref={imgRef} src={heroMedia.src} alt={heroMedia.alt}
         className="h-full w-full object-cover object-[65%_45%] md:object-[68%_38%]" />
  </div>

  {/* overlays de legibilidad, siempre sutiles, aria-hidden */}
  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/30 to-transparent" />
  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
  <div ref={scrollOverlayRef} aria-hidden className="pointer-events-none absolute inset-0 bg-ink opacity-0" /> {/* oscurece con el scroll */}

  <div ref={textRef} className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-24 md:w-[56%] md:justify-center md:px-10 md:pb-0 lg:pl-16">
    <span ref={wordmarkRef} className="mb-4 font-display text-lg tracking-[-0.01em] text-ivory md:text-xl">ORMONIA</span>
    <h1 ref={statementRef} className="font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.12] text-ivory">
      Lo que cambia adentro<br />se expresa afuera.
    </h1>
    <div ref={ctaRef} className="mt-9">
      <ScrollCTAButton href="#ritmo" tone="light" data-cursor-expand>Descubrir el ritual</ScrollCTAButton>
    </div>
  </div>

  {/* Punto de origen para Sprint 02 (línea orgánica). No se anima todavía. */}
  <div aria-hidden data-transition-origin className="pointer-events-none absolute inset-x-0 bottom-0 h-px" />
</section>
```

Notas de layout:
- Composición asimétrica: bloque de texto ocupa ~56% del ancho en desktop, anclado a la izquierda, dejando el lado derecho despejado (donde se asume el caballo). En mobile ocupa el ancho completo pero el texto se ancla abajo (`justify-end`, `pb-24`) para dejar la parte central/alta de la imagen (el caballo) visible.
- `h1` (la declaración) es el encabezado semántico principal de la página; "ORMONIA" en el hero es una marca restringida (`span`, no heading, ya que el nombre de marca vive semánticamente en el logo del `Header`).
- Sin eyebrow, sin párrafo descriptivo: solo wordmark, declaración, CTA — restraint total.
- `object-position` con valores distintos en `md:` para preparar el recorte responsive; se documentará con un comentario que estos valores son ajustables cuando se defina el encuadre final.

## Motion (GSAP + ScrollTrigger), todo dentro de un único `useEffect` con `gsap.context`

1. **Entrada al cargar** (no ligada a scroll): timeline simple, stagger corto:
   - wordmark: `opacity 0→1, y 12→0`
   - declaración: mismo patrón, delay leve después del wordmark
   - CTA: mismo patrón, último
   - Rango de movimiento 8–20px, `ease: power2.out`, sin rebote.
2. **Respiración ambiental** (independiente del scroll): `gsap.to(mediaWrapRef, { scale: 1.04, duration: 18, ease: "sine.inOut" })` una sola vez al montar — casi imperceptible.
3. **Transición de scroll hacia RhythmSection**: un timeline con `scrollTrigger: { trigger: sectionRef, start: "top top", end: "bottom top", scrub: 0.3 }`, todo arrancando en la misma posición (simultáneo):
   - `img`: `scale +≈0.08`, `filter: blur(0→10px)`
   - `scrollOverlayRef`: `opacity 0 → 0.6`
   - `textRef`: `opacity 1→0`, `y 0→-16`
   - Al terminar el rango (hero saliendo del viewport), el paisaje queda suficientemente abstraído para que `RhythmSection` continúe sin corte duro.
4. **`prefers-reduced-motion: reduce`**: se detecta una vez; si está activo, se hace `gsap.set` a los valores finales de entrada (todo visible, sin animar), no se crea la respiración ambiental, no se crea el scroll-scrub (contenido permanece estático y legible), y `CustomCursor` no se monta.
5. Cleanup: `ctx.revert()` + `ScrollTrigger` propio se limpia solo (pertenece al contexto).

## `ScrollCTAButton`

- Reutiliza `Button` (`variant="editorial"`, `asChild`) igual que `CTAButton`, pero envuelve un `<a href={href}>` en vez de `<Link>`.
- Prop `tone`: `"dark"` (default, `text-foreground` + línea `bg-border`/`bg-foreground`, igual a `CTAButton`) | `"light"` (`text-ivory` + línea `bg-ivory/40`/`bg-ivory`) para uso sobre la imagen del hero.
- `onClick`: `e.preventDefault()`, resuelve `document.querySelector(href)`, hace scroll con `getLenis()?.scrollTo(el, { offset: 0, duration: 1.2 })` o fallback `el.scrollIntoView({ behavior })`.

## `CustomCursor`

- Montado una vez en `App.tsx` (global, pero en este sprint solo el CTA del hero lleva `data-cursor-expand`; no se instrumenta ningún otro elemento para no tocar otras secciones).
- `useEffect`: si `!matchMedia("(pointer: fine) and (hover: hover)").matches` o `prefers-reduced-motion: reduce` → no monta nada (`return null` antes de cualquier listener).
- Dos elementos fijos (`div` pequeño, `border` + `bg-foreground` mezclados con opacidad baja), posición vía `gsap.quickTo("x")`/`quickTo("y")` en `mousemove`; `mouseover`/`mouseout` delegado sobre `[data-cursor-expand]` vía `closest()` para togglear una clase/`scale`.
- `document.documentElement` recibe `cursor-none` (clase utilitaria) solo mientras el componente está activo, para ocultar el cursor nativo; se remueve en cleanup.

## Accesibilidad

- `h1` textual real (no imagen de texto).
- `alt` descriptivo de la imagen (pradera abierta, caballo, tonos verdes/tierra).
- Overlays y el punto de origen para Sprint 02 llevan `aria-hidden="true"`.
- CTA es un `<a>` real, accesible por teclado, con foco visible (hereda `:focus-visible` global).
- Contraste: overlays permanentes (top/bottom gradient) garantizan AA para `text-ivory` sobre la imagen independientemente del encuadre final.
- Cursor custom no reemplaza el foco de teclado ni el cursor nativo en touch/reduced motion.

## Implementation checklist
- [passed] `src/lib/lenis.ts`: exportar `getLenis()` respaldado por una instancia de módulo seteada en `initLenis()`.
- [passed] `src/data/content.ts`: recortar `heroCopy` a `{ line1, line2, cta }` y agregar `heroMedia { src, alt }` con la URL pública de la imagen adjunta.
- [passed] Crear `src/components/ui/ScrollCTAButton.tsx` con prop `tone` y scroll-to-anchor vía Lenis/fallback.
- [passed] Crear `src/components/layout/CustomCursor.tsx`, desactivado en touch y en `prefers-reduced-motion`.
- [passed] Montar `<CustomCursor />` en `src/App.tsx`.
- [passed] Reescribir `src/components/sections/HeroLandscape.tsx`: imagen real full-bleed, overlays de legibilidad, layout asimétrico desktop / anclado-abajo mobile, wordmark restringido, `h1` = declaración, CTA con `data-cursor-expand`, punto `data-transition-origin` para Sprint 02.
- [passed] Timeline de entrada (stagger, 8–20px, sin rebote) + respiración ambiental (scale 1→1.04, ~18s) + scroll-scrub de transición (scale/blur/darken/fade texto) atados a `ScrollTrigger` sobre la propia altura del hero.
- [passed] Manejo de `prefers-reduced-motion`: estado final estático, sin respiración, sin scroll-scrub, sin cursor custom.
- [passed] No tocar `Header.tsx`, `RhythmSection.tsx`, `CTAButton.tsx`, `button.tsx`, rutas, tokens ni el resto de secciones del home.

## Verification checklist
- [passed] `pnpm lint` sin errores.
- [passed] `/` carga con la imagen real de pradera+caballo a pantalla completa (100svh), sin `PlaceholderBlock` en el hero. Asset persistido en `public/pradera-y-caballo.png` (1,172,856 bytes, idéntico al adjunto); el servidor responde `Content-Type: image/png` (ya no HTML) en `/pradera-y-caballo.png`.
- [manual-required] Composición desktop: texto asimétrico a la izquierda (~56% ancho), espacio negativo a la derecha; mobile: texto anclado abajo, imagen visible arriba.
- [manual-required] Entrada: wordmark → declaración → CTA aparecen en secuencia suave (sin rebote, sin desplazamientos largos) al cargar.
- [manual-required] CTA "Descubrir el ritual": click hace scroll suave hasta `RhythmSection` (no navega de ruta, no va a `/discover` ni `/products`); funciona con teclado (`Tab` + `Enter`).
- [manual-required] Al hacer scroll dentro del hero, la imagen se oscurece/desenfoca/escala gradualmente y el texto se desvanece antes de llegar a `RhythmSection`, sin corte visual duro.
- [manual-required] Cursor personalizado visible solo en desktop con mouse; se expande sobre el CTA; ausente/no interferente en simulación de touch.
- [manual-required] Con `prefers-reduced-motion: reduce` simulado: contenido visible de inmediato, sin respiración ni scroll-scrub, sin cursor custom, sin pérdida de legibilidad.
- [passed] `Header`, `RhythmSection` y el resto del home no cambiaron visualmente ni en código (diff acotado a los archivos listados).
- [passed] Revisar consola (`get_console_logs`) sin errores tras cargar `/` y hacer scroll.
- [manual-required] Captura de pantalla desktop y mobile de `/` (hero) confirma atmósfera cinematográfica, contraste de texto y ausencia de elementos de ecommerce (sin precios, badges, "shop now").
