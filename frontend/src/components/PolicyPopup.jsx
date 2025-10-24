// import { useEffect, useState } from "react";
// import { Modal } from "../tailadminsrc/components/ui/modal/index";

// const PolicyPopup = () => {
//    const [showPopup, setShowPopup] = useState(false);

//    // Show popup after delay if not seen in last 10 mins
//    useEffect(() => {
//       if (typeof window === "undefined") return;

//       const storedData = localStorage.getItem("policyData");
//       const policyData = storedData ? JSON.parse(storedData) : null;
//       const now = Date.now();

//       if (!policyData || now - policyData.timestamp > 10 * 60 * 1000) {
//          const timer = setTimeout(() => setShowPopup(true), 4000);
//          return () => clearTimeout(timer);
//       }
//    }, []);

//    // Prevent background scroll when popup is visible
//    useEffect(() => {
//       document.body.style.overflow = showPopup ? "hidden" : "";
//    }, [showPopup]);

//    const handleClose = () => {
//       localStorage.setItem(
//          "policyData",
//          JSON.stringify({ seen: true, timestamp: Date.now() })
//       );
//       setShowPopup(false);
//    };

//    if (!showPopup) return null;

//    return (
//       <Modal
//          isOpen={showPopup}
//          onClose={handleClose}
//          className="max-w-3xl w-[92%] mx-auto rounded-2xl shadow-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 px-8 py-10 md:p-12 transition-all duration-300"
//       >
//          <div className="space-y-8">
//             {/* Title */}
//             <h2 className="text-center text-2xl md:text-3xl font-extrabold text-text-color dark:text-white tracking-tight">
//                Barangay Culiat Web Policy
//             </h2>

//             {/* Intro */}
//             <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
//                Welcome to the Barangay Culiat Web System. By continuing to use
//                this platform, you acknowledge and agree to our policies ensuring
//                secure, transparent, and responsible data handling in accordance
//                with local data privacy standards.
//             </p>

//             {/* Sections */}
//             <div className="space-y-6">
//                <section>
//                   <h3 className="text-lg md:text-xl font-semibold text-text-color dark:text-white mb-2">
//                      1. Information We Collect
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
//                      We may collect your name, contact details, and relevant
//                      barangay service data to support communication and
//                      community service management within Barangay Culiat.
//                   </p>
//                </section>

//                <section>
//                   <h3 className="text-lg md:text-xl font-semibold text-text-color dark:text-white mb-2">
//                      2. Data Protection
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
//                      All personal data is securely stored and accessible only to
//                      authorized barangay personnel. We comply with
//                      barangay-level and national data privacy laws to safeguard
//                      user information.
//                   </p>
//                </section>

//                <section>
//                   <h3 className="text-lg md:text-xl font-semibold text-text-color dark:text-white mb-2">
//                      3. User Responsibility
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
//                      Users must ensure the accuracy of the information they
//                      provide. Misuse, sharing, or unauthorized access to the
//                      system is strictly prohibited and may result in
//                      administrative actions.
//                   </p>
//                </section>
//             </div>

//             {/* Action Button */}
//             <div className="text-center pt-4">
//                <button
//                   onClick={handleClose}
//                   className="px-8 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary/90"
//                >
//                   I Understand
//                </button>
//             </div>
//          </div>
//       </Modal>
//    );
// };

// export default PolicyPopup;
import { useEffect, useState } from "react";
import { Modal } from "../tailadminsrc/components/ui/modal/index";
import { ShieldCheck } from "lucide-react";

const PolicyPopup = () => {
   const [showPopup, setShowPopup] = useState(false);

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
      // Cleanup function to reset overflow when component unmounts or showPopup is false
      return () => {
         document.body.style.overflow = "";
      };
   }, [showPopup]);

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
         className="max-w-xl w-11/12 mx-auto rounded-xl shadow-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-8 md:p-10 transition-all duration-300"
      >
         <div className="max-h-[60vh] overflow-y-auto space-y-6 md:space-y-8 pr-3">
            <div className="flex flex-col items-center">
               <div className="p-3 mb-4 rounded-full bg-green-100 dark:bg-green-900/50">
                  <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
               </div>

               <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight break-words">
                  Barangay Culiat Web Policy
               </h2>
            </div>

            {/* Intro Section */}
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center">
               Welcome to the Barangay Culiat Web System. By continuing to use
               this platform, you acknowledge and agree to our policies ensuring
               secure, transparent, and responsible data handling in accordance
               with local data privacy standards.
            </p>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Policy Sections */}
            <div className="space-y-6">
               <section>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 break-words">
                     1. Information We Collect
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed break-words">
                     We may collect your name, contact details, and relevant
                     barangay service data to support communication and
                     community service management within Barangay Culiat.
                  </p>
               </section>

               <section>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 break-words">
                     2. Data Protection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed break-words">
                     All personal data is securely stored and accessible only to
                     authorized barangay personnel. We comply with
                     barangay-level and national data privacy laws to safeguard
                     user information.
                  </p>
               </section>

               <section>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 break-words">
                     3. User Responsibility
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed break-words">
                     Users must ensure the accuracy of the information they
                     provide. Misuse, sharing, or unauthorized access to the
                     system is strictly prohibited and may result in
                     administrative actions.
                  </p>
               </section>

               <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
                  End of Policy Document.
               </p>
            </div>
         </div>

         <div className="text-center pt-8 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
               onClick={handleClose}
               className="w-full sm:w-auto px-8 py-3 rounded-lg bg-green-600 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50"
            >
               I Understand and Agree
            </button>
         </div>
      </Modal>
   );
};

export default PolicyPopup;
