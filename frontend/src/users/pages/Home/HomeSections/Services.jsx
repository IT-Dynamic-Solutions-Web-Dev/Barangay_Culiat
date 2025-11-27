import React from "react";
import {
  FileText,
  Home,
  BadgeCheck,
  HandCoins,
  AlertCircle,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // controls the stagger
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const services = [
  {
    name: "Certificate of Indigency",
    icon: FileText,
    desc: "Request proof of indigency for social or legal purposes.",
  },
  {
    name: "Certificate of Residency",
    icon: Home,
    desc: "Get official confirmation of your barangay residence.",
  },
  {
    name: "Barangay Clearance",
    icon: BadgeCheck,
    desc: "Obtain a clearance for employment or personal use.",
  },
  {
    name: "Community Tax Certificate",
    icon: HandCoins,
    desc: "Secure your CTC (Cedula) for identification and tax purposes.",
  },
  {
    name: "Complaint Certificate",
    icon: AlertCircle,
    desc: "File and receive documentation for barangay-related complaints.",
  },
];

const Services = () => {
  return (
    <section
      className="py-16 px-6 bg-neutral dark:from-gray-900 dark:to-gray-950"
      id="home-services"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-4xl font-bold text-text-color mb-4">
            Online Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Residents can easily access a variety of official certificates and
            permits. Each document includes a QR code for verification and
            authenticity.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-5 mb-10 flex items-start gap-3">
          <div className="bg-blue-600 text-white rounded-full p-1 px-3 flex items-center justify-center mt-0.5">
            <span className="font-bold text-sm">i</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Authentication Required
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              To access these online services, you must log in or register as a
              verified user. Provide valid identification for verification
              before making a request.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 150, damping: 12 },
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer group transition-all"
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }}
                  className="w-12 h-12 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all"
                >
                  <Icon size={24} />
                </motion.div>

                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
