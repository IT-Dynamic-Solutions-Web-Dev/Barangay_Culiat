import React from "react";
// Import CheckCircle for the left column header
import { CheckCircle, Clock, Calendar } from "lucide-react";

// --- Data for Layunin (Goals/Programs) ---
const layuninData = [
    {
      title: "Serbisyong Panlipunan",
      items: [
         "Nararamdamang presensya ng barangay sa mga health center, paaralan, trapiko, at palengke.",
         "Pagtulong sa pagbubuo ng mga organisadong grupo tulad ng kababaihan, kabataan, seniors, PWD, PWUD, HOA, drayber, at iba pang sektor.",
         "Pagsasagawa ng mga pagsasanay at team building para sa kaalaman sa karapatan, tungkulin, at kapangyarihan ng mga mamamayan.",
      ],
    },
    {
      title: "Pangkabuhayan at Pag-unlad",
      items: [
         "Pagpapatupad ng mabilis at makabagong proseso sa pagkuha ng mga permit at lisensya.",
         "Pag-oorganisa ng mga seminar at pagsasanay kasama ang mga negosyante, NGO, at iba pang organisasyon.",
         'Pagbuo ng database ng mga "underemployed" para for mas mahusay na pagtutugma ng trabaho.',
      ],
    },
    {
      title: "Programang Pangkalikasan",
      items: [
         'Pagpapalaganap ng kulturang "Tapat Ko, Linis Ko!"',
         "Pagsuporta sa pagtatanim ng gulay at circular economy sa barangay.",
      ],
    },
    {
      title: "Inprastraktura",
      items: [
         "Pagkilala at pagpapatupad ng mga proyektong pang-imprastraktura kasama ang mga stakeholder.",
         "Pagsisiguro na maayos at ligtas ang mga kalsada, drainage, at sewer sa bawat purok.",
      ],
    },
    {
      title: "Pagpapatatag at Pagpapahusay",
      items: [
         'Pagtatatag ng "Tatak ng Mabuting Pamamahala" — isang pamumuno na nakatuon sa Kalidad na Serbisyo, Kalinga sa Tao, Kalingang Nanay, at Kalingang Tunay.',
         "Patuloy na pagsuporta sa kababaihan, kabataan, PWD, PWUD, LGBTQI+, at seniors.",
      ],
    },
];

// --- Data for Milestones ---
const milestones = [
    {
        year: "1950",
        title: "Barangay Establishment",
        description: "Official recognition as a barangay under Quezon City",
    },
    {
        year: "1965",
        title: "First Market Opened",
        description: "The establishment of the community's first central market.",
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
        description: "Completion of the major electrical grid expansion project.",
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
        description: "Major road improvements and street lighting installation",
    },
    {
        year: "2015",
        title: "Youth Sports Program",
        description: "Launch of the official barangay-wide youth sports league.",
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

// Helper Component for a single milestone entry
const MilestoneEntry = ({ year, title, description, isLast }) => (
    <div className="relative flex items-start">
        {/* Vertical Line Connector */}
        {!isLast && (
            <div className="absolute left-[13px] top-7 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
        )}

        {/* Date/Year Badge and Icon */}
        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md mr-4 z-10 mt-1">
            <Calendar className="w-4 h-4" />
        </div>

        {/* Milestone Content */}
        <div className="flex-grow pb-8">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1 mt-1">
                {year}
            </p>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {title}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                {description}
            </p>
        </div>
    </div>
);

const Goals = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#262626] dark:text-white mb-4">
                        Ating mga Layunin at Kasaysayan
                    </h2>
                    <p className="text-[#6c6c6c] dark:text-gray-400">
                        Ang aming mga programa at ang paglalakbay ng Barangay sa
                        paglipas ng panahon.
                    </p>
                </div>

                {/* Two-Column Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* COLUMN 1 (Goals/Programs) - Icon added here */}
                    <div className="lg:col-span-1 p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full">
                        {/* Header for Layunin - CheckCircle icon added */}
                        <div className="flex items-center mb-8 border-b pb-2">
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Mga Pangunahing Programa
                            </h3>
                        </div>

                        {/* Layunin Content */}
                        <div className="space-y-10 sm:space-y-12 md:space-y-14 pt-4">
                            {layuninData.map((layunin, index) => (
                                <div key={index} className="relative flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md mr-4 mt-1.5">
                                        {index + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 pt-1.5">
                                            {layunin.title}
                                        </h4>
                                        <div className="space-y-2">
                                            {layunin.items.map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                                        {item}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2 (Timeline) */}
                    <div className="lg:col-span-1 p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full lg:h-[750px] lg:overflow-y-auto lg:sticky lg:top-10">
                        {/* Header for Timeline */}
                        <div className="flex items-center mb-6 border-b pb-2">
                            <Clock className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Kumpletong Timeline ng Kasaysayan
                            </h3>
                        </div>

                        {/* Timeline Content */}
                        <div className="space-y-0 p-4 pt-0 mt-6">
                            {/* Display all milestones */}
                            {milestones.map((milestone, index) => (
                                <MilestoneEntry
                                    key={index}
                                    year={milestone.year}
                                    title={milestone.title}
                                    description={milestone.description}
                                    isLast={index === milestones.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Goals;