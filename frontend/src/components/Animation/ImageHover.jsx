import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from "framer-motion";

const ImageHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth follow using spring physics
  const smoothX = useSpring(x, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      className="relative inline-block cursor-pointer "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Base Image */}
      <motion.div
        initial={{ opacity: 0.5, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl max-h-[550px]">
          <img
            src="/images/brgy/captain-main.jpg"
            alt="Barangay Captain"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      </motion.div>

      {/* Floating image that follows cursor */}
      {isHovering && (
        <motion.img
          src="/images/brgy/captain-hover.jpg"
          alt="Captain cursor"
          className="absolute w-54 h-54 rounded-md shadow-xl pointer-events-none"
          style={{
            x: smoothX,
            y: smoothY,
            translateY: "-240%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />
      )}
    </div>
  );
};

export default ImageHover;
