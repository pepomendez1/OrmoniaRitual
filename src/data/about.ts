import {
  brandCopy,
  fourPhasesCopy,
  insideOutsideCopy,
  pageShells,
  ritualWords,
} from "./content";
import { productionMedia } from "./productionMedia";

/**
 * /about — Sobre ORMONIA.
 *
 * Todo el copy viene de textos que ya existían en el proyecto (se referencian,
 * no se reescriben). No hay historia de fundadora, fechas, certificaciones ni
 * procesos de laboratorio documentados: cuando existan, se suman como nuevas
 * secciones en este archivo.
 *
 * Fotografías: producción real, desde `productionMedia.about`.
 */
export const aboutCopy = {
  eyebrow: "Sobre ORMONIA",
  wordmark: brandCopy.wordmark,
  tagline: brandCopy.tagline,
  manifesto: {
    eyebrow: "Manifiesto",
    body: pageShells.about.body,
  },
  inside: {
    eyebrow: insideOutsideCopy.eyebrow,
    title: insideOutsideCopy.title,
    body: insideOutsideCopy.body,
    caption: insideOutsideCopy.caption,
  },
  ritual: {
    eyebrow: "El ritual",
    title: "Cuatro gestos.",
    words: ritualWords,
  },
  field: {
    label: "Fotografía de campo",
  },
  formulas: {
    eyebrow: "Las fórmulas",
    title: fourPhasesCopy.title,
    body: fourPhasesCopy.body,
  },
  closing: {
    title: "Lo que cambia adentro se expresa afuera.",
    primary: "Hacer el test",
    secondary: "Ir a la tienda",
  },
  /**
   * Producción real (`productionMedia.about`): dos grandes momentos de
   * naturaleza/persona y macros como contrapunto. Pocas imágenes: la página
   * conserva aire.
   */
  media: productionMedia.about,
};
