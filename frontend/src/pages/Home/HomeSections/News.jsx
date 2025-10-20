import React from "react";
{
  /* News and Announcements Section */
}

const News = () => {
  return (
    <section className="py-16 px-4 bg-white" id="home-news">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#262626] mb-4">
            News and Announcements
          </h2>
          <p className="text-[#6c6c6c]">
            Stay updated with official announcements, community updates, and
            public advisories
            <br className="hidden sm:block" />
            from Barangay Culiat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Article */}
          <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-50 rounded-lg overflow-hidden relative shadow-lg cursor-pointer hover:shadow-xl transition-shadow group h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent"></div>
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-secondary text-white px-2.5 py-1 rounded-full text-xs font-semibold">
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
            <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                {/* <Bell className="text-white" size={20} /> */}
              </div>
              <div className="flex-1">
                <span className="text-xs text-[#6c6c6c] mb-1 block">
                  October 12, 2024
                </span>
                <h4 className="font-semibold text-[#262626] mb-1 text-sm">
                  Free Medical and Dental Check-up
                </h4>
                <p className="text-xs text-[#6c6c6c]">
                  Available at the Health Station this Saturday
                </p>
              </div>
            </div>

        {/* Desktop: Original grid layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Featured Article */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-50 rounded-lg overflow-hidden relative shadow-lg cursor-pointer hover:shadow-xl transition-shadow group min-h-[320px]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent"></div>
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
                FEATURED
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex-shrink-0 flex items-center justify-center">
                {/* <Clock className="text-white" size={20} /> */}
              </div>
              <div className="flex-1">
                <span className="text-xs text-[#6c6c6c] mb-1 block">
                  October 8, 2024
                </span>
                <h4 className="font-semibold text-[#262626] mb-1 text-sm">
                  Barangay Office Schedule Update
                </h4>
                <p className="text-xs text-[#6c6c6c]">
                  Extended hours during fiesta week preparations
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex-shrink-0 flex items-center justify-center">
                {/* <Bell className="text-white" size={20} /> */}
              </div>
              <div className="flex-1">
                <span className="text-xs text-[#6c6c6c] mb-1 block">
                  October 3, 2024
                </span>
                <h4 className="font-semibold text-[#262626] mb-1 text-sm">
                  Senior Citizens Benefits Update
                </h4>
                <p className="text-xs text-[#6c6c6c]">
                  New benefits program launched for elderly residents
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                {/* <FileText className="text-white" size={20} /> */}
              </div>
              <div>
                <span className="text-xs text-[#6c6c6c] block">
                  October 1, 2024
                </span>
                <h4 className="font-semibold text-[#262626]">
                  Youth Development Program Launch
                </h4>
              </div>
            </div>
            <p className="text-sm text-[#6c6c6c]">
              New skills training and scholarship opportunities for youth
              residents aged 15-24. Registration opens next week at the Barangay
              Hall.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                {/* <Bell className="text-white" size={20} /> */}
              </div>
              <div>
                <span className="text-xs text-[#6c6c6c] block">
                  September 28, 2024
                </span>
                <h4 className="font-semibold text-[#262626]">
                  Disaster Preparedness Seminar
                </h4>
              </div>
            </div>
            <p className="text-sm text-[#6c6c6c]">
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
