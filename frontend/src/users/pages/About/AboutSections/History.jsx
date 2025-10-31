import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const historyData = {
   title: "The Rich History of Barangay Culiat",
   paragraph1:
      "Barangay Culiat, located in the heart of Quezon City, boasts a vibrant and storied past. Originally a sprawling agricultural land, it has transformed over decades into a bustling urban community while retaining its unique charm and strong community spirit.",
   paragraph2:
      "From its early beginnings, Culiat has been a melting pot of cultures and traditions. Early settlers contributed to its development, cultivating the land and establishing the foundations of the close-knit neighborhood it is today.",
   paragraph3:
      "The spirit of bayanihan and collective effort has always been at the core of Culiat's progress. Through various challenges and triumphs, the residents have consistently demonstrated resilience and dedication to building a better future for all. This rich heritage continues to inspire its leaders and constituents in striving for excellence and sustainable development.",
};

const History = () => {
   const { title, paragraph1, paragraph2, paragraph3 } = historyData;

   return (
      <section
         id="about-history"
         className="relative pt-12 px-6 pb-[5.5em] bg-linear-to-bl from-secondary to-secondary-glow"
      >
         <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
               <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="order-2 lg:order-1 flex flex-col space-y-5 lg:pr-10"
               >
                  <h2 className="text-3xl md:text-4xl font-bold text-text-color-light leading-tight">
                     {title}
                  </h2>
                  <p className="text-neutral/90 leading-relaxed">
                     {paragraph1}
                  </p>
                  <p className="text-neutral/90 leading-relaxed">
                     {paragraph2}
                  </p>
                  <p className="text-neutral/90 leading-relaxed">
                     {paragraph3}
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="order-1 lg:order-2 w-full h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
               >
                  <img
                     src="https://picsum.photos/seed/historyculiat/800/600"
                     alt="Historical image of Barangay Culiat"
                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
               </motion.div>
            </div>
         </div>

         {/* Wave Divider */}
         <svg
            className="absolute -bottom-1 sm:-bottom-3 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
         >
            <path
               fill="#f5f5f5"
               d="M0,64 C480,120 960,0 1440,64 L1440,100 L0,100 Z"
            ></path>
         </svg>
      </section>
   );
};

export default History;
