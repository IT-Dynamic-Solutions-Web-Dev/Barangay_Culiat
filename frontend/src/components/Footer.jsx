import React from "react";

{
  /* Footer */
}
const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Barangay Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-secondary rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">BARANGAY CULIAT</h3>
                <p className="text-xs text-white/80">Quezon City</p>
              </div>
            </div>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              Serving our community with transparency, dedication, and
              excellence. Building a safer and unified Barangay Culiat for all
              residents.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=100091344363854"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Visit our Facebook page"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-white/90 font-semibold">BARANGAY CULIAT</p>
                  <p className="text-white/90">467 Tandang Sora Ave,</p>
                  <p className="text-white/90">Quezon City, 1128 Metro Manila</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
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
                <a href="mailto:brgy.culiat@yahoo.com" className="text-white/90 hover:text-white transition-colors">
                  brgy.culiat@yahoo.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
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
                <div>
                  <p className="text-white/90">+63 962-582-1531</p>
                  <p className="text-white/90">856-722-60</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-white/90">Monday–Friday</p>
                  <p className="text-white/90">8:00 AM–5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Online Services</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Report Incident</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Announcements</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Barangay Officials</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Transparency Report</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="underline text-white/90 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>Feedback Form</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location Map */}
          <div>
            <h4 className="font-bold text-lg mb-4">Location Map</h4>
            <div className="bg-white/10 rounded-lg overflow-hidden mb-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.9469179112511!2d121.05602636955277!3d14.667987796511813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7475e1333fb%3A0xb01b3d6a168686a5!2sCuliat%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1760884990064!5m2!1sen!2sph" 
                width="100%" 
                height="200" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Barangay Culiat Location"
              ></iframe>
            </div>
            <p className="text-sm text-white/90 mb-3">
              Visit our barangay hall for in-person services and assistance.
            </p>
            <a 
              href="https://www.google.com/maps/place/Culiat+Barangay+Hall/@14.667987,121.05667,17z/data=!4m6!3m5!1s0x3397b7475e1333fb:0xb01b3d6a168686a5!8m2!3d14.6679865!4d121.0566701!16s%2Fg%2F11c3tsgbjt?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-secondary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/80 text-center md:text-left">
              © 2025 Barangay Culiat | Managed by Barangay Culiat Information
              Office
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
