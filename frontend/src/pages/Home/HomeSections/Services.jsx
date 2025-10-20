import React from "react";

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
{
  /* Online Services Section */
}
const Services = () => {
  return (
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
              <div className="w-12 h-12 bg-secondary rounded-lg  flex items-center justify-center"></div>
              <h3 className="font-semibold text-[#262626] ">{service}</h3>
              <p className="text-sm text-[#6c6c6c] leading-3.5">
                Online certificate for residents and programs.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
