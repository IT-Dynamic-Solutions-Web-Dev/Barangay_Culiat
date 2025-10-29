import { useEffect, useState, useRef } from "react";
import { Modal } from "../tailadminsrc/components/ui/modal/index";

const PolicyPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  // Show popup after delay if not seen in last 10 mins
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedData = localStorage.getItem("policyData");
    const policyData = storedData ? JSON.parse(storedData) : null;
    const now = Date.now();

    if (!policyData || now - policyData.timestamp > 10 * 60 * 1000) {
      const timer = setTimeout(() => setShowPopup(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Prevent background scroll when popup is visible
  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "";
  }, [showPopup]);

  // Detect scroll to bottom
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold

    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleClose = () => {
    localStorage.setItem(
      "policyData",
      JSON.stringify({ seen: true, timestamp: Date.now() })
    );
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <Modal
      isOpen={showPopup}
      onClose={handleClose}
      showCloseButton={false}
      className="max-w-4xl w-[92%] max-h-[95%] mx-auto rounded-2xl shadow-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 py-6 transition-all duration-300 "
    >
      <div className="flex flex-col ">
        {/* Title */}
        <h2 className="text-center text-xl mb-4 md:text-2xl font-bold text-text-color dark:text-white tracking-tight">
          Terms of Service
        </h2>

        {/* Sections */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex flex-col gap-4 overflow-y-scroll max-h-[66vh] px-4 md:px-10"
        >
          <p className="text-base text-gray-600 dark:text-gray-300 leading-5 text-justify">
            Welcome to the Barangay Culiat Web System. By continuing to use this
            platform, you acknowledge and agree to our policies ensuring secure,
            transparent, and responsible data handling in accordance with local
            data privacy standards.
          </p>
          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              1. Information We Collect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              We may collect your name, contact details, and relevant barangay
              service data to support communication and community service
              management within Barangay Culiat.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              2. Data Protection
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              All personal data is securely stored and accessible only to
              authorized barangay personnel. We comply with barangay-level and
              national data privacy laws to safeguard user information.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              3. User Responsibility
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              Users must ensure the accuracy of the information they provide.
              Misuse, sharing, or unauthorized access to the system is strictly
              prohibited and may result in administrative actions.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              4. Data Sharing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              Your information will not be shared with third parties without
              your explicit consent, except when required by law or for official
              barangay purposes.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              5. System Access
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              Access to certain features may require authentication. Keep your
              credentials secure and do not share them with others.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              6. Updates to Terms
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              We reserve the right to update these terms. Continued use of the
              system after changes constitutes acceptance of the updated terms.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-1">
              7. Contact Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-5">
              For questions or concerns about these terms or your data, please
              contact the Barangay Culiat office during regular business hours.
            </p>
          </section>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          {/* Scroll Indicator (when not scrolled to bottom) */}

          <div
            className={`text-center text-sm text-secondary dark:text-secondary-text mb-2 ${
              hasScrolledToBottom ? "opacity-0" : "animate-pulse "
            } `}
          >
            ↓ Please scroll down to read all terms ↓
          </div>

          <button
            onClick={handleClose}
            disabled={!hasScrolledToBottom}
            className="px-8 py-2.5 max-w-[250px] w-full rounded-md bg-secondary text-white font-medium text-sm md:text-base shadow-md transition-all duration-300 hover:shadow-lg hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary disabled:hover:shadow-md"
          >
            I Understand
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PolicyPopup;
