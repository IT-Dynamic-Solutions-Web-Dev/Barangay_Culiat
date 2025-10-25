import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolldown, setisScrolldown] = useState(true);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isHome && currentScrollY < 250) {
        setisScrolldown(false);
      } else {
        setisScrolldown(true);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-100 h-auto `}>
      <div
        className={`relative w-full py-2 backdrop-blur-[2px]  ${
          (isScrolldown || isOpen) && "bg-light shadow-md"
        } transition-background ease-in-out duration-400`}
      >
        <div
          className={`flex justify-between max-w-6xl mx-auto items-center h-16  px-4  ${
            isScrolldown || isOpen
              ? "text-text-color transition-all duration-300"
              : "text-text-color-light transition-all duration-300"
          }`}
        >
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-full bg-light">
              <img
                src="/images/logo/brgy-culiat-logo.png"
                alt="Barangay Culiat Logo"
                className="sm:h-12 sm:w-12 h-10 w-10 rounded-full object-cover"
              />
            </div>
            <p className="flex flex-col text-lg sm:text-xl font-bold ">
              <span className="sm:block hidden leading-5">Barangay Culiat</span>
              <span className="sm:hidden block">Brgy. Culiat</span>
              <span className="font-semibold text-xs sm:text-sm text-secondary-text">
                E-Services
              </span>
            </p>
          </Link>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex space-x-6 items-center font-semibold relative `}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navlink text-md  transition ${isActive && "active"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `navlink text-md  transition ${isActive && "active"}`
              }
            >
              Services
            </NavLink>

            <NavLink to="/announcements" className="navlink  text-md ">
              Announcements
            </NavLink>

            <NavLink to="/reports" className="navlink  text-md ">
              Report
            </NavLink>

            <NavLink to="/about" className="navlink  text-md ">
              About
            </NavLink>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none text-text-color-light mix-blend-difference cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.svg
                  key="close"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
      {/* </div> */}

      {/* Mobile dropdown */}

      <div
        className={`absolute top-full w-full md:hidden bg-light shadow-md px-4 space-y-4 font-medium overflow-hidden transition-all duration-600 ${
          isOpen
            ? "max-h-[400px] py-4 border-t border-text-color/30"
            : "max-h-0"
        }
        `}
      >
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={`mobile-navlink block text-text-color hover:text-secondary active:text-secondary `}
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          onClick={() => setIsOpen(false)}
          className="block mobile-navlink text-text-color hover:text-secondary active:text-secondary"
        >
          Services
        </NavLink>

        <NavLink
          to="/announcements"
          onClick={() => setIsOpen(false)}
          className="block mobile-navlink text-text-color hover:text-secondary"
        >
          Announcements
        </NavLink>
        <NavLink
          to="/reports"
          onClick={() => setIsOpen(false)}
          className="block mobile-navlink text-text-color hover:text-secondary"
        >
          Reports
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setIsOpen(false)}
          className="block mobile-navlink text-text-color hover:text-secondary"
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
