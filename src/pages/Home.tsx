import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroLandscape } from "@/components/sections/HeroLandscape";
import { RhythmSection } from "@/components/sections/RhythmSection";
import { CycleSection } from "@/components/sections/CycleSection";
import { FourPhasesSection } from "@/components/sections/FourPhasesSection";
import { InsideOutsideSection } from "@/components/sections/InsideOutsideSection";
import { RitualSection } from "@/components/sections/RitualSection";
import { DiscoverYourRhythmSection } from "@/components/sections/DiscoverYourRhythmSection";
import { LearnSection } from "@/components/sections/LearnSection";
import { RegisterSection } from "@/components/sections/RegisterSection";
import { InstagramUniverseSection } from "@/components/sections/InstagramUniverseSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

const Home = () => {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroLandscape />
        <RhythmSection />
        <CycleSection />
        <FourPhasesSection />
        <InsideOutsideSection />
        <RitualSection />
        <DiscoverYourRhythmSection />
        <LearnSection />
        <RegisterSection />
        <InstagramUniverseSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
