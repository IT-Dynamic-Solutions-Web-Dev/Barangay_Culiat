import React, { useState } from "react";

const AdminUsers = () => {
  const [filter, setFilter] = useState("all");

  // Sample data - replace with actual API call
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "resident",
      status: "active",
      joinDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      joinDate: "2025-02-10",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "resident",
      status: "inactive",
      joinDate: "2025-03-20",
    },
  ];

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((user) => user.role === filter);

  const getRoleColor = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Users
        </h1>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setFilter("admin")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Admins
        </button>
        <button
          onClick={() => setFilter("resident")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "resident"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Residents
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  ID
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Role
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Join Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 space-x-2 text-sm whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
