import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { notFoundCopy } from "@/data/content";
import { CTAButton } from "@/components/ui/CTAButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: ruta inexistente accedida:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex flex-col gap-6">
        <span className="font-display text-[clamp(4rem,18vw,9rem)] leading-none tracking-[-0.03em] text-accent">
          {notFoundCopy.code}
        </span>
        <h1 className="font-display text-2xl text-foreground md:text-3xl">
          {notFoundCopy.title}
        </h1>
        <p className="mx-auto max-w-md font-sans text-base text-muted-foreground">
          {notFoundCopy.body}
        </p>
        <div className="mt-2">
          <CTAButton to="/">{notFoundCopy.cta}</CTAButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
