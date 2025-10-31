import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  Users
} from "lucide-react";

const AdminUsers = () => {
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch current user and all users
  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const ROLES = {
    SuperAdmin: 74932,
    Admin: 74933,
    Resident: 74934
  };

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((user) => {
          if (filter === "admin") {
            return user.role === ROLES.SuperAdmin || user.role === ROLES.Admin;
          } else if (filter === "resident") {
            return user.role === ROLES.Resident;
          }
          return false;
        });

  const getRoleName = (role) => {
    switch (role) {
      case ROLES.SuperAdmin:
        return "Super Admin";
      case ROLES.Admin:
        return "Admin";
      case ROLES.Resident:
        return "Resident";
      default:
        return "Unknown";
    }
  };

  const getRoleColor = (role) => {
    if (role === ROLES.SuperAdmin) {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    } else if (role === ROLES.Admin) {
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    } else {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case "approved":
        return "Active";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return CheckCircle;
      case "pending":
        return Clock;
      case "rejected":
        return XCircle;
      default:
        return CheckCircle;
    }
  };

  const adminCount = users.filter(u => u.role === ROLES.SuperAdmin || u.role === ROLES.Admin).length;
  const residentCount = users.filter(u => u.role === ROLES.Resident).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Users
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>{filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Filters */}
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
          All Users ({users.length})
        </button>
        <button
          onClick={() => setFilter("admin")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <Shield className="w-4 h-4 inline mr-1" />
          Admins ({adminCount})
        </button>
        <button
          onClick={() => setFilter("resident")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "resident"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <User className="w-4 h-4 inline mr-1" />
          Residents ({residentCount})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {filter === "all" ? "No users found" : `No ${filter}s found`}
          </p>
        </div>
      )}

      {/* Users Table */}
      {!loading && filteredUsers.length > 0 && (
        <div className="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    User
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredUsers.map((user) => {
                  const StatusIcon = getStatusIcon(user.registrationStatus);
                  const isCurrentUser = currentUser && currentUser._id === user._id;
                  return (
                    <tr 
                      key={user._id} 
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                              {user.firstName} {user.lastName}
                              {isCurrentUser && (
                                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm text-gray-900 dark:text-white">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            {user.email}
                          </div>
                          {user.phoneNumber && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.phoneNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {getRoleName(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            user.registrationStatus
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusName(user.registrationStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
