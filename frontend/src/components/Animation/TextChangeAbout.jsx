import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// TextChangeShadcnComponent.jsx
// A text change animation with per-word class styling.

const DEFAULT_WORDS = [
   { text: "#KilalaninKami", className: "" },
   {
      text: "#LearnAboutUs",
      className: "text-3xl sm:text-5xl lg:text-7xl py-2",
   },
   { text: "#KilalaninAngCuliat", className: "" },
   { text: "#KnowOurVision", className: "" },
   { text: "#KnowOurMission", className: "" },
];

export default function TextChangeShadcn({
   words = DEFAULT_WORDS,
   displayMs = 5200,
   letterDelayMs = 35,
   className = "",
}) {
   const [index, setIndex] = useState(0);
   const timeoutRef = useRef(null);

   useEffect(() => {
      timeoutRef.current = setTimeout(() => {
         setIndex((i) => (i + 1) % words.length);
      }, displayMs);

      return () => {
         if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
   }, [index, displayMs, words.length]);

   const current = words[index];

   return (
      <div className={`inline-block overflow-hidden py-2 ${className}`}>
         <AnimatePresence mode="wait">
            <motion.div
               key={current.text}
               initial={{ opacity: 0, y: 6 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -6 }}
               transition={{ duration: 0.35 }}
               className={`flex justify-center ${current.className}`}
            >
               {Array.from(current.text).map((ch, i) => (
                  <motion.span
                     key={`${current.text}-${i}`}
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -6 }}
                     transition={{
                        duration: 0.36,
                        delay: (i * letterDelayMs) / 1000,
                     }}
                     className="inline-block"
                     style={{ willChange: "transform, opacity" }}
                  >
                     {ch === " " ? "\u00A0" : ch}
                  </motion.span>
               ))}
            </motion.div>
         </AnimatePresence>
      </div>
   );
}
