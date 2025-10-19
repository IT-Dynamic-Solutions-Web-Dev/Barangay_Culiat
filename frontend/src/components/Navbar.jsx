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

      // if (currentScrollY < lastScrollY || currentScrollY < 380) {
      //   setIsVisible(true);
      // } else {
      //   setIsVisible(false);
      // }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-[100] transition-[height,opacity] ease-in duration-200 ${
        isVisible ? "h-[4em] opacity-100" : "h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="w-full mx-auto md:px-6 lg:px-8  shadow-md bg-secondary">
        <div className="flex justify-between items-center h-16  text-text-color-light px-4 ">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-4">
            <div className="rounded-full ">
              <img
                src="/images/logo/brgy-culiat-logo.png"
                alt="Barangay Culiat Logo"
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <p className="sm:flex flex-col hidden text-lg font-semibold tracking-wide leading-5">
              Barangay Culiat
              <span className="font-normal text-sm text-accent">
                E-Services
              </span>
            </p>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 items-center relative">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navlink text-sm font-medium transition ${
                  isActive
                    ? "text-accent active"
                    : "hover:text-accent text-text-color-light"
                }`
              }
            >
              Home
            </NavLink>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="navlink text-sm font-medium flex items-center hover:text-accent">
                Services
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
                <div className="absolute left-0 mt-2 w-56 bg-text-color-light text-text-color border border-secondary/60 shadow-lg rounded-md py-2 z-[200]">
                  {[
                    { label: "Barangay ID", path: "/services/barangay-id" },
                    {
                      label: "Business Permit",
                      path: "/services/business-permit",
                    },
                    {
                      label: "Certificate of Indigency",
                      path: "/services/indigency",
                    },
                    { label: "Cedula", path: "/services/cedula" },
                  ].map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm hover:bg-secondary-glow hover:text-text-color-light transition"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/announcements"
              className="navlink hover:text-accent text-sm font-medium"
            >
              Announcements
            </NavLink>

            <NavLink
              to="/reports"
              className="navlink hover:text-accent text-sm font-medium"
            >
              Report
            </NavLink>

            <NavLink
              to="/about"
              className="navlink hover:text-accent text-sm font-medium"
            >
              About
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-3 items-center text-sm">
            {user ? (
              <button
                onClick={handleLogout}
                className=" text-accent font-medium hover:underline"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-color-light font-medium hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-text-color-light font-medium px-4 py-2 rounded-md hover:bg-primary-glow transition"
                >
                  Register
                </Link>
              </>
            )}
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none text-text-color-light"
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
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}

      <div
        className={`md:hidden bg-secondary px-4 space-y-2 border-t border-accent/40 overflow-hidden transition-all duration-600 ${
          isOpen ? "h-auto py-4" : "h-0"
        }`}
      >
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="block text-text-color-light hover:text-accent"
        >
          Home
        </NavLink>
        <div>
          <button
            className="  flex items-center text-text-color-light hover:text-accent"
            onClick={() => setShowServices(!showServices)}
          >
            Services
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

          <div
            className={` w-56 text-text-color-light ${
              showServices ? "h-auto py-2" : "h-0 overflow-hidden"
            }`}
          >
            {[
              { label: "Barangay ID", path: "/services/barangay-id" },
              {
                label: "Business Permit",
                path: "/services/business-permit",
              },
              {
                label: "Certificate of Indigency",
                path: "/services/indigency",
              },
              { label: "Cedula", path: "/services/cedula" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-sm hover:text-accent transition"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink
          to="/reports"
          onClick={() => setIsOpen(false)}
          className="block text-text-color-light hover:text-accent"
        >
          Reports
        </NavLink>
        <NavLink
          to="/announcements"
          onClick={() => setIsOpen(false)}
          className="block text-text-color-light hover:text-accent"
        >
          Announcements
        </NavLink>
        <NavLink
          to="/announcements"
          onClick={() => setIsOpen(false)}
          className="block text-text-color-light hover:text-accent"
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
