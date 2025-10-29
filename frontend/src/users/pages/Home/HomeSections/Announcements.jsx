// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router";

const announcements = [
  {
    id: 1,
    title: "Libreng Bakuna Program",
    date: "October 25, 2025",
    location: "Barangay Culiat Covered Court",
    description:
      "Join our free vaccination drive for senior citizens and children. Protect your loved ones — vaccines save lives!",
    image:
      "https://files01.pna.gov.ph/category-list/2022/05/12/brgy-salitran-3-clinic.jpg",
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
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&h=600&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    category: "Social Services",
    slug: "free-legal-consultation",
  },
];

const sortByClosestDate = (arr) =>
  [...arr]
    .map((a) => ({
      ...a,
      parsedDate: new Date(a.date),
    }))
    .sort((a, b) => a.parsedDate - b.parsedDate)
    .filter((a) => a.parsedDate >= new Date());

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const Announcements = () => {
  const sorted = sortByClosestDate(announcements);
  const main = sorted[0];
  const side = sorted.slice(1, 4);

  return (
    <section className="py-8 px-4 sm:px-6 md:px-8 mb-12 md:mb-[7em] bg-neutral">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="flex justify-between items-end mb-8 gap-2"
        >
          <div>
            <h2 className="text-4xl font-bold text-text-color mb-2">
              Announcements
            </h2>
            <p className="text-gray-600">
              Stay updated with the latest barangay news and events
            </p>
          </div>
          <Link
            to="/announcements"
            className="text-secondary/80 hover:underline text-nowrap"
          >
            See all
          </Link>
        </motion.div>

        {/* Main + Side layout */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-6"
        >
          {/* MAIN FEATURED POST */}
          {main && (
            <motion.div variants={fadeUp} className="  md:col-span-3 ">
              <Link
                to={`/announcements/${main.slug}`}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 block"
              >
                <div className="relative  h-full w-full">
                  <img
                    src={main.image}
                    alt={main.title}
                    className="w-full lg:max-h-[450px] min-h-[350px]  h-full object-cover"
                  />
                  <div className="absolute h-full inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                      {main.category}
                    </span>
                    <h3 className="text-white text-xl sm:text-3xl font-bold mb-2">
                      {main.title}
                    </h3>

                    <p className="text-gray-200 text-sm mb-2 flex gap-2">
                      <span className="flex items-center">
                        <CalendarDays
                          className="w-4 h-4 inline-block mr-1 text-primary-glow"
                          strokeWidth={3}
                        />
                        {main.date}
                      </span>
                      |
                      <span className="flex items-center">
                        <MapPin
                          className="w-4 h-4 inline-block mr-1 text-primary-glow"
                          strokeWidth={3}
                        />
                        {main.location}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm max-w-2xl">
                      {main.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* SIDE ARTICLES */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col gap-6 md:justify-around"
          >
            {side.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <Link
                  to={`/announcements/${item.slug}`}
                  className="h-fit transition-all duration-300"
                >
                  <p className="text-xs text-primary font-semibold uppercase mb-1">
                    {item.category}
                  </p>
                  <h4 className="text-lg font-semibold text-text-color mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="mb-2 flex gap-1 text-xs">
                    <p className="text-text-secondary line-clamp-1">
                      {item.date}
                    </p>
                    <span>|</span>
                    <p className="text-text-secondary line-clamp-1 flex-1">
                      {item.location}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Announcements;
