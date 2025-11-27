import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  Megaphone,
  Settings,
  BarChart3,
  FolderOpen,
  Calendar,
  Bell,
  X,
  UserCheck,
  FileCheck,
  History,
  Trophy,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, isMobileOpen, closeMobileMenu }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Pending Registrations", path: "/admin/pending-registrations", icon: UserCheck },
    { name: "Registration History", path: "/admin/registration-history", icon: History },
    { name: "Reports", path: "/admin/reports", icon: FileText },
    { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
    { name: "Achievements", path: "/admin/achievements", icon: Trophy },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Documents", path: "/admin/documents", icon: FolderOpen },
    { name: "Calendar", path: "/admin/calendar", icon: Calendar },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Terms Acceptances", path: "/admin/terms-acceptances", icon: FileCheck },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex-shrink-0 transition-all duration-300 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
          isOpen ? "w-64" : "w-20"
        } hidden lg:flex lg:flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          {isOpen ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-lg">
                <span className="text-xl font-bold">BC</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Barangay Culiat
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-lg">
              <span className="text-xl font-bold">BC</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                } ${!isOpen ? "justify-center" : ""}`}
                title={!isOpen ? item.name : ""}
              >
                <Icon className="flex-shrink-0 w-5 h-5" />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user ? `${user.firstName} ${user.lastName}` : "Admin"
                )}&background=3b82f6&color=fff`}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  @{user?.username || user?.email || "admin"}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 transition-transform duration-300 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo with Close Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-lg">
              <span className="text-xl font-bold">BC</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Barangay Culiat
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-1 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="flex-shrink-0 w-5 h-5" />
                <span className="ml-3">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user ? `${user.firstName} ${user.lastName}` : "Admin"
              )}&background=3b82f6&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Admin User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                @{user?.username || user?.email || "admin"}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {user?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
