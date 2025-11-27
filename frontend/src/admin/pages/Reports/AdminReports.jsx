import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Filter,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Trash2,
  Edit,
  ArrowUpDown,
} from "lucide-react";
import { useNotifications } from "../../../hooks/useNotifications";

const AdminReports = () => {
  const { notifyReportResolved, showSuccess, showInfo } = useNotifications();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedReports, setSelectedReports] = useState([]);
  const [showActions, setShowActions] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Sample data with enhanced fields - replace with actual API call
  const sampleReports = [
    {
      id: 1,
      title: "Street Light Issue on Main Road",
      resident: "John Doe",
      residentEmail: "john@example.com",
      date: "2025-10-24",
      status: "pending",
      category: "Infrastructure",
      priority: "high",
      description: "Street light not working for 3 days",
      location: "Main Road, Block 5",
    },
    {
      id: 2,
      title: "Garbage Collection Delay",
      resident: "Jane Smith",
      residentEmail: "jane@example.com",
      date: "2025-10-23",
      status: "in-progress",
      category: "Sanitation",
      priority: "medium",
      description: "Garbage not collected for a week",
      location: "Block 3, Street 2",
    },
    {
      id: 3,
      title: "Noise Complaint - Late Night",
      resident: "Bob Johnson",
      residentEmail: "bob@example.com",
      date: "2025-10-22",
      status: "resolved",
      category: "Public Safety",
      priority: "low",
      description: "Loud music after 10 PM",
      location: "Block 7, Unit 12",
    },
    {
      id: 4,
      title: "Water Leak Emergency",
      resident: "Alice Brown",
      residentEmail: "alice@example.com",
      date: "2025-10-25",
      status: "pending",
      category: "Infrastructure",
      priority: "urgent",
      description: "Major water leak causing flooding",
      location: "Block 2, Main Street",
    },
    {
      id: 5,
      title: "Stray Dogs in Area",
      resident: "Charlie Wilson",
      residentEmail: "charlie@example.com",
      date: "2025-10-21",
      status: "in-progress",
      category: "Public Safety",
      priority: "medium",
      description: "Multiple stray dogs causing concerns",
      location: "Block 6, Park Area",
    },
  ];

  useEffect(() => {
    // Simulate API call - replace with actual API
    setLoading(true);
    setTimeout(() => {
      setReports(sampleReports);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, searchTerm, categoryFilter, priorityFilter, sortBy, sortOrder, reports]);

  const applyFilters = () => {
    let filtered = [...reports];

    // Status filter
    if (filter !== "all") {
      filtered = filtered.filter((report) => report.status === filter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((report) => report.category === categoryFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((report) => report.priority === priorityFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.resident?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "date":
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case "title":
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          aVal = priorityOrder[a.priority];
          bVal = priorityOrder[b.priority];
          break;
        default:
          return 0;
      }
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredReports(filtered);
  };

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "in-progress":
        return AlertCircle;
      case "resolved":
        return CheckCircle;
      default:
        return FileText;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map((r) => r.id));
    }
  };

  const handleSelectReport = (id) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((rid) => rid !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Title",
      "Resident",
      "Email",
      "Category",
      "Priority",
      "Status",
      "Date",
      "Location",
      "Description",
    ];

    const rows = filteredReports.map((report) => [
      report.id,
      report.title,
      report.resident,
      report.residentEmail,
      report.category,
      report.priority,
      report.status,
      report.date,
      report.location,
      report.description,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map(cell => `"${cell}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `reports_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkStatusUpdate = (newStatus) => {
    const count = selectedReports.length;
    const statusText = newStatus.replace("-", " ");
    
    // Update reports (implement actual API call here)
    setReports(prevReports =>
      prevReports.map(report =>
        selectedReports.includes(report.id)
          ? { ...report, status: newStatus }
          : report
      )
    );
    
    // Show success notification
    if (newStatus === "resolved") {
      showSuccess(`${count} report${count > 1 ? 's' : ''} marked as resolved`);
      // Notify individual reports if only one selected
      if (count === 1) {
        const report = reports.find(r => r.id === selectedReports[0]);
        if (report) {
          notifyReportResolved(report.title);
        }
      }
    } else {
      showInfo(`${count} report${count > 1 ? 's' : ''} marked as ${statusText}`);
    }
    
    setSelectedReports([]);
  };

  const categories = ["Infrastructure", "Sanitation", "Public Safety"];
  const priorities = ["urgent", "high", "medium", "low"];

  const statusCounts = {
    all: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    "in-progress": reports.filter((r) => r.status === "in-progress").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Reports
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage all resident reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedReports.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                {selectedReports.length} selected
              </span>
              <button
                onClick={() => handleBulkStatusUpdate("in-progress")}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleBulkStatusUpdate("resolved")}
                className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Mark Resolved
              </button>
            </div>
          )}
          <button
            onClick={exportToCSV}
            disabled={filteredReports.length === 0}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        {[
          { label: "All Reports", count: statusCounts.all, color: "blue" },
          { label: "Pending", count: statusCounts.pending, color: "yellow" },
          { label: "In Progress", count: statusCounts["in-progress"], color: "blue" },
          { label: "Resolved", count: statusCounts.resolved, color: "green" },
        ].map((stat, idx) => (
          <div key={idx} className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
            <p className={`mt-2 text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
              {stat.count}
            </p>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                placeholder="Search reports..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status ({statusCounts.all})</option>
              <option value="pending">Pending ({statusCounts.pending})</option>
              <option value="in-progress">In Progress ({statusCounts["in-progress"]})</option>
              <option value="resolved">Resolved ({statusCounts.resolved})</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
          <span className="ml-auto text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredReports.length} of {reports.length} reports
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading reports...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredReports.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {reports.length === 0 ? "No reports found" : "No reports match your filters"}
          </p>
        </div>
      )}

      {/* Reports Table */}
      {!loading && filteredReports.length > 0 && (
        <div className="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === filteredReports.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Report
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Resident
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredReports.map((report) => {
                  const StatusIcon = getStatusIcon(report.status);
                  return (
                    <tr
                      key={report.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedReports.includes(report.id)
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => handleSelectReport(report.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {report.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              #{report.id} • {report.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {report.resident}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {report.residentEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            report.priority
                          )}`}
                        >
                          {report.priority.charAt(0).toUpperCase() +
                            report.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            report.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {report.status.charAt(0).toUpperCase() +
                            report.status.slice(1).replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Edit report"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete report"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

export default AdminReports;
