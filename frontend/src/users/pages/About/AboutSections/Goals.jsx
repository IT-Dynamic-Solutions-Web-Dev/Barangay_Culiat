import React from "react";

const goalsData = {
   title: "Layunin ng Culiat",
   intro: "Narito ang mga pangunahing layunin at pangako ng Barangay Culiat para sa de-kalidad na serbisyo at tunay na kalinga sa pamayanan.",
   items: [
      {
         number: "01",
         title: "Serbisyong Panlipunan",
         description:
            "Presensya ng barangay sa paaralan, health center, at tulong sa iba’t ibang sektor.",
      },
      {
         number: "02",
         title: "Pangkabuhayang Pag-unlad",
         description:
            "Mabilis na proseso sa negosyo, pagsasanay, at tulong sa underemployed.",
      },
      {
         number: "03",
         title: "Programang Pangkalikasan",
         description:
            "Disiplina sa kalinisan at pagsuporta sa urban gardening.",
      },
      {
         number: "04",
         title: "Inprastraktura",
         description:
            "Maayos na kalsada, drainage, at proyektong pangkomunidad.",
      },
      {
         number: "05",
         title: "Pagpapatatag ng Pamamahala",
         description:
            "Tatak ng Mabuting Pamahalaan – Kalidad na Serbisyo, Kalingang Tunay.",
      },
   ],
};

const Goals = () => {
   return (
      <section id="about-goals" className="py-16 px-6 bg-neutral">
         <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
               <div className="relative w-full h-80 md:h-96 lg:h-full lg:min-h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <div
                     className="absolute inset-0 bg-cover bg-center"
                     style={{
                        backgroundImage: `url('https://picsum.photos/seed/barangay/800/600')`,
                     }}
                     aria-label="Barangay Culiat Priorities Visual"
                  ></div>
               </div>

               <div className="flex flex-col space-y-8">
                  <div>
                     <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-4 leading-tight">
                        {goalsData.title}
                     </h2>
                     <p className="text-gray-600">{goalsData.intro}</p>
                  </div>

                  <div className="space-y-5">
                     {goalsData.items.map((item) => (
                        <div key={item.number} className="flex space-x-4">
                           <div className="flex-shrink-0">
                              <div className="w-10 h-10 flex items-center justify-center bg-secondary text-white font-bold rounded-full text-sm">
                                 {item.number}
                              </div>
                           </div>
                           <div className="flex-1">
                              <h3 className="text-lg font-bold text-text-color mb-1">
                                 {item.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                 {item.description}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Goals;
