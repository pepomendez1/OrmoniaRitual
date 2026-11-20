import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DiscoverPopup } from "@/components/layout/DiscoverPopup";
import { HeroLandscape } from "@/components/sections/HeroLandscape";
import { PackRitualSection } from "@/components/sections/PackRitualSection";
import { FourPhasesSection } from "@/components/sections/FourPhasesSection";
import { CalendarSection } from "@/components/sections/CalendarSection";
import { CycleSection } from "@/components/sections/CycleSection";
import { DiscoverYourSkinSection } from "@/components/sections/DiscoverYourSkinSection";
import { LearnSection } from "@/components/sections/LearnSection";
import { InstagramUniverseSection } from "@/components/sections/InstagramUniverseSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { useHashScroll } from "@/hooks/useHashScroll";
import { usePageMeta } from "@/hooks/usePageMeta";

/**
 * Home — arquitectura de la pasada integral (2026-10-29).
 *
 *   1. Hero
 *   2. El Ritual              → la propuesta completa, apenas se sale del Hero
 *   3. Los esenciales         → los sérums como productos individuales
 *   4. Calendario cíclico     → la herramienta del ritual, como producto
 *   5. El Ciclo               → storytelling/educación, después de mostrar qué se vende
 *   6. Descubrí tu piel       → campaña hacia el diagnóstico
 *   7. Lecturas para el ritual
 *   8. El universo ORMONIA    → Instagram
 *   9. Unite al ritual + footer (El Registro como módulo secundario)
 *
 * DESMONTADO (no borrado):
 * - `RhythmSection` (Agua + El Registro): deja de interrumpir la narrativa.
 *   Su lugar estratégico lo toma el Calendario, no otra newsletter. El código,
 *   el video y su motion siguen en el repo para reutilizarse.
 * - `InsideOutsideSection`, `RitualSection`, `DiscoverYourRhythmSection` y
 *   `RegisterSection`, como ya estaban (ver Audit Roadmap §5).
 *
 * Desde el Pack en adelante la Home vive en campo claro; El Ciclo es el único
 * plano de color propio, con cortes limpios a ambos lados.
 */
const Home = () => {
  usePageMeta("home");
  // Llegadas desde otra página a un ancla de Home ("/#el-ritual", "/#ciclo").
  useHashScroll();

  return (
    <>
      <Header defaultTone="dark" overlay />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroLandscape />
        <PackRitualSection />
        <FourPhasesSection />
        <CalendarSection />
        <CycleSection />
        <DiscoverYourSkinSection />
        <LearnSection />
        <InstagramUniverseSection />
        <ClosingSection />
      </main>
      <Footer />
      <DiscoverPopup />
    </>
  );
};

export default Home;
