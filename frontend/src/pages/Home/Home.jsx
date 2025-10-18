import React from "react";
// import { Menu, X, FileText, Clock, Bell, MapPin } from "lucide-react";
const stats = [
  { number: "45,892", label: "Total Population" },
  { number: "25,892", label: "Registered Voters" },
  { number: "48,932", label: "Total Residents" },
  { number: "45,893", label: "Active Documents" },
];

const services = [
  "Certificate of Indigency",
  "Certificate of Residency",
  "Barangay Clearance",
  "Community Tax Certificate",
  "Business Permit",
  "Building Permit",
  "Complaint Certificate",
  "Certificate of Good Moral",
];

const Home = () => {
  return (
    <div>
      <section
        className="relative bg-[#b30000]   py-24 px-4 overflow-hidden min-h-[80vh] flex items-center"
        id="home-hero"
      >
        <div className="absolute top-0 left-0  inset-0 opacity-50">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e1328fe038-c1cd11e67085416097be.png"
            alt="Philippine barangay community landscape with mountains in background, government building, Filipino flag, official government style photography"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#b30000b4] via-[#c20000b2] to-[#9a0000c7] opacity-90"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-[#b30000] rounded-full"></div>
            </div>
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"></div>
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"></div>
          </div>

          <h1 className="text-4xl text-white md:text-7xl font-extrabold mb-6 tracking-tigher">
            Barangay Culiat
          </h1>
          <p className="text-md text-white md:text-lg mb-10 opacity-95 max-w-2xl mx-auto leading-tight">
            Your official online public service portal, access barangay
            services,
            <br className="hidden sm:block" />
            documents, and updates anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#b30000] px-8 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
              Request a document
            </button>
            <button className="border-2 border-white text-white px-8 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#b30000] transition-all">
              Learn more →
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4" id="home-stat">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#b30000] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-[#262626] mb-1">
                  {stat.number}
                </h3>
                <p className="text-sm text-[#6c6c6c]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Services Section */}
      <section className="py-16 px-4 bg-[#f9fafb]" id="home-services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#262626] mb-4">
              Online Services
            </h2>
            <p className="text-[#6c6c6c] max-w-2xl mx-auto">
              Residents can access a variety of online services and official
              certificates. All certificates
              <br />
              include QR code verification for authenticity.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start space-x-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold">i</span>
            </div>
            <div>
              <h4 className="font-semibold text-[#262626] mb-1">
                Authentication Required
              </h4>
              <p className="text-sm text-[#6c6c6c]">
                To access these services, you must be logged in or enrolled as a
                verified user with proper authentication. New users can register
                by submitting required identification documents.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#b30000] rounded-lg mb-4 flex items-center justify-center"></div>
                <h3 className="font-semibold text-[#262626] mb-2">{service}</h3>
                <p className="text-sm text-[#6c6c6c]">
                  Online certificate for residents and programs
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#262626] mb-4">
              News and Announcements
            </h2>
            <p className="text-[#6c6c6c]">
              Stay updated with official announcements, community updates, and
              public advisories
              <br />
              from Barangay Culiat
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Article */}
            <div className="lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden h-96 relative">
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="bg-white w-32 h-4 rounded mb-3"></div>
              </div>
            </div>

            {/* Side Articles */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-gray-300 h-3 rounded w-full"></div>
                    <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="bg-gray-300 h-3 rounded w-48"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#b30000] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <span className="text-xl font-bold">Barangay Culiat</span>
          </div>
          <p className="text-gray-300 text-sm">
            © 2024 Barangay Culiat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
