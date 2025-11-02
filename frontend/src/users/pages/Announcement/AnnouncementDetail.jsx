import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
// import Header from "../../../components/Header";

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

const AnnouncementDetail = () => {
  const { slug } = useParams();
  const announcement = announcements.find((a) => a.slug === slug);

  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Announcement not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-neutral py-16 mt-10">
      {/* <Header /> */}
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/announcements"
          className="inline-flex items-center text-text-color text-lg font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-xl mt-1" /> Back to
          Announcements
        </Link>

        <div className=" ">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full max-h-[70vh] object-cover"
          />
          <div className="p-6 px-4">
            <p className="text-xs font-semibold text-primary uppercase mb-2 tracking-wide">
              {announcement.category}
            </p>
            <h1 className="text-3xl font-bold text-text-color mb-4">
              {announcement.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-primary" />
                {announcement.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                {announcement.location}
              </span>
            </div>
            <div className="text-secondary/80 flex flex-wrap gap-2">
              <p className=" cursor-pointer ">#KapitanaNanayBebangBernardino</p>
              <p className=" cursor-pointer ">#MostChildFriendlyBarangay</p>
              <p className=" cursor-pointer ">#KalidadsaSerbisyo</p>
              <p className=" cursor-pointer ">#KalingaSaTao</p>
            </div>
            <p className="text-text-secondary leading-relaxed">
              {announcement.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementDetail;
