import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowServices(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowServices(false);
    }, 250);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white text-black shadow-md fixed top-[22px] left-0 w-full z-[100]  transition-[height, opacity] ease-in duration-200 ${
        isVisible ? "h-[4em] opacity-100" : "h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-4">
            <div className="p-[1.5rem] rounded-full bg-gray-300"></div>
            <p className="flex flex-col text-xl font-bold tracking-wide leading-4.5">
              Barangay Culiat{" "}
              <span className="font-medium text-sm text-gray-600 tracking-tighter">
                E-Services
              </span>
            </p>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex space-x-6 items-center relative">
            <NavLink to="/" className="navlink text-sm font-medium">
              Home
            </NavLink>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="navlink text-sm font-medium flex items-center">
                Services{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 w-3 h-3 transform transition-transform ${
                    showServices ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showServices && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2 transition-opacity duration-300 ease-in-out z-[200]">
                  <NavLink
                    to="/services/barangay-id"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Barangay ID
                  </NavLink>
                  <NavLink
                    to="/services/business-permit"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Business Permit
                  </NavLink>
                  <NavLink
                    to="/services/indigency"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Certificate of Indigency
                  </NavLink>
                  <NavLink
                    to="/services/cedula"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cedula
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/announcements"
              className="navlink text-sm font-medium"
            >
              Announcements
            </NavLink>

            <NavLink to="/reports" className="navlink text-sm font-medium">
              Report
            </NavLink>

            <NavLink to="/about" className="navlink text-sm font-medium">
              About
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-4 items-center text-sm">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[var(--color-primary)] text-white font-medium px-4 py-2 rounded-md hover:bg-[var(--color-primary-glow)] transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="sm:hidden bg-red-700 px-4 pb-3 space-y-2">
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-white hover:text-gray-200"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/reports/new"
            onClick={() => setIsOpen(false)}
            className="block text-white hover:text-gray-200"
          >
            Reports
          </NavLink>
          <NavLink
            to="/announcements"
            onClick={() => setIsOpen(false)}
            className="block text-white hover:text-gray-200"
          >
            Announcements
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
