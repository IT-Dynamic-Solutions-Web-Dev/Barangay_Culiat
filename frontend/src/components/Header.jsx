import React from "react";

const Header = ({ variant = "white" }) => {
   return (
      <div className="py-2 px-4 z-50 w-full">
         {/* FIXED:
        1. Removed 'max-w-md' and 'px-1' from container. Using 'px-4' on the outer div instead.
        2. Replaced 'justify-between' with 'justify-center'.
        3. Added 'gap-2' for minimal spacing between elements, keeping them close.
      */}
         <div className="container mx-auto flex items-center justify-center font-serif gap-2 sm:gap-4">
            {/* Left Seal - Removed explicit md:w/h and used flex-shrink-0 */}
            <div className="w-14 h-12 relative flex-shrink-0">
               <img
                  src="/images/logo/qc-logo.png"
                  alt="qc-logo"
                  className="w-full h-full object-fill object-center"
               />
            </div>

            {/* Center Text - Removed 'flex-1' and '-blend-difference' */}
            <div className="text-center">
               <p
                  className={`text-[11px] font-semibold ${
                     variant === "black"
                        ? "text-text-color/90"
                        : "text-text-color-light/85"
                  }`}
               >
                  Republika ng Pilipinas
               </p>
               <p
                  className={`text-[11px] md:mb-2 ${
                     variant === "black"
                        ? "text-text-color/90"
                        : "text-text-color-light/85"
                  }`}
               >
                  Distrito 6, Lunsod Quezon
               </p>
               <h1
                  className={`text-lg md:text-2xl font-bold tracking-tight ${
                     variant === "black"
                        ? "text-text-color/90"
                        : "text-text-color-light/90 "
                  }`}
               >
                  BARANGAY CULIAT
               </h1>
            </div>

            {/* Right Seal - Removed explicit md:block and used flex-shrink-0 */}
            <div className="flex-shrink-0">
               <div className="w-11 h-11 relative">
                  <img
                     src="/images/logo/brgy-culiat-logo.png"
                     alt="brgy-culiat-logo"
                     className="rounded-full bg-light object-fill object-center"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
