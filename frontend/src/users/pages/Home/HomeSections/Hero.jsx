import React from "react";
import MediaSequence from "../../../../components/MediaSequence";
import Button from "../../../../tailadminsrc/components/ui/button/Button";
import TextChangeShadcn from "../../../../components/Animation/TextChangeShadcn";
import Stat from "../HomeSections/Stat";
import Header from "../../../../components/Header";
// eslint-disable-next-line no-unused-vars
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

const Hero = () => {
  return (
    <section id="home-hero" className="lg:mb-20 mb-0 overflow-hidden">
      <div className="relative min-h-[550px] md:min-h-[768px] flex overflow-hidden">
        <MediaSequence />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-linear-to-br from-[#141414b7] via-[#000000e3] to-[#1f1f1fd0]"
        ></motion.div>

        {/* Content */}
        <div className="mx-auto text-center flex flex-col pt-[7.5em] gap-[3em] z-5 relative">
          {/* Animated Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
          >
            <Header />
          </motion.div>

          {/* Main Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.3}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-text-color-light leading-tight tracking-tight drop-shadow-lg">
              <TextChangeShadcn />
            </h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.5}
              className="px-4 md:px-0 sm:text-base text-sm leading-7 md:text-lg text-text-color-light max-w-2xl mx-auto "
            >
              Your official online public service portal. Access barangay
              services, request documents, and stay updated anytime, anywhere.
            </motion.p>
          </motion.div>

          {/* Optional Buttons (commented out) */}
          {/* <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.7}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="md" className="font-medium px-8">
              Request a document
            </Button>
            <Button
              variant="outlinesecondary"
              size="md"
              className="font-medium"
            >
              Learn more →
            </Button>
          </motion.div> */}
        </div>

        {/* Wave Divider */}
        <motion.svg
          initial={{ y: 20, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="absolute -bottom-1 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
        >
          <path
            fill="#f5f5f5"
            d="M0,64 C480,120 960,0 1440,64 L1440,100 L0,100 Z"
          ></path>
        </motion.svg>
      </div>

      {/* Stats Section */}

      <Stat />
    </section>
  );
};

export default Hero;
