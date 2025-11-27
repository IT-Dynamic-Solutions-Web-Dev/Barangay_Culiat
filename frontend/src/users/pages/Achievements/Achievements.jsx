import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trophy, Calendar, Award, Handshake, Filter } from "lucide-react";
import { motion } from "framer-motion";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const categories = ["All", "Awards", "Recognitions", "Partnerships"];

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/achievements`);
      setAchievements(response.data.data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAchievements = activeCategory === "All" 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Awards": return <Trophy className="w-5 h-5" />;
      case "Recognitions": return <Award className="w-5 h-5" />;
      case "Partnerships": return <Handshake className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

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
              <Trophy className="w-8 h-8 md:w-10 md:h-10" />
           </motion.div>

           {/* Title */}
           <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 max-w-3xl mx-auto"
           >
              Our Achievements
           </motion.h1>

           {/* Description */}
           <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mx-auto"
           >
              Celebrating the milestones, awards, and partnerships that make Barangay Culiat proud.
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
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement._id}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-56 bg-gray-200 relative overflow-hidden group">
                  {achievement.image && achievement.image !== 'no-photo.jpg' ? (
                    <img
                      src={`${API_URL}/uploads/achievements/${achievement.image}`}
                      alt={achievement.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                      <Trophy size={64} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
                    {getCategoryIcon(achievement.category)}
                    {achievement.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-xs mb-3">
                    <Calendar size={14} className="mr-1" />
                    {new Date(achievement.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-gray-400 w-10 h-10" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No achievements found</h3>
            <p className="text-gray-500">
              We haven't added any achievements in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
