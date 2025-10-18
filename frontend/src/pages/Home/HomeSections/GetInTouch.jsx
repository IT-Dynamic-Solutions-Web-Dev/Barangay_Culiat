import React from "react";
{
  /* Get in Touch Section */
}

const GetInTouch = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#262626] mb-4">
            Get in Touch
          </h2>
          <p className="text-[#6c6c6c] max-w-2xl mx-auto">
            Visit our office, call our hotlines, or reach out online. We're here
            to serve you
            <br className="hidden sm:block" />
            with dedication and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-[#262626] mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#b30000] rounded-lg flex items-center justify-center flex-shrink-0">
                  {/* <MapPin className="text-white" size={24} /> */}
                </div>
                <div>
                  <h4 className="font-semibold text-[#262626] mb-1">Address</h4>
                  <p className="text-sm text-[#6c6c6c]">
                    Barangay Hall, Culiat, Quezon City
                  </p>
                  <p className="text-sm text-[#6c6c6c]">
                    Metro Manila, Philippines
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#b30000] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#262626] mb-1">
                    Phone Numbers
                  </h4>
                  <p className="text-sm text-[#6c6c6c]">
                    Main Line: (02) 8123-4567
                  </p>
                  <p className="text-sm text-[#6c6c6c]">
                    Emergency Hotline: 0919-000-0000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#b30000] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#262626] mb-1">Email</h4>
                  <p className="text-sm text-[#6c6c6c]">
                    info@barangayculiat.gov.ph
                  </p>
                  <p className="text-sm text-[#6c6c6c]">
                    services@barangayculiat.gov.ph
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#b30000] rounded-lg flex items-center justify-center flex-shrink-0">
                  {/* <Clock className="text-white" size={24} /> */}
                </div>
                <div>
                  <h4 className="font-semibold text-[#262626] mb-1">
                    Office Hours
                  </h4>
                  <p className="text-sm text-[#6c6c6c]">
                    Monday - Friday: 8:00 AM - 5:00 PM
                  </p>
                  <p className="text-sm text-[#6c6c6c]">
                    Saturday: 9:00 AM - 12:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#262626] mb-4">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-[#6c6c6c] hover:text-[#b30000] transition-colors"
                >
                  {/* <FileText size={16} className="text-[#b30000]" /> */}
                  <span>Transparency Report</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-[#6c6c6c] hover:text-[#b30000] transition-colors"
                >
                  {/* <FileText size={16} className="text-[#b30000]" /> */}
                  <span>Privacy Policy</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-[#6c6c6c] hover:text-[#b30000] transition-colors"
                >
                  {/* <FileText size={16} className="text-[#b30000]" /> */}
                  <span>Feedback Form</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-[#6c6c6c] hover:text-[#b30000] transition-colors"
                >
                  {/* <FileText size={16} className="text-[#b30000]" /> */}
                  <span>FAQ</span>
                </a>
              </div>
            </div>
          </div>

          {/* Send us a Message Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#262626] mb-6">
              Send us a Message
            </h3>

            <form className="space-y-4">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#262626] mb-2">
                    First Name <span className="text-[#b30000]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b30000] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#262626] mb-2">
                    Last Name <span className="text-[#b30000]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b30000] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-[#262626] mb-2">
                  Email Address <span className="text-[#b30000]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b30000] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-[#262626] mb-2">
                  Subject <span className="text-[#b30000]">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b30000] focus:border-transparent outline-none transition-all bg-white">
                  <option>Select a subject</option>
                  <option>Document Request</option>
                  <option>General Inquiry</option>
                  <option>Complaint</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#262626] mb-2">
                  Message <span className="text-[#b30000]">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b30000] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 w-4 h-4 text-[#b30000] border-gray-300 rounded focus:ring-[#b30000]"
                />
                <label htmlFor="privacy" className="text-sm text-[#6c6c6c]">
                  I agree to the{" "}
                  <a href="#" className="text-[#b30000] hover:underline">
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#b30000] hover:underline">
                    terms of service
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#b30000] text-white text-sm py-2 rounded-lg font-medium hover:bg-[#9a0000] transition-colors flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
