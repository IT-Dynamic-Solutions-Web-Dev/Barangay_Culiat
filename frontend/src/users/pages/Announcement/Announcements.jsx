import React, { useState } from "react";
import { CalendarDays, MapPin, Filter } from "lucide-react";
// import Header from "../../components/Header";
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

  return (
    <section id="announcements" className="min-h-screen bg-neutral py-16 mt-10">
      {/* <Header variant="black" /> */}

      {/* Page Header */}
      <div
        className="max-w-6xl mx-auto rounded-lg overflow-hidden mb-6"
        style={{
          background:
            "linear-gradient(90deg,var(--color-primary), var(--color-primary-glow))",
          color: "var(--color-text-color-light)",
        }}
      >
        <div className="px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {" "}
            Barangay Announcements
          </h1>
          <p className="mt-1 text-sm opacity-90">
            Stay updated with our latest barangay events, programs, and notices.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex flex-wrap justify-center gap-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter by Category:</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <Link
              to={`/announcements/${item.slug}`}
              key={item.id}
              className="bg-white shadow-sm flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold text-text-color mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-snug">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    {item.location}
                  </span>
                </div>
                <p className="text-xs pt-4 text-primary font-medium">
                  Read more →
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No announcements available for this category.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-text-secondary mt-12">
        <p>
          For more details, visit the Barangay Hall or follow our official
          social media pages.
        </p>
      </div>
    </section>
  );
};

export default Announcement;
