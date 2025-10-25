import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CountingNumber } from "../../../components/ui/shadcn-io/counting-number/index";
import { Users, MapIcon, House, Hammer } from "lucide-react";

const stats = [
  { number: 45892, label: "Total Population", suffix: null, icon: Users },
  { number: 2.8, label: "Barangay Area", suffix: "km²", icon: MapIcon },
  { number: 12456, label: "Number of Households", suffix: null, icon: House },
  { number: 8, label: "Public Projects Ongoing", suffix: null, icon: Hammer },
];

const Stat = () => {
  return (
    <section
      className="lg:absolute lg:-bottom-[3%] lg:left-1/2 lg:-translate-x-1/2 lg:py-0 py-6 w-full px-4 z-10"
      id="home-stat"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="bg-light rounded-lg shadow-md p-6 text-center border border-gray-100 hover:shadow-xl transition-all"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    scale: 1.1,
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }}
                  className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <Icon
                    className="w-6 h-6 text-text-color-light"
                    strokeWidth={3}
                  />
                </motion.div>

                {/* Number */}
                <div className="text-2xl font-bold text-text-color mb-1">
                  <CountingNumber
                    number={stat.number}
                    inView={true}
                    decimalPlaces={stat.number % 1 !== 0 && 1}
                    decimalSeparator="."
                    transition={{ stiffness: 100, damping: 30 }}
                    useThousandsSeparator
                  />
                  <span className="ms-1">{stat?.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stat;
