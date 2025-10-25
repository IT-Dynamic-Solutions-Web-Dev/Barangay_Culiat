import React from "react";
import MediaSequence from "../../../../components/MediaSequence";

const AboutHero = () => {
   return (
      <section className="relative bg-[#b30000] py-24 px-4 overflow-hidden min-h-[80vh] flex items-center">
         <div className="absolute inset-0 bg-gray-300 opacity-60">
            <div className="flex items-center justify-center h-full text-white/50">
               <MediaSequence />
            </div>
         </div>

         <div className="absolute inset-0 bg-gradient-to-br from-[#000000a2] via-[#31313198] to-[#1f1f1fd0] opacity-90"></div>

         {/* Hero Content */}
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl text-white md:text-7xl font-extrabold mb-6 tracking-tight">
               Learn More About Us!
            </h1>
            <p className="text-md text-white md:text-lg mb-10 opacity-95 max-w-2xl mx-auto leading-tight">
               District 6 • Quezon City • Metro Manila
               <br className="hidden sm:block" />
               Serving the people of Bagong Culiat with excellence since 1962
            </p>
         </div>
      </section>
   );
};

export default AboutHero;
