import React from "react";
import { CheckCircle } from "lucide-react";

const visionContent = {
   title: "Our Vision",
   description:
      "Sa Barangay Culiat, ang serbisyo ay tapat — mula Lunes hanggang Linggo, tuloy-tuloy ang pagkalinga sa tao. Maghahatid kami ng Kalidad na Serbisyo, Kalingang Nanay, at Kalingang Tunay para sa bawat mamamayan.",
   points: [
      {
         heading: "Tapat at Transparent na Pamamahala",
      },
      {
         heading: "Kalidad na Serbisyo para sa Lahat",
      },
      {
         heading: "Tuloy-tuloy na Pagkalinga sa Mamamayan",
      },
      {
         heading: "Maunlad at Nagkakaisang Komunidad",
      },
   ],
};

const Vision = () => {
   return (
      <section className="py-8 px-4 bg-neutral">
         <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Right Side - Image (shown first on mobile) */}
               <div className="relative lg:order-2">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                     <img
                        src="/images/brgy/feeding-program.jpg"
                        alt="Vision main"
                        className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover"
                     />
                  </div>
               </div>

               {/* Left Side - Content (shown second on mobile) */}
               <div className="space-y-6 lg:order-1">
                  <h2 className="text-4xl font-bold text-[#262626]">
                     {visionContent.title}
                  </h2>
                  <p className="text-[#6c6c6c] leading-relaxed">
                     {visionContent.description}
                  </p>

                  {/* Vision Points */}
                  <div className="space-y-4">
                     {visionContent.points.map((point, index) => (
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

export default Vision;
