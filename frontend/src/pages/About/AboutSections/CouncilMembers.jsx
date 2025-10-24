import React, { useState } from "react";
import {
   User,
   Crown,
   ClipboardList,
   Wallet,
   Users,
   Zap,
   Facebook,
   Mail,
   Phone,
   Globe, // Added Globe icon for Landline
} from "lucide-react";

// --- Mock Data ---
const councilMembers = [
   {
      id: 1,
      name: "Hon. Maria Santos-Cruz",
      position: "Punong Barangay (Captain)",
      icon: Crown,
      color: "text-red-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/KapMariaCruz",
         email: "maria.scruz@barangay.ph",
         contact: "0917-555-1001",
         landline: "(02) 8-920-1000",
      },
   },
   {
      id: 2,
      name: "Juan C. Reyes",
      position: "Kagawad I (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/JuanReyesI",
         email: "juan.reyes@barangay.ph",
         contact: "0917-555-1002",
         landline: "(02) 8-920-1001",
      },
   },
   {
      id: 3,
      name: "Sita G. Diaz",
      position: "Kagawad II (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/SitaGDiaz",
         email: "sita.diaz@barangay.ph",
         contact: "0917-555-1003",
         landline: "(02) 8-920-1002",
      },
   },
   {
      id: 4,
      name: "Ramon B. Santos",
      position: "Kagawad III (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/RamonSantosIII",
         email: "ramon.santos@barangay.ph",
         contact: "0917-555-1004",
         landline: "(02) 8-920-1003",
      },
   },
   {
      id: 5,
      name: "Lina M. Garcia",
      position: "Kagawad IV (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/LinaGarciaIV",
         email: "lina.garcia@barangay.ph",
         contact: "0917-555-1005",
         landline: "(02) 8-920-1004",
      },
   },
   {
      id: 6,
      name: "Ben S. Torres",
      position: "Kagawad V (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/BenTorresV",
         email: "ben.torres@barangay.ph",
         contact: "0917-555-1006",
         landline: "(02) 8-920-1005",
      },
   },
   {
      id: 7,
      name: "Elisa P. Hernandez",
      position: "Kagawad VI (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/ElisaHernandezVI",
         email: "elisa.hernandez@barangay.ph",
         contact: "0917-555-1007",
         landline: "(02) 8-920-1006",
      },
   },
   {
      id: 8,
      name: "Mark V. Cruz",
      position: "Kagawad VII (Councilor)",
      icon: Users,
      color: "text-green-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/MarkVCruz",
         email: "mark.cruz@barangay.ph",
         contact: "0917-555-1008",
         landline: "(02) 8-920-1007",
      },
   },
   {
      id: 9,
      name: "Alex Z. Ramos",
      position: "SK Chairman",
      icon: Zap,
      color: "text-orange-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/SKAlexRamos",
         email: "alex.ramos@barangay.ph",
         contact: "0917-555-1009",
         landline: "(02) 8-920-1008",
      },
   },
   {
      id: 10,
      name: "Jessica A. Lim",
      position: "Sekretarya (Secretary)",
      icon: ClipboardList,
      color: "text-blue-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/SecJessLim",
         email: "jessica.lim@barangay.ph",
         contact: "0917-555-1010",
         landline: "(02) 8-920-1009",
      },
   },
   {
      id: 11,
      name: "Chris E. Lopez",
      position: "Ingat-Yaman (Treasurer)",
      icon: Wallet,
      color: "text-blue-600",
      image: "/images/profiles/Barangay-Captain.jpg",
      social: {
         facebook: "https://facebook.com/TresChrisLopez",
         email: "chris.lopez@barangay.ph",
         contact: "0917-555-1011",
         landline: "(02) 8-920-1010",
      },
   },
];

// --- Reusable Card Component (MODIFIED) ---
const CouncilCard = ({ member }) => {
   const IconComponent = member.icon || User;
   const [showSocial, setShowSocial] = useState(false);

   const handleCardClick = (e) => {
      // Only toggle on mobile/tablet (below md breakpoint)
      // Check if click is not on a social link
      if (!e.target.closest("a")) {
         setShowSocial(!showSocial);
      }
   };

   return (
      <div
         onClick={handleCardClick}
         className="group relative flex flex-col items-center p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                         hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200 dark:border-gray-700 h-full cursor-pointer md:cursor-default"
      >
         <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {member.image ? (
               <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                     e.target.onerror = null;
                     e.target.src =
                        "https://placehold.co/256x256/808080/ffffff?text=No+Photo";
                  }}
               />
            ) : (
               <IconComponent
                  className={`w-16 h-16 sm:w-20 sm:h-20 ${member.color.replace(
                     "text",
                     "fill"
                  )} opacity-50`}
               />
            )}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            {/* Social/Contact Buttons */}
            <div
               className={`absolute top-0 right-0 bottom-0 w-14 sm:w-16 md:w-18 bg-gray-800/90 flex flex-col items-center justify-center space-y-2 sm:space-y-3 p-2
                                 transition-all duration-300 transform z-10
                                 ${
                                    showSocial
                                       ? "opacity-100 translate-x-0"
                                       : "opacity-0 translate-x-full"
                                 }
                                 md:opacity-0 md:translate-x-full md:group-hover:opacity-100 md:group-hover:translate-x-0`}
            >
               {/* Facebook */}
               {member.social?.facebook && (
                  <a
                     href={member.social.facebook}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                     aria-label="Facebook"
                  >
                     <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
               )}
               {/* Email */}
               {member.social?.email && (
                  <a
                     href={`mailto:${member.social.email}`}
                     className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                     aria-label="Email"
                  >
                     <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
               )}
               {/* Contact Number */}
               {member.social?.contact && (
                  <a
                     href={`tel:${member.social.contact.replace(
                        /[^0-9+]/g,
                        ""
                     )}`}
                     className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                     aria-label="Mobile Phone"
                  >
                     <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
               )}
               {/* Landline  */}
               {member.social?.landline && (
                  <a
                     href={`tel:${member.social.landline.replace(
                        /[^0-9+]/g,
                        ""
                     )}`}
                     className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-indigo-500 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                     aria-label="Landline"
                  >
                     <Globe className="w-4 h-4 sm:w-5 sm:h-5" />{" "}
                  </a>
               )}
            </div>
         </div>

         {/* Content (Name & Position) */}
         <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white text-center px-2">
            {member.name}
         </h4>
         <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400 text-center mt-2">
            {member.position}
         </p>
      </div>
   );
};

// --- Main Component ---
const CouncilMembers = () => {
   const captain = councilMembers.slice(0, 1);
   const row2 = councilMembers.slice(1, 5);
   const row3 = councilMembers.slice(5, 9);
   const row4 = councilMembers.slice(9, 11);

   return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
         <div className="container mx-auto max-w-7xl">
            <header className="text-center mb-10 sm:mb-12">
               <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] mb-3 sm:mb-4">
                  Barangay Council
               </h2>
               <p className="text-sm sm:text-base text-[#6c6c6c] max-w-2xl mx-auto px-4">
                  Meet the dedicated officials serving Barangay Culiat with
                  integrity, transparency,
                  <br className="hidden sm:block" />
                  and commitment to community development.
               </p>
            </header>

            <div className="space-y-8 sm:space-y-10">
               {/* ROW 1: Punong Barangay */}
               <div className="flex justify-center">
                  <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
                     {captain.map((member) => (
                        <CouncilCard key={member.id} member={member} />
                     ))}
                  </div>
               </div>

               {/* Barangay Captain Description*/}
               <div className="rounded-lg mb-8 sm:mb-10 text-center">
                  <div className="flex flex-col items-center px-4">
                     <h3 className="text-base sm:text-lg text-[#b30000] font-semibold mb-2">
                        Meet Our Leader
                     </h3>
                     <h2 className="text-xs sm:text-sm text-[#262626] max-w-2xl leading-relaxed">
                        Leading Barangay Culiat with over 15 years of public
                        service experience, focusing on
                        <br className="hidden sm:block" />
                        community development, infrastructure improvement, and
                        transparent governance.
                     </h2>
                  </div>
               </div>

               {/* Horizontal Divider */}
               <hr className="border-t border-red-500 dark:border-red-600 w-1/4 mx-auto my-10 sm:my-12" />
               <header className="text-center mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] mb-3 sm:mb-4">
                     Barangay Council Members
                  </h2>
                  <p className="text-sm sm:text-base text-[#6c6c6c] max-w-2xl mx-auto px-4">
                     Meet the dedicated officials serving Barangay Culiat with
                     integrity, transparency,
                     <br className="hidden sm:block" />
                     and commitment to community development.
                  </p>
               </header>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {/* Kagawad I-IV */}
                  {row2.map((member) => (
                     <CouncilCard key={member.id} member={member} />
                  ))}
                  {/* Kagawad V-VII, SK Chairman */}
                  {row3.map((member) => (
                     <CouncilCard key={member.id} member={member} />
                  ))}
               </div>

               {/* Horizontal Divider */}
               <hr className="border-t border-blue-500 dark:border-blue-600 w-1/4 mx-auto my-10 sm:my-12" />

               <header className="text-center mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] mb-3 sm:mb-4">
                     Barangay Secretary and Treasurer
                  </h2>
               </header>

               <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-2xl px-4 sm:px-0">
                     {row4.map((member) => (
                        <CouncilCard key={member.id} member={member} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CouncilMembers;
