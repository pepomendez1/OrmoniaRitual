import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { CTAButton } from "@/components/ui/CTAButton";
import { pageShells } from "@/data/content";

const Discover = () => {
  const shell = pageShells.discover;
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28 outline-none md:pt-36">
        <SectionWrapper>
          <div className="flex flex-col gap-6">
            <EditorialHeading eyebrow={shell.eyebrow} size="xl" as="h1">
              {shell.title}
            </EditorialHeading>
            <NarrativeText tone="muted" measure="wide">
              {shell.body}
            </NarrativeText>
            <div>
              <CTAButton to="/products">Explorar los serums</CTAButton>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
};

export default Discover;
