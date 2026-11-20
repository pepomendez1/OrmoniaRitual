# ORMONIA — Pasada integral (sitio completo)
**Fecha:** 2026-10-29 · **Rama:** `main` (sin commits; cambios en el working tree)

> Complementa `ORMONIA_HANDOFF_CURRENT.md`. Donde se contradicen, manda este documento
> (es posterior). El Handoff §9 (orden de Home) y §15 (Agua + El Registro en Home) quedan reemplazados.

---

## 1. Home — orden nuevo

| # | Sección | Componente |
|---|---|---|
| 1 | Hero | `HeroLandscape` (sin cambios de diseño; ya no tiñe la foto al salir) |
| 2 | Pack x4 | `PackRitualSection` (más comercial: incluye, precio si existe, CTA a PDP, agregar al carrito) |
| 3 | Los esenciales de ORMONIA | `FourPhasesSection` (quick add real) |
| 4 | Calendario cíclico | `CalendarSection` **(nuevo)** |
| 5 | El Ciclo | `CycleSection` (animación intacta; velos de entrada/salida en 0 → cortes limpios) |
| 6 | Descubrí tu piel | `DiscoverYourSkinSection` (foto TEMPORAL de producción) |
| 7 | Lecturas para el ritual | `LearnSection` (toda pieza clickeable) |
| 8 | El universo ORMONIA | `InstagramUniverseSection` |
| 9 | Unite al ritual + footer | `ClosingSection` (+ El Registro compacto) + `Footer` |

**Desmontado de Home (no borrado):** `RhythmSection` (Agua + El Registro). Video, motion y código siguen en el repo.
`InsideOutsideSection`, `RitualSection`, `DiscoverYourRhythmSection`, `RegisterSection` siguen desmontados como antes.

## 2. Rutas

| Ruta | Qué es |
|---|---|
| `/` | Home |
| `/products` | Tienda (alias: `/shop`, `/tienda` → redirect) |
| `/products/pack-x4` | PDP Pack x4 |
| `/products/calendario-ciclico` | PDP Calendario (comercial) |
| `/products/clarity` · `bloom` · `radiance` · `restore` | PDP sérums |
| `/products/aura` | AURA, próximamente (noindex) |
| `/calendario` | Página editorial del Calendario |
| `/explore` | Explorar (antes `/learn`, que redirige) |
| `/explore/:id` | Ficha de lectura |
| `/about` | Sobre ORMONIA |
| `/cart` | Carrito |
| `/account`, `/account/pedidos/:orderId` | Cuenta |
| `/ayuda/:slug` | envios · cambios-y-devoluciones · preguntas-frecuentes · contacto · terminos · privacidad |
| `/descubri-tu-piel`, `/descubri-tu-piel/resultado` | Diagnóstico (sin cambios de arquitectura) |
| `/discover` | redirect (como antes) |
| `/#ritmo` | alias → `#unite-al-ritual` (`useHashScroll`) |

## 3. Arquitectura nueva

- **Catálogo** `data/products.ts`: un solo modelo `Product` con `category` (`serum | set | calendar | mist`), precio nullable, ids de Shopify, `available`, `inventory`, `gallery`, `details`, `howToUse`, `texture`, `inci`, `specs`, `includes`, `faq`. `catalog` = Pack, Calendario, 4 sérums. `products` sigue siendo alias de los sérums (El Ciclo y el riel no cambiaron).
- **Comercio** `src/commerce/`: ver `src/commerce/README.md` (adapter local hoy → Shopify Storefront después).
- **Overlays globales** en `components/layout/RootLayout.tsx`: mini carrito, buscador, scroll arriba al cambiar de página. El router se crea una vez (Audit T10 resuelto).
- **SEO** `data/seo.ts` + `hooks/usePageMeta.ts`: title, description, og:*, robots y canonical (canonical/og:url solo con `VITE_SITE_URL`).
- **Primitives** `lib/brandButton.ts`: botón primary/secondary/quiet/icon, tonos claro/oscuro, y clases de eyebrow, titulares, lead e input. Solo se usan en lo nuevo; los CTAs aprobados no se tocaron.
- **Lenis**: `useLenisLock` detiene el smooth scroll con overlays abiertos; contenedores con scroll propio llevan `data-lenis-prevent`.

## 4. Decisiones que tomé (revisables)

1. **Copy del Pack**: sin narrativa de ahorro (ver §7).
2. **Productos sin precio**: ya NO se pueden agregar (`isPurchasable()` exige `price != null`, corrección 2026-10-29).
3. **Stock**: sin dato se muestra "Stock a confirmar". Nunca "Disponible" sin `available: true`.
4. **Calendario sin foto**: `CalendarVisual` dibuja una portada tipográfica marcada "Visual provisional". No describe interior, formato ni materiales.
5. **Copy del Calendario** (`data/calendar.ts`, `calendarTeaserCopy`): provisional, a validar. Solo observación y registro + disclaimer explícito (no predice, no diagnostica).
6. **Descubrí tu piel (Home)**: prueba con `03-model-water` (piel real, agua) en tono oscuro. Volver al campo tonal = `discoverSkinCopy.media.src = null` y `tone: "light"`.
7. **Lecturas**: sin texto publicado, cada pieza abre `/explore/:id` con portada, título, bajada y un aviso "todavía no está publicada". No se escribió ningún artículo.
8. **Políticas**: `/ayuda/*` existen con solo datos confirmados (umbral de envío gratis) y aviso "se completa antes de abrir la tienda". Sin texto legal.
9. **Header desktop**: Cuenta (link), Buscar (overlay), Carrito + cantidad ("CARRITO 2"). Calendario no entra en la nav desktop (no cabe a 1024px sin achicar el wordmark); está en mobile, footer y Home.
10. **Header mobile**: menú + wordmark + ícono de carrito con cantidad. Buscar y Cuenta viven en el menú (a 390px no entran más elementos con el wordmark centrado).
11. **Búsqueda**: overlay (no página). Busca en nombre, tagline, descripción, activos y lecturas, sin tildes.
12. **Cuenta**: sin login real. "Acceder" deshabilitado con su motivo; "Ver la cuenta en modo demo" carga `data/accountDemo.ts` (ficticio, con aviso permanente, import diferido).
13. **`productKicker`** ya no muestra la fase: la fase aparece solo al pie del bloque de compra del sérum, con la nota "Podés usar cada sérum cuando tu piel lo pida".
14. **El Registro**: formulario de una línea dentro de "Unite al ritual", con validación y respuesta honesta (`pendingNotice`). Punto de integración: `NewsletterForm.onSubmit`.
15. **Imágenes**: derivados livianos en `public/production-temp/web/` (≈110–200 kB c/u vs 1–3 MB) y `public/products/ritual-completo.jpg` / `pack-4-serums.jpg`. Los originales siguen intactos.

## 5. Datos que faltan (no se inventaron)

| Dato | Dónde va |
|---|---|
| Precios definitivos de sérums (hoy $55.000 provisional) | `serums[].price` / Shopify |
| Fotografía FINAL del Calendario (hoy hay mockups provisionales, ver §9) | `calendarProduct.imageSrc/gallery`, `calendarCopy.hero/interior.media`, `calendarTeaserCopy.media` |
| Medidas, materiales, páginas, qué incluye el Calendario | `calendarProduct.specs/includes/howToUse` |
| Modo de uso, textura, INCI, FAQ de cada sérum y del Pack | `howToUse`, `texture`, `inci`, `faq` en cada producto |
| Stock / disponibilidad | `available`, `inventory` (o Shopify) |
| Plazos y costos de envío, política de cambios, términos, privacidad, contacto, botón de arrepentimiento | `data/policies.ts` (validación legal) |
| Instagram (handle y URL) | `instagramCopy.handle/profileUrl` |
| Proveedor de newsletter | `NewsletterForm.onSubmit`, `EmailCapture.onDone` |
| Shopify: dominio, token Storefront, productos/variantes cargados | `src/commerce/README.md` |
| Dominio definitivo | `VITE_SITE_URL` (canonical, og:url, og:image absoluta) |
| Fenotipos/scoring (07B) | `readSkin()` — sigue bloqueado |
| Validación de claims (C6) y nombres de activos (C5) | `data/products.ts`, `CycleSection.cycleActives` |
| Copy del Calendario y de la sección ritual de la PDP del Pack | `data/calendar.ts`, `data/pdpCopy.ts` |

## 6. Deuda técnica detectada

- Chunk principal ~595 kB (warning de Vite): i18n, toasts, react-query y supabase siguen sin uso aparente (Audit T5).
- `lib/lenis.ts`: el callback del ticker nunca se remueve (Audit T9).
- SPA sin SSR/prerender: previews sociales de PDPs necesitarán prerender cuando haya dominio.
- `public/production-temp/` no está versionado (untracked) y es temporal: si se deploya sin esa carpeta, las fotos de prueba no aparecen.
- `ProductRailCard` mantiene su propio mapa de tonos por fase; `productTone` en `data/products.ts` es la fuente nueva. Unificar al tocar el riel.
- `ProductDisplay`, `ProductMeta`, `pageShells.products/discover` quedan sin uso (no se borraron).
- Restaurar posición de scroll en "atrás" del navegador no está resuelto con Lenis (se respeta el comportamiento del navegador, sin forzar).

## 7. Corrección 2026-10-29 — precios y concepto del Pack

- **Precios canónicos** en `src/data/products.ts`: `packX4.price = 160000`, `calendarProduct.price = 25000`. Home, Tienda, PDP, búsqueda, mini carrito y `/cart` los leen de ahí.
- **Pack = el ritual completo, no un bundle.** Se eliminó `packSavings()` y toda mención de ahorro (Home y PDP). `productKicker` del Pack: "El ritual completo".
- **PDP Pack** (`PackDetail`): compra → El cuidado como ritual → El ritual incluye (lista tipográfica sin links ni precios) → Cómo vivir el ritual → Descubrí tu piel → Completá el ritual (Calendario, quick add real) → envío. Sin cards, links, precios ni quick add de sérums.
- **Sérums**: entrada discreta a Descubrí tu piel debajo de la información (`DiscoverSkinPrompt variant="serum"`).
- Copy nuevo (a validar) en `data/pdpCopy.ts → pack, discoverSkin, complement`.

## 8. Imágenes de referencia (2026-10-29)

En `public/production-temp/references/`. TEMPORALES y **con derechos de uso a verificar** antes de publicar.

| Archivo | Dónde | Dato |
|---|---|---|
| `moon-phases.jpg` (grabado de fases lunares) | `/calendario`, bloque "Dentro del ritual" | `calendarCopy.role.media` (`null` la oculta) |
| `eclipse.jpg` | Diagnóstico, panel "Observar" | `skinQuizVisuals.observar` |
| `nautilus.jpg` | Diagnóstico, panel del resultado | `skinQuizVisuals.resultado` |
| `ref-life-areas-NO-PUBLICAR.jpg` | No se usa | Pieza firmada por @polafijalkocreative; solo referencia (p. ej. para pensar el interior del calendario) |

`VisualScene.fit = "contain"` permite mostrar ilustraciones enteras sobre un `tone` igual al papel de la imagen.

## 9. Mockups del Calendario cíclico (2026-10-29)

En `public/production-temp/calendar/`, TEMPORALES hasta la fotografía final:

| Archivo | Uso |
|---|---|
| `calendario-producto.jpg` | Foto de producto: PDP (principal), cards de Tienda/búsqueda/carrito, bloque de compra de `/calendario`, "Completá el ritual" en El Ritual |
| `calendario-abierto.jpg` | Hover de la card, galería de PDP, bloque "Por dentro" de `/calendario` |
| `calendario-paginas.jpg` | Home (sección Calendario), hero de `/calendario`, galería de PDP |

`CalendarVisual` (portada tipográfica) queda como fallback si se quitan las imágenes.

A revisar en los mockups: textos en tuteo ("Elige", "Registra") y la palabra "equilibrio" en `calendario-abierto`; números de día repetidos en el mapa; la página "12 áreas de tu vida" deriva de una pieza de @polafijalkocreative.

## 10. El Ciclo — fotografías finales (2026-11-04)

- Assets web: `public/cycle/{clarity,bloom,radiance,restore}.jpg` (2,2 MB en total). Originales intactos (11,3 MB): `assets-source/cycle/*-original.jpg` (no se sirven).
- Datos: `cycleScene` de cada sérum en `src/data/products.ts` (src, crops desktop/mobile, tono, tinta, color base y velo opcional). `CycleSection` solo lee esos datos.
- Fondo: crossfade de 0,8 s disparado por la fase activa (con histéresis), no por cada píxel de scroll; la foto nueva entra encima y las demás pasan a 0 recién al terminar. Reduced motion: cambio directo.
- Fondos anteriores (capas CSS y luz de contacto) fuera de la UI. `pradera-y-caballo.jpg` sigue en uso por el Hero.
- **Defecto del archivo de BLOOM**: costura vertical en la mitad exacta de la imagen (x = 1376 px del original). Visible en desktop; en mobile el crop la evita. Pedir el archivo corregido.
- `restore.jpg` llega a 1376×768: en pantallas grandes se escala por encima de su tamaño. Pedir versión de mayor resolución.

## 11. Producción fotográfica real (2026-11-18)

Fuente única: `src/data/productionMedia.ts` (src, alt, crops desktop/mobile por foto). Originales intactos en `public/fotos-editadas/`; versiones web con el mismo nombre en `public/fotos-editadas/web/` (25 archivos, 10 MB; 150–480 KB, salvo Hero/About/cierre: 760–870 KB para conservar el grano).

| Foto | Uso |
|---|---|
| DSC05278 | Hero, segundo estado (solo ≥768 px y sin reduced motion) |
| DSC04044 | El Ritual: hover en Home/Tienda + "El cuidado como ritual" (PDP) |
| DSC04246 | PDP El Ritual: "El ritual incluye" |
| DSC04573 / DSC04795 / DSC04446 / DSC05225 | Hover de CLARITY / BLOOM / RADIANCE / RESTORE |
| DSC04199, DSC04208, DSC04698 | Galería CLARITY |
| DSC04870, DSC04815 | Galería BLOOM |
| DSC04446 | Galería RADIANCE |
| DSC05225, DSC05172, DSC05204 | Galería RESTORE |
| DSC04862 | Test de perfil: Home, PDP El Ritual y panel "Observar" del cuestionario |
| DSC05005 | Panel del resultado del cuestionario |
| DSC04269 / DSC03650 / DSC03674 + DSC04194 | About: apertura / Adentro-afuera / banda de campo |
| DSC04535 / DSC04169 / DSC03653 | Lecturas (Home y Explorar): destacada / 2ª / 3ª |
| DSC04573, DSC04888, DSC05172 | El universo ORMONIA |
| DSC05189 | Cierre "Unite al ritual" |

- **Verificación de producto por etiqueta**: DSC04698 muestra CLARITY (no RADIANCE) → va a CLARITY; el hover de RADIANCE es DSC04446, la única toma con RADIANCE.
- **Naming**: "Descubrí tu piel" → "Test de perfil de piel" en todo el texto visible (nav, footer, popup, fichas, Calendario, About, SEO). La URL sigue siendo `/descubri-tu-piel`.
- **Deploy**: Vite copia todo `public/`: hoy `dist/` pesa ~310 MB, 264 MB son `fotos-editadas` (originales). Antes de producción, mover los originales fuera de `public/` (p. ej. `assets-source/fotos-editadas/`) y dejar solo `web/`.

## 12. Tipografías de marca (2026-11-19) — reemplazada por §13

- `@font-face` en `src/index.css`; tokens en `:root` (`--font-editorial` Cardone, `--font-sans` ALT Systema, `--font-accent` Yorick, `--font-wordmark`) y en `tailwind.config.ts` (`font-display`/`font-editorial`, `font-sans`, `font-accent`, `font-wordmark`). `font-display` sigue existiendo como alias de la editorial.
- Pesos reales por rango: ALT Systema Regular cubre 100–450 y Semibold 500–900; Cardone y Yorick un solo corte. `font-synthesis: none` en `html` (sin negritas ni itálicas falsas). Regla única: todo texto `uppercase` (navegación, botones, eyebrows, labels) usa ALT Systema Semibold.
- Precarga: Cardone + ALT Systema Semibold (primer viewport de la Home). ALT Systema Regular y Yorick, carga normal.
- Pesos: Cardone 27 KB · Yorick 24 KB · ALT Systema Regular 89 KB · Semibold 98 KB (OTF/TTF). Respaldo Newsreader (solo glyphs faltantes, WOFF2): ~7 KB.
- **⚠️ Cardone y Yorick son TRIAL**: reemplazar por webfonts licenciados antes del deploy comercial. Al hacerlo, pedir/convertir a **WOFF2** (≈40–50% menos peso que OTF/TTF), incluidas las dos de ALT Systema.
- **⚠️ Cardone Trial no trae á í ó ú ñ ¿ ¡ $ / # · ni algunas comillas.** `index.html` pide a Google Fonts solo esos glyphs de Newsreader Light Italic (`&text=`), que se integran casi sin notarse. Eliminar ese `<link>` y "Newsreader" de `--font-editorial` al tener Cardone licenciada (verificar que la licenciada traiga el set latino completo).
- Fraunces e Inter (Google Fonts) ya no se cargan.

## 13. Corrección tipográfica (2026-11-19)

La pasada §12 no se aprobó (wordmark sin identidad, Cardone en exceso, Hero demasiado "fashion"). Se recupera el sistema anterior y las fuentes de marca quedan como acentos según el packaging. Solo tipografía: sin cambios de fotos, layout, animaciones, copy ni estructura.

- **Wordmark = logotipo vectorial, nunca texto.** `src/components/brand/Wordmark.tsx` (hereda `currentColor`) y `public/brand/ormonia-wordmark.svg`. Trazados extraídos de las curvas del archivo oficial `Spray editable (2).ai` (etiqueta del spray AURA): O R M O N I A + ®. Usado en Header, Footer, menú mobile, header del Test y apertura de About (h1 con nombre accesible). No se encontró `SERUM texto en curvas.pdf`; si aparece una versión maestra del logo, reemplazar los `PATHS` del componente.
- `--font-display` vuelve a **Fraunces** (Google Fonts, 400–600 + itálicas): todos los titulares editoriales (Hero, El Ritual, Test, Calendario, About, Lecturas) recuperan su serif anterior. Hero: mismo texto, tamaño y posición que antes de §12.
- **Cardone** (`font-editorial`) solo en: nombres de sérum (cards del riel y de Tienda, h1 de cada PDP de sérum, lista "Incluye" de El Ritual y fórmulas de la PDP del pack) en tipo título vía `serumDisplayName()`; frase de marca y caption en About.
- **Yorick** (`font-accent`) solo en: ingredientes/activos (cards y chips de la PDP) y las dos numeraciones (Calendario "Cómo se usa", PDP del pack). Yorick Trial no trae á í ó ú ñ: Fraunces cubre esos glyphs.
- **ALT Systema**: Regular para body, PDP, formularios, carrito, búsqueda y cuenta; Semibold para navegación, botones, eyebrows, labels, fases y precios (`PriceTag` y precio de cards en `font-semibold`). La regla `uppercase → 600` excluye `font-display`.
- `--font-wordmark` eliminado. Precarga: solo ALT Systema Semibold.

