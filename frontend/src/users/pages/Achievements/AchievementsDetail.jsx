import React from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Trophy, ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

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

const AchievementsDetail = () => {
  const { slug } = useParams();
  const achievement = achievements.find((a) => a.slug === slug);

  if (!achievement) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Achievement Not Found</h1>
          <Link to="/achievements" className="text-primary underline">
            Back to Achievements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* HERO BANNER */}
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
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Trophy className="w-8 h-8" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            {achievement.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            {achievement.shortDescription}
          </motion.p>
        </div>

        {/* Wave Divider */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
          style={{ transform: "rotate(180deg)" }}
        >
          <svg
            className="relative block w-full h-12"
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

      {/* CONTENT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto px-6 py-12"
      >
        {/* Back Button */}
        <Link
          to="/achievements"
          className="inline-flex items-center gap-2 text-primary font-medium mb-6 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Achievements
        </Link>

        {/* Image */}
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={achievement.image}
            alt={achievement.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overview Details */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
          <p className="flex items-center gap-2 text-sm">
            <CalendarDays className="w-4 h-4 text-primary" />
            {achievement.date}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            {achievement.location}
          </p>
        </div>

        {/* Full Description */}
        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {achievement.fullDescription}
        </p>
      </motion.div>

      <div className="text-center text-sm text-gray-500 py-10">
        <p>Barangay Culiat Achievements — Proudly serving the community.</p>
      </div>
    </div>
  );
};

export default AchievementsDetail;
