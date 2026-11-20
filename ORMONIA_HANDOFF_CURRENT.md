# ORMONIA — HANDOFF CURRENT
**Estado de proyecto para desarrollo**  
**Fecha:** 2026-10-01

> Este documento complementa `ORMONIA_MASTER_PLAN_v3.md`.
> Si hay una contradicción entre documentos, usar esta prioridad:
>
> **1. Repo actual + este handoff**  
> **2. `ORMONIA_MASTER_PLAN_v3.md`**  
> **3. Versiones anteriores / componentes viejos / pruebas**
>
> El Master Plan sigue siendo la fuente estratégica de marca y arquitectura general.
> Este handoff registra decisiones y cambios tomados después de V3.

---

# 1. Objetivo del proyecto

ORMONIA es una marca premium de skincare con una experiencia digital editorial, sensorial y comercial.

Concepto central:

> **Lo que cambia adentro se expresa afuera.**

La experiencia no debe sentirse como una suma de “secciones lindas” aisladas. La Home tiene que leerse como **una sola página continua**, con cambios de ritmo, pero sin transiciones artificiales o grandes degradados usados solo para esconder cortes.

El sitio debe equilibrar:

- marca;
- storytelling;
- educación;
- descubrimiento de piel;
- ecommerce;
- conversión.

---

# 2. Stack actual

- Vite
- React
- TypeScript
- Tailwind
- GSAP
- ScrollTrigger
- Lenis
- React Router

Comandos usados durante desarrollo:

```bash
pnpm dev
tsc -p tsconfig.app.json
pnpm lint
pnpm build:prod
```

Nota técnica conocida:

- `pnpm check` históricamente no chequeaba tipos correctamente porque el `tsconfig.json` raíz tenía `"files": []`.
- Por eso se viene validando TypeScript con:
  `tsc -p tsconfig.app.json`

Verificar si esto sigue vigente antes de modificar tooling.

---

# 3. Fuentes de verdad

## Estratégica
`ORMONIA_MASTER_PLAN_v3.md`

## Implementación
El repo actual.

## Estado / decisiones posteriores a V3
Este archivo.

No reconstruir una sección aprobada solamente porque el Master Plan describa una versión anterior.

---

# 4. Marca — no negociables

## Voz
Editorial, orgánica, calma, sofisticada, íntima, sensorial, premium e informada.

## Evitar
No usar como claims de marca/producto:

- equilibrar hormonas;
- detox;
- sanar hormonalmente;
- curar;
- milagro;
- resultados garantizados;
- energía femenina sagrada;
- diosa;
- lenguaje vibracional;
- pseudociencia.

## Vocabulario compatible

- acompañar;
- observar;
- escuchar;
- reconocer;
- ritmo;
- ciclo;
- barrera cutánea;
- microbioma;
- regulación;
- presencia;
- claridad;
- restauración;
- cambio.

La comunicación debe evitar sonar clínica o médica cuando no corresponde.

---

# 5. Productos

## CLARITY
**Referencia de fase:** menstrual  
Activos principales:
- Jojoba
- Caléndula
- Rosa Mosqueta
- Vitamina E

## BLOOM
**Referencia de fase:** folicular  
Activos:
- Niacinamida
- Glicerina
- Sodium Hyaluronate
- Acetyl Hexapeptide-8

## RADIANCE
**Referencia de fase:** ovulatoria  
Activos:
- Magnesium Ascorbyl Phosphate
- Glicerina
- Panthenol

## RESTORE
**Referencia de fase:** lútea  
Activos:
- Glicerina
- Centella Asiática
- Pentapeptide-18

## AURA
Producto futuro. No forma parte del ciclo de cuatro fases.

---

# 6. Decisión importante sobre fases

El ciclo sigue siendo parte del universo conceptual de ORMONIA, pero:

> **Los sérums no deben presentarse como productos que solo se pueden usar/comprar en una fase concreta.**

La fase informa y contextualiza.

En las zonas de ecommerce, el producto debe dominar y la fase tener jerarquía secundaria.

Esto es especialmente importante porque no todas las usuarias viven o identifican una experiencia cíclica marcada.

---

# 7. Tokens / identidad visual

Tokens históricos del proyecto:

```css
--ormonia-ivory: #F2EBDD;
--ormonia-sand: #D9CBB6;
--ormonia-earth: #6A4A35;
--ormonia-brown: #342115;
--ormonia-ink: #191511;
--ormonia-stone: #8B8175;
--ormonia-amber: #B56A32;
--ormonia-olive: #6B6A4B;
```

Tipografía:
- Field Studies Flora como intención de marca.
- Fraunces se usó como prototipo/fallback serif.
- Inter para sans.

No reemplazar tipografías o sistema visual global sin validación.

---

# 8. Header — comportamiento aprobado

Header:

- transparente;
- sin fondo;
- sin backdrop blur;
- visible sobre Hero;
- al hacer scroll hacia abajo y salir del Hero, se oculta con opacity + pequeño translate;
- al hacer scroll hacia arriba, reaparece;
- el fondo sigue transparente;
- cambia solamente el color del texto según el tono declarado de la sección.

Sistema:
- usar el mecanismo declarativo existente con `data-header-tone`;
- NO usar pixel sampling del fondo/video.

Sobre fondo claro:
- ink / negro ORMONIA.

Sobre fondo oscuro:
- ivory / claro.

La shipping bar:
- aparece arriba inicialmente;
- NO es sticky;
- NO debe reaparecer con el smart header.

Texto shipping aprobado:
**ENVÍO GRATIS EN ÓRDENES MAYORES A $145.000**

---

# 9. Arquitectura objetivo actual de Home

> **ACTUALIZADO 2026-10-29:** el orden vigente es Hero → Pack x4 → Los esenciales →
> Calendario cíclico → El Ciclo → Descubrí tu piel → Lecturas → Instagram → Unite al ritual.
> Agua + El Registro salió de Home. Ver `ORMONIA_INTEGRAL_PASS.md`. Lo que sigue es histórico.

La arquitectura visual acordada es:

1. Hero
2. El Ciclo
3. Pack x4
4. Los esenciales de ORMONIA
5. Agua + El Registro
6. Descubrí tu piel
7. Lecturas para el ritual
8. Instagram dinámico
9. Cierre / Unite al ritual + footer

IMPORTANTE:

En el repo todavía pueden existir componentes viejos entre estas piezas, especialmente:

- `InsideOutsideSection`
- `RitualSection`
- `DiscoverYourRhythmSection`

No asumir que esos componentes forman parte de la arquitectura final solo porque siguen montados.

Revisar `Home.tsx`.

`DiscoverYourRhythmSection` es especialmente importante porque puede actuar como **segundo teaser viejo de diagnóstico** y competir con la nueva experiencia `/descubri-tu-piel`.

---

# 10. HERO — estado

Estado: **aprobado por ahora**.

Elementos clave:

- Hero con pradera/caballo.
- Claim:
  **Lo que cambia adentro  
  se expresa afuera.**
- CTA:
  **DESCUBRIR EL RITUAL**
- El CTA no lleva flecha/espiral decorativo.
- El CustomCursor puede expandirse en hover.
- Header integrado sobre el Hero.

NO seguir puliendo Hero salvo que aparezca un bug concreto.

---

# 11. EL CICLO — estado

Estado: **aprobado por ahora**.

Headline:

> **Tu piel cambia.  
> Tu ritual también.**

La sección usa los cuatro sérums en una escena de rotación/cambio.

Objetivo UX:
- movimiento continuo;
- sin sensación de “STOP serum 1 / STOP serum 2”;
- sin snap;
- sin pausas artificiales;
- productos siguen visibles;
- copy, fondos e indicador deben sentirse sincronizados.

La dirección exacta del movimiento debe respetar la implementación aprobada del repo; no cambiar derecha/izquierda arbitrariamente.

Indicadores:
- MENSTRUAL
- FOLICULAR
- OVULATORIA
- LÚTEA

La fase no debe ser la única razón de compra; esta sección explica el sistema, mientras que ecommerce vende productos también por necesidad de piel.

---

# 12. Desde Pack x4 en adelante — cambio de lenguaje

Decisión aprobada:

> Desde Pack x4 en adelante, la Home entra en un universo más claro / ivory / crema.

Evitar:
- grandes transiciones cinematográficas;
- gradientes enormes entre secciones;
- fondos oscuros encadenados sin necesidad;
- “cards dentro de cards”.

Referencia conceptual de continuidad:
InBluem fue útil como referencia de claridad/comercialidad, no como template literal.

---

# 13. PACK X4 — estado

Estado: **aprobado como base / pendiente de producción final**.

Concepto central:

> **Las 4 fases, un solo ritual.**

El Pack x4 es un producto central, no un bundle secundario.

Dirección visual actual:
- fondo claro;
- copy a la izquierda;
- gran visual/editorial a la derecha;
- se exploró forma tipo arco inspirada en una propuesta de Stitch;
- hover de imagen puede cambiar entre material de pack/unboxing.

Assets digitales generados para producción/concepto:
- caja clara abierta con los sérums;
- caja negra abierta;
- mano sacando un sérum;
- manos abriendo/cerrando packaging.

Uso sugerido:
- default: caja clara abierta;
- hover: mano retirando sérum;
- caja negra: alternativa / segunda imagen;
- manos cerrando: material secundario.

El Pack final debe recibir fotografías reales de producción.

No rediseñar completamente el componente salvo que haya una razón fuerte.

---

# 14. LOS ESENCIALES DE ORMONIA — estado

Estado: **aprobado por ahora**.

Headline:

> **Los esenciales de ORMONIA.**

Bajada:

> **Fórmulas pensadas para acompañar lo que tu piel necesita.**

Dirección:
- cards grandes;
- redondeadas;
- editorial/ecommerce;
- inspiración de escala/UX en Rhode;
- desktop muestra aproximadamente 3 cards + parte de la siguiente;
- carrusel horizontal;
- flechas sobre el carrusel, centradas verticalmente sobre las cards;
- mobile: una card grande + parte de la siguiente, swipe.

Cada card:
- producto grande;
- nombre;
- hairline;
- precio provisional;
- activos secundarios;
- quick action circular arriba a la derecha.

Precio provisional usado en desarrollo:
`$55.000`

Debe estar centralizado en data y luego reemplazarse por Shopify.

Quick add:
- hoy NO existe carrito real;
- el control actual navega a PDP o usa la infraestructura disponible;
- no fingir “producto agregado” si no existe carrito real.

## Pendiente importante de 04B

Cuando exista producción real:

> Reemplazar el hover placeholder por video/foto de modelo usando ese sérum.

El hover final debería sentirse vivo:
- video autoplay muted o segunda foto;
- crossfade suave;
- nombre/precio/quick action siguen disponibles.

No perder tiempo refinando el placeholder actual.

---

# 15. AGUA + EL REGISTRO — estado

Estado: **aprobado**.

Función:
pausa sensorial después del bloque de ecommerce.

Asset:
`public/ritual-water.mp4`

Principio no negociable:

> **El video se mueve de forma autónoma y nunca depende del scroll.**

No hacer:
- `currentTime = scrollProgress`
- scrubbing del playback;
- pause/play según scroll;
- UI de reproductor;
- controles falsos.

El scroll solo controla:
- copy;
- opacity;
- pequeños desplazamientos.

Dirección final:
- agua siempre viva;
- sin fades superior/inferior;
- sin neblina en bordes;
- El Registro visible y estable;
- copy de la izquierda evoluciona suavemente.

Copy trabajado para izquierda:

Momento 1:
> **La piel también tiene un ritmo.**  
> Cambia, responde, se transforma.

Momento 2:
> **Aprender a mirarla  
> cambia la forma de cuidarla.**

El Registro:
- a la derecha en desktop;
- siempre presente;
- panel muy transparente;
- CTA más claro;
- no card blanca pesada.

Copy trabajado:

> **El Registro**  
> Ideas, fórmulas y rituales para entender mejor tu piel y elegir cómo cuidarla.

Formulario:
- TU EMAIL
- RECIBIR EL REGISTRO

No existe proveedor real conectado todavía.

---

# 16. DESCUBRÍ TU PIEL — diagnóstico

Este proyecto cambió de dirección después de estudiar la experiencia de Typology.

Ya NO se entiende como un simple teaser futuro.

Existe una feature real:

## Ruta principal
`/descubri-tu-piel`

## Resultado
`/descubri-tu-piel/resultado`

Sprint 07A está implementado y aprobado.

---

# 17. Sprint 07A — archivos / arquitectura

Archivos creados históricamente:

- `src/lib/skinQuiz.ts`
- `src/data/skinQuiz.ts`
- `src/hooks/useSkinQuiz.ts`
- `src/pages/DiscoverSkin/index.tsx`
- `src/pages/DiscoverSkin/Result.tsx`
- `src/pages/DiscoverSkin/DiscoverShell.tsx`
- `src/pages/DiscoverSkin/DiscoverVisual.tsx`
- `src/pages/DiscoverSkin/AnswerOption.tsx`
- `src/pages/DiscoverSkin/EmailCapture.tsx`
- `src/pages/DiscoverSkin/WhyWeAsk.tsx`

Router modificado con las dos rutas.

Arquitectura:
- questionnaire data-driven;
- NO hardcodear una pantalla por pregunta;
- respuestas almacenadas por id;
- single y multi choice;
- navegación back/next;
- progreso;
- explicación “¿Por qué te preguntamos esto?”;
- email final;
- resultado provisional.

---

# 18. Sprint 07A — preguntas V1

Actualmente son ocho pasos de contenido.

## 01 — prioridad
**¿Qué te gustaría mejorar hoy en tu piel?**

Ejemplos:
- Hidratación
- Luminosidad
- Textura
- Poros visibles
- Sensibilidad
- Marcas
- Líneas
- Brillo
- Nada en particular

## 02 — segunda prioridad
**¿Hay algo más que quieras acompañar?**

Hereda las anteriores, excluye la elegida y agrega:
- No, eso es lo principal

## 03 — sensación
**Al final del día, ¿cómo suele sentirse tu piel?**

## 04 — incomodidad
**Cuando tu piel está incómoda, ¿cómo lo notás?**

Permite hasta dos selecciones.

## 05 — reactividad
**¿Cómo suele reaccionar cuando probás algo nuevo?**

## 06 — observación
**Cuando la observás de cerca, ¿qué suele llamar tu atención?**

Permite hasta dos.

## 07 — cambio
**¿Sentís que tu piel cambia en distintos momentos del mes?**

Opciones incluyen:
- Sí, bastante
- Sí, un poco
- Muy poco
- No
- No lo sé
- No aplica en mi caso

Esta pregunta es complementaria y NO debe impedir usar productos.

## 08 — rutina
**Hoy, ¿cómo describirías tu rutina?**

---

# 19. Referencia Typology — qué tomar y qué NO

Se estudió el diagnóstico de Typology como referencia de UX.

Tomar conceptualmente:
- experiencia dedicada;
- split screen;
- visual persistente a izquierda;
- pregunta a derecha;
- barra de progreso;
- una pregunta por vez;
- chips;
- Previous / Next;
- explicación de por qué se pregunta;
- email al final;
- resultado con explicación + recomendaciones.

NO copiar:
- identidad;
- tipografía;
- layout pixel-perfect;
- códigos como AE(+);
- contenido literal;
- diagnóstico clínico;
- lógica de 24 tipos;
- claims.

La experiencia ORMONIA debe sentirse:
- humana;
- editorial;
- orgánica;
- menos clínica.

---

# 20. Diagnóstico — visuales

Desktop:
- split screen;
- aprox. 40–44% visual izquierda;
- 56–60% cuestionario derecha.

El panel izquierdo está preparado por `visualGroup`.

Por ahora:
- algunos visuales son placeholders de producción;
- el grupo “cambio” usa el agua existente;
- NO dedicar tiempo a embellecer placeholders.

Producción final:
- macro de piel;
- luz;
- textura;
- manos;
- agua/reflejo;
- retratos reales.

Los visuales deberían cambiar por bloques de preguntas, no necesariamente en cada paso.

---

# 21. Email del diagnóstico

Al final:

Headline:
> **Tu lectura está lista.**

Copy:
> Dejanos tu email para guardar tu resultado y enviarte tu ritual recomendado.

CTA:
> **VER MI RESULTADO**

Debe existir también:
> **CONTINUAR SIN GUARDAR**

No hay proveedor de email conectado actualmente.

No simular envío real.

---

# 22. Resultado del diagnóstico

La UI está implementada como shell/demo.

Debe diferenciar en el futuro:

## Fenotipo
Comportamiento relativamente estructural de la piel.

## Estado actual
Lo que la piel parece necesitar ahora.

Esto es importante.

No queremos un código rígido que defina a la persona para siempre.

Resultado futuro debería incluir:

- lectura de piel;
- explicación;
- ejes visuales;
- “Lo que observamos”;
- “Lo que tu piel parece pedir ahora”;
- ritual recomendado;
- producto principal;
- complemento;
- Pack completo cuando corresponda.

Actualmente el resultado es provisional y no debe hacerse pasar por un diagnóstico real.

---

# 23. Sprint 07B — BLOQUEADO por contenido

NO implementar lógica real todavía sin definición del equipo.

Falta definir:

1. cuántos fenotipos ORMONIA existen;
2. nombre de cada fenotipo;
3. características de cada uno;
4. respuestas que contribuyen a cada fenotipo;
5. cómo se diferencia fenotipo de estado actual;
6. pesos/scoring;
7. reglas de desempate;
8. qué producto recomendar en cada combinación;
9. cuándo recomendar Pack x4;
10. copy real del resultado.

Costura técnica preparada:
`readSkin(...)` en `src/lib/skinQuiz.ts`.

No inventar scoring “dermatológico” ni precisión científica.

---

# 24. DESCUBRÍ TU PIEL — entrada en Home

Se creó una sección de campaña en Home después de Agua + El Registro.

Componente histórico:
`DiscoverYourSkinSection.tsx`

Dirección:
- aprox 90svh;
- campaña grande;
- fotografía como protagonista;
- copy izquierda;
- CTA a `/descubri-tu-piel`;
- movimiento mínimo;
- no explicar ocho pasos ni scoring.

El fondo actual puede ser un placeholder tonal.

> **NO es el asset final.**

La sección final debe usar fotografía de producción:
- horizontal;
- piel/persona real;
- textura visible;
- luz natural/suave;
- sin retoque excesivo;
- nada clínico;
- nada de spa genérico;
- espacio negativo para copy;
- crop diferenciado desktop/mobile.

Copy aprobado conceptualmente más reciente:

Eyebrow:
**DESCUBRÍ TU PIEL**

Headline:
> **Tu piel tiene una forma propia de responder.**

Bajada:
> **Un recorrido breve para entender cómo se comporta y qué necesita hoy.**

CTA:
**DESCUBRIR MI PIEL**

IMPORTANTE:
Verificar el repo actual. Es posible que todavía figure el copy anterior:
“Entender tu piel empieza por observarla.”

Si está el anterior, actualizar al copy de arriba.

---

# 25. Otros entry points del diagnóstico

Pendiente de unificación:

- Popup de “Descubrí tu piel” puede seguir apuntando a `/discover`.
- `DiscoverYourRhythmSection` puede seguir apuntando a `/discover`.
- Pueden existir otros CTA legacy.

Objetivo futuro:
centralizar entradas relevantes hacia:

`/descubri-tu-piel`

No cambiar todo a ciegas. Revisar primero qué rutas legacy tienen otra función.

Popup futuro:
- “Descubrí tu piel”
- mencionar “fenotipo” solo como microcopy secundario
- 5% OFF
- delay/scroll trigger
- frequency limited
- closable
- NO inmediato al cargar.

---

# 26. Shopify — futuro backend

Dirección acordada:

Frontend:
- React/Vite custom.

Shopify:
- productos;
- inventario;
- precios;
- descuentos;
- checkout;
- órdenes;
- pagos.

No convertir el sitio visual a un theme Shopify genérico.

No hardcodear permanentemente:
- precios;
- stock;
- descuentos;
- variantes.

Preparar componentes para consumir Shopify luego.

---

# 27. Fotografía / producción pendiente

Hay varias piezas cuya calidad final depende de producción real.

## Pack x4
Necesitamos:
- caja;
- unboxing;
- cuatro sérums;
- manos;
- foto horizontal de campaña.

## Individuales
Necesitamos:
- producto limpio;
- modelo con cada sérum;
- video/foto para hover.

## Diagnóstico
Necesitamos:
- macro de piel;
- distintos tipos de piel;
- luz real;
- manos/texturas;
- retratos.

## Entrada Descubrí tu piel
Necesitamos:
- campaña horizontal fuerte;
- sujeto centro/derecha;
- espacio negativo para copy izquierda.

## Clips sugeridos
4K/60fps si es posible:
- dropper;
- pipeta;
- gota;
- aplicación en mano/piel;
- rotación de frasco;
- ondas de agua;
- sol/sombras;
- naturaleza;
- tomas amplias.

Evitar:
- spa genérico;
- props de laboratorio;
- poses influencer;
- manicura protagonista;
- vegetación decorativa aleatoria.

---

# 28. Lecturas para el ritual — pendiente

Esta es la siguiente gran sección editorial a desarrollar después de cerrar la entrada al diagnóstico.

Intención:
- YouTube / blog / escritos;
- contenido editorial;
- cambio de ritmo después de campaña/diagnóstico;
- no otra gran sección ecommerce.

Todavía no está definida al mismo nivel de detalle que las anteriores.

---

# 29. Instagram — pendiente

Home debe incluir:
- bloque dinámico;
- aprox. 3 posts visibles;
- integrado con la estética;
- no grid genérico de plugin si se puede evitar.

---

# 30. Cierre / footer — pendiente

Debe incluir:
- Unite al ritual;
- navegación final;
- footer completo.

El Registro ya vive antes en la Home.
No duplicar un newsletter pesado en footer salvo decisión posterior.

---

# 31. Componentes legacy / limpieza

NO eliminar componentes viejos solo porque parezcan sin uso.

Antes:
1. revisar imports;
2. revisar rutas;
3. revisar referencias en Home;
4. confirmar que no contienen assets/animaciones reutilizables.

Posibles legacy:
- `RegisterSection.tsx`
- `NewsletterBlock.tsx`
- `DiscoverYourRhythmSection`
- secciones antiguas de Inside/Outside o Ritual.

El objetivo final es limpiar, pero no durante una tarea no relacionada.

---

# 32. Deuda técnica conocida

Revisar:

- configuración de typecheck (`pnpm check` vs `tsconfig.app.json`);
- cualquier error histórico de tipos en `HeroLandscape.tsx`;
- rutas legacy `/discover`;
- infraestructura real de carrito;
- proveedor de newsletter/email;
- integración Shopify;
- componentes antiguos aún montados;
- consistencia de `data-header-tone`;
- reduced motion en secciones GSAP.

No arreglar todo en una sola PR.

---

# 33. CustomCursor

Existe un cursor contextual global.

Reutilizarlo.

No crear nuevos cursores por sección.

Puede:
- expandirse;
- cambiar tono para contraste.

Debe seguir siendo sutil.

---

# 34. Filosofía de animación

ORMONIA no debe sentirse como un showcase de animaciones.

Preferir:
- continuidad;
- crossfade;
- translate suave;
- scrub controlado;
- autonomía de video;
- microinteracción.

Evitar:
- snap;
- rebotes;
- efectos “tech”;
- demasiados pins;
- scroll atrapado;
- cambios instantáneos;
- animar por animar.

---

# 35. Regla para transiciones

Decisión aprendida durante el proyecto:

> **No usar grandes fades/degradados para intentar hacer continua la Home.**

Muchas veces un corte limpio funciona mejor.

La continuidad debe venir de:
- ritmo;
- color;
- composición;
- tipografía;
- motion interno.

No de “neblina” entre bloques.

---

# 36. Estado resumido por bloque

| Bloque | Estado |
|---|---|
| Hero | Aprobado por ahora |
| Header | Aprobado / sistema declarativo |
| El Ciclo | Aprobado por ahora |
| Pack x4 | Aprobado base, pendiente producción |
| Los esenciales | Aprobado |
| Hover video individuales | Pendiente producción |
| Agua + El Registro | Aprobado |
| Diagnóstico 07A | Implementado y aprobado |
| Lógica 07B | Bloqueada por definición de fenotipos |
| Entrada Descubrí tu piel Home | Implementada, pendiente foto final + verificar copy |
| Lecturas | Pendiente |
| Instagram | Pendiente |
| Footer/cierre | Pendiente |
| Shopify | Pendiente integración |
| Newsletter backend | Pendiente |
| Unificar `/discover` | Pendiente |

---

# 37. Próximos pasos recomendados

Orden recomendado:

1. Hacer commit/tag del estado aprobado actual.
2. Verificar copy final de `DiscoverYourSkinSection`.
3. No tocar placeholders visuales hasta producción.
4. Desarrollar “Lecturas para el ritual”.
5. Resolver Instagram.
6. Resolver cierre/footer.
7. Unificar entry points de diagnóstico.
8. Definir fenotipos con equipo ORMONIA.
9. Implementar Sprint 07B.
10. Integrar Shopify.
11. Conectar newsletter/email.
12. Sustituir placeholders por producción final.
13. QA completo desktop/mobile/accessibility/performance.
14. Cleanup final de componentes legacy.

---

# 38. Antes de empezar a desarrollar

La persona que tome el repo debería:

1. Leer `ORMONIA_MASTER_PLAN_v3.md`.
2. Leer este archivo completo.
3. Ejecutar:
   ```bash
   pnpm install
   pnpm dev
   ```
4. Recorrer visualmente TODA la Home.
5. Recorrer `/descubri-tu-piel`.
6. Completar el test entero.
7. Revisar `/descubri-tu-piel/resultado`.
8. Ejecutar:
   ```bash
   tsc -p tsconfig.app.json
   pnpm lint
   pnpm build:prod
   ```
9. Revisar `Home.tsx`.
10. Revisar:
    - `content.ts`
    - `products.ts`
    - `skinQuiz.ts`
    - `lib/skinQuiz.ts`
    - `Header.tsx`
11. Identificar componentes legacy antes de eliminarlos.
12. No empezar con un refactor general.

---

# 39. Cómo trabajar sobre lo aprobado

Para cada cambio:

1. Identificar el scope.
2. No tocar componentes fuera del scope salvo necesidad real.
3. Mantener el lenguaje visual existente.
4. Ejecutar typecheck/lint/build.
5. Revisar en browser.
6. Documentar archivos modificados.
7. Hacer commits frecuentes.

Se perdió tiempo anteriormente por tener mucho trabajo aprobado sin commits.

Evitar repetirlo.

---

# 40. Regla final

ORMONIA no busca parecer:

- un theme de Shopify;
- un portfolio experimental;
- una web clínica;
- una marca de wellness pseudocientífica.

Debe sentirse como:

> **una marca de skincare editorial, premium y contemporánea que ayuda a observar la piel, comprender cómo cambia y elegir un cuidado con intención.**
