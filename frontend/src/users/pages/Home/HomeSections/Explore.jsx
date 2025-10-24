import React from "react";
{
  /* Explore Barangay Section */
}

const Explore = () => {
  return (
    <section className="py-16 px-4 bg-white" id="home-explore">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#262626] mb-4">
            Explore Barangay Culiat
          </h2>
          <p className="text-[#6c6c6c]">
            Discover the beauty, heritage, and community spirit of Barangay
            Culiat through
            <br className="hidden sm:block" />
            our local landmarks and cultural sites.
          </p>
        </div>

        {/* Rich Community Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Content */}
          <div>
            <h3 className="text-2xl font-bold text-[#262626] mb-4">
              Rich Community Heritage
            </h3>
            <p className="text-[#6c6c6c] mb-6 leading-relaxed">
              Barangay Culiat is a thriving community with well-structured
              amenities from its humble beginnings to its current status as a
              thriving urban community, our barangay has maintained its cultural
              identity while embracing modern development.
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-[#262626]">
                  Established as a progressive community with strong cultural
                  roots
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-[#262626]">
                  Home to diverse families representing various Filipino
                  traditions
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-[#262626]">
                  Active community programs promoting unity and development
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 h-80 flex items-end p-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <h4 className="font-bold text-[#262626]">
                  Barangay Community Center
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Grid - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Barangay Covered Court */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="absolute top-3 right-3 bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full">
                Facilities
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#262626] mb-2">
                Barangay Covered Court
              </h4>
              <p className="text-sm text-[#6c6c6c] leading-relaxed">
                A multi-purpose facility that serves as the venue for sports
                activities, community gatherings, and various barangay programs.
              </p>
            </div>
          </div>

          {/* Barangay Health Station */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-blue-200 to-blue-300">
              <span className="absolute top-3 right-3 bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full">
                Healthcare
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#262626] mb-2">
                Barangay Health Station
              </h4>
              <p className="text-sm text-[#6c6c6c] leading-relaxed">
                Provides basic healthcare and medical services, maternal and
                child health programs, and emergency care for our community.
              </p>
            </div>
          </div>

          {/* Barangay Daycare Center */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-pink-200 to-pink-300">
              <span className="absolute top-3 right-3 bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full">
                Education
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#262626] mb-2">
                Barangay Daycare Center
              </h4>
              <p className="text-sm text-[#6c6c6c] leading-relaxed">
                Early childhood care and education center providing quality
                learning environment for young children in our community.
              </p>
            </div>
          </div>
        </div>

        {/* Locations Grid - Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Community Park & Garden */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-green-200 to-green-300">
              <span className="absolute top-3 right-3 bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full">
                Recreation
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#262626] mb-2">
                Community Park & Garden
              </h4>
              <p className="text-sm text-[#6c6c6c] leading-relaxed">
                Green recreational space featuring walking paths, playground
                equipment, and community garden areas for residents.
              </p>
            </div>
          </div>

          {/* Barangay Chapel */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-cyan-200 to-cyan-300">
              <span className="absolute top-3 right-3 bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full">
                Spiritual
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#262626] mb-2">Barangay Chapel</h4>
              <p className="text-sm text-[#6c6c6c] leading-relaxed">
                Community chapel serving as a place of worship and spiritual
                gathering for residents of different faiths.
              </p>
            </div>
          </div>

          {/* Local Market Area */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-orange-200 to-orange-300">
              <span className="absolute top-3 right-3 bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full">
                Commerce
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#262626] mb-2">
                Local Market Area
              </h4>
              <p className="text-sm text-[#6c6c6c] leading-relaxed">
                Vibrant marketplace where local vendors sell fresh produce,
                goods, and services, supporting the local economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
