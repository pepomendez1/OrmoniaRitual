import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DiscoverPopup } from "@/components/layout/DiscoverPopup";
import { HeroLandscape } from "@/components/sections/HeroLandscape";
import { CycleSection } from "@/components/sections/CycleSection";
import { PackRitualSection } from "@/components/sections/PackRitualSection";
import { FourPhasesSection } from "@/components/sections/FourPhasesSection";
import { InsideOutsideSection } from "@/components/sections/InsideOutsideSection";
import { RitualSection } from "@/components/sections/RitualSection";
import { RhythmSection } from "@/components/sections/RhythmSection";
import { RegisterSection } from "@/components/sections/RegisterSection";
import { DiscoverYourRhythmSection } from "@/components/sections/DiscoverYourRhythmSection";
import { LearnSection } from "@/components/sections/LearnSection";
import { InstagramUniverseSection } from "@/components/sections/InstagramUniverseSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

/**
 * Orden de la Home tras el Integration Pass 01–03.
 *
 * El agua (Sprint 02) deja de interrumpir el inicio: ahora se llega rápido al
 * producto — Hero → El Ciclo → Pack x4 → productos individuales — y la
 * experiencia sensorial vuelve después de la zona comercial, junto a El
 * Registro, tal como define HOME 05.
 *
 * InsideOutsideSection (Sprint 05) y RitualSection (Sprint 06) se conservan
 * montadas donde estaban: su ubicación definitiva se decide en sus sprints.
 * Ningún bloque futuro se construye anticipadamente para llenar la página.
 */
const Home = () => {
  return (
    <>
      <Header defaultTone="dark" overlay />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroLandscape />
        <CycleSection />
        <PackRitualSection />
        <FourPhasesSection />
        <InsideOutsideSection />
        <RitualSection />
        <RhythmSection />
        <RegisterSection />
        <DiscoverYourRhythmSection />
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
