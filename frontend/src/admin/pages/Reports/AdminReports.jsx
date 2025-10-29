import React, { useState } from "react";

const AdminReports = () => {
  const [filter, setFilter] = useState("all");

  // Sample data - replace with actual API call
  const reports = [
    {
      id: 1,
      title: "Street Light Issue",
      resident: "John Doe",
      date: "2025-10-24",
      status: "pending",
      category: "Infrastructure",
    },
    {
      id: 2,
      title: "Garbage Collection Delay",
      resident: "Jane Smith",
      date: "2025-10-23",
      status: "in-progress",
      category: "Sanitation",
    },
    {
      id: 3,
      title: "Noise Complaint",
      resident: "Bob Johnson",
      date: "2025-10-22",
      status: "resolved",
      category: "Public Safety",
    },
  ];

  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter((report) => report.status === filter);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Reports
        </h1>
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
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("in-progress")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "in-progress"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter("resolved")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "resolved"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Resolved
        </button>
      </div>

      {/* Reports Table */}
      <div className="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Report ID
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Resident
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    #{report.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {report.resident}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {report.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      View
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

export default AdminReports;
