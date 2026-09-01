# ORMONIA — Sprint 02: El Ritmo

## Contexto

Sprint 00/01 dejaron `RhythmSection` como un bloque editorial estático de dos columnas con un SVG placeholder decorativo. Este sprint la reemplaza **por completo** (única sección tocada, junto a su entrada de copy en `content.ts`) por una experiencia de scroll inmersiva: el spiral orgánico adjunto se dibuja progresivamente mientras tres declaraciones narrativas se suceden, con continuidad visual desde el final oscurecido de `HeroLandscape` hacia el ivory de la marca, y dejando preparado un punto de anclaje para que `CycleSection` retome el spiral como órbita en Sprint 03. No se toca `HeroLandscape`, `Header`, `CycleSection`, tokens, rutas, ni el resto de secciones.

## Asset del spiral: cómo se persiste y se referencia

- Se persiste el SVG adjunto **byte-idéntico** en `src/assets/ormonia-spiral.svg` (mismo `viewBox="0 0 676 438"`, mismo `d`, mismo `stroke-linecap`/`stroke-linejoin`, incluyendo el `<rect fill="#1E1E1E">` y `stroke="white"` originales — nada se edita en el archivo).
- Se importa ese archivo tal cual con `import spiralMarkup from "@/assets/ormonia-spiral.svg?raw"` (sufijo `?raw` de Vite, ya soportado por los tipos de `vite/client` referenciados en `env.d.ts` — sin fetch, sin estado de carga, sin duplicar el path en TSX). Esto es "referenciarlo directamente": el código importa el archivo real, no reescribe su geometría a mano.
- Se inyecta con `dangerouslySetInnerHTML` dentro de un `<div>` contenedor (`aria-hidden="true"`, `data-cycle-orbit-origin`) y se consulta el `<path>` inyectado vía `querySelector` para animar `stroke-dasharray`/`stroke-dashoffset` con GSAP. La forma (el `d`) nunca se toca ni se reescribe: sigue siendo exactamente el path del adjunto.
- Estilo visual del trazo (requerido explícitamente por el brief — "very thin stroke... brand token olive/warm-brown", ya el propio placeholder de Sprint 00 usaba `hsl(var(--color-olive))`): se sobreescriben solo *propiedades de presentación* vía un `<style>` acotado (mismo patrón ya usado en `CustomCursor.tsx`), no la geometría:
  ```css
  .ormonia-spiral rect { display: none; }
  .ormonia-spiral svg { display: block; width: 100%; height: auto; }
  .ormonia-spiral path {
    fill: none;
    stroke: hsl(var(--color-olive));
    stroke-width: 1.25px;
    vector-effect: non-scaling-stroke; /* trazo fino consistente sin importar el tamaño de render */
  }
  ```

## Datos (`src/data/content.ts`)

`rhythmCopy` se usa solo en `RhythmSection.tsx` (verificado por grep). Se reemplaza su forma:

```ts
export const rhythmCopy = {
  eyebrow: "El ritmo",
  statements: [
    "Tu piel no es igual todos los días.",
    "Tu cuerpo tampoco.",
    "Entonces, ¿por qué tu skincare debería serlo?",
  ],
};
```

(se quitan `title`/`body`/`footnote`, ya no aplican al nuevo formato de 3 declaraciones).

## Layout: "flow" vs "pinned", resuelto en CSS pura (sin estado de React)

Dos disposiciones posibles, elegidas con un único combo de media query (sin JS, sin flash, sin duplicar DOM):

- **Por defecto ("flow")**: párrafos en flujo normal apilado, spiral en flujo normal encima — válido para mobile y para `prefers-reduced-motion: reduce` en cualquier ancho.
- **`@media (min-width: 768px) and (prefers-reduced-motion: no-preference)` ("pinned")**: párrafos y spiral pasan a `position: absolute; inset: 0` centrados (crossfade apilado) dentro de un host `position: relative` de altura fija.

Esto se logra con clases utilitarias `md:motion-safe:absolute md:motion-safe:inset-0 ...` de Tailwind (los variantes `motion-safe:`/`motion-reduce:` ya combinan `prefers-reduced-motion` con el resto de variantes — se confirma disponible en Tailwind 3.4). Así, el JS de GSAP solo decide **comportamiento** (qué anima), nunca la disposición visual de fallback.

## Motion (GSAP + ScrollTrigger), un solo `useEffect(() => {...}, [])`

1. Query del `<path>` inyectado; `length = path.getTotalLength()`.
2. `ScrollTrigger.matchMedia` con tres ramas mutuamente excluyentes (limpieza automática si cambia el viewport):
   - **`(prefers-reduced-motion: reduce)`** → estático: `gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 })` (trazo completo, visible), los 3 párrafos ya visibles por CSS (`flow`, sin pin, sin scrub). No se crea ningún ScrollTrigger.
   - **`(min-width: 768px) and (prefers-reduced-motion: no-preference)`** → timeline pineado:
     - `ScrollTrigger`: `trigger: sectionRef`, `start: "top top"`, `end: () => "+=" + window.innerHeight * 2.8` (~280vh, dentro del rango 250–320vh pedido), `pin: true`, `anticipatePin: 1`, `scrub: 0.8` (para el "smooth, slightly delayed" pedido).
     - `bgOverlay` (capa `bg-ink` a pantalla completa, continuidad con el final oscurecido del Hero): `opacity 1 → 0` en el primer ~15% del progreso.
     - `path`: `strokeDashoffset: length → 0` a lo largo de ~0 → 0.85 del progreso (así el spiral no se "lee" completo hasta el último tercio, tal como pide el brief).
     - `spiralWrap`: pequeño `scale` (≈1 → 0.92) entre 0.85 → 1 del progreso — el "prepare a transition state" hacia la geometría de órbita, sin construir el orbit real.
     - Texto: crossfade con opacity + `y` (8–14px) sin rebote: línea 1 visible desde el inicio → sale ~0.22–0.30; línea 2 entra ~0.26–0.34, sale ~0.58–0.66; línea 3 entra ~0.62–0.70 y permanece. Sin bounce, sin scale dramático, sin typewriter.
   - **`(max-width: 767.98px) and (prefers-reduced-motion: no-preference)`** → sin pin: cada párrafo con su propio `ScrollTrigger` (`start: "top 80%"`, patrón igual a `useScrollReveal`, fade + 12px) y el `path` con un único `scrollTrigger` con `scrub` ligero sobre el rango natural de la sección (`start: "top 85%"`, `end: "bottom 40%"`) para "preservar la animación de línea donde el rendimiento lo permita" sin pin.
3. Cleanup: `ScrollTrigger.matchMedia` se revierte solo al desmontar / cambiar de rama (patrón oficial de GSAP), envuelto en `gsap.context` para revertir todo junto.

## Punto de anclaje para Sprint 03

`data-cycle-orbit-origin` en el `<div>` que envuelve el spiral inyectado (mismo patrón que `data-transition-origin` del Hero): marca dónde Sprint 03 debe retomar el spiral para construir la órbita de las 4 fases. No se anima el orbit en este sprint; solo el `scale` de acercamiento final descrito arriba.

## Continuidad con `HeroLandscape`

No se modifica `HeroLandscape.tsx`. La continuidad se logra íntegramente dentro de `RhythmSection`: la capa `bgOverlay` (`bg-ink`, opacity inicial 1) cubre toda la sección al entrar y se desvanece hacia el ivory de fondo en el primer tramo del scroll (pinned) o del viewport (mobile) — visualmente continúa el oscurecimiento con el que termina el Hero, sin corte duro. Bajo `prefers-reduced-motion`, no se necesita: el overlay simplemente no se renderiza visible (se omite del árbol animado; el fondo es ivory desde el inicio, ya que no hay contenido crítico dependiendo de este efecto).

## Accesibilidad y rendimiento

- Los 3 `<p>` son HTML real, siempre en el DOM y legibles (nunca dependen solo de animación para ser accesibles).
- El contenedor del spiral es `aria-hidden="true"` (decorativo).
- Solo se anima `opacity`, `transform` (`y`, `scale`) y `stroke-dashoffset` — sin filtros continuos, sin canvas/WebGL/Three.js.
- `prefers-reduced-motion` deshabilita pin/scrub por completo (rama dedicada arriba).

## Archivos

- **Nuevo:** `src/assets/ormonia-spiral.svg` (asset exacto persistido).
- **Editado:** `src/data/content.ts` (`rhythmCopy` → `{ eyebrow, statements }`).
- **Reescrito:** `src/components/sections/RhythmSection.tsx` (estructura, CSS `motion-safe`/`md:`, `ScrollTrigger.matchMedia`, `data-cycle-orbit-origin`).
- **Sin cambios:** `HeroLandscape.tsx`, `Header.tsx`, `CycleSection.tsx`, `Home.tsx` (mismo orden de secciones), tokens, rutas, `useScrollReveal.ts`, `CustomCursor.tsx`.

## Implementation checklist
- [passed] Persistir `src/assets/ormonia-spiral.svg` byte-idéntico al adjunto (mismo `d`, viewBox, rect, stroke original). Corregido: el sustituto generado se reemplazó por el SVG real (5346 bytes, coincide con los 5.22 KB reportados; verificado `viewBox="0 0 676 438"`, `<rect fill="#1E1E1E"/>`, `stroke="white" stroke-width="2"` y el `d` completo, todo verbatim).
- [passed] Importar con `?raw` e inyectar vía `dangerouslySetInnerHTML` dentro de un contenedor `aria-hidden` + `data-cycle-orbit-origin`.
- [passed] `<style>` acotado (patrón `CustomCursor`) que oculta el `rect`, fuerza `fill:none`, `stroke: hsl(var(--color-olive))`, `stroke-width:1.5px`, `vector-effect:non-scaling-stroke`, sin tocar el archivo fuente. Corregido: se quitó un `max-width:48rem` que limitaba el SVG inyectado independientemente del tamaño del wrapper (causa raíz del "icono pequeño").
- [passed] Actualizar `rhythmCopy` en `content.ts` a `{ eyebrow, statements: [...] }`.
- [passed] Layout `flow` por defecto (mobile + reduced-motion) vs `pinned` (`md:` + `motion-safe:`) resuelto en clases Tailwind, sin estado de React.
- [passed] `gsap.matchMedia` con las 3 ramas (reduced-motion estático / desktop pineado ~300vh / mobile no-pineado) dentro de un único `gsap.context`.
- [passed] Desktop: recipe de pin robusto (`trigger` alto vía `h-[300vh]` + `pin` sobre hijo `sticky`/`h-screen`, `start:"top top"`, `end:"bottom bottom"` — reemplaza el `end` calculado a mano usado antes), overlay `bg-ink` 1→0 completo ANTES de que entre el texto (evita texto oscuro sobre fondo oscuro), `path` `strokeDashoffset` completo→0 (0→0.92), `scale` spiral (0.88→1), crossfade de las 3 líneas con fases claramente separadas, sin rebote.
- [passed] Composición asimétrica: spiral ~62vw anclado a la derecha (puede sangrar fuera del viewport, recortado por `overflow-hidden` del stage), texto ~46vw anclado a la izquierda, eyebrow en la esquina (ya no "dentro" del spiral).
- [passed] Mobile: reveals individuales por párrafo (fade+12px) + scrub ligero del trazo sobre el rango natural de la sección, sin pin; spiral grande en flujo (`max-w-2xl`, ya no acotado a `max-w-3xl` combinado con el cap interno de 48rem).
- [passed] `prefers-reduced-motion`: trazo completo estático, sin overlay animado, sin pin, sin scrub, texto ya visible por flujo normal.
- [passed] Diagnóstico dev-only (`import.meta.env.DEV`): longitud del path, rama de matchMedia activa, y progreso/dashoffset cada 10% — para verificar en runtime real, no solo por inspección de código.
- [passed] No tocar `HeroLandscape.tsx`, `Header.tsx`, `CycleSection.tsx`, tokens ni rutas.

## Pase de refinamiento visual (post-lanzamiento)

Ajustes de composición/art-direction únicamente — sin tocar la arquitectura de pin/matchMedia, la geometría del SVG, ni otras secciones:

- **Escala del spiral**: 62vw → 52vw (dentro de 48–56vw pedido). "Gesto espacial", no gráfico de fondo dominante.
- **Posición**: anclado a `right-0` + `translate-x-[8%]` (bleed controlado vía transform, ya no un `right:-8%` que lucía como recorte accidental) y `top-[58%]` (por debajo del centro vertical, nunca centrado).
- **Coreografía texto/spiral**: cada declaración reposa en su propia posición (`restY = [-18, 0, 18]`, `restX = [0, 0, 6]`) además del crossfade de opacidad — frase 1 arriba-izquierda, frase 2 centro, frase 3 más abajo/hacia el spiral, reforzando la relación diagonal. Desplazamientos de 12–24px, sin movimientos dramáticos.
- **Estado final**: el spiral reduce opacidad (1→0.55) y escala (1→0.9) entre el 74%–94% del progreso, superpuesto con la entrada de la frase 3 — "casi completo pero visualmente más quieto", ya no domina el frame final.
- **Transición oscuro→ivory**: duración recortada (0.1→0.06 en desktop; rango de scrub acortado en mobile) más `ease:"power2.out"` en vez de lineal — atraviesa más rápido los tonos grises intermedios de la mezcla de opacidad, sin introducir gradientes nuevos (sigue siendo un fade de opacidad puro).
- **Estado inicial del trazo**: el dibujo del `path` ahora arranca en la posición 0.04 del timeline (no en 0), garantizando ~0% de trazo visible a la entrada real de la sección — antes arrancaba en 0 y el bucle interior del spiral (dibujado primero) podía leerse como "ya formado" incluso con poco trazo revelado.
- **Espaciado de copy**: columna de texto 46vw→44vw (más aire respecto al spiral), contenedor de frases 64→72 (h-72) para acomodar los nuevos desplazamientos sin recortes.

## Implementation checklist (pase de refinamiento)
- [passed] Reducir escala del spiral a 48–56vw (52vw aplicado) sin tocar el asset ni la arquitectura de pin.
- [passed] Reposicionar el spiral más a la derecha y más abajo (`right-0 translate-x-[8%] top-[58%]`), bleed vía transform en vez de offset negativo crudo.
- [passed] Coreografía espacial por frase (`restY`/`restX` por statement) además del crossfade de opacidad existente, movimientos de 12–24px.
- [passed] Estado final calmado: opacidad y escala del spiral se reducen hacia el cierre (0.74→0.94), superpuesto con la frase 3.
- [passed] Transición oscuro→ivory acortada y con easing (`power2.out`) en desktop y mobile, sin nuevos gradientes.
- [passed] Trazo inicial: el dibujo arranca en 0.04 del timeline (antes 0), holding en `strokeDashoffset:length` hasta ese punto.
- [passed] Columna de texto más angosta (44vw) y contenedor de frases más alto (h-72) para el nuevo espaciado.
- [passed] No se tocó `HeroLandscape.tsx`, `Header.tsx`, `CycleSection.tsx`, el copy, tokens, ni la arquitectura de `ScrollTrigger`/`matchMedia`/pin.

## Verification checklist (pase de refinamiento)
- [passed] `pnpm lint` sin errores tras los cambios.
- [passed] Diff acotado a `RhythmSection.tsx` únicamente (`git status`/`git diff --stat` confirmado) — ni el SVG ni otras secciones cambiaron.
- [passed] Consola del Preview real sin errores; diagnóstico dev confirma `path.getTotalLength() = 3154.3` y `rama activa: desktop pineado` tras el cambio, sin regresiones.
- [passed] Captura de pantalla del Preview real (frame de scroll intermedio) confirma: spiral visiblemente más pequeño y desplazado hacia abajo-derecha respecto al pase anterior, sin colisión con el texto, transición oscuro→ivory ya resuelta a ivory limpio (sin franja gris visible) en el punto capturado, frase 3 legible y bien separada del spiral.
- [manual-required] Confirmar visualmente en el Preview, justo al entrar `#ritmo` sin haber scrolleado aún, que el trazo se ve ~0–5% (no 40–50%) — verificado matemáticamente por el hold hasta la posición 0.04 del timeline y por los logs de consola (dashoffset proporcional a `length` desde el arranque), pero la herramienta de captura disponible no permite fijar el scroll exactamente en progreso=0 antes de fotografiar, por lo que la confirmación visual del frame exacto de entrada conviene hacerla a mano.
- [manual-required] Confirmar en vivo la coreografía espacial de las 3 frases (posiciones distintas por fase) scrolleando con mouse/trackpad real — la lógica por `restY`/`restX` está verificada por código, pero comparar las 3 posiciones relativas requiere observar múltiples momentos de scroll en secuencia, no capturable en una sola captura estática.

## Fix estructural: continuidad del trazo + handoff limpio del Hero

### 1. Diagnóstico del SVG (verificado antes de tocar cualquier código)

Comando ejecutado sobre `src/assets/ormonia-spiral.svg` (el asset real, no una suposición):

| Métrica | Valor encontrado | Esperado si hubiera subpaths desconectados |
|---|---|---|
| Elementos `<path>` | **1** | >1 |
| Comandos `M`/`m` (moveto) en el `d` | **1** | >1 |
| Comandos `Z`/`z` (closepath) | **0** | — |
| Punto de inicio | (226.5, 197.9) — el "comma" interior | — |
| Punto final | (674.5, 402.7) — la "cola", a 2px del borde del viewBox | — |

**Conclusión**: el asset ya es un único trazo continuo abierto. NO contiene subpaths desconectados — la hipótesis de "múltiples subpaths" del reporte no se confirmó con evidencia. Por lo tanto, **no se normalizó ni reescribió el `d`** (no había nada que normalizar sin alterar innecesariamente la geometría de mano). La dirección del trazo (comma pequeño → barrido amplio → cola) ya coincide con la narrativa deseada (gesto mínimo → forma reconocible → resolución), así que tampoco se invirtió.

Este mismo diagnóstico ahora se registra **en vivo, en cada carga**, leyendo el propio `spiralMarkup` importado (no una constante hardcodeada) — verificado en el Preview real: `[RhythmSection] Diagnóstico SVG — <path>: 1, comandos M/m: 1, comandos Z/z: 0`.

### 2. Causa real identificada para el efecto "desconectado"

Dado que el `<path>` es técnicamente un único trazo, la apariencia de "arco exterior separado de una porción interior" no podía originarse en el SVG. La causa identificada: la versión anterior posicionaba el spiral con `right-0` **combinado con** `translate-x-[8%]`, empujando el recuadro del spiral más allá del borde del `stage` (que tiene `overflow-hidden`). Ese empuje adicional podía recortar una porción intermedia del barrido amplio del trazo, dando la ilusión visual de dos fragmentos inconexos aunque el trazo subyacente siempre fue continuo. **Se quitó el `translate-x-[8%]`**; el spiral ahora se ancla solo con `right-0`, dejando que el único recorte posible sea el que ya sugiere la propia geometría del asset (la cola termina a 2px de su propio borde).

Como capa adicional de robustez (no relacionada con el SVG, pero que elimina cualquier posibilidad de animaciones duplicadas compitiendo sobre el mismo `<path>` — p. ej. por HMR acumulado durante desarrollo), se agregó un guard que mata explícitamente cualquier `ScrollTrigger` previo atado a la sección antes de crear los nuevos.

### 3. Handoff Hero → ivory reestructurado

- La sección (`<section>`) ya usaba `bg-background` (ivory) desde su primer commit — nunca fue "marrón" a nivel de fondo real; el velo `bg-ink` es una capa `absolute inset-0` temporal por encima.
- Se retimó exactamente a la guía numérica del reporte: velo `opacity 1→0` en el primer **10%** del progreso (dentro de 8–12%), con `ease:"power2.out"` para atravesar rápido los tonos grises intermedios — ya no un fade lineal de mayor duración.
- El dibujo del trazo es **una sola animación continua** `strokeDashoffset` de largo total → 0, posición 0 → 0.88 del timeline (sin holds, sin segmentos separados) — a progreso 0.10 (fin del velo) solo ~11% del trazo está dibujado, un fragmento mínimo, no un spiral reconocible.
- Fases de texto remapeadas a las ventanas exactas pedidas: frase 1 en 10–35%, frase 2 en 35–60%, frase 3 en 60–88%, cierre (escala/opacidad del spiral) en 88–100%.

### Implementation checklist (fix estructural)
- [passed] Diagnosticar el SVG real (conteo de `<path>`, `M`, `Z`) antes de cualquier cambio de código.
- [passed] No normalizar/reescribir el `d` — el asset ya es un único subpath continuo (evidencia, no suposición).
- [passed] Verificar dirección del trazo — ya coincide con la narrativa (comma→barrido→cola); no se invirtió.
- [passed] Identificar y corregir la causa compositiva del efecto "desconectado" (`translate-x-[8%]` recortando el barrido vía `overflow-hidden`) — removido, ahora solo `right-0`.
- [passed] Guard defensivo: matar ScrollTriggers previos atados a la sección al montar, antes de crear los nuevos.
- [passed] Diagnóstico en vivo (dev-only) del conteo real de `<path>`/`M`/`Z` leído del markup importado, visible en consola en cada carga.
- [passed] Un solo `strokeDashoffset` continuo (0 → 0.88 del timeline), sin holds ni segmentos separados.
- [passed] Velo oscuro retimado a 10% exacto (dentro de 8–12%) con `power2.out`; base de la sección confirmada ivory desde siempre.
- [passed] Fases de texto remapeadas a 10–35% / 35–60% / 60–88%, cierre en 88–100%.
- [passed] No se tocó `HeroLandscape.tsx`, `Header.tsx`, `CycleSection.tsx`, tokens, ni se generó un spiral nuevo con IA.

### Verification checklist (fix estructural)
- [passed] `pnpm lint` sin errores.
- [passed] Diff acotado a `RhythmSection.tsx` únicamente (`git diff --stat`: 1 archivo) — el SVG persistido no se tocó.
- [passed] Consola del Preview real confirma el diagnóstico en vivo: `<path>: 1, comandos M/m: 1, comandos Z/z: 0` — coincide exactamente con el análisis offline.
- [passed] Sin errores en consola tras cargar y hacer scroll por `#ritmo`.
- [passed] Captura del Preview real (frame de scroll intermedio) muestra el trazo como una curva única y conectada: coil central → barrido que se abre → cola saliendo hacia el borde, sin fragmentos flotantes ni huecos; fondo ya resuelto a ivory limpio (sin franja gris); frase 3 legible y separada del spiral.
- [manual-required] Confirmar con una recarga completa (no solo HMR) en el propio Preview del usuario que el efecto "desconectado" no reaparece — el guard defensivo de ScrollTrigger reduce significativamente el riesgo de instancias duplicadas acumuladas por HMU, pero una recarga dura (Cmd/Ctrl+R) es la forma más segura de partir de un estado 100% limpio.
- [manual-required] Confirmar visualmente que a progreso 0–5% casi no hay spiral visible y que ningún segmento interior aparece de forma independiente — verificado matemáticamente (a progreso 0.05, ~5.7% del trazo dibujado) pero no capturable con exactitud por la herramienta de screenshot disponible (no permite fijar el scroll en un punto exacto antes de fotografiar).
