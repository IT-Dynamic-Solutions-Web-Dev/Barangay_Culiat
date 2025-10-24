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
    image: "/images/events/vaccination.jpg",
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
    image: "/images/events/cleanup.jpg",
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
    image: "/images/events/youth-seminar.jpg",
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
    image: "/images/events/blood-donation.jpg",
    category: "Health Program",
    slug: "blood-donation-campaign",
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
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Announcements
        </Link>

        <div className=" ">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
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
