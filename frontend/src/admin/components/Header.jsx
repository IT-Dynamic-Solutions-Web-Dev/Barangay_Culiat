import React, { useState } from "react";
import { Bell, Search, Menu, Sun, Moon, LogOut, User } from "lucide-react";

const Header = ({ toggleSidebar, toggleMobileMenu, isSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const notifications = [
    {
      id: 1,
      title: "New report submitted",
      message: "John Doe submitted a new report",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "User registered",
      message: "New user Jane Smith registered",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Announcement published",
      message: "Community event announcement is live",
      time: "2 hours ago",
      unread: false,
    },
  ];

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:block"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
          />
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 z-50 w-80 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      notif.unread ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2"
          >
            <img
              src="/images/profiles/profile-01.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff";
              }}
            />
            <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 md:block">
              Admin
            </span>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  admin@barangay.com
                </p>
              </div>
              <div className="p-2">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
