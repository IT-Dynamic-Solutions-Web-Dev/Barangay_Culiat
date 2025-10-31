import React, { useState } from "react";
import { Facebook, Mail, Phone } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

const handleCopy = (value, type) => {
   if (navigator.clipboard && value) {
      navigator.clipboard.writeText(value);
      alert(`${type} copied to clipboard: ${value}`);
   } else {
      alert(`Could not copy ${type}. Value: ${value}`);
   }
};

const MemberCard = ({ member }) => {
   const [showButtons, setShowButtons] = useState(false);
   const hasFb = !!member.fb;
   const hasEmail = !!member.email;
   const hasContact = !!member.contact;
   const hasAnyContact = hasFb || hasEmail || hasContact;

   const visibleButtonCount =
      (hasFb ? 1 : 0) + (hasEmail ? 1 : 0) + (hasContact ? 1 : 0);
   const spacingClass = visibleButtonCount > 0 ? "space-y-3" : "";

   const handleCardClick = (e) => {
      if (!e.target.closest("button") && !e.target.closest("a")) {
         setShowButtons(!showButtons);
      }
   };

   return (
      <div className="text-center group">
         {/* image container */}
         <div
            className="relative pt-[100%] rounded-lg overflow-hidden mb-4 shadow-md cursor-pointer md:cursor-default"
            onClick={handleCardClick}
         >
            <img
               src={member.image}
               alt={member.name}
               className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />

            {/* Contact Overlay Wrapper*/}
            {hasAnyContact && (
               <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute right-0 top-0 h-full w-[20%] bg-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Button Container */}
                  <div
                     className={`absolute right-0 top-0 h-full w-[20%] flex flex-col items-center justify-center ${spacingClass} 
                        ${showButtons ? "opacity-100" : "opacity-0"} 
                        md:opacity-0 md:group-hover:opacity-100 
                        transition-opacity duration-300 p-2 pointer-events-auto`}
                  >
                     {/* FB Button*/}
                     {hasFb && (
                        <a
                           href={member.fb}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-blue-700 hover:bg-blue-800 transition-colors duration-200 shadow-lg"
                           title={`Facebook: ${member.name}`}
                        >
                           <Facebook size={18} />
                        </a>
                     )}

                     {/* Email Button  */}
                     {hasEmail && (
                        <button
                           onClick={() => handleCopy(member.email, "Email")}
                           className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-lg"
                           title={`Email: ${member.email} (Click to Copy)`}
                        >
                           <Mail size={18} />
                        </button>
                     )}

                     {/* Contact Button */}
                     {hasContact && (
                        <button
                           onClick={() => handleCopy(member.contact, "Contact")}
                           className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-lg"
                           title={`Contact: ${member.contact} (Click to Copy)`}
                        >
                           <Phone size={18} />
                        </button>
                     )}
                  </div>
               </div>
            )}
         </div>
         <h3 className="text-lg sm:text-xl font-bold text-[#262626] mb-1">
            {member.name}
         </h3>
         <p className="text-[#6c6c6c] text-sm sm:text-base italic">
            {member.position}
         </p>
      </div>
   );
};

// --- Data Object and Main Component

const organizationMembersData = {
   title: "Meet Our Team",
   description:
      "Leadership and key personnel driving Barangay Culiat's initiatives forward.",
   members: [
      {
         name: "Hon. Cristina V. Bernardino",
         position: "Punong Barangay (Barangay Captain)",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         isMain: true,
         fb: "https://facebook.com/juan.delacruz.official",
         email: "juan.dcruz@culiat.gov.ph",
         contact: "09171234567",
      },
      {
         name: "Maria Santos",
         position: "Barangay Kagawad (Councilor) I",
         image: "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg",
         fb: null,
         email: "maria.santos@culiat.gov.ph",
         contact: "09177654321",
      },
      {
         name: "Jose Reyes ",
         position: "Barangay Kagawad (Councilor) II",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/jose.reyes.kagawad",
         email: null,
         contact: null,
      },
      {
         name: "Ana Lim",
         position: "Barangay Kagawad (Councilor) III",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/ana.lim.kagawad",
         email: "ana.lim@culiat.gov.ph",
         contact: "09191213141",
      },
      {
         name: "Pedro Mendoza",
         position: "Barangay Kagawad (Councilor) IV",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/pedro.mendoza.kagawad",
         email: "pedro.mendoza@culiat.gov.ph",
         contact: "09205566778",
      },
      {
         name: "Sophia Tan",
         position: "Barangay Kagawad (Councilor) V",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/sophia.tan.kagawad",
         email: "sophia.tan@culiat.gov.ph",
         contact: "09219988776",
      },
      {
         name: "David Lee",
         position: "Barangay Kagawad (Councilor) VI",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/david.lee.kagawad",
         email: "david.lee@culiat.gov.ph",
         contact: "09224433221",
      },
      {
         name: "Elena Garcia",
         position: "Barangay Kagawad (Councilor) VII",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/elena.garcia.kagawad",
         email: "elena.garcia@culiat.gov.ph",
         contact: "09236789012",
      },
      {
         name: "Sangguniang Kabataan (SK) Chairperson",
         position: "SK Chairperson",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/sk.culiat",
         email: "skchair.culiat@culiat.gov.ph",
         contact: "09241010101",
      },
      {
         name: "Barangay Secretary",
         position: "Barangay Secretary",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/bgy.secretary.culiat",
         email: "sec.culiat@culiat.gov.ph",
         contact: "09252020202",
      },
      {
         name: "Barangay Treasurer",
         position: "Barangay Treasurer",
         image: "https://uifaces.co/our-content/donated/generic-avatar.jpg",
         fb: "https://facebook.com/bgy.treasurer.culiat",
         email: "tres.culiat@culiat.gov.ph",
         contact: "09263030303",
      },
   ],
};

const OrganizationMembers = () => {
   const mainMember = organizationMembersData.members.find(
      (member) => member.isMain
   );
   const otherMembers = organizationMembersData.members.filter(
      (member) => !member.isMain
   );


   return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
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
