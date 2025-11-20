import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { User, LogOut, LogIn, ChevronDown } from "lucide-react";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isScrolldown, setisScrolldown] = useState(true);
   const [showUserMenu, setShowUserMenu] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const { user, logout } = useAuth();

   const isHome = location.pathname === "/";
   const isAbout = location.pathname === "/about";

   const shouldApplySpecialScroll = isHome || isAbout;

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         if (shouldApplySpecialScroll && currentScrollY < 250) {
            setisScrolldown(false);
         } else {
            setisScrolldown(true);
         }
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
   }, [shouldApplySpecialScroll, location.pathname]);

   useEffect(() => {
      // Close dropdown when clicking outside
      const handleClickOutside = (event) => {
         if (showUserMenu && !event.target.closest(".user-menu-container")) {
            setShowUserMenu(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, [showUserMenu]);

   const handleLogout = () => {
      logout();
      setShowUserMenu(false);
      navigate("/");
   };

   const handleLogin = () => {
      // Store the current path to redirect back after login
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/login");
   };

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
               <Link to="/signin" className="flex items-center gap-2 sm:gap-3">
                  <div className="rounded-full bg-light">
                     <img
                        src="/images/logo/brgy-culiat-logo.png"
                        alt="Barangay Culiat Logo"
                        className="sm:h-12 sm:w-12 h-10 w-10 rounded-full object-cover"
                     />
                  </div>
                  <p className="flex flex-col text-lg sm:text-xl font-bold ">
                     <span className="sm:block hidden leading-5">
                        Barangay Culiat
                     </span>
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

                  {/* User Menu / Login & Register */}
                  {user && user.roleCode === 74934 ? (
                     <div className="relative user-menu-container">
                        <button
                           onClick={() => setShowUserMenu(!showUserMenu)}
                           className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/10 transition-colors"
                        >
                           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {user.firstName?.[0]}
                              {user.lastName?.[0]}
                           </div>
                           <span className="text-sm">{user.firstName}</span>
                           <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                 showUserMenu ? "rotate-180" : ""
                              }`}
                           />
                        </button>

                        {showUserMenu && (
                           <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                              <div className="px-4 py-3 border-b border-gray-200">
                                 <p className="text-sm font-semibold text-gray-900">
                                    {user.firstName} {user.lastName}
                                 </p>
                                 <p className="text-xs text-gray-500">
                                    {user.email}
                                 </p>
                                 <p className="text-xs text-blue-600 mt-1">
                                    Resident
                                 </p>
                              </div>
                              <Link
                                 to="/profile"
                                 onClick={() => setShowUserMenu(false)}
                                 className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                 <User className="w-4 h-4" />
                                 My Profile
                              </Link>
                              <button
                                 onClick={handleLogout}
                                 className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                 <LogOut className="w-4 h-4" />
                                 Logout
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <div className="flex items-center gap-3">
                        <button
                           onClick={handleLogin}
                           className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-semibold"
                        >
                           <LogIn className="w-4 h-4" />
                           Login
                        </button>
                        <Link
                           to="/register"
                           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                        >
                           Register
                        </Link>
                     </div>
                  )}
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
                  ? "max-h-[500px] py-4 border-t border-text-color/30"
                  : "max-h-0"
            }
        `}
         >
            {user && user.roleCode === 74934 && (
               <div className="pb-3 mb-3 border-b border-gray-300">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-900">
                           {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">Resident</p>
                     </div>
                  </div>
               </div>
            )}

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

            {user && user.roleCode === 74934 ? (
               <>
                  <NavLink
                     to="/profile"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-2 mobile-navlink text-text-color hover:text-secondary pt-3 border-t border-gray-300"
                  >
                     <User className="w-4 h-4" />
                     My Profile
                  </NavLink>
                  <button
                     onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                     }}
                     className="w-full flex items-center gap-2 mobile-navlink text-red-600 hover:text-red-700"
                  >
                     <LogOut className="w-4 h-4" />
                     Logout
                  </button>
               </>
            ) : (
               <div className="flex flex-col gap-3 pt-3 border-t border-gray-300">
                  <button
                     onClick={() => {
                        setIsOpen(false);
                        handleLogin();
                     }}
                     className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold"
                  >
                     <LogIn className="w-4 h-4" />
                     Login
                  </button>
                  <Link
                     to="/register"
                     onClick={() => setIsOpen(false)}
                     className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                     Register
                  </Link>
               </div>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
