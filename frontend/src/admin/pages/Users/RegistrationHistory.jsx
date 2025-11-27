import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Calendar,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

const RegistrationHistory = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [filter, searchTerm, dateRange, registrations]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Filter for approved and rejected registrations only
      const processedRegs = response.data.data.filter(
        (user) => user.registrationStatus === "approved" || user.registrationStatus === "rejected"
      );
      
      setRegistrations(processedRegs);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = [...registrations];

    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter((reg) => reg.registrationStatus === filter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (reg) =>
          reg.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(
        (reg) => new Date(reg.createdAt) >= new Date(dateRange.start)
      );
    }
    if (dateRange.end) {
      filtered = filtered.filter(
        (reg) => new Date(reg.createdAt) <= new Date(dateRange.end + "T23:59:59")
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredRegistrations(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Username",
      "Email",
      "Phone",
      "Role",
      "Status",
      "Registration Date",
      "Reason",
    ];

    const rows = filteredRegistrations.map((reg) => [
      `${reg.firstName} ${reg.lastName}`,
      reg.username,
      reg.email,
      reg.phoneNumber || "N/A",
      reg.roleName,
      reg.registrationStatus,
      new Date(reg.createdAt).toLocaleDateString(),
      reg.rejectionReason || reg.approvalReason || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registration_history_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    return status === "approved"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const getStatusIcon = (status) => {
    return status === "approved" ? CheckCircle : XCircle;
  };

  const approvedCount = registrations.filter((r) => r.registrationStatus === "approved").length;
  const rejectedCount = registrations.filter((r) => r.registrationStatus === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Registration History
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View all approved and rejected user registrations
          </p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={filteredRegistrations.length === 0}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Processed
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {registrations.length}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Approved
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {approvedCount}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full dark:bg-green-900/20">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rejected
              </p>
              <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                {rejectedCount}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full dark:bg-red-900/20">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All ({registrations.length})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === "approved"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === "rejected"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(filter !== "all" || searchTerm || dateRange.start || dateRange.end) && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
                setDateRange({ start: "", end: "" });
              }}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading history...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRegistrations.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {registrations.length === 0
              ? "No registration history found"
              : "No registrations match your filters"}
          </p>
        </div>
      )}

      {/* Registrations Table */}
      {!loading && filteredRegistrations.length > 0 && (
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Reason/Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredRegistrations.map((reg) => {
                  const StatusIcon = getStatusIcon(reg.registrationStatus);
                  return (
                    <tr key={reg._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {reg.firstName?.[0]}{reg.lastName?.[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {reg.firstName} {reg.lastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              @{reg.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm text-gray-900 dark:text-white">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            {reg.email}
                          </div>
                          {reg.phoneNumber && (
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              {reg.phoneNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {reg.roleName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            reg.registrationStatus
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {reg.registrationStatus.charAt(0).toUpperCase() +
                            reg.registrationStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                          {reg.rejectionReason || reg.approvalReason || "No reason provided"}
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

export default RegistrationHistory;
