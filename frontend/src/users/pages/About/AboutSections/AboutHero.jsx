import React from "react";
import { useLocation } from "react-router-dom";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeUp = {
   hidden: { opacity: 0, y: 40 },
   show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" },
   }),
};

const AboutHero = () => {
   const location = useLocation();
   const [resetKey, setResetKey] = React.useState(0);

   React.useEffect(() => {
      setResetKey((prev) => prev + 1);
   }, [location.pathname]);

   return (
      <section id="about-hero" className="relative lg:mb-0 mb-0" key={resetKey}>
         <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative text-white overflow-hidden"
            style={{
               background:
                  "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-glow) 100%)",
            }}
         >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
               <div
                  className="absolute inset-0"
                  style={{
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: "40px 40px",
                  }}
               ></div>
            </div>

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28 text-center">
               {/* Animated Icon Badge */}
               <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
               >
                  <Info className="w-8 h-8 md:w-10 md:h-10" />
               </motion.div>

               {/* Title */}
               <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={0.1}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 max-w-3xl mx-auto"
               >
                  About Us
               </motion.h1>

               {/* Description */}
               <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={0.3}
                  className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mx-auto"
               >
                  Discover Barangay Culiat’s mission, vision, goals, and the
                  leaders who guide our growing community.
               </motion.p>
            </div>

            {/* Wave Divider */}
            <div
               className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
               style={{ transform: "rotate(180deg)" }}
            >
               <svg
                  className="relative block w-full h-12 md:h-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
               >
                  <path
                     d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                     fill="var(--color-neutral)"
                  ></path>
               </svg>
            </div>
         </motion.section>
      </section>
   );
};

export default AboutHero;
