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
            src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/481457033_572251952496279_7892937193905517506_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFaK-ibay8cIHBFxkUFcIbhzhiO2cMa6FXOGI7ZwxroVVI1A9G1A9znzggGOFQQX6fHThuXEpK_9tsQaCX11YuY&_nc_ohc=-rF4C6SYRwkQ7kNvwHwHvya&_nc_oc=Adm8DOLnIB5GRfsDEJCnnU69qMNqM0iquiFYZLYNjJAsJcpuThTLQ7ZXWstfZWehpnI&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=m9LXVWFuYpzb7zQHOde-Hg&oh=00_AffyW6R7NNHc8w2fQA8HFyBEQcV-_hvatplm5KmGMSwMVQ&oe=69017FB0"
            alt="Barangay Captain"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      </motion.div>

      {/* Floating image that follows cursor */}
      {isHovering && (
        <motion.img
          src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/480878973_570497736005034_381990214192133786_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHtDp-vrSFno1oeWdhqvswYXQoAJ3f-Q9RdCgAnd_5D1L6HlIQGcFWF1smpTQ-XHYEJbFmeiDuCsLMYI9zFZIw4&_nc_ohc=AXh3JsccRk8Q7kNvwGdN4qc&_nc_oc=Adl8-nnEWQtwdifICXTTH-BdHKB9WfG8SoKCfmoWi0eZafTno_20jJ2Q5YnJqyeE88c&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=GTOJeBmXjGYa_JydCOslkg&oh=00_AfejW7zuaaMWEsduh6WqMUTbZZxlwKpF0b0_0SozmerhOg&oe=69017105"
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
