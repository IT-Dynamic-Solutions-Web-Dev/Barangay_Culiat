import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const container = {
   hidden: {},
   show: {
      transition: {
         staggerChildren: 0.2,
      },
   },
};

const item = {
   hidden: { opacity: 0, y: 40 },
   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const barangayData = {
   vision: {
      header: "Our Vision",
      mainTitle: "Pananaw ng Barangay Culiat tungo sa Pagbabago",
      content:
         "Sa Barangay Culiat, serbisyo ay tapat, Lunes hanggang Linggo, tuloy-tuloy ang serbisyo, na maghahatid ng Kalidad na Serbisyo, Kalinga sa tao, Kalingang Nanay, Kalingang Tunay.",
   },
   mission: {
      header: "Our Mission",
      mainTitle: "Misyon ng Barangay Culiat Serbisyong Kaunlaran",
      content:
         "Sa Barangay Culiat, itinataguyod ang maunlad, ligtas, at maayos na pamayanan sa pamamagitan ng tapat, marangal, at makataong paglilingkod na may malasakit sa tao at kalikasan.",
   },
};

const MissionAndVision = () => {
   const { vision, mission } = barangayData;

   return (
      <section id="about-missionvision" className="py-16 px-6 bg-neutral">
         <div className="max-w-6xl mx-auto">
            <motion.div
               variants={container}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, amount: 0.2 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
               <motion.div
                  variants={item}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
               >
                  <div className="mb-3">
                     <h3 className="text-sm font-semibold tracking-wide uppercase text-primary">
                        {vision.header}
                     </h3>
                  </div>
                  <div className="mb-4">
                     <h2 className="text-2xl md:text-3xl font-bold text-text-color leading-tight">
                        {vision.mainTitle}
                     </h2>
                  </div>
                  <div className="flex-grow">
                     <p className="text-gray-600 leading-relaxed">
                        {vision.content}
                     </p>
                  </div>
               </motion.div>

               <motion.div
                  variants={item}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
               >
                  <div className="mb-3">
                     <h3 className="text-sm font-semibold tracking-wide uppercase text-primary">
                        {mission.header}
                     </h3>
                  </div>
                  <div className="mb-4">
                     <h2 className="text-2xl md:text-3xl font-bold text-text-color leading-tight">
                        {mission.mainTitle}
                     </h2>
                  </div>
                  <div className="flex-grow">
                     <p className="text-gray-600 leading-relaxed">
                        {mission.content}
                     </p>
                  </div>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
};

export default MissionAndVision;
