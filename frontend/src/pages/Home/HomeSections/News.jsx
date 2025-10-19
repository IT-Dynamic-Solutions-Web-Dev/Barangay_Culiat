import React from "react";

const News = () => {
  const sideArticles = [
    {
      date: "October 12, 2024",
      title: "Free Medical and Dental Check-up",
      description: "Available at the Health Station this Saturday",
      color: "from-blue-400 to-blue-600",
    },
    {
      date: "October 10, 2024",
      title: "New Online Document Processing",
      description: "E-services portal now accepting certificate requests",
      color: "from-green-400 to-green-600",
    },
    {
      date: "October 8, 2024",
      title: "Barangay Office Schedule Update",
      description: "Extended hours during fiesta week preparations",
      color: "from-orange-400 to-orange-600",
    },
    {
      date: "October 3, 2024",
      title: "Senior Citizens Benefits Update",
      description: "New benefits program launched for elderly residents",
      color: "from-red-400 to-red-600",
    },
    {
      date: "October 1, 2024",
      title: "Youth Development Program Launch",
      description:
        "New skills training and scholarship opportunities for youth residents aged 15-24.",
      color: "from-blue-500 to-blue-700",
    },
    {
      date: "September 28, 2024",
      title: "Disaster Preparedness Seminar",
      description:
        "Free earthquake and fire safety training for all residents.",
      color: "from-green-500 to-green-700",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-white" id="home-news">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] mb-3 sm:mb-4">
            News and Announcements
          </h2>
          <p className="text-sm sm:text-base text-[#6c6c6c] px-4">
            Stay updated with official announcements, community updates, and
            public advisories from Barangay Culiat
          </p>
        </div>

        {/* Mobile: All cards same size in single column */}
        <div className="lg:hidden space-y-4">
          {/* Featured Article */}
          <div className="bg-gradient-to-br from-red-100 via-orange-50 to-yellow-50 rounded-lg overflow-hidden relative shadow-lg cursor-pointer hover:shadow-xl transition-shadow group h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b30000]/20 to-transparent"></div>
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-[#b30000] text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                FEATURED
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
              <span className="text-white/80 text-xs mb-1.5 block">
                October 15, 2024
              </span>
              <h3 className="text-white text-lg font-bold mb-1.5 group-hover:text-gray-100 transition-colors">
                Annual Barangay Fiesta Celebration 2024
              </h3>
              <p className="text-white/90 text-xs line-clamp-2">
                Join us in celebrating our vibrant community spirit with
                week-long festivities featuring cultural shows, sports
                tournaments, and food festivals.
              </p>
            </div>
          </div>

          {/* All other articles as cards */}
          {sideArticles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 h-[120px]"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${article.color} rounded-full flex-shrink-0 flex items-center justify-center`}
              >
                <div className="w-4 h-4 bg-white/30 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-[#6c6c6c] mb-1 block">
                  {article.date}
                </span>
                <h4 className="font-semibold text-[#262626] mb-0.5 text-sm line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-[#6c6c6c] line-clamp-2">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Original grid layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Featured Article */}
          <div className="lg:col-span-2 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-50 rounded-lg overflow-hidden relative shadow-lg cursor-pointer hover:shadow-xl transition-shadow group min-h-[320px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b30000]/20 to-transparent"></div>
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#b30000] text-white px-3 py-1 rounded-full text-xs font-semibold">
                FEATURED
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
              <span className="text-white/80 text-sm mb-2 block">
                October 15, 2024
              </span>
              <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-gray-100 transition-colors">
                Annual Barangay Fiesta Celebration 2024
              </h3>
              <p className="text-white/90 text-sm">
                Join us in celebrating our vibrant community spirit with
                week-long festivities featuring cultural shows, sports
                tournaments, and food festivals.
              </p>
            </div>
          </div>

          {/* Side Articles */}
          <div className="space-y-3">
            {sideArticles.slice(0, 4).map((article, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${article.color} rounded-full flex-shrink-0 flex items-center justify-center`}
                >
                  <div className="w-5 h-5 bg-white/30 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-[#6c6c6c] mb-1 block">
                    {article.date}
                  </span>
                  <h4 className="font-semibold text-[#262626] mb-1 text-sm line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#6c6c6c] line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Articles */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 sm:p-6 border border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/30 rounded-full"></div>
              </div>
              <div className="min-w-0">
                <span className="text-xs text-[#6c6c6c] block">
                  October 1, 2024
                </span>
                <h4 className="font-semibold text-[#262626] text-sm sm:text-base">
                  Youth Development Program Launch
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#6c6c6c]">
              New skills training and scholarship opportunities for youth
              residents aged 15-24. Registration opens next week at the Barangay
              Hall.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 sm:p-6 border border-green-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/30 rounded-full"></div>
              </div>
              <div className="min-w-0">
                <span className="text-xs text-[#6c6c6c] block">
                  September 28, 2024
                </span>
                <h4 className="font-semibold text-[#262626] text-sm sm:text-base">
                  Disaster Preparedness Seminar
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#6c6c6c]">
              Free earthquake and fire safety training for all residents. Learn
              essential emergency response skills from certified professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
