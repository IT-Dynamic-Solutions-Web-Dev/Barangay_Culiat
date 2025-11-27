import React, { useState } from "react";
import { Medal, Filter, Award, MapPin, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// SAMPLE ACHIEVEMENTS DATA
const achievements = [
  {
    id: 1,
    title: "Top Performing Barangay in Waste Management",
    year: "2024",
    location: "Quezon City Hall",
    category: "Environmental",
    slug: "waste-management-award",
    image:
      "https://images.unsplash.com/photo-1581578017426-ec07294e8f06?w=800&h=600&fit=crop",
    shortDescription:
      "Barangay Culiat received recognition for exceptional waste segregation, collection efficiency, and eco-friendly initiatives.",
    fullDescription: `
Barangay Culiat implemented innovative waste management programs, including:

• Efficient garbage collection and disposal systems  
• Community recycling and segregation campaigns  
• Educational workshops on sustainability  
• Plastic reduction and tree-planting drives  

These efforts demonstrate the barangay’s commitment to environmental responsibility and a cleaner community.
    `,
  },
  {
    id: 2,
    title: "Outstanding Community Health Program Award",
    year: "2023",
    location: "DOH NCR",
    category: "Health",
    slug: "community-health-award",
    image:
      "https://images.unsplash.com/photo-1576765607924-3f7b5d5f0c2a?w=800&h=600&fit=crop",
    shortDescription:
      "Awarded for successful vaccination drives, health seminars, and barangay-wide medical outreach activities.",
    fullDescription: `
Barangay Culiat’s health programs focused on improving community wellness through:

• Barangay-wide vaccination drives  
• Regular health check-ups and medical consultations  
• Nutrition and wellness seminars  
• Mental health awareness campaigns  

This recognition highlights the barangay’s dedication to accessible and quality healthcare for all residents.
    `,
  },
  {
    id: 3,
    title: "Model Barangay for Youth Empowerment",
    year: "2022",
    location: "SK Federation",
    category: "Youth Development",
    slug: "youth-empowerment-award",
    image:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?w=800&h=600&fit=crop",
    shortDescription:
      "Recognized for hosting leadership seminars, youth livelihood programs, and sports tournaments.",
    fullDescription: `
The barangay promoted youth development through:

• Leadership and skills training seminars  
• Sports tournaments and competitions  
• Livelihood and entrepreneurship workshops  
• Mentorship and scholarship programs  

These initiatives empower the youth and prepare them for future community leadership roles.
    `,
  },
  {
    id: 4,
    title: "Best Peace & Order Council",
    year: "2024",
    location: "Quezon City",
    category: "Safety & Security",
    slug: "peace-and-order-award",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    shortDescription:
      "Barangay Culiat’s outstanding efforts in safety, emergency response, and community patrols earned this recognition.",
    fullDescription: `
The Peace & Order Council focused on community security through:

• Regular patrols and monitoring  
• Emergency response team training  
• Installation of CCTV and security measures  
• Community awareness campaigns  

These measures ensure a safe and secure environment for residents.
    `,
  },
  {
    id: 5,
    title: "Most Active Senior Citizen Program",
    year: "2023",
    location: "QC Senior Citizen Affairs",
    category: "Social Services",
    slug: "senior-citizen-award",
    image:
      "https://images.unsplash.com/photo-1581579188871-45b3cf0c1ea9?w=800&h=600&fit=crop",
    shortDescription:
      "Honored for providing continuous support and engagement programs for senior citizens.",
    fullDescription: `
Barangay Culiat’s senior programs include:

• Monthly gatherings and recreational activities  
• Health check-ups and wellness seminars  
• Skills development workshops  
• Assistance programs for daily needs  

These initiatives promote active, healthy, and socially engaged senior citizens.
    `,
  },
  {
    id: 6,
    title: "Excellence in Disaster Preparedness Award",
    year: "2024",
    location: "DSWD NCR",
    category: "Disaster Management",
    slug: "disaster-preparedness-award",
    image:
      "https://images.unsplash.com/photo-1606813907291-1e00f0f88092?w=800&h=600&fit=crop",
    shortDescription:
      "Recognized for proactive response teams, disaster drills, and well-coordinated evacuation plans.",
    fullDescription: `
Barangay Culiat prepared for emergencies through:

• Regular earthquake, fire, and flood drills  
• Emergency response team formation and training  
• Community hazard awareness programs  
• Stockpiling emergency supplies and planning evacuation routes  

This award reflects the community’s dedication to residents’ safety.
    `,
  },
  {
    id: 7,
    title: "Barangay Green Innovation Award",
    year: "2022",
    location: "DENR NCR",
    category: "Environmental",
    slug: "green-innovation-award",
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop",
    shortDescription:
      "Awarded for urban gardening projects, tree-planting efforts, and community-wide eco-initiatives.",
    fullDescription: `
Barangay Culiat advanced sustainability via:

• Urban gardening and tree-planting projects  
• Community-wide recycling programs  
• Energy and water conservation initiatives  
• Environmental awareness campaigns  

These programs promote eco-friendly habits and community responsibility.
    `,
  },
  {
    id: 8,
    title: "Outstanding Public Service & Governance Award",
    year: "2021",
    location: "QC Governance Center",
    category: "Governance",
    slug: "public-service-governance-award",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
    shortDescription:
      "Recognized for transparent governance, efficient services, and excellent community engagement.",
    fullDescription: `
Barangay Culiat ensured effective public service by:

• Transparent governance and citizen feedback programs  
• Streamlined barangay service processes  
• Quick response to resident concerns  
• Digitalization and modernization of services  

This award highlights the commitment to accountable and efficient governance.
    `,
  },
  {
    id: 9,
    title: "Community Volunteerism Excellence Award",
    year: "2023",
    location: "QC Convention Center",
    category: "Community Participation",
    slug: "volunteerism-excellence-award",
    image:
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=800&h=600&fit=crop",
    shortDescription:
      "Honored for high volunteer turnout in community activities, clean-up drives, and outreach programs.",
    fullDescription: `
Barangay Culiat promoted volunteerism through:

• Barangay-wide clean-up campaigns  
• Outreach programs for underprivileged residents  
• Mentorship and training activities  
• Active community participation events  

These initiatives strengthen social cohesion and civic responsibility.
    `,
  },
  {
    id: 10,
    title: "Best Sports & Recreational Program",
    year: "2022",
    location: "QC Sports Center",
    category: "Sports Development",
    slug: "sports-recreation-award",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop",
    shortDescription:
      "Recognized for successful barangay leagues, fitness initiatives, and youth training programs.",
    fullDescription: `
Barangay Culiat encouraged active lifestyles via:

• Sports tournaments and barangay leagues  
• Fitness and wellness programs for residents  
• Youth training and development camps  
• Maintenance of recreational facilities  

These efforts foster teamwork, health, and community engagement.
    `,
  },
];

const categories = [
  "All",
  "Environmental",
  "Health",
  "Youth Development",
  "Safety & Security",
  "Social Services",
];

// MAIN COMPONENT
const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? achievements
      : achievements.filter((a) => a.category === activeFilter);

  // Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-neutral)" }}
    >
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-glow) 100%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Medal className="w-10 h-10" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4"
          >
            Barangay Achievements
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            Celebrating the milestones and recognitions of Barangay Culiat
            through the years.
          </motion.p>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
          style={{ transform: "rotate(180deg)" }}
        >
          <svg
            className="relative block w-full h-12 "
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

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 mb-10 pt-10 flex flex-wrap justify-center gap-4"
      >
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Category:</span>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold 
          transition-all duration-200
          ${
            activeFilter === cat
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
          }
        `}
            >
              {cat}

              {/* Underline for active */}
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-white/80 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ACHIEVEMENTS GRID */}
      <motion.div
        key={activeFilter}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="relative bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl 
          rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <Link
                to={`/achievements/${item.slug}`}
                className="flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="relative h-56 w-full overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    src={item.image}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-white/95 text-xs font-bold text-primary rounded-full shadow-md uppercase tracking-wide border border-primary/20">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-text-color mb-2 hover:text-primary transition">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span className="text-xs">{item.year}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-xs">{item.location}</span>
                      </span>
                    </div>

                    {/* Read More */}
                    <div
                      to={`/achievements/${item.slug}`}
                      className="pt-2 flex items-center gap-2 text-primary font-medium text-sm group"
                    >
                      <span>Read more</span>
                      <motion.span whileHover={{ x: 5 }}>→</motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No achievements found for this category.
          </p>
        )}
      </motion.div>

      {/* FOOTER */}
      <div className="text-center text-sm text-text-secondary mt-12 pb-16">
        <p>Barangay Culiat – Committed to excellence and community service.</p>
      </div>
    </div>
  );
};

export default Achievements;
