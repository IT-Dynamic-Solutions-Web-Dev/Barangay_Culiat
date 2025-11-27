import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Mail } from "lucide-react";

const slideLeft = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, x: -200, transition: { duration: 0.45 } },
};

const slideRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, x: 200, transition: { duration: 0.45 } },
};

const heroWrapperClasses =
  "w-full lg:w-1/2 relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden rounded-2xl";

const HeroLogin = () => (
  <div className="relative w-full h-full">
    <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGGgZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

    <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-12 text-sm font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="w-20 h-20 bg-white/95 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30 mb-6">
        <img
          src="/images/logo/brgy-culiat-logo.svg"
          alt="Barangay Culiat Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
        Barangay Culiat
        <span className="block text-white/90 text-2xl xl:text-3xl mt-2">
          Resident Portal
        </span>
      </h1>

      <p className="text-lg text-white/90 mt-6 mb-10 leading-relaxed">
        Access barangay services, submit reports, and stay updated with
        community announcements.
      </p>

      <FeatureItem
        icon={<Home className="w-4 h-4" />}
        title="Community Services"
        text="Request documents and access various barangay services online."
      />
      <FeatureItem
        icon={<Mail className="w-4 h-4" />}
        title="Stay Informed"
        text="Receive announcements and updates from your barangay officials."
      />
    </div>
  </div>
);

const HeroRegister = () => (
  <div className="relative w-full h-full">
    <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,...')]"></div>
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

    <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-12 text-sm font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="w-20 h-20 bg-white/95 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30 mb-6">
        <img
          src="/images/logo/brgy-culiat-logo.svg"
          alt="Barangay Culiat Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
        Join Barangay Culiat
        <span className="block text-white/90 text-2xl xl:text-3xl mt-2">
          Resident Registration
        </span>
      </h1>

      <p className="text-lg text-white/90 mt-6 mb-10 leading-relaxed">
        Register now to access barangay services and stay connected with your
        community.
      </p>

      <FeatureItem
        icon={<Home className="w-4 h-4" />}
        title="Quick Access"
        text="Get instant access to services once approved."
      />
      <FeatureItem
        icon={<Mail className="w-4 h-4" />}
        title="Stay Updated"
        text="Receive announcements and barangay news."
      />
    </div>
  </div>
);

const FeatureItem = ({ icon, title, text }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-3">
    <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
      <div className="w-7 h-7 bg-blue-500/30 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      {title}
    </h3>
    <p className="text-white/80 text-sm leading-relaxed">{text}</p>
  </div>
);

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");
  const isRegister = pathname.includes("register");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden relative">
      {/* FORM (REGISTER TOP) */}
      <AnimatePresence mode="wait">
        {isRegister && (
          <motion.div
            key="form-top"
            {...slideRight}
            className="w-full lg:w-1/2 p-6 flex justify-center items-center z-20"
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "hero-register" : "hero-login"}
          {...(isLogin ? slideRight : slideLeft)}
          className={heroWrapperClasses}
        >
          {isLogin ? <HeroLogin /> : <HeroRegister />}
        </motion.div>
      </AnimatePresence>

      {/* FORM (LOGIN BOTTOM) */}
      <AnimatePresence mode="wait">
        {isLogin && (
          <motion.div
            key="form-bottom"
            {...slideLeft}
            className="w-full lg:w-1/2 p-6 flex justify-center items-center z-20"
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
