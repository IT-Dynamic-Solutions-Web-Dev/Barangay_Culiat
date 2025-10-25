import React from "react";
import {
  Landmark,
  Leaf,
  Stethoscope,
  GraduationCap,
  Store,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Landmark,
    title: "Cultural Heritage",
    desc: "From its roots to its progress, Culiat remains proud of its traditions and history.",
  },
  {
    icon: Leaf,
    title: "Green & Sustainable",
    desc: "Community gardens and tree-lined streets reflect our commitment to a clean, healthy future.",
  },
  {
    icon: Stethoscope,
    title: "Health for All",
    desc: "Our health center ensures accessible care and wellness programs for residents.",
  },
  {
    icon: GraduationCap,
    title: "Education & Youth",
    desc: "Daycare and youth programs nurture learning and leadership from an early age.",
  },
  {
    icon: Store,
    title: "Local Livelihood",
    desc: "Small businesses and markets drive our thriving local economy.",
  },
];

// Animation Variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Explore = () => {
  return (
    <section
      className="relative pt-12 px-6 pb-[5.5em] bg-linear-to-bl from-secondary to-secondary-glow"
      id="home-explore"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6"
        >
          <h2 className="text-3xl md:text-4xl text-center sm:text-left font-bold text-text-color-light leading-snug">
            Let’s explore local community, <br className="hidden sm:block" />
            traditions & progress
          </h2>

          <Link
            to="/about"
            className="inline-flex items-center text-nowrap gap-2 bg-accent text-secondary hover:bg-accent-light px-6 py-2 rounded-md font-medium transition-all shadow-md"
          >
            Learn More About Us <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-col md:flex-row md:flex-wrap xl:flex-nowrap gap-6"
        >
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col items-center text-center dark:bg-gray-800 rounded-xl  cursor-pointer transition-all duration-200 flex-1 ${
                  i < 3 ? "md:basis-1/4" : "md:basis-1/3"
                } xl:basis-1/5`}
              >
                <div className="p-3 mt-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Icon
                    className="text-blue-600 dark:text-blue-400"
                    size={28}
                  />
                </div>
                <h4 className="mt-3 font-semibold text-text-color-light dark:text-gray-100">
                  {item.title}
                </h4>
                <p className="mb-4 text-sm w-[70%] sm:w-auto text-neutral/70 dark:text-gray-400 leading-tight">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Curve */}
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

export default Explore;
