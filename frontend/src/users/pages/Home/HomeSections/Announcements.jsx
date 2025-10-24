import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

const Announcements = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Announcements</h2>
        <p className="text-gray-600">
          Stay updated with the latest barangay news and events
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg min-h-[500px]">
        {announcements.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 object-cover min-h-[500px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
              <span className="inline-block bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                {item.category}
              </span>
              <h3 className="text-white text-2xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm mb-2">
                {item.date} • {item.location}
              </p>
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/announcements/${item.slug}`}
                  className="text-text-color-light font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              current === index ? "bg-secondary" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Announcements;
