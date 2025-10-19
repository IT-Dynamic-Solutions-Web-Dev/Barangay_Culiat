import React from "react";
import MediaSequence from "../../../components/MediaSequence";
import Button from "../../../tailadminsrc/components/ui/button/Button";

const Hero = () => {
  return (
    <section
      className="relative bg-[#b30000]   py-24 px-4 overflow-hidden min-h-[80vh] flex items-center"
      id="home-hero"
    >
      <div className="absolute top-0 left-0  inset-0 opacity-60">
        <MediaSequence />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#000000a2] via-[#31313198] to-[#1f1f1fd0] opacity-90"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl text-white md:text-7xl font-extrabold mb-6 tracking-tigher">
          Barangay Culiat
        </h1>
        <p className="text-md text-white md:text-lg mb-10 opacity-95 max-w-2xl mx-auto leading-tight">
          Your official online public service portal, access barangay services,
          <br className="hidden sm:block" />
          documents, and updates anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="md" className="font-medium px-8">
            Request a document
          </Button>
          <Button variant="outline" size="md" className="font-medium">
            Learn more →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
