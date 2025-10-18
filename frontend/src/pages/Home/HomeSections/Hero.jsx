import React from "react";
import MediaSequence from "../../../components/MediaSequence";

const Hero = () => {
  return (
    <section
      className="relative bg-[#b30000]   py-24 px-4 overflow-hidden min-h-[80vh] flex items-center"
      id="home-hero"
    >
      <div className="absolute top-0 left-0  inset-0 opacity-60">
        <MediaSequence />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#b30000b4] via-[#c20000b2] to-[#9a0000c7] opacity-90"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img
              src="/images/logo/brgy-culiat-logo.png"
              alt="brgy-culiat-logo"
              className="h-14 w-14 rounded-full object-fill object-center"
            />
            <img
              src="/images/logo/qc-logo.png"
              alt="brgy-culiat-logo"
              className="h-14 w-14 rounded-full object-fill object-center"
            />
            <img
              src="/images/logo/ph-logo.png"
              alt="brgy-culiat-logo"
              className="h-14 w-14 rounded-full object-fill object-center"
            />
          </div>
        </div>

        <h1 className="text-4xl text-white md:text-7xl font-extrabold mb-6 tracking-tigher">
          Barangay Culiat
        </h1>
        <p className="text-md text-white md:text-lg mb-10 opacity-95 max-w-2xl mx-auto leading-tight">
          Your official online public service portal, access barangay services,
          <br className="hidden sm:block" />
          documents, and updates anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#b30000] px-8 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
            Request a document
          </button>
          <button className="border-2 border-white text-white px-8 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#b30000] transition-all">
            Learn more →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
