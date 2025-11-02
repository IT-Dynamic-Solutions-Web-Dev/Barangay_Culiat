import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Megaphone,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  Bell,
  Calendar,
  BarChart3,
  FolderOpen,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      name: "New Announcement",
      icon: Plus,
      path: "/admin/announcements",
      color: "blue",
      description: "Create announcement",
    },
    {
      name: "View Reports",
      icon: FileText,
      path: "/admin/reports",
      color: "green",
      description: "Manage reports",
    },
    {
      name: "Pending Users",
      icon: UserPlus,
      path: "/admin/pending-registrations",
      color: "yellow",
      description: "Review registrations",
    },
    {
      name: "View Calendar",
      icon: Calendar,
      path: "/admin/calendar",
      color: "purple",
      description: "Manage events",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "indigo",
      description: "View insights",
    },
    {
      name: "Documents",
      icon: FolderOpen,
      path: "/admin/documents",
      color: "orange",
      description: "Document requests",
    },
  ];

  const stats = [
    {
      name: "Total Users",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      name: "Total Reports",
      value: "456",
      change: "+8%",
      trend: "up",
      icon: FileText,
      color: "green",
    },
    {
      name: "Announcements",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Megaphone,
      color: "yellow",
    },
    {
      name: "Pending Requests",
      value: "18",
      change: "-5%",
      trend: "down",
      icon: Clock,
      color: "red",
    },
  ];

  const recentReports = [
    {
      id: 1,
      title: "Street Light Issue",
      user: "John Doe",
      status: "pending",
      time: "5 min ago",
    },
    {
      id: 2,
      title: "Garbage Collection Delay",
      user: "Jane Smith",
      status: "in-progress",
      time: "30 min ago",
    },
    {
      id: 3,
      title: "Road Repair Request",
      user: "Bob Johnson",
      status: "resolved",
      time: "2 hours ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getColorClass = (color) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
    };
    return colors[color] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/admin/analytics")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </button>
          <button
            onClick={() => navigate("/admin/announcements")}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:shadow-md group"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-${action.color}-100 dark:bg-${action.color}-900/20 group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400`}
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white text-center">
                  {action.name}
                </span>
                <span className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {action.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <button
              key={index}
              onClick={() => {
                // Navigate to relevant page based on stat name
                if (stat.name === "Total Users") navigate("/admin/users");
                else if (stat.name === "Total Reports")
                  navigate("/admin/reports");
                else if (stat.name === "Announcements")
                  navigate("/admin/announcements");
                else if (stat.name === "Pending Requests")
                  navigate("/admin/pending-registrations");
              }}
              className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendIcon
                      className={`w-4 h-4 ${
                        stat.trend === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <span
                      className={`ml-1 text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      from last month
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${getColorClass(
                    stat.color
                  )} bg-opacity-10 group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    className={`w-6 h-6 ${getColorClass(stat.color).replace(
                      "bg-",
                      "text-"
                    )}`}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Reports */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Reports
              </h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                View All
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => navigate("/admin/reports")}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:shadow-md text-left"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {report.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Submitted by {report.user}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {report.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">John Doe</span> submitted a
                      new report
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 mt-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">Admin</span> published a new
                      announcement
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      1 hour ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 mt-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">Jane Smith</span> registered
                      a new account
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      3 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 mt-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">Bob Johnson</span> updated
                      profile information
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      5 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
