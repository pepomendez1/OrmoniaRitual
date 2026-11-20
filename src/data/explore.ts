import { calendarTeaserCopy, discoverSkinCopy } from "./content";

/**
 * /explore — bloques propios de la biblioteca. Las lecturas siguen en
 * `learnCopy` (content.ts). Los textos de las "puertas" reutilizan copy ya
 * aprobado en cada sección de destino.
 */
export const exploreCopy = {
  moreTitle: "También en ORMONIA",
  doors: [
    {
      eyebrow: "Herramienta",
      title: "Calendario cíclico",
      body: "Para observar y registrar cómo cambia tu piel.",
      href: calendarTeaserCopy.ctaHref,
    },
    {
      eyebrow: "Recorrido",
      title: discoverSkinCopy.eyebrow,
      body: discoverSkinCopy.body,
      href: discoverSkinCopy.ctaHref,
    },
    {
      eyebrow: "El sistema",
      title: "El Ciclo",
      body: "Tu piel cambia. Tu ritual también.",
      href: "/#ciclo",
    },
    {
      eyebrow: "La marca",
      title: "Sobre ORMONIA",
      body: "Lo que cambia adentro se expresa afuera.",
      href: "/about",
    },
  ],
  reading: {
    back: "Volver a Explorar",
    unpublished: "Esta lectura todavía no está publicada.",
    unpublishedBody: "La estamos preparando. Mientras tanto, podés seguir explorando.",
    external: "Abrir",
    more: "Otras lecturas",
    notFound: "No encontramos esa lectura.",
  },
};
