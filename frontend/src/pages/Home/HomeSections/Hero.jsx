import React from "react";
import MediaSequence from "../../../components/MediaSequence";
import Button from "../../../tailadminsrc/components/ui/button/Button";
import WordFlipper from "../../../components/Animation/WordFlipper";

const Hero = () => {
  return (
    <section
      className="relative py-24 px-4  min-h-[80vh] flex items-center"
      id="home-hero"
    >
      <div className="absolute top-[-64px] left-0  inset-0 opacity-80">
        <MediaSequence />
      </div>

      <div className="absolute top-[-64px] inset-0 bg-gradient-to-br from-[#000000a8] via-[#000000c5] to-[#000000de] opacity-90"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tigher">
          <WordFlipper />
        </h1>
        <p className="text-md text-text-color-light md:text-lg mb-10 opacity-95 max-w-2xl mx-auto leading-tight">
          Your official online public service portal, access barangay services,
          <br className="hidden sm:block" />
          documents, and updates anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="md" className="font-medium px-8">
            Request a document
          </Button>
          <Button variant="outlineprimary" size="md" className="font-medium">
            Learn more →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
