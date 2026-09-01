# ORMONIA_MASTER_PLAN

> **Documento maestro / Source of Truth del proyecto ORMONIA Web**
>
> Estado base: **Sprint 03.8**
>
> Este archivo define la visión, arquitectura, orden de trabajo, criterios visuales, decisiones aprobadas y reglas de implementación de la web de ORMONIA. Si una instrucción nueva contradice este documento, **no asumir ni reinterpretar**: señalar la contradicción antes de modificar arquitectura, comportamiento o una decisión aprobada.

---

# 1. Propósito del proyecto

ORMONIA es una marca de skincare construida alrededor de una idea central:

> **Lo que cambia adentro se expresa afuera.**

La web debe traducir esa idea a una experiencia digital que combine identidad de marca, educación, ritual, sensorialidad, descubrimiento personal, venta, contenido editorial y comunidad.

La experiencia no debe sentirse como una suma de “secciones aisladas”, sino como **una sola página que fluye**, aunque técnicamente el código siga organizado en componentes independientes y mantenibles.

La home debe dejar claro relativamente temprano:

1. qué es ORMONIA;
2. que existen cuatro fórmulas asociadas a cuatro fases;
3. que existe un **Pack x4 / ritual completo**;
4. que los productos se pueden comprar individualmente;
5. que ORMONIA también propone educación, descubrimiento y contenido.

---

# 2. Regla principal de dirección creativa

ORMONIA debe tomar referencias de comportamiento, jerarquía y calidad visual de marcas como **Rhode** e **InBluem**, pero **NO debe copiarlas literalmente**.

Las referencias sirven para estudiar escala de fotografía, presencia de producto, cards grandes, navegación, microinteracciones, hover, e-commerce editorial y sensación premium.

ORMONIA debe conservar un lenguaje propio: orgánico, sensorial, natural, editorial, sofisticado, íntimo, sereno, contemporáneo, informado y femenino sin clichés.

Evitar:

- estética SaaS;
- cards pequeñas y genéricas;
- UI demasiado tecnológica;
- “sistema solar”;
- gráficos científicos decorativos;
- líneas arbitrarias;
- recursos visuales que parezcan bugs;
- stock de spa genérico;
- misticismo vacío;
- exceso de texto;
- animaciones llamativas sin función.

---

# 3. Voz y lenguaje de marca

## 3.1 Tono

La voz debe acompañar, observar y explicar. No debe prometer corregir el cuerpo ni hacer afirmaciones médicas.

Palabras alineadas: acompañar, escuchar, observar, reconocer, ciclo, ritmo, barrera cutánea, microbioma, regulación, presencia, umbral, repliegue, florecimiento, restauración, claridad y ritual.

## 3.2 Evitar

No usar afirmaciones como:

- “equilibrar hormonas”;
- “detox”;
- “curar”;
- “sanar hormonalmente”;
- “milagro”;
- “resultados garantizados”;
- “energía femenina sagrada”;
- “diosa”;
- “vibracional”;
- claims médicos o pseudocientíficos no validados.

---

# 4. Productos y sistema

## CLARITY
**Fase:** Menstrual  
**Activos / ingredientes comunicables:** Jojoba, Caléndula, Rosa Mosqueta, Vitamina E.

## BLOOM
**Fase:** Folicular  
**Activos:** Niacinamida, Glicerina, Sodium Hyaluronate, Acetyl Hexapeptide-8.

## RADIANCE
**Fase:** Ovulatoria  
**Activos:** Magnesium Ascorbyl Phosphate, Glicerina, Panthenol.

## RESTORE
**Fase:** Lútea  
**Activos:** Glicerina, Centella Asiática, Pentapeptide-18.

## PACK x4 — Ritual completo

El Pack x4 **no es un bundle secundario**. Es una expresión central del concepto de ORMONIA porque representa el ritual completo de las cuatro fases.

Mensaje aprobado:

> **Las 4 fases, un solo ritual.**

En la home debe tener un momento comercial fuerte y propio.

CTA provisional:

> **Descubrir el ritual completo**

Mientras no exista Shopify/PDP, este CTA puede resolver con navegación interna o comportamiento provisional. Cuando Shopify esté integrado, el CTA debe dirigir al PDP del Pack x4.

## AURA
Producto futuro: bruma / mist revitalizante. No pertenece al sistema de las cuatro fases.

No debe forzarse dentro del ciclo.

---

# 5. Arquitectura final de la HOME

> **IMPORTANTE:** este es el orden visual final de la página. El orden de desarrollo por sprints se mantiene separado y está definido en la sección 6.

## HOME 01 — Hero + Header

### Header

Referencia de escala y jerarquía: Rhode / InBluem, reinterpretado a ORMONIA.

**Izquierda**
- TIENDA
- SOBRE ORMONIA
- EXPLORAR

**Centro**
- ORMONIA

**Derecha**
- CUENTA
- BUSCAR
- CARRITO

### Barra superior

Mostrar:

> **ENVÍO GRATIS EN ÓRDENES MAYORES A $145.000**

El umbral aprobado es **ARS 145.000**.

### Comportamiento del header

- sticky;
- extremadamente fino;
- elegante;
- transparente o integrado sobre el hero;
- cambia contraste/fondo según la escena para garantizar legibilidad;
- no debe sentirse oscuro, pequeño ni perdido sobre la fotografía;
- no usar un header grueso o genérico de e-commerce.

### Hero

Mantener la lógica visual de pradera/caballo como base de marca.

Cambios aprobados:

- texto **centrado**, no alineado a la izquierda;
- CTA centrado debajo;
- CTA principal: **Descubrir el ritual**.

### Destino CTA Hero

Por ahora: scroll hacia el bloque del **Pack x4**.  
Más adelante: cuando exista Shopify, evaluar dirigir directamente al PDP del Pack x4.

### Popup de descubrimiento

Incorporar un popup que invite al test de descubrimiento de piel.

Incentivo: **5% OFF**.

Reglas:

- NO aparece instantáneamente al cargar;
- usar delay o trigger por scroll/interacción;
- debe poder cerrarse;
- frecuencia limitada para no mostrarse en cada visita;
- no debe arruinar la primera impresión del hero.

Lenguaje principal:

> **Descubrí tu piel**

En una línea secundaria o microcopy debe aparecer la noción de **fenotipo**, para diferenciarlo de “Descubrir tu ritual”.

---

## HOME 02 — El Ciclo / 4 serums

Esta sección llega temprano. No hacer que el usuario atraviese animaciones narrativas largas antes de entender el producto.

### Función

Esta sección **explica el sistema**, no funciona todavía como grilla tradicional de compra.

### Interacción aprobada

- los 4 serums visibles;
- uno protagonista grande y al frente;
- protagonista centrado;
- texto al costado;
- al hacer scroll, los productos rotan una posición **hacia la derecha**;
- el producto de la punta reaparece del otro lado;
- secuencia conceptual: CLARITY → BLOOM → RADIANCE → RESTORE.

### Información por estado

Mostrar de forma limpia:

- fase;
- nombre del serum;
- beneficio breve;
- activos principales.

### Fondos

**Cada serum debe sentirse claramente diferente.**

Diferenciar cada fase mediante temperatura, iluminación, materia, textura, tono, naturaleza y fotografía de campaña cuando exista.

No usar plantas arbitrarias que puedan confundirse con ingredientes reales.

Mientras no existan las fotos finales de producción, usar fondos temporales claramente diferenciados en dirección visual, pero fáciles de reemplazar más adelante.

### No hacer

- no números gigantes detrás de los productos;
- no líneas diagonales decorativas;
- no órbitas;
- no “sistema solar”;
- no hacer que los frascos queden escondidos en la parte inferior;
- no dejar fondos vacíos sin intención.

---

## HOME 03 — Pack x4 / Ritual completo

Después de explicar las cuatro fases aparece el Pack x4 como propuesta comercial central.

### Mensaje

> **Las 4 fases, un solo ritual.**

### Dirección visual

Inspiración en cards editoriales de Rhode / InBluem:

- card/recuadro grande;
- bordes redondeados;
- mucha presencia fotográfica;
- imagen de producto grande al centro;
- el producto debe lucirse;
- no parecer una card estándar de Shopify.

### Hover

- hover cambia a una segunda fotografía;
- idealmente futura imagen de producción/campaña;
- usar cursor contextual circular en lugar del cursor estándar dentro de la card;
- interacción suave y premium.

### CTA

> **Descubrir el ritual completo**

El bloque debe comunicar que comprar los cuatro productos juntos es la forma de vivir el ciclo completo y que existe una ventaja económica frente a comprarlos por separado, cuando los precios definitivos permitan comunicarla.

---

## HOME 04 — Productos individuales / Shopping

Luego del pack, mostrar los productos individuales.

### Dirección

Cards grandes, editoriales y comerciales.

No hacer una cuadrícula pequeña con cuatro productos comprimidos.

### Desktop

Mostrar aproximadamente:

- 3 cards grandes completas;
- parte de la cuarta entrando por el borde derecho.

Cuando el usuario llega al extremo del carrusel:

- puede verse parte del producto del lado izquierdo;
- flechas discretas;
- interacción prolija;
- preparar estructura para incorporar más productos en el futuro.

### Futuro

Debe aceptar sin rehacer el componente:

- AURA;
- futuros productos;
- nuevas líneas.

### Card

Cada card debe poder tener:

- nombre;
- fase si aplica;
- precio;
- imagen principal de producto;
- segunda imagen de campaña/modelo;
- CTA / interacción comercial.

### Hover

- cambiar imagen de producto a foto de campaña/modelo;
- cursor circular contextual;
- transición suave.

Las fotos de campaña reales se incorporarán después de la producción.

---

## HOME 05 — Agua + El Registro

La antigua sección narrativa del agua se mueve a este punto.

### Función

Deja de ser una animación aislada. Ahora combina storytelling, movimiento sensorial, frases y captación de newsletter.

### Agua

- usar video real / footage líquido;
- movimiento autónomo MUY lento;
- no sincronizar reproducción del video con el scroll;
- el scroll controla textos, opacidades y transición de escena;
- sensación contemplativa;
- no efecto tecnológico.

### Copy

Las frases pueden aparecer/cambiar mientras se avanza. La redacción final puede refinarse posteriormente.

### CTA / newsletter

Debe existir un CTA o llamada visible durante la experiencia.

En vez de enviar a otra sección o abrir necesariamente un modal:

- el campo de email debe **aparecer integrado dentro de la misma escena**;
- la transición hacia el formulario debe sentirse como parte del scroll;
- nombre de la newsletter: **El Registro**.

Objetivo: que el agua tenga una función narrativa y comercial concreta.

---

## HOME 06 — Descubrí tu piel

Sección teaser del futuro quiz.

### Objetivo

Presentar la idea sin construir todavía toda la lógica del quiz.

Headline principal:

> **Descubrí tu piel**

Debe mencionar de forma secundaria el concepto de **fenotipo**.

Ejemplo conceptual, no copy final:

> Conocer tu fenotipo ayuda a comprender cómo responde tu piel y cómo construir un ritual más propio.

### CTA

> **Descubrir mi piel**

El quiz interno se desarrollará más adelante.

### Futuro del quiz

Podrá considerar características de la piel, ciclo, fenotipos, recomendación, captura de email, 5% de incentivo, personalización, carrito dinámico y automatización de marketing.

No implementar lógica definitiva hasta que la CEO defina el modelo de fenotipos.

---

## HOME 07 — Lecturas para el ritual

Bloque editorial / educativo.

Puede alojar:

- videos de YouTube;
- blogs;
- notas;
- escritos de la CEO;
- piezas educativas;
- futuras entrevistas o guías.

Título:

> **Lecturas para el ritual**

Debe sentirse editorial, no como una grilla de blog genérica.

---

## HOME 08 — Instagram / Universo ORMONIA

Mostrar contenido dinámico de Instagram.

Estado deseado:

- 3 piezas visibles;
- actualización dinámica una vez conectada la cuenta;
- sin convertir la home en un muro de red social.

---

## HOME 09 — Unite al ritual + Footer

### Cierre

Mantener el cierre emocional:

> **Unite al ritual**

### Footer

Debajo debe existir un footer completo de e-commerce/editorial.

Debe contemplar navegación, tienda, sobre ORMONIA, explorar, contacto, newsletter, redes, políticas, términos, privacidad, envíos, devoluciones, futura información Shopify y copyright.

No llenar todavía con textos legales inventados.

---

# 6. ORDEN OFICIAL DE SPRINTS

> **Esta secuencia NO se cambia aunque el orden visual de la Home se modifique.**
>
> Los sprints representan el orden del proyecto y sus bloques de trabajo. Una sección desarrollada en un sprint anterior puede cambiar de posición en la Home sin cambiar el número del sprint.

## Sprint 00 — Foundation
**Estado:** realizado / base activa.

Incluye Vite, React, TypeScript, React Router, Tailwind, GSAP, ScrollTrigger, Lenis, routing, páginas base, componentes Home, data/mock y design system inicial.

## Sprint 01 — Hero / El paisaje
**Estado:** desarrollado, pendiente de nueva revisión según feedback CEO.

Pendiente:

- nuevo header;
- barra superior de envío;
- navegación española;
- texto hero centrado;
- CTA centrado;
- CTA scroll al Pack x4;
- preparar popup diferido de Descubrí tu piel / fenotipo.

## Sprint 02 — El Ritmo
**Estado:** desarrollado y posteriormente reposicionado.

Decisión actual:

- la experiencia de agua YA NO va inmediatamente después del Hero;
- se mueve visualmente a **HOME 05**;
- debe fusionarse con **El Registro / newsletter**;
- el video de agua se mueve lentamente de manera autónoma;
- no scrub del video por scroll.

Aunque cambie de posición visual, sigue perteneciendo al trabajo conceptual iniciado en Sprint 02.

## Sprint 03 — El Ciclo
**Estado actual del proyecto: Sprint 03.8.**  
**Estado funcional:** en progreso / no cerrar todavía.

Base actual:

- 4 serums;
- rotación cíclica;
- desplazamiento hacia la derecha;
- uno protagonista;
- información lateral;
- Pack x4 ya incorporado en prototipos previos.

Correcciones CEO a consolidar:

- fondos mucho más diferenciados entre fases;
- protagonista bien visible;
- eliminar cualquier diagonal/resto visual no ORMONIA;
- mantener lógica fluida;
- integrar mejor entrega hacia Pack x4.

## Sprint 04 — Cuatro fases / Shopping
**Estado:** pendiente de rediseño bajo nueva arquitectura.

Ahora debe asumir principalmente la función comercial:

1. gran card del Pack x4;
2. después carrusel de productos individuales;
3. 3 cards grandes + parte de la cuarta;
4. hover de campaña;
5. cursor circular;
6. escalable a nuevos productos.

No duplicar la función educativa del Sprint 03.

## Sprint 05 — Adentro / Afuera
**Estado:** pendiente.

Concepto original:

**ADENTRO**: hormonas, energía, ciclo, ritmo.  
**AFUERA**: textura, sensibilidad, luminosidad, piel.

Principio:

> **La piel no se trata aisladamente. Se comprende.**

Antes de implementarlo, revisar cómo encaja en la nueva arquitectura de Home y evitar agregar una sección que rompa el flujo.

No eliminar esta idea del roadmap sin decisión explícita.

## Sprint 06 — El Ritual
**Estado:** pendiente.

Debe apoyarse especialmente en producción audiovisual real:

- gotero;
- gota;
- manos;
- textura;
- piel;
- agua;
- aplicación;
- macro.

Palabras aprobadas:

- ESCUCHAR
- OBSERVAR
- ACOMPAÑAR
- CUIDAR

Concepto de uso:

> **El ritual en práctica / Protocolo de uso como experiencia**

No reducir a “aplicar 2–3 gotas”. Debe considerar momento, temperatura, movimiento e intención.

Antes de implementar, revisar la relación con HOME 05 para no duplicar el agua ni el storytelling.

## Sprint 07 — Descubrir tu ritual / Fenotipos
**Estado:** pendiente.

Nueva entrada pública en Home:

> **Descubrí tu piel**

Debe mencionar “fenotipo” en microcopy.

El desarrollo interno del quiz queda para este sprint. La CEO definirá la lógica definitiva de fenotipos.

## Sprint 08 — Ecosistema final
**Estado:** pendiente.

Incluye Lecturas para el ritual, YouTube, blog/escritos, El Registro si quedan integraciones pendientes, Instagram dinámico, cierre, footer, polish global y conexiones externas.

---

# 7. Diferencia entre “orden de sprint” y “orden de página”

Esto es crítico.

## Orden de desarrollo
00 → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08.

## Orden visual Home aprobado
1. Hero + Header
2. El Ciclo / 4 fases
3. Pack x4
4. Productos individuales
5. Agua + El Registro
6. Descubrí tu piel
7. Lecturas para el ritual
8. Instagram
9. Unite al ritual + Footer

Por lo tanto:

- **NO renumerar sprints** cuando una sección se mueve;
- **NO asumir** que Sprint 02 tiene que aparecer visualmente antes que Sprint 03;
- el roadmap técnico y el storytelling final son dos capas diferentes.

---

# 8. Design System base

## Colores orientativos actuales

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

Estos valores no son una prisión. Pueden refinarse durante el polish general.

No introducir colores saturados sin justificación.

## Tipografía

Display deseada: **Field Studies Flora**.  
Fallback / prototipo actual: **Fraunces**.  
Sans: **Inter**.

No reconstruir toda la web alrededor del fallback. Cuando exista el archivo/licencia apropiada de Field Studies Flora, sustituir de manera sistemática.

---

# 9. Fotografía y dirección de arte

La producción real debe reemplazar gradualmente placeholders y fondos temporales.

## Assets prioritarios

### Producto
- CLARITY frontal;
- BLOOM frontal;
- RADIANCE frontal;
- RESTORE frontal;
- Pack x4;
- productos en mano;
- reflejos;
- producto en naturaleza;
- producto sobre piedra/madera/agua.

### Ritual
- gotero entrando/saliendo;
- pipeta;
- gota;
- aplicación;
- manos;
- mejilla;
- cuello;
- clavícula;
- agua;
- ondas;
- sombras;
- sol;
- piedra;
- pradera;
- río.

## Para cards individuales

Necesitamos una pareja de imágenes por producto:

1. foto producto;
2. foto campaña/modelo/uso.

El hover intercambia ambas.

---

# 10. Motion / GSAP

La animación debe acompañar el contenido. No demostrar que “sabemos hacer GSAP”.

## Principios

- suave;
- orgánica;
- fluida;
- sin rebotes innecesarios;
- transiciones con overlap;
- evitar cambios de escena abruptos;
- evitar elementos que aparecen/desaparecen de manera mecánica;
- usar scroll cuando exista una razón narrativa;
- los fondos vivos pueden moverse autónomamente.

## Agua

- video real;
- loop lento;
- reproducción independiente del scroll;
- scroll modifica copy y transición;
- no scrub del `currentTime` como interacción principal.

## Reduced motion

Todo bloque complejo debe contemplar `prefers-reduced-motion`.

## Mobile

No intentar replicar exactamente todas las animaciones desktop. Mobile debe ser una versión diseñada, simplificada y estable.

---

# 11. Custom cursor

Puede utilizarse como recurso de interacción contextual.

Usos aprobados:

- Pack x4;
- cards grandes de producto;
- hover donde una imagen puede “swipear” o cambiar.

Debe ser circular, simple, sutil y coherente con ORMONIA.

No mostrarlo permanentemente sobre toda la web si no aporta.

---

# 12. E-commerce / Shopify

## Frontend
Experiencia custom en React/Vite.

## Shopify futuro
Shopify será backend para productos, inventario, variantes, precios, descuentos, checkout, órdenes y pagos.

No reconstruir la experiencia completa como un theme Shopify tradicional salvo decisión posterior.

## Antes de Shopify

CTAs pueden usar anchors internos, rutas mock o PDPs placeholder.

No inventar comportamiento de compra definitivo.

---

# 13. Newsletter — El Registro

Nombre:

> **El Registro**

HOME 05 debe integrar captación de email dentro de la escena de agua.

Futuras integraciones posibles:

- Shopify Email;
- Klaviyo;
- otra herramienta aprobada.

No conectar un proveedor sin decisión previa.

---

# 14. Descubrimiento / Fenotipos

Diferenciar claramente:

## “Descubrí tu ritual”
Concepto comercial/narrativo general de ORMONIA.

## “Descubrí tu piel”
Entrada al sistema de fenotipos.

Microcopy debe mencionar **fenotipo** para evitar confusión conceptual.

La lógica interna NO debe inventarse antes de recibir definición de la CEO.

---

# 15. Navegación y rutas

Rutas base existentes / previstas:

- `/`
- `/products`
- `/products/[slug]`
- `/learn`
- `/discover`
- `/about`

Los nombres internos pueden adaptarse a React Router si la implementación actual usa otro patrón.

No romper rutas existentes durante cambios visuales sin necesidad.

---

# 16. Arquitectura de componentes

Principio:

> **Una página visualmente continua, múltiples componentes técnicamente independientes.**

No convertir toda la Home en un componente monolítico para simular continuidad.

Componentes históricos/base incluyen conceptos como:

- HeroLandscape;
- RhythmSection;
- CycleSection;
- FourPhasesSection;
- InsideOutsideSection;
- RitualSection;
- DiscoverYourRhythmSection;
- LearnSection;
- RegisterSection;
- InstagramUniverseSection;
- ClosingSection.

Los nombres pueden evolucionar si la arquitectura lo necesita, pero:

- no renombrar masivamente por estética;
- no mezclar responsabilidades;
- no borrar componentes futuros porque momentáneamente no aparezcan en la Home.

---

# 17. Estado actual — Sprint 03.8

La última base conocida es **Sprint 03.8**.

Características principales actuales:

- Hero desarrollado;
- agua real integrada;
- agua con intención de loop autónomo;
- cuatro serums en lógica cíclica;
- uno protagonista;
- rotación hacia la derecha;
- Pack x4 incorporado;
- arquitectura React/Vite/GSAP/Lenis funcionando.

El Sprint 03 NO está cerrado.

## Próxima ronda de implementación

Antes de avanzar formalmente a Sprint 04:

1. actualizar Header/Hero según feedback de CEO;
2. mover visualmente la sección de agua a HOME 05 sin perder su identidad de Sprint 02;
3. consolidar fondos diferenciados del ciclo;
4. validar rotación de los cuatro productos;
5. asegurar que no existan diagonales/números/artefactos;
6. convertir Pack x4 en gran card comercial;
7. preparar arquitectura de cards individuales para Sprint 04.

---

## Estado operativo inmediato

Antes de Sprint 04, el proyecto entra en:

> **Integration Pass 01–03 — CEO Feedback**

Esto NO es un nuevo sprint numerado ni un reinicio.  
Es una consolidación de los Sprints 01, 02 y 03 sobre la base actual Sprint 03.8.

---

# 18. Reglas para Claude Code

## Rol

Claude Code funciona como **implementador principal sobre el repositorio**.

La dirección de producto, UX y arte se define antes de programar.

## Antes de modificar

Claude debe:

1. leer `ORMONIA_MASTER_PLAN.md`;
2. inspeccionar los componentes involucrados;
3. identificar el sprint activo;
4. indicar brevemente qué archivos necesita tocar;
5. evitar modificaciones fuera del alcance.

## Regla de scope

> **No modificar componentes de otros sprints salvo que sea estrictamente necesario para la integración y se explique antes.**

Ejemplo: si se está ajustando `CycleSection`, no rediseñar Footer, navegación móvil o Quiz “porque se puede mejorar”.

## Regla de contradicción

Si una instrucción nueva contradice este documento:

> **detenerse, señalar la contradicción y pedir decisión antes de modificar arquitectura o una decisión aprobada.**

## Regla de conservación

No eliminar assets, rutas, contenido futuro, data o componentes solo porque actualmente no se rendericen.

## Antes de entregar

Claude debe:

1. correr build;
2. correr TypeScript check;
3. revisar errores de consola;
4. informar archivos modificados;
5. indicar cualquier limitación;
6. no declarar “terminado” algo que no pudo ejecutar o verificar.

---

# 19. Workflow oficial

## 1. Feedback
Usuario + CEO reúnen observaciones.

## 2. Dirección
Se interpreta el feedback y se define qué pertenece al sprint actual, qué pasa al backlog, qué contradice decisiones previas y qué necesita assets.

## 3. Implementación
Claude Code trabaja sobre el repo.

## 4. QA local

```bash
pnpm install
pnpm dev
```

y cuando corresponda:

```bash
pnpm build
```

## 5. Revisión visual
Grabar scroll / enviar screenshots.

## 6. Corrección
Iteraciones quirúrgicas sobre código.

## 7. Cierre de sprint
Actualizar este documento: estado, decisiones, pendientes y backlog.

---

# 20. Cosas que NO deben volver a hacerse

A partir de lo aprendido en iteraciones previas:

- no usar una espiral pequeña como ícono decorativo;
- no usar una órbita estilo sistema solar;
- no usar líneas diagonales sin función;
- no poner números gigantes detrás de los serums;
- no hacer cortes de color bruscos;
- no esconder productos debajo del fold por animaciones;
- no invertir tiempo/créditos en microajustes repetitivos dentro de Lovable;
- no pedir a una IA de código que improvise dirección de arte;
- no convertir la Home en una colección de cards independientes;
- no usar referencias de Rhode/InBluem como templates literales.

---

# 21. Lovable

Lovable ya cumplió principalmente una función de scaffolding, arquitectura inicial, rutas, componentes y base visual.

No utilizarlo como herramienta principal para iteración artística fina.

Especialmente evitar:

- ajustes GSAP pequeños y repetidos;
- fine tuning visual a través de prompts;
- iteraciones costosas por cambios mínimos.

La implementación principal pasa al repositorio local + Claude Code.

---

# 22. Definition of Done visual

Una sección no se considera terminada solo porque “funciona”.

Debe cumplir:

1. **Función:** se entiende qué comunica o vende.
2. **Jerarquía:** el ojo sabe dónde mirar.
3. **Movimiento:** aporta, no distrae.
4. **Marca:** parece ORMONIA.
5. **Continuidad:** entrega correctamente a la escena siguiente.
6. **Desktop:** composición resuelta.
7. **Mobile:** versión específica resuelta.
8. **Performance:** sin saltos evidentes.
9. **Accesibilidad básica:** contraste, reduced motion, controles.
10. **Código:** build/check sin errores atribuibles al cambio.

---

# 23. Backlog conocido

No implementar todavía salvo que corresponda al sprint activo:

- lógica definitiva de fenotipos;
- resultados personalizados;
- emails por fenotipo;
- 5% dinámico;
- cuenta de usuario;
- carrito dinámico;
- conexión Shopify;
- precios definitivos;
- Instagram API;
- YouTube dinámico;
- CMS/blog;
- PDP completo;
- AURA;
- políticas legales definitivas;
- optimización SEO final;
- analytics final.

---

# 24. Prioridad inmediata

El siguiente objetivo NO es “terminar la web” ni reiniciar el proyecto desde cero.

La base activa sigue siendo **Sprint 03.8**, pero antes de avanzar a Sprint 04 se realizará una pasada formal de integración sobre todo lo construido hasta ahora:

> **Integration Pass 01–03 — CEO Feedback**

El principio es:

> **No avanzar sobre decisiones que ya sabemos que necesitan corrección. Es preferible consolidar bien los tres primeros sprints y después construir los cinco restantes sobre una base estable.**

## Alcance del Integration Pass 01–03

### Sprint 01 — Header + Hero
Corregir SOBRE la implementación existente:

- nuevo header inspirado en la jerarquía de Rhode/InBluem pero con identidad ORMONIA;
- barra superior de envío gratis;
- navegación en español;
- header sticky, fino y con contraste adaptativo;
- texto del hero centrado;
- CTA centrado;
- CTA “Descubrir el ritual” con scroll al Pack x4;
- preparar popup diferido “Descubrí tu piel” con incentivo 5%, sin construir todavía el quiz completo.

**No rehacer el Hero desde cero. Conservar lo que funciona de la versión actual.**

### Sprint 02 — El Ritmo / Agua
La sección de agua no debe permanecer inmediatamente después del Hero.

Durante esta pasada:

- retirarla de su posición actual;
- conservar el componente y sus assets;
- mantener la decisión de video autónomo y lento;
- dejarla preparada para su ubicación definitiva después de la zona comercial, donde se integrará con **El Registro**;
- no construir workarounds temporales innecesarios.

### Sprint 03 — El Ciclo
Cerrar correctamente el sprint:

- fondos claramente diferenciados para CLARITY, BLOOM, RADIANCE y RESTORE;
- mantener los cuatro serums visibles;
- uno protagonista al frente;
- rotación hacia la derecha;
- copy lateral limpio;
- eliminar diagonales, números gigantes, órbitas o elementos visuales que no pertenezcan a ORMONIA;
- asegurar transición natural hacia el futuro bloque comercial del Pack x4.

## Reordenamiento estructural

Durante esta pasada puede reordenarse la Home para preparar la arquitectura aprobada, pero sin construir prematuramente sprints futuros.

Objetivo estructural:

Hero → Ciclo → [espacio para Sprint 04: Pack + Productos] → Agua/Registro → Descubrí tu piel → Lecturas → Instagram → Cierre.

Los bloques futuros pueden permanecer como placeholders/componentes existentes hasta que llegue su sprint.

## Después del Integration Pass

Cuando Sprints 01–03 estén consolidados:

1. entrar formalmente en **Sprint 04 — Shopping**;
2. continuar Sprint 05;
3. continuar Sprint 06;
4. continuar Sprint 07;
5. continuar Sprint 08.

No rehacer trabajo ya aprobado sin una razón concreta.  
No construir sprints futuros antes de tiempo solo para completar visualmente la Home.

---

# 25. Principio final

ORMONIA no debe sentirse como una tienda a la que se le agregó storytelling.

Tampoco debe sentirse como una pieza artística donde cuesta encontrar qué comprar.

La experiencia correcta está en el medio:

> **primero despierta interés, después explica el sistema, luego permite comprarlo y finalmente invita a profundizar.**

Ese equilibrio debe gobernar todas las decisiones futuras.
