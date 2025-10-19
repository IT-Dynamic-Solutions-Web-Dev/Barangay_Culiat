import React from "react";
{
  /* Barangay Council Section */
}

const Council = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#262626] mb-4">
            Barangay Council
          </h2>
          <p className="text-[#6c6c6c] max-w-2xl mx-auto">
            Meet the dedicated officials serving Barangay Culiat with integrity,
            transparency,
            <br className="hidden sm:block" />
            and commitment to community development.
          </p>
        </div>

        {/* Barangay Captain */}
        <div className=" rounded-lg p-8 mb-12 text-center">
          <h3 className="text-lg font-semibold text-[#262626] mb-6">
            Barangay Captain
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-1 mb-4">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
              </div>
            </div>
            <h4 className="text-xl font-bold text-[#262626] mb-1">
              Hon. Maria Santos-Cruz
            </h4>
            <p className="text-sm text-[#b30000] font-semibold mb-2">
              Barangay Captain
            </p>
            <p className="text-sm text-[#6c6c6c] mb-4">
              captain@barangayculiat.gov.ph
            </p>
            <p className="text-sm text-[#262626] max-w-2xl leading-relaxed">
              Leading Barangay Culiat with over 15 years of public service
              experience, focusing on
              <br className="hidden sm:block" />
              community development, infrastructure improvement, and transparent
              governance.
            </p>
          </div>
        </div>

        {/* Barangay Kagawads - First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Roberto Dela Cruz
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Health & Sanitation
            </p>
            <p className="text-xs text-[#6c6c6c]">
              health.kagawad@barangayculiat.gov.ph
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-pink-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Ana Reyes-Garcia
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Education & Youth
            </p>
            <p className="text-xs text-[#6c6c6c]">
              education.kagawad@barangayculiat.gov.ph
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Carlos Mendoza
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Infrastructure
            </p>
            <p className="text-xs text-[#6c6c6c]">
              infrastructure.kagawad@barangayculiat.gov.ph
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Elena Villanueva
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Women & Family
            </p>
            <p className="text-xs text-[#6c6c6c]">
              women.kagawad@barangayculiat.gov.ph
            </p>
          </div>
        </div>

        {/* Barangay Kagawads - Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-200 to-green-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-green-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Miguel Torres
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Peace & Order
            </p>
            <p className="text-xs text-[#6c6c6c]">
              peace.kagawad@barangayculiat.gov.ph
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Luz Fernandez
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Environment
            </p>
            <p className="text-xs text-[#6c6c6c]">
              environment.kagawad@barangayculiat.gov.ph
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-teal-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Antonio Ramos
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              Kagawad - Senior Citizens
            </p>
            <p className="text-xs text-[#6c6c6c]">
              seniors.kagawad@barangayculiat.gov.ph
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-purple-400 rounded-full"></div>
            </div>
            <h4 className="font-bold text-[#262626] mb-1 text-sm">
              Hon. Patricia Lopez
            </h4>
            <p className="text-xs text-[#b30000] font-semibold mb-1">
              SK Chairperson
            </p>
            <p className="text-xs text-[#6c6c6c]">
              sk.chair@barangayculiat.gov.ph
            </p>
          </div>
        </div>

        {/* Secretary & Treasurer */}
        <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-[#262626] mb-6 text-center">
            Barangay Secretary & Treasurer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-rose-400 rounded-full"></div>
              </div>
              <h4 className="font-bold text-[#262626] mb-1">
                Ms. Jennifer Aquino
              </h4>
              <p className="text-sm text-[#b30000] font-semibold mb-1">
                Barangay Secretary
              </p>
              <p className="text-xs text-[#6c6c6c]">
                secretary@barangayculiat.gov.ph
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-200 to-blue-300 mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
              </div>
              <h4 className="font-bold text-[#262626] mb-1">
                Mr. Diego Rivera
              </h4>
              <p className="text-sm text-[#b30000] font-semibold mb-1">
                Barangay Treasurer
              </p>
              <p className="text-xs text-[#6c6c6c]">
                treasurer@barangayculiat.gov.ph
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Council;
