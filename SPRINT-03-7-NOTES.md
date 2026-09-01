# ORMONIA — Sprint 03.7

## Implementado

### El Ritmo
- Se eliminó la solución SVG de ondas/espiral de Sprint 03.6.
- Se incorporó `public/ritual-water.mp4`, usando el video real de agua provisto.
- En desktop el video se controla por scroll (scrub de `currentTime` con GSAP/ScrollTrigger).
- Hero/paisaje → agua: fundido progresivo, sin corte a blanco.
- Agua → El Ciclo: wash marrón progresivo para mantener continuidad.
- Los tres mensajes narrativos siguen apareciendo en secuencia.
- Mobile usa el mismo video en loop de fondo, sin scroll-scrub pesado.

### El Ciclo
- Eliminados por completo los números gigantes de fondo.
- Sin órbita, sistema solar ni espiral gráfica.
- Se agregó atmósfera Ormonia: fragmento muy suave de pradera + capas minerales/oliva/marrón.
- Se refinó nuevamente el crossfade entre CLARITY / BLOOM / RADIANCE / RESTORE.
- Se redujo el desplazamiento del frasco para que el cambio se sienta más como mutación que slide.
- Navegación inferior reemplazada por líneas editoriales discretas por fase.

### Los 4 serums + Pack x4
- Se mantienen las imágenes reales de los cuatro serums en la grilla.
- Se agregó un bloque comercial grande para el pack completo.
- Asset: `public/products/ritual-completo.png`.
- Titular: “Las 4 fases, un solo ritual.”
- CTA temporal: “Descubrir el ritual completo”, dirigido a `/products` hasta que exista el PDP específico del pack.
- No se agregó precio todavía.

## Archivos principales modificados
- `src/components/sections/RhythmSection.tsx`
- `src/components/sections/CycleSection.tsx`
- `src/components/sections/FourPhasesSection.tsx`

## Assets nuevos
- `public/ritual-water.mp4`
- `public/products/ritual-completo.png`

## Validación
El entorno de generación no pudo instalar dependencias porque su registry interno no contiene `@babel/core`, por lo que el build final debe validarse localmente con `pnpm dev` / `pnpm build`.
