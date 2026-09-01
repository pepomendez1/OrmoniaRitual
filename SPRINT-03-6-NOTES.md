# ORMONIA — Sprint 03.6 / Liquid Rhythm

## Qué cambió

- Reemplazado el gesto de líneas tipo “montañas” en `RhythmSection` por una escena de agua abstracta.
- El impacto de una gota se sugiere con un punto de luz; no se muestra una gota literal.
- Las ondas son elipses imperfectas con `feTurbulence` + `feDisplacementMap`, animadas por GSAP con scroll.
- Las ondas se expanden, derivan y pierden concentricidad para sugerir ritmo/ciclo sin dibujar una espiral literal.
- La transición paisaje -> agua oscura -> campo mineral es gradual y ocurre dentro de una única sección pinneada.
- La salida de `RhythmSection` termina exactamente en el color base inicial de `CycleSection` (`#cbb69f`) para evitar un corte visible.
- Eliminado el trazo abierto que todavía quedaba detrás de `CycleSection`; la escena del producto queda limpia.
- Suavizado el morph entre serums en desktop: crossfade más largo + blur temporal + menor desplazamiento.
- En mobile se usa una versión estática/editorial de las ondas, sin pin ni simulación pesada.

## Archivos tocados

- `src/components/sections/RhythmSection.tsx`
- `src/components/sections/CycleSection.tsx`

## Intención visual

No representar una espiral como símbolo. La secuencia debe sentirse como:

`impacto -> onda -> ritmo -> ciclo`

La referencia es agua/refracción/luz, no una infografía ni un sistema solar.
