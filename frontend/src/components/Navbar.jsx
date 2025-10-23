import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  // const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isScrolldown, setisScrolldown] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowServices(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowServices(false);
    }, 250);
  };

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isHome && currentScrollY < 250) {
        setisScrolldown(false);
      } else {
        setisScrolldown(true);
      }

      // setLastScrollY(currentScrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] h-auto `}>
      <div
        className={`relative w-full py-2 backdrop-blur-[2px]  ${
          isScrolldown && "bg-light shadow-md"
        } transition-background duration-300`}
      >
        <div
          className={`flex justify-between max-w-6xl mx-auto items-center h-16 px-2  ${
            isScrolldown ? "text-text-color" : "text-text-color-light"
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
            <p className="flex flex-col text-md sm:text-xl font-bold tracking-wide">
              <span className="sm:block hidden">Barangay Culiat</span>
              <span className="sm:hidden block">Brgy. Culiat</span>
              <span className="font-semibold text-sm text-secondary-text">
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

            {/* Services dropdown */}
            {/* <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className=" text-md flex items-center cursor-pointer hover:text-secondary-text">
                <div className="navlink"> Services</div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 w-3 h-3 transform transition-[transform, background] duration-150 ${
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
                className={`absolute left-0 top-[34px]  mt-2  w-64  bg-text-color-light text-text-color  border-text-color/60 shadow-lg rounded-md  z-[250] mix-blend-normal transition-heght duration-300 ${
                  showServices ? "py-2 border" : "hidden overflow-hidden"
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
                  {
                    label: "Community Tax Certificate",
                    path: "/services/cedula",
                  },
                ].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-neutral font-normal transition  "
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div> */}

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

          {/* Auth Buttons */}
          {/* <div className="flex space-x-3 items-center text-sm">
            {user ? (
              <button
                onClick={handleLogout}
                className=" text-accent font-medium hover:underline"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="font-medium hover:underline ">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary text-text-color-light font-medium px-4 py-2 rounded-md hover:bg-secondary-glow transition"
                >
                  Register
                </Link>
              </>
            )} */}
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none text-text-color-light mix-blend-difference cursor-pointer "
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
      {/* </div> */}

      {/* Mobile dropdown */}

      <div
        className={`absolute top-[100%] w-full md:hidden bg-light shadow-md px-4 space-y-3  overflow-hidden transition-all duration-600 ${
          isOpen
            ? "max-h-[400px]  py-4 border-t border-text-color/30"
            : "max-h-0"
        }
        `}
      >
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="block text-text-color"
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          onClick={() => setIsOpen(false)}
          className="block text-text-color"
        >
          Services
        </NavLink>
        {/* <div>
          <button
            className="  flex items-center text-text-color cursor-pointer"
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
            className={` w-56 text-text-color ${
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
              { label: "Community Tax Certificate", path: "/services/cedula" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-sm transition"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          </div> */}
        <NavLink
          to="/announcements"
          onClick={() => setIsOpen(false)}
          className="block text-text-color"
        >
          Announcements
        </NavLink>
        <NavLink
          to="/reports"
          onClick={() => setIsOpen(false)}
          className="block text-text-color"
        >
          Reports
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setIsOpen(false)}
          className="block text-text-color"
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
