import { useEffect, useState } from "react";

const PolicyPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenPolicy = localStorage.getItem("hasSeenPolicy");
    if (!hasSeenPolicy) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("hasSeenPolicy", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // disable background scrolling when popup is visible
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 text-center relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Barangay Culiat Web Policy
        </h2>
        <p className="text-gray-600 mb-5 text-sm">
          By using the Barangay Culiat Web System, you agree to our terms of
          service and privacy policy. The platform ensures that all personal
          information provided is handled securely and confidentially in
          accordance with barangay data protection guidelines.
        </p>
        <button
          onClick={() => setShowPopup(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default PolicyPopup;
