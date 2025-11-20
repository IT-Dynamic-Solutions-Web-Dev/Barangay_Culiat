import React from "react";
import { Facebook, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants for the Grid ---
const container = {
   hidden: {},
   show: {
      transition: {
         staggerChildren: 0.1,
      },
   },
};

const item = {
   hidden: { opacity: 0, y: 40 },
   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Helper Function ---
const handleCopy = (value, type) => {
   if (!value) return;
   if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
      // Optional: You can replace this alert with a toast notification
      alert(`${type} copied: ${value}`);
   }
};

// --- Enhanced Card Component ---
const MemberCard = ({ member }) => {
   return (
      <motion.div
         className="group h-full"
         whileHover={{ y: -8 }} // Framer Motion lift effect
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
         <div className="relative h-full bg-white rounded-2xl shadow-sm group-hover:shadow-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 flex flex-col">
            {/* Decorative Top Banner with Shine Effect */}
            <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700 relative overflow-hidden">
               {/* The Shine/Glint Animation */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Avatar (Overlapping) */}
            <div className="relative mx-auto -mt-16 w-36 h-36 p-1 bg-white rounded-full z-10">
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md relative">
                  <img
                     src={member.image}
                     alt={member.name}
                     className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
                  />
               </div>
            </div>

            {/* Content Body */}
            <div className="p-6 pt-3 text-center flex-grow flex flex-col justify-between relative z-10">
               <div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 group-hover:text-blue-800 transition-colors duration-300">
                     {member.name}
                  </h3>
                  {/* Position Text - Changed to RED */}
                  <p className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">
                     {member.position}
                  </p>

                  {/* --- VISIBLE EMAIL DISPLAY --- */}
                  {member.email && (
                     <p className="text-xs sm:text-sm text-gray-500 font-medium break-all">
                        {member.email}
                     </p>
                  )}
               </div>

               {/* Interactive Action Bar with Spring Animations */}
               <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center gap-4">
                  {/* Facebook */}
                  {member.fb ? (
                     <motion.a
                        href={member.fb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 bg-transparent rounded-full"
                        whileHover={{
                           scale: 1.2,
                           color: "#1877F2",
                           backgroundColor: "#eff6ff",
                        }} // Blue hover
                        whileTap={{ scale: 0.9 }}
                        title="Visit Facebook Profile"
                     >
                        <Facebook size={20} />
                     </motion.a>
                  ) : (
                     <span className="p-2 text-gray-200 cursor-not-allowed">
                        <Facebook size={20} />
                     </span>
                  )}

                  {/* Email Button (Copies to Clipboard) */}
                  {member.email ? (
                     <motion.button
                        onClick={() => handleCopy(member.email, "Email")}
                        className="p-2 text-gray-400 bg-transparent rounded-full"
                        whileHover={{
                           scale: 1.2,
                           color: "#EA4335",
                           backgroundColor: "#fef2f2",
                        }} // Red hover
                        whileTap={{ scale: 0.9 }}
                        title="Copy Email to Clipboard"
                     >
                        <Mail size={20} />
                     </motion.button>
                  ) : (
                     <span className="p-2 text-gray-200 cursor-not-allowed">
                        <Mail size={20} />
                     </span>
                  )}

                  {/* Phone */}
                  {member.contact ? (
                     <motion.button
                        onClick={() =>
                           handleCopy(member.contact, "Phone Number")
                        }
                        className="p-2 text-gray-400 bg-transparent rounded-full"
                        whileHover={{
                           scale: 1.2,
                           color: "#16a34a",
                           backgroundColor: "#f0fdf4",
                        }} // Green hover
                        whileTap={{ scale: 0.9 }}
                        title={`Copy Contact: ${member.contact}`}
                     >
                        <Phone size={20} />
                     </motion.button>
                  ) : (
                     <span className="p-2 text-gray-200 cursor-not-allowed">
                        <Phone size={20} />
                     </span>
                  )}
               </div>
            </div>
         </div>
      </motion.div>
   );
};

// --- Data ---
const organizationMembersData = {
   title: "Barangay Officials",
   description:
      "Meet the dedicated leaders serving our community with passion and integrity.",
   members: [
      {
         name: "Hon. Cristina V. Bernardino",
         position: "Punong Barangay (Barangay Captain)",
         image: "/images/brgy/captain-main.jpg",
         isMain: true,
         fb: "https://facebook.com/juan.delacruz.official",
         email: "juan.dcruz@culiat.gov.ph",
         contact: "09171234567",
      },
      {
         name: "Maria Santos",
         position: "Barangay Kagawad (Councilor) I",
         image: "https://randomuser.me/api/portraits/women/68.jpg",
         fb: null,
         email: "maria.santos@culiat.gov.ph",
         contact: "09177654321",
      },
      {
         name: "Jose Reyes ",
         position: "Barangay Kagawad (Councilor) II",
         image: "https://randomuser.me/api/portraits/men/32.jpg",
         fb: "https://facebook.com/jose.reyes.kagawad",
         email: "jose.reyes@culiat.gov.ph",
         contact: null,
      },
      {
         name: "Ana Lim",
         position: "Barangay Kagawad (Councilor) III",
         image: "https://randomuser.me/api/portraits/women/90.jpg",
         fb: "https://facebook.com/ana.lim.kagawad",
         email: "ana.lim@culiat.gov.ph",
         contact: "09191213141",
      },
      {
         name: "Pedro Mendoza",
         position: "Barangay Kagawad (Councilor) IV",
         image: "https://randomuser.me/api/portraits/men/86.jpg",
         fb: "https://facebook.com/pedro.mendoza.kagawad",
         email: "pedro.mendoza@culiat.gov.ph",
         contact: "09205566778",
      },
      {
         name: "Sophia Tan",
         position: "Barangay Kagawad (Councilor) V",
         image: "https://randomuser.me/api/portraits/women/22.jpg",
         fb: "https://facebook.com/sophia.tan.kagawad",
         email: "sophia.tan@culiat.gov.ph",
         contact: "09219988776",
      },
      {
         name: "David Lee",
         position: "Barangay Kagawad (Councilor) VI",
         image: "https://randomuser.me/api/portraits/men/54.jpg",
         fb: "https://facebook.com/david.lee.kagawad",
         email: "david.lee@culiat.gov.ph",
         contact: "09224433221",
      },
      {
         name: "Elena Garcia",
         position: "Barangay Kagawad (Councilor) VII",
         image: "https://randomuser.me/api/portraits/women/48.jpg",
         fb: "https://facebook.com/elena.garcia.kagawad",
         email: "elena.garcia@culiat.gov.ph",
         contact: "09236789012",
      },
      {
         name: "Sangguniang Kabataan (SK) Chairperson",
         position: "SK Chairperson",
         image: "https://randomuser.me/api/portraits/men/11.jpg",
         fb: "https://facebook.com/sk.culiat",
         email: "skchair.culiat@culiat.gov.ph",
         contact: "09241010101",
      },
      {
         name: "Barangay Secretary",
         position: "Barangay Secretary",
         image: "https://randomuser.me/api/portraits/women/60.jpg",
         fb: "https://facebook.com/bgy.secretary.culiat",
         email: "sec.culiat@culiat.gov.ph",
         contact: "09252020202",
      },
      {
         name: "Barangay Treasurer",
         position: "Barangay Treasurer",
         image: "https://randomuser.me/api/portraits/men/75.jpg",
         fb: "https://facebook.com/bgy.treasurer.culiat",
         email: "tres.culiat@culiat.gov.ph",
         contact: "09263030303",
      },
   ],
};

// --- Main Section Component ---
const OrganizationMembers = () => {
   const mainMember = organizationMembersData.members.find(
      (member) => member.isMain
   );
   const otherMembers = organizationMembersData.members.filter(
      (member) => !member.isMain
   );

   return (
      <section className="py-12 sm:py-16 lg:py-20 bg-neutral">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               viewport={{ once: true }}
               className="text-center mb-8"
            >
               <h2 className="text-3xl font-bold text-[#262626] mb-4">
                  {organizationMembersData.title}
               </h2>
               <p className="text-[#6c6c6c]">
                  {organizationMembersData.description}
               </p>
            </motion.div>

            {mainMember && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex justify-center mb-10 md:mb-16"
               >
                  <div className="w-full sm:w-2/3 lg:w-1/3 text-center">
                     <MemberCard member={mainMember} />
                  </div>
               </motion.div>
            )}

            <motion.div
               variants={container}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, amount: 0.1 }}
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
               {otherMembers.map((member, index) => {
                  // Logic to center the last item if it's a lone orphan in the grid
                  const isSingleLastItem = otherMembers.length % 3 === 1;
                  const isLastItemInPartialRow =
                     isSingleLastItem && index === otherMembers.length - 1;

                  let centeringClass = "";
                  if (isLastItemInPartialRow) {
                     centeringClass = "lg:col-start-2";
                  }

                  return (
                     <motion.div
                        key={member.name}
                        variants={item}
                        className={`w-full ${centeringClass}`}
                     >
                        <MemberCard member={member} />
                     </motion.div>
                  );
               })}
            </motion.div>
         </div>
      </section>
   );
};

export default OrganizationMembers;
