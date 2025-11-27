import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, Quote } from "lucide-react";

const barangayData = [
   {
      key: "vision",
      icon: Eye,
      header: "OUR VISION",
      content:
         "Sa Barangay Culiat, serbisyo ay tapat, Lunes hanggang Linggo, tuloy-tuloy ang serbisyo na maghahatid ng Kalidad na Serbisyo, Kalinga sa tao, Kalingang Nanay, Kalingang Tunay.",
      theme: {
         iconBg: "bg-blue-50",
         iconColor: "text-blue-600",
         hoverIconBg: "group-hover:bg-blue-600",
         hoverTitle: "group-hover:text-blue-700",
         lineColor: "bg-blue-200",
         quoteColor: "text-blue-100",
         gradientShape: "from-blue-100 to-blue-50",
         hoverShadow: "hover:shadow-blue-900/20",
      },
   },
   {
      key: "mission",
      icon: Target,
      header: "OUR MISSION",
      content:
         "Ang Barangay Culiat ay sasalamin sa programa ng pamahalaang Lungsod Quezon na isang maunlad, malinis, maayos at mapayapang pamayanan na nakatuntong sa matapat, marangal at mapagkawang-gawa na paglilingkod na may pagkilala ng pagkakapantay ng kasarian o kalagayan sa lipunan kasabay din nang pangangalaga sa kalikasan at kapaligiran, na patuloy na makasusunod sa makabagong teknolohiya.",
      theme: {
         iconBg: "bg-indigo-50",
         iconColor: "text-indigo-600",
         hoverIconBg: "group-hover:bg-indigo-600",
         hoverTitle: "group-hover:text-indigo-700",
         lineColor: "bg-indigo-200",
         quoteColor: "text-indigo-100",
         gradientShape: "from-indigo-100 to-indigo-50",
         hoverShadow: "hover:shadow-indigo-900/20",
      },
   },
];

// New Animation Variants - Cleaner Fade In
const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.3,
      },
   },
};

const cardVariants = {
   hidden: { opacity: 0, scale: 0.95 },
   visible: {
      opacity: 1,
      scale: 1,
      transition: {
         duration: 0.5,
         ease: "easeOut",
      },
   },
   hover: {
      y: -8,
      transition: {
         duration: 0.3,
         ease: "easeOut",
      },
   },
};

const iconVariants = {
   hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
   },
};

const MissionAndVision = () => {
   return (
      <section id="about-goals" className="py-16 px-4 bg-neutral">
         <div className="relative max-w-5xl mx-auto">
            {/* Section Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-center mb-12"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                  Barangay Culiat{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                     Principles
                  </span>
               </h2>
               <p className="text-slate- max-w-xl mx-auto text-base md:text-lg">
                  Ang aming gabay sa tapat na paglilingkod at pag-unlad ng
                  komunidad.
               </p>
            </motion.div>

            {/* Grid Layout */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-50px" }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
               {barangayData.map((item) => (
                  <motion.div
                     key={item.key}
                     variants={cardVariants}
                     whileHover="hover"
                     className="flex"
                  >
                     <div
                        className={`group relative w-full bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-300 ${item.theme.hoverShadow}`}
                     >
                        {/* Decorative Background Shape - Smaller */}
                        <div
                           className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${item.theme.gradientShape} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                        />

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col h-full">
                           {/* Header */}
                           <div className="flex items-center gap-4 mb-5">
                              <motion.div
                                 variants={iconVariants}
                                 className={`w-14 h-14 shrink-0 rounded-xl ${item.theme.iconBg} ${item.theme.iconColor} flex items-center justify-center shadow-sm ${item.theme.hoverIconBg} group-hover:text-white transition-colors duration-300`}
                              >
                                 <item.icon
                                    className="w-7 h-7"
                                    strokeWidth={2}
                                 />
                              </motion.div>
                              <div>
                                 <h3
                                    className={`text-xl font-bold text-slate-900 tracking-tight uppercase ${item.theme.hoverTitle} transition-colors duration-300`}
                                 >
                                    {item.header}
                                 </h3>
                                 {/* Animated Underline */}
                                 <div
                                    className={`h-1 w-10 ${item.theme.lineColor} rounded-full mt-2 group-hover:w-full transition-all duration-500 ease-out`}
                                 />
                              </div>
                           </div>

                           {/* Body */}
                           <div className="flex-grow relative">
                              <Quote
                                 className={`absolute -top-2 -left-1 w-8 h-8 ${item.theme.quoteColor} opacity-50 transform -scale-x-100`}
                              />
                              <p className="relative text-slate-600 text-sm md:text-base leading-relaxed text-justify pl-3 z-10">
                                 {item.content}
                              </p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>
   );
};

export default MissionAndVision;
