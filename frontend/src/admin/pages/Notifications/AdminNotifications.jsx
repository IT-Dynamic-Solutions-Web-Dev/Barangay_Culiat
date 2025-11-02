import React, { useState } from "react";
import {
  Bell,
  FileText,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Filter,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const AdminNotifications = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "document_request",
      title: "New Document Request",
      message: "Juan Dela Cruz requested a Barangay Clearance",
      timestamp: "2 minutes ago",
      read: false,
      icon: FileText,
      color: "blue",
      link: "/admin/documents",
    },
    {
      id: 2,
      type: "registration",
      title: "New User Registration",
      message: "Maria Santos registered and awaiting approval",
      timestamp: "15 minutes ago",
      read: false,
      icon: UserPlus,
      color: "green",
      link: "/admin/pending-registrations",
    },
    {
      id: 3,
      type: "success",
      title: "Document Request Completed",
      message: "Certificate of Residency for Pedro Reyes has been completed",
      timestamp: "1 hour ago",
      read: true,
      icon: CheckCircle,
      color: "green",
      link: "/admin/documents",
    },
    {
      id: 4,
      type: "alert",
      title: "Pending Requests Alert",
      message: "You have 15 pending document requests that need attention",
      timestamp: "2 hours ago",
      read: false,
      icon: AlertCircle,
      color: "yellow",
      link: "/admin/documents",
    },
    {
      id: 5,
      type: "document_request",
      title: "New Document Request",
      message: "Anna Reyes requested a Business Permit",
      timestamp: "3 hours ago",
      read: true,
      icon: FileText,
      color: "blue",
      link: "/admin/documents",
    },
    {
      id: 6,
      type: "info",
      title: "System Update",
      message: "New features have been added to the document management system",
      timestamp: "5 hours ago",
      read: true,
      icon: Info,
      color: "purple",
      link: null,
    },
    {
      id: 7,
      type: "registration",
      title: "New User Registration",
      message: "Carlos Lopez registered and awaiting approval",
      timestamp: "Yesterday",
      read: true,
      icon: UserPlus,
      color: "green",
      link: "/admin/pending-registrations",
    },
    {
      id: 8,
      type: "document_request",
      title: "New Document Request",
      message: "Elena Cruz requested an Indigency Certificate",
      timestamp: "2 days ago",
      read: true,
      icon: FileText,
      color: "blue",
      link: "/admin/documents",
    },
  ]);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getNotificationBg = (type, read) => {
    if (read) {
      return "bg-white dark:bg-gray-800";
    }
    switch (type) {
      case "document_request":
        return "bg-blue-50 dark:bg-blue-900/10";
      case "registration":
        return "bg-green-50 dark:bg-green-900/10";
      case "alert":
        return "bg-yellow-50 dark:bg-yellow-900/10";
      case "success":
        return "bg-green-50 dark:bg-green-900/10";
      default:
        return "bg-gray-50 dark:bg-gray-800/50";
    }
  };

  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20",
      green:
        "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
      yellow:
        "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20",
      purple:
        "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Stay updated with system alerts and user activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Notifications</p>
              <p className="text-3xl font-bold mt-1">{notifications.length}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Unread</p>
              <p className="text-3xl font-bold mt-1">{unreadCount}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Read</p>
              <p className="text-3xl font-bold mt-1">
                {notifications.length - unreadCount}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <Filter className="w-4 h-4 inline mr-1" />
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <Bell className="w-4 h-4 inline mr-1" />
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "read"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Read ({notifications.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications found"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`${getNotificationBg(
                  notification.type,
                  notification.read
                )} rounded-lg shadow hover:shadow-md transition-all border-l-4 ${
                  !notification.read
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 p-3 rounded-lg ${getIconColor(
                        notification.color
                      )}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                              <Clock className="w-3 h-3" />
                              {notification.timestamp}
                            </span>
                            {notification.link && (
                              <a
                                href={notification.link}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                View Details →
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Activity Summary */}
      {notifications.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity Summary
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Document Requests
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Today
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {
                  notifications.filter((n) => n.type === "document_request")
                    .length
                }
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New Registrations
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Today
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {notifications.filter((n) => n.type === "registration").length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Alerts
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Requiring attention
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {notifications.filter((n) => n.type === "alert").length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
