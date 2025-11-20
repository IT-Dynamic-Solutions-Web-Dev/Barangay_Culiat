import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, Quote } from "lucide-react";

const barangayData = [
   {
      key: "vision",
      icon: Eye,
      header: "AMING BISYON",
      mainTitle: "BUKLOD CULIAT, MATATAG AT TAPAT.",
      colSpan: "lg:col-span-1",
      isCenter: true,
      content: "Isang nagkakaisang pananaw para sa kinabukasan.",
   },
   {
      key: "mission",
      icon: Target,
      header: "AMING MISYON",
      mainTitle: "Adhikain ng Barangay",
      colSpan: "lg:col-span-2",
      content:
         "Ang Barangay Culiat ay sasalamin sa programa ng pamahalaang Lungsod Quezon na isang maunlad, malinis, maayos at mapayapang pamayanan na nakatuntong sa matapat, marangal at mapagkawang-gawa na paglilingkod na may pagkilala ng pagkakapantay ng kasarian o kalagayan sa lipunan kasabay din nang pangangalaga sa kalikasan at kapaligiran, na patuloy na makasusunod sa makabagong teknolohiya.",
   },
];

const MissionAndVision2 = () => {
   const visionData = barangayData.find((d) => d.key === "vision");
   const missionData = barangayData.find((d) => d.key === "mission");

   return (
      <section id="about-goals" className="py-16 px-6 bg-neutral">
         <div className="relative max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-center mb-16"
            >
               <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Barangay Culiat{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                     Principles
                  </span>
               </h2>
               <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                  Ang aming gabay sa tapat na paglilingkod at pag-unlad ng
                  komunidad.
               </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
               {/* --- VISION CARD (Left / Image Focus) --- */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="lg:col-span-5 flex"
               >
                  <motion.div
                     whileHover={{ y: -5 }}
                     className="group relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 bg-slate-900"
                  >
                     {/* Image Background */}
                     <div className="absolute inset-0">
                        <img
                           src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                           alt="Vision"
                           className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-60"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-transparent opacity-90" />
                     </div>

                     {/* Card Content */}
                     <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        {/* Icon Badge */}
                        <div className="absolute top-8 left-8">
                           <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                              <Eye className="w-6 h-6" />
                           </div>
                        </div>

                        <div className="space-y-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 backdrop-blur-md">
                              <span className="text-xs font-bold text-blue-100 tracking-widest uppercase">
                                 {visionData.header}
                              </span>
                           </div>

                           <div>
                              <h3 className="text-3xl font-black text-white leading-none mb-2">
                                 {visionData.mainTitle}
                              </h3>
                              <div className="w-12 h-1 bg-blue-500 rounded-full mb-4" />
                              <p className="text-blue-100/80 text-sm font-medium">
                                 {visionData.content}
                              </p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>

               {/* --- MISSION CARD (Right / Text Focus) --- */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="lg:col-span-7 flex"
               >
                  <motion.div
                     whileHover={{ y: -5 }}
                     className="group relative w-full h-full bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden"
                  >
                     {/* Decorative Pattern Background */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] -z-0 opacity-50" />
                     <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                        <Target size={300} />
                     </div>

                     {/* Header Section */}
                     <div className="relative z-10 flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                           <Target className="w-7 h-7" />
                        </div>
                        <div>
                           <span className="block text-xs font-bold text-blue-600 tracking-widest uppercase mb-1">
                              {missionData.header}
                           </span>
                           <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                              {missionData.mainTitle}
                           </h3>
                        </div>
                     </div>

                     {/* Content Section */}
                     <div className="relative z-10 flex-grow">
                        <Quote className="w-8 h-8 text-blue-200 mb-4" />
                        <div className="pl-2 border-l-4 border-blue-100 group-hover:border-blue-400 transition-colors duration-300">
                           <p className="text-slate-600 text-lg leading-relaxed text-justify">
                              {missionData.content}
                           </p>
                        </div>
                     </div>

                     {/* Bottom decoration */}
                     <div className="relative z-10 mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div className="h-px flex-grow bg-gradient-to-r from-blue-200 to-transparent" />
                        <span className="text-xs font-medium text-blue-400">
                           Barangay Culiat Official
                        </span>
                     </div>
                  </motion.div>
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default MissionAndVision2;
