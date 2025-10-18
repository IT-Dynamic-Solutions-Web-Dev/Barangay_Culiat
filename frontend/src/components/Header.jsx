import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r bg-transparent py-2 px-1  ">
      <div className="max-w-xl px-1 mx-auto flex items-center justify-between font-serif">
        {/* Left Seal */}
        <div className=" md:block">
          <div className="sm:w-22 sm:h-18 w-14 h-12 relative">
            <img
              src="/images/logo/qc-logo.png"
              alt="brgy-culiat-logo"
              className=" object-fill object-center"
            />
          </div>
        </div>

        {/* Center Text */}
        <div className="text-center flex-1 leading-3 md:leading-2.5">
          <p className="text-[10px] font-semibold text-gray-700">
            Republika ng Pilipinas
          </p>
          <p className="text-[10px] text-gray-600 md:mb-1">
            Distrito 6, Lunsod Quezon
          </p>
          <h1 className="text-lg md:text-3xl font-bold text-gray-900  tracking-tight">
            BARANGAY CULIAT
          </h1>
        </div>

        {/* Right Seal */}
        <div className=" md:block">
          <div className="sm:w-18 sm:h-18 w-11 h-11 relative">
            <img
              src="/images/logo/brgy-culiat-logo.png"
              alt="brgy-culiat-logo"
              className="  object-fill object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
