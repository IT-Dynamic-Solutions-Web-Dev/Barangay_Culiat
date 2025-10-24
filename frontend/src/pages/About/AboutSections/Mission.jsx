import React from "react";
import { CheckCircle } from "lucide-react";

const missionContent = {
   title: "Our Mission",
   description:
      "Ang Barangay Culiat ay magiging salamin ng mga programa ng Pamahalaang Lungsod Quezon — isang maunlad, malinis, maayos, handa, at ligtas na komunidad. Kami ay maglilingkod nang may katapatan, dangal, at malasakit, nang walang kinikilingan sa kasarian o kalagayan sa lipunan. Kasabay nito, aming isusulong ang pangangalaga sa kalikasan at paggamit ng makabagong teknolohiya upang makamit ang mas maunlad, malusog, at mapayapang pamayanan.",
   points: [
      {
         heading: "Tapat at Makataong Serbisyo sa Lahat",
      },
      {
         heading: "Pagsulong ng Kalinisan, Kaayusan, at Kaligtasan",
      },
      {
         heading: "Pangangalaga sa Kalikasan at Likas na Yaman",
      },
      {
         heading: "Paggamit ng Teknolohiya para sa Maunlad na Pamayanan",
      },
   ],
};

const Mission = () => {
   return (
      <section className="py-8 px-4 bg-neutral">
         <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Left Side - Image */}
               <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                     <img
                        src="/images/brgy/elderly-community.jpg"
                        alt="Mission main"
                        className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover"
                     />
                  </div>
               </div>

               {/* Right Side - Content */}
               <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[#262626]">
                     {missionContent.title}
                  </h2>
                  <p className="text-[#6c6c6c] leading-relaxed">
                     {missionContent.description}
                  </p>

                  {/* Mission Points  */}
                  <div className="space-y-4">
                     {missionContent.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                           <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                           <div>
                              <h3 className="font-semibold text-[#262626]">
                                 {point.heading}
                              </h3>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Mission;
