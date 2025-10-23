import React from "react";
import MediaSequence from "../../../components/MediaSequence";
import Button from "../../../tailadminsrc/components/ui/button/Button";
import TextChangeShadcn from "../../../components/Animation/TextChangeShadcn";
import Stat from "../HomeSections/Stat";
import Header from "../../../components/Header";

const Hero = () => {
  return (
    <section id="home-hero" className="lg:mb-30 mb-0">
      <div
        className={`relative min-h-[70vh] md:min-h-[95vh] flex items-center overflow-hidden`}
      >
        <MediaSequence />
        <div className="absolute inset-0 bg-gradient-to-br from-[#141414b7] via-[#000000e3] to-[#1f1f1fd0] opacity-90 w-full"></div>
        <div className=" mx-auto text-center relative pb-0 sm:pb-[5em]">
          <Header />
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-text-color-light leading-tight tracking-tight drop-shadow-lg">
            <TextChangeShadcn />
          </h1>
          <p className=" sm:text-base text-sm  sm:leading-tight md:text-lg text-text-color-light/90 max-w-2xl mx-auto leading-5">
            Your official online public service portal. Access barangay
            services, request documents, and stay updated anytime, anywhere.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="md" className="font-medium px-8">
                Request a document
              </Button>
              <Button
                variant="outlinesecondary"
                size="md"
                className="font-medium"
              >
                Learn more →
              </Button>
            </div> */}
        </div>
        <svg
          className="absolute -bottom-1 left-0 w-full "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
        >
          <path
            fill="#ffffff" // match the next section background
            d="M0,64 C480,120 960,0 1440,64 L1440,100 L0,100 Z"
          ></path>
        </svg>
      </div>
      <Stat />
    </section>
  );
};

export default Hero;
