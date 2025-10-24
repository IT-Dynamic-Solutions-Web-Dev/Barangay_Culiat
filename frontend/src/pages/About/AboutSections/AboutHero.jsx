import React from "react";
import MediaSequence from "../../../components/MediaSequence";
// import Button from "../../../tailadminsrc/components/ui/button/Button";
import AboutTextAnimation from "../../../components/Animation/AboutTextAnimation";

import Header from "../../../components/Header";

// const AboutHero = () => {
//    return (
//       <section className="relative bg-[#b30000] py-24 px-4 overflow-hidden min-h-[80vh] flex items-center">
//          <div className="absolute inset-0 bg-gray-300 opacity-60">
//             <div className="flex items-center justify-center h-full text-white/50">
//                <MediaSequence />
//             </div>
//          </div>

//          <div className="absolute inset-0 bg-gradient-to-br from-[#000000a2] via-[#31313198] to-[#1f1f1fd0] opacity-90"></div>

//          {/* Hero Content */}
//          <div className="max-w-4xl mx-auto text-center relative z-10">
//             <h1 className="text-4xl text-white md:text-7xl font-extrabold mb-6 tracking-tight">
//                Learn More About Us!
//             </h1>
//             <p className="text-md text-white md:text-lg mb-10 opacity-95 max-w-2xl mx-auto leading-tight">
//                District 6 • Quezon City • Metro Manila
//                <br className="hidden sm:block" />
//                Serving the people of Bagong Culiat with excellence since 1962
//             </p>
//          </div>
//       </section>
//    );
// };

// export default AboutHero;

const AboutHero = () => {
   return (
      <section id="home-hero" className="lg:mb-30 mb-0">
         <div
            className={`relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[95vh] flex items-center overflow-hidden`}
         >
            <MediaSequence />
            <div className="absolute inset-0 bg-gradient-to-br from-[#141414b7] via-[#000000e3] to-[#1f1f1fd0] opacity-90 w-full"></div>
            <div className="mx-auto text-center relative pb-0 sm:pb-[3em] md:pb-[4em] lg:pb-[5em] px-4">
               <Header />
               <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold text-text-color-light leading-tight tracking-tight drop-shadow-lg mb-3 sm:mb-4">
                  <AboutTextAnimation />
               </h1>
               <p className="text-xs sm:text-sm md:text-base lg:text-lg text-text-color-light/90 max-w-xl sm:max-w-2xl mx-auto leading-5 sm:leading-tight px-2">
                  Serving the people of Bagong Culiat with excellence and
                  integrity since 1962, committed to transparent governance and
                  quality public service for all.
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
      </section>
   );
};

export default AboutHero;
