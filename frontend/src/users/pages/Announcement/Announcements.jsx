import React, { useState } from "react";
import { CalendarDays, MapPin, Filter, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
// import Header from "../../components/Header";
import { Link } from "react-router-dom";

const announcements = [
   {
      id: 1,
      title: "Libreng Bakuna Program",
      date: "October 25, 2025",
      location: "Barangay Culiat Covered Court",
      description:
         "Join our free vaccination drive for senior citizens and children. Protect your loved ones — vaccines save lives!",
      image: "https://files01.pna.gov.ph/category-list/2022/05/12/brgy-salitran-3-clinic.jpg",
      category: "Health Program",
      slug: "libreng-bakuna-program",
   },
   {
      id: 2,
      title: "Barangay Clean-Up Drive",
      date: "November 3, 2025",
      location: "Sitio Veterans, Culiat",
      description:
         "Be part of our community clean-up activity to promote a cleaner and greener barangay environment.",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop",
      category: "Community Activity",
      slug: "barangay-cleanup-drive",
   },
   {
      id: 3,
      title: "Youth Leadership Seminar",
      date: "November 10, 2025",
      location: "Barangay Hall Function Room",
      description:
         "Empowering the youth with leadership and teamwork skills. Open to all ages 15–25.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: "Education & Training",
      slug: "youth-leadership-seminar",
   },
   {
      id: 4,
      title: "Blood Donation Campaign",
      date: "December 2, 2025",
      location: "Barangay Covered Court",
      description:
         "Give the gift of life! Participate in our blood donation campaign in partnership with Red Cross.",
      image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&h=600&fit=crop",
      category: "Health Program",
      slug: "blood-donation-campaign",
   },
   {
      id: 5,
      title: "Senior Citizen's Monthly Pension",
      date: "November 15, 2025",
      location: "Barangay Hall Main Office",
      description:
         "Monthly pension distribution for qualified senior citizens. Bring your valid ID and senior citizen card.",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop",
      category: "Social Services",
      slug: "senior-citizens-pension",
   },
   {
      id: 6,
      title: "Barangay Sports Festival 2025",
      date: "November 20-22, 2025",
      location: "Culiat Multi-Purpose Court",
      description:
         "Three days of exciting sports events! Basketball, volleyball, and badminton tournaments. Register your team now!",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      category: "Sports & Recreation",
      slug: "barangay-sports-fest",
   },
   {
      id: 7,
      title: "Free Skills Training: Cooking & Baking",
      date: "December 5-7, 2025",
      location: "Barangay Multi-Purpose Hall",
      description:
         "Learn professional cooking and baking skills for free! Limited slots available. Perfect for aspiring entrepreneurs.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
      category: "Education & Training",
      slug: "cooking-baking-training",
   },
   {
      id: 8,
      title: "Emergency Preparedness Drill",
      date: "December 10, 2025",
      location: "All Sitios - Barangay Wide",
      description:
         "Participate in our earthquake and fire drill. Learn life-saving skills and emergency response procedures.",
      image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&h=600&fit=crop",
      category: "Safety & Security",
      slug: "emergency-preparedness-drill",
   },
   {
      id: 9,
      title: "Kabataan Christmas Party",
      date: "December 18, 2025",
      location: "Barangay Covered Court",
      description:
         "Annual Christmas celebration for the youth! Games, prizes, food, and entertainment. Open to all SK members and youth.",
      image: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&h=600&fit=crop",
      category: "Community Activity",
      slug: "kabataan-christmas-party",
   },
   {
      id: 10,
      title: "Free Legal Consultation Day",
      date: "December 12, 2025",
      location: "Barangay Hall Conference Room",
      description:
         "Get free legal advice from PAO lawyers. Consultations on family law, labor cases, and civil matters.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
      category: "Social Services",
      slug: "free-legal-consultation",
   },
];

const categories = [
   "All",
   "Health Program",
   "Community Activity",
   "Education & Training",
   "Social Services",
   "Sports & Recreation",
   "Safety & Security",
];

const Announcement = () => {
   const [activeFilter, setActiveFilter] = useState("All");

   const filteredAnnouncements =
      activeFilter === "All"
         ? announcements
         : announcements.filter((a) => a.category === activeFilter);

   // Animation variants
   const fadeUp = {
      hidden: { opacity: 0, y: 40 },
      show: { opacity: 1, y: 0 },
   };

   const staggerContainer = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
         },
      },
   };

   return (
      <div
         className="min-h-screen"
         style={{ backgroundColor: "var(--color-neutral)" }}
      >
         {/* <Header variant="black" /> */}

         {/* Hero Section */}
         <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white overflow-hidden"
         >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
               <div
                  className="absolute inset-0"
                  style={{
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: "40px 40px",
                  }}
               ></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28 text-center">
               {/* Animated Icon Badge */}
               <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
               >
                  <Megaphone className="w-8 h-8 md:w-10 md:h-10" />
               </motion.div>

               {/* Title */}
               <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 max-w-3xl mx-auto"
               >
                  Barangay Announcements
               </motion.h1>

               {/* Description */}
               <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mx-auto"
               >
                  Stay updated with our latest barangay events, programs, and
                  notices. Your community, your stories.
               </motion.p>
            </div>

            {/* Wave Divider */}
            <div
               className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
               style={{ transform: "rotate(180deg)" }}
            >
               <svg
                  className="relative block w-full h-12 md:h-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
               >
                  <path
                     d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                     fill="var(--color-neutral)"
                  ></path>
               </svg>
            </div>
         </motion.section>

         {/* Filter Bar */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="max-w-6xl mx-auto px-4 mb-8 pt-8 flex flex-wrap justify-center gap-3"
         >
            <div className="flex items-center gap-2 text-gray-700">
               <Filter className="w-4 h-4" />
               <span className="text-sm font-medium">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
               {categories.map((cat) => (
                  <motion.button
                     key={cat}
                     onClick={() => setActiveFilter(cat)}
                     whileHover={{ scale: 1.05, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeFilter === cat
                           ? "bg-primary text-white shadow-md"
                           : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                     }`}
                  >
                     {cat}
                  </motion.button>
               ))}
            </div>
         </motion.div>

         {/* Announcements Grid */}
         <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
         >
            {filteredAnnouncements.length > 0 ? (
               filteredAnnouncements.map((item, index) => (
                  <motion.div
                     key={item.id}
                     variants={fadeUp}
                     whileHover={{ y: -8, transition: { duration: 0.3 } }}
                     className="bg-white shadow-lg flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                     <Link
                        to={`/announcements/${item.slug}`}
                        className="flex flex-col h-full"
                     >
                        <div className="relative h-48 w-full overflow-hidden">
                           <motion.img
                              initial={{ scale: 1.2, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500"
                              loading="lazy"
                           />
                           {/* Category Badge Overlay */}
                           <div className="absolute top-3 right-3">
                              <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-primary rounded-full shadow-md uppercase tracking-wide">
                                 {item.category}
                              </span>
                           </div>
                        </div>

                        <div className="p-6 flex flex-col justify-between flex-1">
                           <div>
                              <h3 className="text-lg font-bold text-text-color mb-2 line-clamp-2 hover:text-primary transition-colors">
                                 {item.title}
                              </h3>
                              <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-3">
                                 {item.description}
                              </p>
                           </div>

                           <div className="space-y-3">
                              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                 <span className="flex items-center gap-1.5">
                                    <CalendarDays className="w-4 h-4 text-primary" />
                                    <span className="text-xs">{item.date}</span>
                                 </span>
                                 <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-xs line-clamp-1">
                                       {item.location}
                                    </span>
                                 </span>
                              </div>
                              <div className="pt-2 flex items-center gap-2 text-primary font-medium text-sm group">
                                 <span>Read more</span>
                                 <motion.span
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                 >
                                    →
                                 </motion.span>
                              </div>
                           </div>
                        </div>
                     </Link>
                  </motion.div>
               ))
            ) : (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-10 text-gray-500"
               >
                  No announcements available for this category.
               </motion.div>
            )}
         </motion.div>

         {/* Footer */}
         <div className="text-center text-sm text-text-secondary mt-12 pb-16">
            <p>
               For more details, visit the Barangay Hall or follow our official
               social media pages.
            </p>
         </div>
      </div>
   );
};

export default Announcement;
