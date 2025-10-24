import React, { useState } from "react";

const Milestones = () => {
   const [activeIndex, setActiveIndex] = useState(null);

   const milestones = [
      {
         year: "1950",
         title: "Barangay Establishment",
         description: "Official recognition as a barangay under Quezon City",
      },
      {
         year: "1965",
         title: "First Market Opened",
         description:
            "The establishment of the community's first central market.",
      },
      {
         year: "1985",
         title: "Community Center Built",
         description:
            "Construction of the first barangay hall and community center",
      },
      {
         year: "1992",
         title: "Electrification Project",
         description:
            "Completion of the major electrical grid expansion project.",
      },
      {
         year: "2000",
         title: "Healthcare Facility",
         description:
            "Opening of Barangay Health Center providing free medical services",
      },
      {
         year: "2005",
         title: "Water System Upgrade",
         description:
            "Modernization of the barangay's primary water distribution system.",
      },
      {
         year: "2010",
         title: "Infrastructure Development",
         description:
            "Major road improvements and street lighting installation",
      },
      {
         year: "2015",
         title: "Youth Sports Program",
         description:
            "Launch of the official barangay-wide youth sports league.",
      },
      {
         year: "2020",
         title: "Digital Transformation",
         description:
            "Implementation of online services and digital barangay system",
      },
      {
         year: "2022",
         title: "Disaster Preparedness",
         description:
            "Introduction of a comprehensive disaster response plan and drills.",
      },
      {
         year: "2024",
         title: "Smart Barangay Initiative",
         description:
            "Launch of smart governance and community engagement programs",
      },
   ];

   const ContactItem = ({ icon: Icon, text }) => (
      <div className="flex items-start gap-1 text-xs sm:text-sm">
         <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon className="w-3 h-3 text-primary" />
         </div>
         <span className="text-text-color">{text}</span>
      </div>
   );

   const MailIcon = (props) => (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
         />
      </svg>
   );

   const PhoneIcon = (props) => (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
         />
      </svg>
   );

   const MapPinIcon = (props) => (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
         />
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
         />
      </svg>
   );

   return (
      <section className="py-6 sm:py-8 px-4 bg-white min-h-screen flex items-center">
         <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-[#262626] mb-4">
                  Barangay Milestones
               </h2>
               <p className="text-[#6c6c6c]">
                  Journey through our barangay's history and key achievements
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
               <div className="lg:max-h-[420px] overflow-y-scroll space-y-2 pr-2">
                  {milestones.map((milestone, index) => (
                     <div
                        key={index}
                        className="relative pl-6 sm:pl-8 cursor-pointer transition-all duration-300"
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                     >
                        {index !== milestones.length - 1 && (
                           <div className="absolute left-2 sm:left-3 top-4 bottom-0 w-0.5 bg-neutral-active"></div>
                        )}

                        <div
                           className={`absolute left-0 sm:left-0 top-1 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                              activeIndex === index
                                 ? "bg-primary border-primary shadow-lg"
                                 : "bg-white border-neutral-active"
                           }`}
                        ></div>

                        <div
                           className={`bg-neutral rounded-lg p-2 transition-all duration-300 border-2 ${
                              activeIndex === index
                                 ? "border-primary"
                                 : "border-transparent"
                           }`}
                        >
                           <div className="flex items-start justify-between gap-3 mb-0.5">
                              <span
                                 className={`text-xs sm:text-sm font-bold transition-colors ${
                                    activeIndex === index
                                       ? "text-primary"
                                       : "text-secondary"
                                 }`}
                              >
                                 {milestone.year}
                              </span>
                              {activeIndex === index && (
                                 <svg
                                    className="w-3 h-3 text-primary flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              )}
                           </div>
                           <h3 className="text-xs font-semibold text-text-color mb-0.5">
                              {milestone.title}
                           </h3>
                           <p className="text-xs text-text-secondary leading-snug">
                              {milestone.description}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="lg:sticky lg:top-10 lg:self-start">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-neutral-active">
                     <div className="bg-gradient-to-r from-primary to-primary-glow text-white p-2 sm:p-3 text-center">
                        <h3 className="text-base sm:text-lg font-bold">
                           Meet Our Leader
                        </h3>
                        <div className="w-8 h-0.5 bg-accent mx-auto mt-0.5"></div>
                     </div>

                     <div className="p-2 sm:p-3">
                        <div className="flex justify-center mb-2">
                           <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-neutral shadow-lg">
                              <img
                                 src="/images/profiles/Barangay-Captain.jpg"
                                 alt="Barangay Captain"
                                 className="w-full h-full object-cover"
                                 onError={(e) => {
                                    e.target.src =
                                       "https://via.placeholder.com/300x300/b30000/ffffff?text=Barangay+Captain";
                                 }}
                              />
                           </div>
                        </div>

                        <div className="text-center mb-1">
                           <h4 className="text-base sm:text-lg font-bold text-secondary mb-0.5">
                              Cristina V. Bernardino
                           </h4>
                           <p className="text-xs text-primary font-semibold">
                              Barangay Captain
                           </p>
                        </div>

                        <div className="mb-2">
                           <p className="text-xs text-text-color leading-snug text-justify">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Consequatur vero magnam architecto. Illo
                              quidem sapiente est nobis tempora possimus
                              veritatis dolor quo corporis eos facere iste
                              tenetur dignissimos, mollitia repellat.
                           </p>
                        </div>

                        <div className="space-y-1 border-t border-neutral-active pt-2">
                           <ContactItem
                              icon={MailIcon}
                              text="brgy.culiat@yahoo.com"
                           />
                           <ContactItem
                              icon={PhoneIcon}
                              text="856-722-60 | 0962-582-1531"
                           />
                           <ContactItem
                              icon={MapPinIcon}
                              text="District 6 • Quezon City • Metro Manila"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Milestones;
