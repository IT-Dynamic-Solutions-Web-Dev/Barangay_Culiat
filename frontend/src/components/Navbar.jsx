import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  // const [isScrolldown, setisScrolldown] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     setTimeout(() => {
  //       if (currentScrollY < 80) {
  //         setisScrolldown(true);
  //       } else {
  //         setisScrolldown(false);
  //       }
  //     }, 200);

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  return (
    <nav className={`sticky top-0 left-0 w-full z-[100] h-auto `}>
      <div className={`relative w-full mx-auto lg:px-6 xl:px-8 bg-light `}>
        <div className="flex justify-between items-center h-16  text-text-color px-2 lg:px-4 ">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-full bg-light">
              <img
                src="/images/logo/brgy-culiat-logo.png"
                alt="Barangay Culiat Logo"
                className="sm:h-12 sm:w-12 h-10 w-10 rounded-full object-cover"
              />
            </div>
            <p className="flex flex-col text-md sm:text-lg font-bold tracking-wide leading-4 ">
              <span className="sm:block hidden">Barangay Culiat</span>
              <span className="sm:hidden block">Brgy. Culiat</span>
              <span className="font-semibold text-xs text-secondary">
                E-Services
              </span>
            </p>
          </Link>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex space-x-6 items-center font-medium relative `}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navlink text-sm  transition ${isActive && "active"}`
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
              <button className=" text-sm flex items-center cursor-pointer hover:text-secondary">
                <div className="navlink"> Services</div>

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
                className={`absolute left-0 top-[34px]  mt-2  w-56 bg-text-color-light text-text-color  border-secondary/60 shadow-lg rounded-md  z-[250] mix-blend-normal transition-heght duration-300 ${
                  showServices ? "h-auto py-2 border" : "h-0 overflow-hidden"
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
                    className="block px-4 py-2 text-sm hover:bg-secondary-glow hover:text-text-color-light transition mix-blend-normal "
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/announcements" className="navlink  text-sm ">
              Announcements
            </NavLink>

            <NavLink to="/reports" className="navlink  text-sm ">
              Report
            </NavLink>

            <NavLink to="/about" className="navlink  text-sm ">
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
            )}
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none text-text-color cursor-pointer "
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
        className={`absolute top-[100%] w-full md:hidden bg-secondary px-4 space-y-2  overflow-hidden transition-all duration-600 ${
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
            className="  flex items-center text-text-color-light cursor-pointer hover:text-accent"
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
              { label: "Community Tax Certificate", path: "/services/cedula" },
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
