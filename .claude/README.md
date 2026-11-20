# ORMONIA · Claude Design System Pack

Este paquete está pensado para usarse dentro del repositorio actual de ORMONIA junto con el plugin oficial `frontend-design`.

## Instalación

Copiar la carpeta `.claude/` completa en la raíz del repositorio.

La estructura esperada es:

```text
.claude/
├── README.md
└── skills/
    └── ormonia-design-director/
        ├── SKILL.md
        └── references/
            ├── brand-foundations.md
            ├── design-principles.md
            ├── anti-ai-patterns.md
            ├── typography.md
            ├── photography.md
            ├── home.md
            ├── ecommerce.md
            ├── diagnostic.md
            ├── motion.md
            ├── responsive-accessibility.md
            ├── implementation-workflow.md
            └── locked-decisions.md
```

## Cómo usarlo

Usar este skill siempre que Claude vaya a:

- revisar visualmente una pantalla;
- proponer cambios de UI;
- crear o modificar una sección;
- integrar fotografía;
- tocar tipografía;
- diseñar PDPs, tienda o carrito;
- pulir responsive;
- evaluar si algo “se siente ORMONIA”.

Si también está instalado `frontend-design`, pedir explícitamente:

> Use the `frontend-design` skill together with the `ormonia-design-director` project skill. `ormonia-design-director` has priority whenever there is a conflict.

## Regla principal

`frontend-design` aporta oficio general de frontend.

`ui-ux-pro-max` (instalado en `.claude/skills/ui-ux-pro-max`) aporta datos de referencia: accesibilidad, UX, tipografía, paletas y guías por stack. Es consulta, no dirección de marca.

`ormonia-design-director` define qué es ORMONIA.

Si existe una contradicción con cualquiera de los dos, gana ORMONIA.

## Flujo recomendado

1. Screenshot / pantalla actual.
2. Auditoría visual.
3. Máximo 3 cambios de diseño por iteración.
4. Implementación.
5. Screenshot / video.
6. Aprobación.
7. Registrar la pantalla como `LOCKED` en `locked-decisions.md`.

No volver a rediseñar pantallas bloqueadas salvo bug, responsive o pedido explícito.
