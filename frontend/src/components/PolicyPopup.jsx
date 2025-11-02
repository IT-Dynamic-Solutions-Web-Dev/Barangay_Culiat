import { useEffect, useState, useRef } from "react";
import { Modal } from "../tailadminsrc/components/ui/modal/index";
import { useAuth } from "../context/AuthContext";
import SignatureCanvas from "./SignatureCanvas";
import axios from "axios";

const PolicyPopup = () => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [signature, setSignature] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const scrollContainerRef = useRef(null);

  // Show popup immediately if user hasn't accepted terms
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only show for authenticated users with roleName === "Resident"
    if (!user || user.roleName !== "Resident") {
      return;
    }

    const checkTermsAcceptance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/terms/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const hasAccepted = response.data.data.hasAccepted;
        
        // If user hasn't accepted, show popup immediately
        if (!hasAccepted) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error checking terms acceptance:", error);
        // On error, check localStorage fallback
        const termsAccepted = localStorage.getItem("termsAccepted");
        if (termsAccepted !== "true") {
          setShowPopup(true);
        }
      }
    };

    checkTermsAcceptance();
  }, [user]);

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

  const handleAccept = async () => {
    if (!signature) {
      setSubmitError("Please provide your signature before accepting");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/terms/accept`,
        {
          signature,
          ipAddress: null, // Backend will capture this
          userAgent: navigator.userAgent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSubmitSuccess(true);
        localStorage.setItem(
          "policyData",
          JSON.stringify({ seen: true, timestamp: Date.now(), accepted: true })
        );
        localStorage.setItem("termsAccepted", "true");
        
        // Close popup after short delay
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error accepting terms:", error);
      setSubmitError(
        error.response?.data?.message || "Failed to submit acceptance. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Signature Section */}
        {hasScrolledToBottom && !submitSuccess && (
          <div className="px-4 md:px-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-text-color dark:text-white mb-3">
              E-Signature Required
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Please sign below to indicate your acceptance of the terms and conditions.
            </p>
            <SignatureCanvas
              onSignatureChange={setSignature}
              value={signature}
            />
            {submitError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {submitError}
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="text-center pt-6 px-4">
          {/* Scroll Indicator (when not scrolled to bottom) */}
          {!hasScrolledToBottom && (
            <div className="text-center text-sm text-secondary dark:text-secondary-text mb-2 animate-pulse">
              ↓ Please scroll down to read all terms ↓
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Terms accepted successfully!</span>
              </div>
            </div>
          )}

          {/* Accept Button */}
          {!submitSuccess && (
            <button
              onClick={handleAccept}
              disabled={!hasScrolledToBottom || !signature || isSubmitting}
              className="px-8 py-2.5 max-w-[250px] w-full rounded-md bg-secondary text-white font-medium text-sm md:text-base shadow-md transition-all duration-300 hover:shadow-lg hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary disabled:hover:shadow-md"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
              ) : (
                "I Accept"
              )}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PolicyPopup;
