import React from "react";

const Header = ({ variant = "white" }) => {
   return (
      <div className=" py-2 px-1 z-50  w-full ">
         <div className="max-w-md px-1 mx-auto flex items-center justify-center gap-2 sm:gap-4 font-serif ">
            <div className="md:w-18 md:h-14 w-14 h-12 relative">
               <img
                  src="/images/logo/qc-logo.png"
                  alt="brgy-culiat-logo"
                  className=" object-fill object-center"
               />
            </div>
            <div className="text-center mix-blend-difference">
               <p className="text-[11px] font-semibold  text-text-color-light/85">
                  Republika ng Pilipinas
               </p>
               <p className="text-[11px] md:mb-2 text-text-color-light/85">
                  Distrito 6, Lunsod Quezon
               </p>
               <h1 className="text-lg md:text-2xl font-bold tracking-tight text-text-color-light/90 ">
                  BARANGAY CULIAT
               </h1>
            </div>
            <div className=" md:block">
               <div className="md:w-14 md:h-14 w-11 h-11 relative">
                  <img
                     src="/images/logo/brgy-culiat-logo.png"
                     alt="brgy-culiat-logo"
                     className=" rounded-full bg-light object-fill object-center"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
