import React, { useState } from "react";

const MissionAndVision = () => {
   const [openAccordion, setOpenAccordion] = useState(null);

   const toggleAccordion = (index) => {
      setOpenAccordion(openAccordion === index ? null : index);
   };

   const layuninData = [
      {
         title: "Serbisyong Panlipunan",
         icon: "1️⃣",
         items: [
            "Nararamdamang presensya ng barangay sa mga health center, paaralan, trapiko, at palengke.",
            "Pagtulong sa pagbubuo ng mga organisadong grupo tulad ng kababaihan, kabataan, seniors, PWD, PWUD, HOA, drayber, at iba pang sektor.",
            "Pagsasagawa ng mga pagsasanay at team building para sa kaalaman sa karapatan, tungkulin, at kapangyarihan ng mga mamamayan.",
         ],
      },
      {
         title: "Pangkabuhayan at Pag-unlad",
         icon: "2️⃣",
         items: [
            "Pagpapatupad ng mabilis at makabagong proseso sa pagkuha ng mga permit at lisensya.",
            "Pag-oorganisa ng mga seminar at pagsasanay kasama ang mga negosyante, NGO, at iba pang organisasyon.",
            'Pagbuo ng database ng mga "underemployed" para sa mas mahusay na pagtutugma ng trabaho.',
         ],
      },
      {
         title: "Programang Pangkalikasan",
         icon: "3️⃣",
         items: [
            'Pagpapalaganap ng kulturang "Tapat Ko, Linis Ko!"',
            "Pagsuporta sa pagtatanim ng gulay at circular economy sa barangay.",
         ],
      },
      {
         title: "Inprastraktura",
         icon: "4️⃣",
         items: [
            "Pagkilala at pagpapatupad ng mga proyektong pang-imprastraktura kasama ang mga stakeholder.",
            "Pagsisiguro na maayos at ligtas ang mga kalsada, drainage, at sewer sa bawat purok.",
         ],
      },
      {
         title: "Pagpapatatag at Pagpapahusay",
         icon: "5️⃣",
         items: [
            'Pagtatatag ng "Tatak ng Mabuting Pamamahala" — isang pamumuno na nakatuon sa Kalidad na Serbisyo, Kalinga sa Tao, Kalingang Nanay, at Kalingang Tunay.',
            "Patuloy na pagsuporta sa kababaihan, kabataan, PWD, PWUD, LGBTQI+, at seniors.",
         ],
      },
   ];

   return (
      <section className="py-8 px-4 bg-neutral">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-5">
               <h2 className="text-3xl font-bold text-[#262626] mb-4">
                  Mission & Vision
               </h2>
               <p className="text-[#6c6c6c]">
                  Glimpses of our programs, events, and public services that
                  shape Bagong Culiat.
               </p>
            </div>

            {/* 1. Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 px-2 sm:px-0">
               {/* Vision Card */}
               <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 border-l-4 sm:border-l-0 sm:border-t-4 border-primary transition-all duration-300 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                           className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                           />
                        </svg>
                     </div>
                     <h2 className="text-xl font-bold text-primary uppercase tracking-wide">
                        Vision
                     </h2>
                  </div>
                  <div className="text-text-color leading-snug space-y-2 flex-grow text-sm">
                     <p>
                        Sa Barangay Culiat, ang serbisyo ay tapat — mula Lunes
                        hanggang Linggo, tuloy-tuloy ang pagkalinga sa tao.
                     </p>
                     <p>
                        Maghahatid kami ng{" "}
                        <span className="font-semibold text-primary">
                           Kalidad na Serbisyo
                        </span>
                        ,{" "}
                        <span className="font-semibold text-primary">
                           Kalingang Nanay
                        </span>
                        , at{" "}
                        <span className="font-semibold text-primary">
                           Kalingang Tunay
                        </span>{" "}
                        para sa bawat mamamayan.
                     </p>
                  </div>
               </div>

               {/* Mission Card */}
               <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 border-l-4 sm:border-l-0 sm:border-t-4 border-secondary transition-all duration-300 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                           className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                           />
                        </svg>
                     </div>
                     <h2 className="text-xl font-bold text-secondary uppercase tracking-wide">
                        Mission
                     </h2>
                  </div>
                  <div className="text-text-color leading-snug space-y-2 flex-grow text-sm">
                     <p>
                        Ang Barangay Culiat ay magiging salamin ng mga programa
                        ng Pamahalaang Lungsod Quezon — isang maunlad, malinis,
                        maayos, handa, at ligtas na komunidad.
                     </p>
                     <p>
                        Kami ay maglilingkod nang may{" "}
                        <span className="font-semibold text-secondary">
                           katapatan
                        </span>
                        ,{" "}
                        <span className="font-semibold text-secondary">
                           dangal
                        </span>
                        , at{" "}
                        <span className="font-semibold text-secondary">
                           malasakit
                        </span>
                        , nang walang kinikilingan sa kasarian o kalagayan sa
                        lipunan.
                     </p>
                     <p>
                        Kasabay nito, aming isusulong ang pangangalaga sa
                        kalikasan at paggamit ng makabagong teknolohiya upang
                        makamit ang mas maunlad, malusog, at mapayapang
                        pamayanan.
                     </p>
                  </div>
               </div>
            </div>

            <div className="text-center mb-5">
               <h2 className="text-3xl font-bold text-[#262626] mb-4">
                  Layunin
               </h2>
               <p className="text-[#6c6c6c]">
                  Ang Barangay Culiat ay maasahang tuparin ang adhikain ng
                  Kalidad na Serbisyong Publiko sa limang pangunahing larangan:
               </p>
            </div>
            {/* 2. Layunin Section  */}
            <div className="bg-white rounded-lg shadow-md p-5 sm:p-4 mx-2 sm:mx-0">
               {/* Accordion */}
               <div className="space-y-1 sm:space-y-2">
                  {layuninData.map((item, index) => (
                     <div
                        key={index}
                        className="border border-neutral-active rounded-md overflow-hidden hover:border-primary transition-colors duration-200"
                     >
                        <button
                           onClick={() => toggleAccordion(index)}
                           className="w-full flex items-center justify-between p-2 sm:p-3 bg-neutral hover:bg-neutral-active transition-colors duration-200 text-left"
                        >
                           <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-lg sm:text-xl flex-shrink-0">
                                 {item.icon}
                              </span>
                              <h3 className="text-sm font-semibold text-text-color truncate">
                                 {item.title}
                              </h3>
                           </div>
                           <svg
                              className={`w-4 h-4 text-primary transform transition-transform duration-200 flex-shrink-0 ml-1 ${
                                 openAccordion === index ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M19 9l-7 7-7-7"
                              />
                           </svg>
                        </button>
                        <div
                           className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              openAccordion === index
                                 ? "max-h-[500px] opacity-100"
                                 : "max-h-0 opacity-0"
                           }`}
                        >
                           <div className="p-2 sm:p-3 bg-white border-t border-neutral-active">
                              <ul className="space-y-1">
                                 {item.items.map((subItem, subIndex) => (
                                    <li
                                       key={subIndex}
                                       className="flex items-start gap-2"
                                    >
                                       <span className="text-accent text-xs mt-0.5 flex-shrink-0 font-bold">
                                          ✓
                                       </span>
                                       <span className="text-text-color leading-tight text-xs">
                                          {subItem}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default MissionAndVision;
