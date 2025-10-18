import { useEffect, useState } from "react";
import { Modal } from "../tailadminsrc/components/ui/modal/index";

const PolicyPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedData = localStorage.getItem("policyData");
    const policyData = storedData ? JSON.parse(storedData) : null;
    const now = Date.now();

    // If no token or expired (older than 10 mins)
    if (!policyData || now - policyData.timestamp > 10 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000); // show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Disable background scroll when popup is visible
  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "";
  }, [showPopup]);

  const handleClose = () => {
    const now = Date.now();
    localStorage.setItem(
      "policyData",
      JSON.stringify({ seen: true, timestamp: now })
    );
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <Modal
      isOpen={showPopup}
      onClose={handleClose}
      className="max-w-3xl w-[90%] mx-auto p-8 md:p-10 md:text-base text-sm text-text-color dark:text-gray-100 shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
    >
      <div className="space-y-6">
        <h2 className="md:text-3xl text-xl font-bold text-center ">
          Barangay Culiat Web Policy
        </h2>

        <p className="md:text-base text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          By using the Barangay Culiat Web System, you agree to our terms of
          service and privacy policy. The platform ensures that all personal
          information provided is handled securely and confidentially in
          accordance with barangay data protection guidelines.
        </p>

        <div className="space-y-4">
          <section>
            <h3 className="md:text-xl text-base font-semibold ">
              1. Information We Collect
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We may collect your name, contact information, and system usage
              data to ensure smooth barangay operations and communication.
            </p>
          </section>

          <section>
            <h3 className="md:text-xl text-base font-semibold ">
              2. Data Protection
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your personal information is protected under barangay data
              security measures. Only authorized personnel can access it for
              legitimate purposes.
            </p>
          </section>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-md bg-[#ffd700] text-gray-900 font-medium hover:bg-yellow-400 transition-all duration-200"
          >
            I Understand
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PolicyPopup;
