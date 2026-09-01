import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin una sola vez a nivel de módulo.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
