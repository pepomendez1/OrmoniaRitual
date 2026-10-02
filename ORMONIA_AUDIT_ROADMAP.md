# ORMONIA — Auditoría y Roadmap
**Fecha:** 2026-10-01
**Base auditada:** rama `claude/stoic-keller-zhrb8m` @ `974f022` (= `main` + Handoff)
**Fuentes de verdad usadas:** repo actual + `ORMONIA_HANDOFF_CURRENT.md` > `ORMONIA_MASTER_PLAN_v3.md` > componentes viejos.

> Este documento no modifica nada. Registra qué se encontró, con evidencia, y propone un orden de trabajo en PRs chicos.
> Lo que requiere decisión del equipo está marcado como **[DECISIÓN]** y no se implementa sin respuesta.

---

## 0. Estado de ejecución (actualizado al cierre de la sesión)

Todo en la rama `claude/stoic-keller-zhrb8m`. Cada commit pasó `pnpm check` (lint + typecheck real), `pnpm build:prod` y una revisión en el navegador (Playwright, desktop 1440 y mobile 390).

| Commit | Qué resuelve | Ítems |
|---|---|---|
| `8adc4ca` | Typecheck real en `pnpm check`; error TS en `HeroLandscape` | B3 |
| `8d5cb54` | 14 clases de opacidad que no se generaban (El Registro invisible, pista de barras, etc.) | B1 |
| `1770439` | Respuestas del diagnóstico consistentes, `/resultado` protegido, progreso en sessionStorage (nunca el email) | B4, B5 |
| `a18ca91` | Popup, nav y footer → `/descubri-tu-piel`; `/discover` redirige; `DiscoverYourRhythmSection` desmontado | B2, C1 |
| `d5bbacf` | Home en el orden del Handoff §9 (Inside/Outside y Ritual desmontados, **no borrados**); copy sin atadura a la fase; voseo | C1, C2, C9 |
| `52c9378` | Lecturas, Instagram, cierre “Unite al ritual” y footer completo; anclas internas que funcionan | Fase 3 |
| `c94e0fd` | Resultado sin valores de demo; El Registro responde con honestidad; comentario de mobile | C4, C7, C8 |
| `b882ded` | Imágenes ~7,0 MB → ~1,3 MB (PNG conservados); rutas lazy; vendors en chunks | T1, T2 |
| `9f5dce6` | 5 duraciones de motion que no se generaban (corrían a 150 ms) | nuevo |
| `5dbe4c7` | axe-core: 0 fallas en 9 páginas (desktop y mobile); El Ciclo usable con reduced motion | QA a11y |
| `4bed1c1` | `og:image` mostraba la imagen de la plataforma Enter; meta description; títulos por ruta | SEO |
| `c51b532` | Tienda/PDP: producto y precio primero, fase como referencia | §6 |

### Decisiones que tomé por defecto (todas reversibles; revisar con el equipo)
1. `/discover` → redirect a `/descubri-tu-piel`. `pages/Discover.tsx` sigue en el repo.
2. Nav mobile “Descubrir tu ritual” → “Descubrí tu piel” (`/descubri-tu-piel`).
3. Popup: eyebrow “Fenotipo de piel”, cuerpo = bajada aprobada de la entrada en Home. El “5% off” se mantiene tal cual estaba (ver pendientes).
4. `InsideOutsideSection` y `RitualSection` desmontadas de Home hasta sus sprints (05/06).
5. Copy centrado en la fase reemplazado por la bajada aprobada “Fórmulas pensadas para acompañar lo que tu piel necesita.”
6. El Registro, al enviar: “El Registro todavía no está abierto. Muy pronto vas a poder sumarte.”
7. Cierre: “Unite al ritual.” + frase de marca + dos salidas (diagnóstico, El Registro).
8. Imágenes: JPEG q92 para fotografía (Hero, Pack), WebP para productos con transparencia. Mismas dimensiones.

### Hallazgos nuevos durante la ejecución
- **Duraciones de motion**: `duration-[650ms]` y similares eran ambiguas con `tailwindcss-animate` y no se generaban. El crossfade del Pack, el fundido del panel del diagnóstico, el relevo entre preguntas y el smart header corrían a 150 ms. Ya está corregido; conviene revisar la sensación en el browser.
- **Lenis tras cambiar de ruta** conservaba el alto de la página anterior y recortaba el scroll a anclas. Afectaba también al CTA del Hero al volver a Home. Ya está corregido.
- **El Ciclo con reduced motion (desktop)**: dejaba ~1,8 pantallas vacías y solo la fase 1. Ya está corregido; el modo animado no cambió.
- **`og:image`** era la imagen genérica de la plataforma Enter. Ya está corregido. Sigue siendo una URL relativa: cuando exista dominio, pasarla a absoluta.

### Sigue pendiente (necesita contenido, credenciales o decisión)
- **07B** (fenotipos, scoring, recomendaciones): bloqueado por los 10 puntos del Handoff §23.
- **Shopify**: dominio de la tienda, token Storefront y productos cargados. Precios hoy en `data/products.ts`.
- **Newsletter / email del diagnóstico**: proveedor. Los puntos de integración son `RhythmSection.onSubmit` y `EmailCapture.onDone`.
- **5% OFF del popup**: hoy no hay mecanismo para aplicarlo. Decidir si se muestra antes de Shopify.
- **Instagram**: cuenta (`instagramCopy.handle/profileUrl`) y, para un feed dinámico, un endpoint propio (`lib/instagram.ts`).
- **Lecturas**: piezas reales (`learnCopy.readings[].href/media`).
- **Footer**: páginas de ayuda y legales (`href: null` hoy). **A validar con asesoría legal**: en Argentina, los sitios de comercio electrónico deben exhibir el “Botón de arrepentimiento” (Res. SCI 424/2020). No se agregó nada sin esa validación.
- **Claims y activos** (C5, C6): sin cambios hasta que el equipo los valide.
- **Plataforma Enter** (T4): plugin que inyecta fuentes Poppins/Roboto, SDK de analytics y registry privado. Decidir si se mantiene.
- **Deploy SPA**: el host debe reescribir todas las rutas a `index.html` (si no, recargar `/descubri-tu-piel` da 404).
- **Cleanup final** (T5): i18n, toasts, react-query y supabase parecen sin uso. Pesan en el chunk principal (562 kB).
- **Producción fotográfica**: todos los placeholders se reemplazan desde `data/`, sin tocar layouts.

---

## 1. Resumen ejecutivo

- El núcleo aprobado (Hero, El Ciclo, Pack x4, Los esenciales, Agua + El Registro, entrada Descubrí tu piel, diagnóstico 07A) **está implementado, compila y corre sin errores JS**.
- Hay **5 bugs concretos** que no requieren decisiones de diseño. El más visible: **el texto de El Registro es prácticamente invisible** (ink sobre fondo oscuro) por una clase de Tailwind que no se genera. El mismo problema afecta a otras 13 clases en 12 archivos.
- El **popup “Descubrí tu piel” (5% OFF) lleva a `/discover`**, una página legacy que dice “El quiz de ritmo llegará pronto”. Es un callejón sin salida. El diagnóstico real vive en `/descubri-tu-piel`.
- La Home todavía monta **3 secciones legacy** entre “Descubrí tu piel” y “Lecturas”: `InsideOutsideSection`, `RitualSection` y `DiscoverYourRhythmSection`. Esta última es un **segundo teaser de quiz** (“¿En qué fase estás hoy?”), centrado en la fase y apuntando a `/discover`. Compite con la entrada nueva y contradice el §6 del Handoff.
- `pnpm check` **da verde en falso**: el `tsc --noEmit` raíz no chequea nada (`"files": []`). El typecheck real (`tsc -p tsconfig.app.json`) **falla con 1 error** en `HeroLandscape.tsx:52`.
- Lecturas, Instagram y Cierre/Footer siguen siendo placeholders de Sprint 00. Se pueden construir, pero necesitan contenido o decisiones que hoy no están en los documentos (§8).

---

## 2. Cómo se verificó

| Paso | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | OK |
| `tsc -p tsconfig.app.json --noEmit` | **FALLA**: `HeroLandscape.tsx(52,29) TS2677` |
| `pnpm check` (= lint + `tsc --noEmit` raíz) | Verde en falso: el tsconfig raíz tiene `"files": []` |
| `pnpm lint` | OK, 0 problemas |
| `pnpm build:prod` | OK. Un único chunk JS de **774 kB** (252 kB gzip), con warning de tamaño |
| Recorrido con Playwright (Chromium), desktop 1440×900 y mobile 390×844 | Home completa con scroll por pasos, test entero (9 pasos), email, resultado, acceso directo a `/resultado` y `/discover` |
| Consola del navegador | **0 errores JS**. Solo fallan las requests a Google Fonts, por el proxy del sandbox (no es un problema del repo) |

**Limitaciones del recorrido:**
- Las capturas se tomaron con la tipografía fallback, porque las fuentes no cargaron en el sandbox.
- Fue headless: no evalúa la *sensación* del motion (Lenis/GSAP).
- No se probó en dispositivos reales.
- La validación visual final la tiene que hacer una persona en `pnpm dev`.

---

## 3. Home: estado montado vs. arquitectura objetivo

Orden real en `src/pages/Home.tsx`, confirmado en el recorrido:

| # | Montado hoy | Objetivo (Handoff §9) | Estado |
|---|---|---|---|
| 1 | `HeroLandscape` | Hero | ✅ Aprobado. Solo arrastra el error de tipos |
| 2 | `CycleSection` | El Ciclo | ✅ Aprobado |
| 3 | `PackRitualSection` | Pack x4 | ✅ Aprobado base, pendiente producción |
| 4 | `FourPhasesSection` | Los esenciales | ✅ Aprobado |
| 5 | `RhythmSection` | Agua + El Registro | ⚠️ Aprobado, pero con el texto de El Registro invisible (bug B1) |
| 6 | `DiscoverYourSkinSection` | Descubrí tu piel | ✅ El copy ya es el nuevo (“Tu piel tiene una forma propia de responder.”). Fondo placeholder |
| — | `InsideOutsideSection` | — (Sprint 05, no está en la arquitectura actual) | ❓ Legacy montado, con placeholder visual vacío |
| — | `RitualSection` | — (Sprint 06, no está en la arquitectura actual) | ❓ Legacy montado. Bloque oscuro que rompe el “universo ivory” (§12) |
| — | `DiscoverYourRhythmSection` | — | ❌ Segundo teaser de quiz, centrado en la fase, apunta a `/discover` |
| 7 | `LearnSection` | Lecturas para el ritual | 🟡 Placeholder de Sprint 00 (3 cards sin imagen ni destino) |
| 8 | `InstagramUniverseSection` | Instagram dinámico | 🟡 3 tiles “INSTAGRAM PLACEHOLDER” |
| 9 | `ClosingSection` + `Footer` | Cierre + footer | 🟡 Básico. Faltan políticas, redes y contacto reales |
| — | `DiscoverPopup` | Popup diferido 5% OFF | ⚠️ Funciona (delay de 16 s / 28 % de scroll, snooze de 14 días). Destino y copy incorrectos |

---

## 4. Hallazgos

### 4.1 Bugs concretos (no requieren decisión de diseño)

**B1 — 14 clases de opacidad de Tailwind no se generan.**
- **Causa.** Tailwind 3 solo genera modificadores `/NN` que existen en la escala `opacity`, que va de 5 en 5. Valores como `/62` o `/82` no se generan y el elemento hereda el color del padre. Se verificó contra el CSS de `dist/` y con color computado en el navegador.
- **Clases afectadas:**
  - `text-ivory/82`
  - `text-ink/58`, `/62`, `/64`, `/66`, `/68`, `/72`
  - `bg-ink/12`, `bg-ink/16`
  - `border-ink/12`, `/14`, `/18`
  - `from-ink/42`, `via-ink/8`
- **Impacto visible:**
  - **El Registro**: la bajada “Ideas, fórmulas y rituales…” se renderiza `rgb(39,32,27)` sobre el agua oscura, casi invisible en desktop y mobile (`RhythmSection.tsx:257`).
  - **Resultado**: la pista gris de las barras de los ejes no existe (`Result.tsx`, `bg-ink/12`).
  - **Hero**: el degradado `from-ink/42 via-ink/8` no se aplica (`HeroLandscape.tsx`).
  - **Resto**: textos secundarios en Pack, Esenciales, Descubrí tu piel, popup y diagnóstico salen al 100 % de ink en lugar de atenuados.
- **Cuidado.** Lo aprobado se aprobó viendo este render. Corregirlo cambia levemente secciones aprobadas (textos un poco más suaves, tal como estaban escritos en el código). Hay que revisarlo visualmente en el PR. `text-ivory/82` es un bug inequívoco.

**B2 — El popup lleva a un callejón sin salida.**
- `discoverPopupCopy.ctaHref = "/discover"` (`content.ts:65`).
- `/discover` renderiza `pageShells.discover`: “El quiz de ritmo llegará pronto”.
- Resultado: la persona que acepta la invitación con 5% OFF no llega al diagnóstico.

**B3 — Typecheck roto y `pnpm check` engañoso.**
- `HeroLandscape.tsx:52`: el predicado `el is HTMLElement` no es asignable a la unión `HTMLHeadingElement | HTMLDivElement | null`. Se arregla en una línea, sin cambio de comportamiento.
- `package.json` → `check` usa `tsc --noEmit` sobre el tsconfig raíz (`"files": []`), así que nunca falla. Debe usar `tsc -p tsconfig.app.json --noEmit`.

**B4 — Diagnóstico: la respuesta 02 puede quedar obsoleta.**
- Escenario: se elige *Textura* en 01 y *Luminosidad* en 02. Después se vuelve a 01 y se cambia a *Luminosidad*.
- Resultado: 02 conserva `luminosidad` como respuesta. La opción ya no se muestra (está excluida), pero `isAnswered` da `true`.
- Consecuencia: el mapa de respuestas termina con la misma prioridad dos veces. Hoy no afecta porque `readSkin` ignora las respuestas, pero en 07B ensuciaría el scoring.
- Archivos: `lib/skinQuiz.ts` (`resolveOptions`/`toggleAnswer`) o `useSkinQuiz.select`.

**B5 — `/descubri-tu-piel/resultado` se abre sin haber hecho el test.**
- Al entrar directo (o al recargar), `location.state` es `null` y la página muestra igual “Tu lectura Ormonia” con ejes y valores.
- Debería redirigir al inicio del test, o mostrar un estado “todavía no hiciste el recorrido”.
- También: recargar en mitad del test pierde todo, porque el estado vive solo en memoria.

### 4.2 Contradicciones con decisiones aprobadas (requieren OK)

**C1 — Legacy montado en Home.** Ver §3. **[DECISIÓN]**
- `DiscoverYourRhythmSection` debería desmontarse: es exactamente el riesgo que señala el Handoff §9.
- `InsideOutsideSection` y `RitualSection` son ideas de Sprint 05/06 que el Master Plan pide **no borrar del roadmap**. La propuesta es desmontarlas de Home sin eliminarlas, hasta que su sprint defina dónde van.

**C2 — Copy centrado en la fase, contra el Handoff §6** (“los sérums no deben presentarse como productos de una fase concreta”):
- `footerCopy.tagline`: “Serums rituales para cada fase del ciclo.”
- `pageShells.products`: “Cuatro serums, un ciclo. Cada serum acompaña una fase.”
- `discoverPopupCopy.body`: “Tu fenotipo describe cómo responde tu piel *a lo largo del ciclo*…”. Además define “fenotipo”, que todavía no está definido (07B), y el Handoff pide mencionarlo solo como microcopy secundario.
- `discoverCopy` (`DiscoverYourRhythmSection`): “¿En qué fase estás hoy?”
- `closingCopy.body`: “Un ritual que acompaña cada fase.”
- `brandCopy.shortPitch`: mismo patrón, aunque hoy no se usa.

**C3 — El popup tapa contenido.**
- Desktop: aparece encima del nombre y el precio de CLARITY en Los esenciales.
- Mobile: ocupa alrededor de un tercio de la pantalla.
- Cumple las reglas (diferido, cerrable, frecuencia limitada), pero conviene revisar tamaño y posición en mobile. **[DECISIÓN de diseño menor]**

**C4 — El resultado muestra números que parecen medición.**
- Confort 68, Hidratación 52, Reactividad 34 son valores fijos de demo, independientes de las respuestas.
- El badge “Resultado provisional” existe, pero números precisos junto a “Lo que observamos” pueden leerse como diagnóstico real (Handoff §22).
- Propuesta: ocultar los valores numéricos mientras `provisional === true`. **[DECISIÓN]**

**C5 — Los activos no coinciden entre secciones.**
- `CycleSection.tsx` tiene su propio `cycleActives`:
  - RADIANCE: “Vitamina C” (los docs dicen *Magnesium Ascorbyl Phosphate*).
  - BLOOM: “Ácido hialurónico”, “Péptidos” (los docs dicen *Sodium Hyaluronate*, *Acetyl Hexapeptide-8*).
  - RESTORE: “Pentapéptido-18”.
- `products.ts` usa los nombres INCI de los docs.
- Puede ser una simplificación intencional para el público, pero hoy hay dos fuentes de verdad. **[DECISIÓN: ¿nombres INCI o nombres comunicables?]**
- Nota: la etiqueta del frasco RADIANCE (asset) dice “VITAMINA-C 10%”, que es un claim de concentración a validar.

**C6 — Claims de producto a validar** (`products.ts`, también visibles en El Ciclo y PDP):
- BLOOM: “*Equilibra*, renueva…”
- CLARITY: “*Calma* la sensibilidad y devuelve luminosidad”
- RESTORE: “*Repara* la barrera cutánea”
- RADIANCE: “El serum de *mayor potencia*”

No se cambian sin validación del equipo: no inventar claims también aplica a reescribirlos. **[DECISIÓN]**

**C7 — El Registro no da ningún feedback.**
- `onSubmit` hace `preventDefault()` y nada más. La persona escribe su email, toca “Recibir El Registro” y no pasa nada visible.
- No simular el envío es correcto (Handoff §15). Aun así, el silencio se percibe como un error.
- Propuesta: un mensaje honesto, por ejemplo “Muy pronto vas a poder suscribirte”, o deshabilitar el formulario hasta conectar un proveedor. **[DECISIÓN de copy]**

**C8 — En mobile, el diagnóstico no tiene visual.** `DiscoverShell` oculta el panel con `hidden lg:block`, aunque el comentario dice que en mobile “pasa a ser una franja de contexto”. No es grave (son placeholders), pero el comentario y el código no coinciden.

**C9 — Voseo inconsistente.**
- La mayor parte del sitio usa voseo: “Descubrí”, “Dejanos”, “Podés”.
- Quedan textos en tuteo: 404 (“Vuelve al ritual”), `pageShells.discover` (“Encuentra tu ritmo”), footer (“Descubre”), `discoverCopy` (“Encuentra tu ritmo”).

**C10 — Diagonales en El Ciclo (solo informativo).**
- Los fondos de FOLICULAR y OVULATORIA usan texturas `repeating-linear-gradient` diagonales, visibles en las capturas.
- El Master Plan §20 dice “no usar líneas diagonales sin función”, pero El Ciclo está **aprobado** en el Handoff.
- No se toca. Queda anotado por si la CEO lo quiere revisar.

### 4.3 Técnico / performance

| # | Hallazgo | Acción sugerida |
|---|---|---|
| T1 | Bundle único de 774 kB: el diagnóstico, la PDP y la Home se descargan juntos | `React.lazy` por ruta (al menos `/descubri-tu-piel*` y `/products*`) |
| T2 | Imágenes PNG pesadas en uso: productos ~0,8 MB c/u, `pack-box-*` 1,2–1,5 MB, Hero 1,2 MB | Convertir a WebP/AVIF con `srcset`. No cambia el diseño |
| T3 | `public/products/pack-4-serums.png` (2,4 MB) y `ritual-completo.png` (3,1 MB) no se referencian | **No borrar** (regla de conservación). Solo no se sirven si nadie los pide |
| T4 | El build de producción inyecta, vía `vite-plugin-enter-dev` / `enterProdPlugin`, un `<link>` a Inter + **Poppins + Roboto en 10 pesos** que el sitio no usa. Además: SDK de analytics `@enter-pro/analytics-sdk` y `.npmrc` apuntando a un registry privado (`gitlab.knoffice.tech`) | **[DECISIÓN]** ¿Se sigue deployando en la plataforma Enter? Si no, sacar esos plugins mejora la performance y reduce la dependencia del registry privado |
| T5 | Dependencias sin uso aparente: `@supabase/supabase-js`, `framer-motion`, i18n con locales `en`/`zh-CN`, `language-switcher.tsx`, muchos componentes shadcn | Revisar en el cleanup final (Handoff §31), no ahora |
| T6 | `vite.config.ts` usa `host: "::"`: falla en entornos solo IPv4 (pasó en este sandbox) | Menor. Se resuelve con `pnpm dev --host 127.0.0.1` sin tocar la config |
| T7 | Reduced motion | Las secciones GSAP complejas (Hero, Ciclo, Agua, Pack) lo contemplan. Las secciones simples usan `useScrollReveal`, que también lo respeta. Sin hallazgos bloqueantes |
| T8 | `data-header-tone` | Consistente en las secciones oscuras. Las claras caen al `defaultTone="dark"`, que es correcto |
| T9 | `src/lib/lenis.ts`: `initLenis()` registra `gsap.ticker.add(...)` y nunca lo quita. `SmoothScrollProvider` hace `lenis.destroy()` al desmontar, pero el callback del ticker sigue llamando `raf()` sobre la instancia destruida, y `getLenis()` sigue devolviéndola. Hoy no rompe porque el provider no se desmonta en producción; sí se acumula con HMR o `StrictMode` | Deuda técnica, revisar después. Guardar la función del ticker y hacer `gsap.ticker.remove(fn)` + `lenisInstance = null` en el cleanup |
| T10 | `src/App.tsx`: `createBrowserRouter(routers)` se ejecuta dentro del render de `App`. Cualquier re-render de `App` crea un router nuevo y remonta todo el árbol de rutas (estado, animaciones y ScrollTriggers incluidos) | Deuda técnica, revisar después. Crear el router una sola vez a nivel de módulo |

---

## 5. Mapa de componentes legacy

**Regla aplicada:** no se elimina nada. Solo se mapea.

| Componente | ¿Montado? | Usado por | Recomendación |
|---|---|---|---|
| `DiscoverYourRhythmSection` + `ui/QuizEntryCard` | Sí, en Home | `Home.tsx` | Desmontar de Home (C1). Conservar el archivo |
| `InsideOutsideSection` + `ui/SplitConceptSection` | Sí, en Home | `Home.tsx` | Desmontar de Home hasta Sprint 05 **[DECISIÓN]** |
| `RitualSection` | Sí, en Home | `Home.tsx` | Desmontar de Home hasta Sprint 06 **[DECISIÓN]**. Su lista ESCUCHAR / OBSERVAR / ACOMPAÑAR / CUIDAR es reutilizable |
| `RegisterSection` + `ui/NewsletterBlock` | No | — (su newsletter vive en `RhythmSection`) | Conservar hasta el cleanup final |
| `ui/RitualWordBlock` | No | — | Conservar hasta el cleanup final |
| `pages/Discover.tsx` (`/discover`) | Ruta activa | Popup, nav mobile (“Descubrir tu ritual”), footer (“Descubre”) | Redirigir `/discover` → `/descubri-tu-piel` (o reconvertirla) **[DECISIÓN]** |
| `src/assets/ormonia-spiral.svg` | No | — | El Master Plan pide no usar la espiral decorativa. Conservar el archivo |
| `language-switcher.tsx`, `i18n/*` | No en la UI | `main.tsx` inicializa i18n | Cleanup final |

---

## 6. Roadmap propuesto (PRs chicos, en orden)

Cada PR pasa `tsc -p tsconfig.app.json`, `pnpm lint` y `pnpm build:prod`, más una revisión en el navegador, y lista los archivos tocados (Handoff §39).

### Fase 0 — Higiene (sin decisiones pendientes; se puede empezar ya)
1. **PR-0.1 — Typecheck real.** Arreglar `HeroLandscape.tsx:52` y hacer que `pnpm check` use `tsc -p tsconfig.app.json --noEmit`. Sin cambios visuales.
2. **PR-0.2 — Opacidades de Tailwind (B1).** Extender la escala `opacity` en `tailwind.config.ts` con los 13 valores usados (8, 12, 14, 16, 18, 42, 58, 62, 64, 66, 68, 72, 82). Así las clases se generan tal como están escritas y no hay que tocar 12 archivos.
   - ⚠️ Cambia levemente secciones aprobadas.
   - Se entregan capturas antes y después para aprobar.
   - Si se prefiere no tocar lo aprobado: solo `text-ivory/82` (El Registro) y `bg-ink/12` (Resultado).
3. **PR-0.3 — Robustez del diagnóstico (B4, B5).**
   - Limpiar respuestas dependientes cuando cambia la pregunta de la que heredan opciones.
   - Redirigir `/resultado` sin respuestas a `/descubri-tu-piel`.
   - Opcional: persistir el progreso en `sessionStorage`.
   - No toca contenido, scoring ni UI.

### Fase 1 — Unificar las entradas al diagnóstico (Handoff §25)
4. **PR-1.1 — Destinos.**
   - Popup → `/descubri-tu-piel`.
   - Nav mobile “Descubrir tu ritual” y footer “Descubre” → definir destino.
   - `/discover` → redirect.
   - Desmontar `DiscoverYourRhythmSection` de Home.
   - **[DECISIÓN 1, 2]**
5. **PR-1.2 — Copy del popup.** “Descubrí tu piel” + “fenotipo” como microcopy secundario, sin definirlo ni atarlo al ciclo. **[DECISIÓN 3: copy]**

### Fase 2 — Arquitectura de Home
6. **PR-2.1 — Desmontar `InsideOutsideSection` y `RitualSection` de Home** (sin borrar), para que el orden quede como en el Handoff §9. **[DECISIÓN 4]**
7. **PR-2.2 — Copy centrado en la fase (C2) y voseo (C9).** Reemplazos puntuales de copy, solo con textos aprobados. **[DECISIÓN 5]**

### Fase 3 — Secciones pendientes de Home
8. **PR-3.1 — Lecturas para el ritual.** Sección editorial (no una grilla de blog) con soporte para piezas de tipo video de YouTube y nota/escrito, alimentada desde `data/` para que después pueda venir de un CMS. **[DECISIÓN 6: contenido inicial real, o estructura con placeholders explícitos]**
9. **PR-3.2 — Instagram.** 3 piezas con la estética de ORMONIA. **[DECISIÓN 7: ¿feed real o curado?]** Un feed realmente dinámico necesita la Instagram Graph API con token, que tiene que vivir en un backend o servicio y no en el frontend.
10. **PR-3.3 — Cierre “Unite al ritual” + footer completo.** Navegación, redes, contacto y slots de políticas (envíos, devoluciones, términos, privacidad) **sin textos legales inventados**. Sin newsletter pesada (ya está El Registro). **[DECISIÓN 8: URLs de redes, email de contacto, qué páginas legales existen]**

### Fase 4 — Diagnóstico 07B (bloqueado)
11. Implementar `readSkin()` cuando el equipo defina los 10 puntos del Handoff §23. Mientras tanto: C4 (ocultar números provisionales) **[DECISIÓN 9]**.

### Fase 5 — Integraciones
12. **Shopify** (Storefront API): reemplazar `price` de `products.ts`, crear la PDP del Pack, sumar carrito y checkout. Necesita dominio de la tienda, token Storefront, y que los productos y el Pack ya estén cargados en Shopify.
13. **Newsletter y email del diagnóstico**: un solo punto de integración en cada caso (`RhythmSection.onSubmit` y `EmailCapture.onDone`). **[DECISIÓN 10: proveedor (Klaviyo / Shopify Email / otro)]**

### Fase 6 — Producción, performance y QA
14. Reemplazar placeholders por fotografía y video reales (pack, hover de individuales, diagnóstico, campaña de Descubrí tu piel). En todos los casos el cambio es en `data/`, sin tocar layouts.
15. Performance: T1 (code-splitting), T2 (WebP/AVIF), T4 (plataforma).
16. QA completo: desktop, mobile, accesibilidad (contraste, foco, reduced motion), Lighthouse.
17. Cleanup de legacy según §5 y dependencias T5.

---

## 7. Lo que NO se va a hacer sin definición explícita
- Inventar fenotipos, scoring, pesos o recomendaciones (07B).
- Escribir o reescribir claims de producto.
- Fijar precios definitivos, descuentos o el ahorro del Pack. Hoy `packCopy.price/savings = null`, y queda así.
- Conectar proveedores (Shopify, email, Instagram) sin credenciales y sin decisión.
- Rediseñar Hero, El Ciclo, Pack, Esenciales o Agua.
- Eliminar componentes o assets.

---

## 8. Decisiones que se necesitan del equipo

1. ¿`/discover` se redirige a `/descubri-tu-piel` o tiene otra función futura?
2. Nav mobile “Descubrir tu ritual”: ¿apunta a `/descubri-tu-piel`, al Pack (`/#pack-x4`) o se elimina? (El Master Plan §14 distingue *ritual*, que es comercial, de *piel*, que es el diagnóstico.)
3. Copy final del popup (cuerpo + microcopy de “fenotipo”).
4. ¿Se desmontan `InsideOutsideSection` y `RitualSection` de Home hasta sus sprints?
5. Reemplazos de copy centrado en la fase: footer, `/products`, cierre.
6. Lecturas: ¿hay ya piezas reales (links de YouTube, notas)? ¿Cuántas?
7. Instagram: cuenta, y si se acepta una selección curada mientras no hay backend para la API.
8. Footer: redes, contacto y qué páginas legales van a existir.
9. Resultado provisional: ¿ocultar los valores numéricos de los ejes?
10. Proveedor de newsletter/email y plataforma de deploy (¿se mantiene Enter?).
11. Activos: ¿nombres INCI o nombres comunicables en El Ciclo? ¿Se validan los claims de C6?
