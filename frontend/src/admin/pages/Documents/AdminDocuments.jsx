import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Search,
  Filter,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  X,
  AlertCircle,
} from "lucide-react";
import { useNotifications } from "../../../hooks/useNotifications";

const AdminDocuments = () => {
  const { notifyDocumentCompleted, notifyDocumentRejected, showPromise } = useNotifications();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionReason, setActionReason] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, searchTerm, requests]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/document-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    if (filter !== "all") {
      filtered = filtered.filter((r) => r.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.documentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredRequests(filtered);
  };

  const handleAction = async (requestId, action, reason = "") => {
    try {
      setUpdating(true);
      setError("");
      const token = localStorage.getItem("token");
      
      // Find the request to get document type for notification
      const request = requests.find(r => r._id === requestId);
      const documentType = request?.documentType || "Document";
      
      const promise = axios.patch(
        `${API_URL}/api/document-requests/${requestId}/status`,
        { 
          status: action,
          reason: reason || undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await showPromise(promise, {
        loading: `${action === 'completed' ? 'Completing' : 'Rejecting'} document request...`,
        success: `${documentType} request ${action} successfully!`,
        error: `Failed to ${action} request`
      });
      
      // Show additional notification based on action
      if (action === 'completed') {
        notifyDocumentCompleted(documentType);
      } else if (action === 'rejected') {
        notifyDocumentRejected(documentType, reason);
      }

      setShowModal(false);
      setSelectedRequest(null);
      setActionReason("");
      await fetchRequests();
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${action} request`);
    } finally {
      setUpdating(false);
    }
  };

  const viewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
    setActionReason("");
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      completed: CheckCircle,
      rejected: XCircle,
    };
    return icons[status] || Clock;
  };

  const statusCounts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    completed: requests.filter((r) => r.status === "completed").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Document Requests
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Review and process document requests
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircle className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        {[
          { label: "All Requests", count: statusCounts.all, color: "blue" },
          { label: "Pending", count: statusCounts.pending, color: "yellow" },
          { label: "Completed", count: statusCounts.completed, color: "green" },
          { label: "Rejected", count: statusCounts.rejected, color: "red" },
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                placeholder="Search by document type or resident..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status Filter
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending ({statusCounts.pending})</option>
              <option value="completed">Completed ({statusCounts.completed})</option>
              <option value="rejected">Rejected ({statusCounts.rejected})</option>
              <option value="all">All Requests ({statusCounts.all})</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredRequests.length} of {requests.length} requests
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading requests...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRequests.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {requests.length === 0 ? "No requests found" : "No requests match your filters"}
          </p>
        </div>
      )}

      {/* Requests List */}
      {!loading && filteredRequests.length > 0 && (
        <div className="grid gap-4">
          {filteredRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <div
                key={request._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {request.documentType}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        <span>
                          {request.user?.firstName} {request.user?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{request.user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {request.purpose && (
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <strong>Purpose:</strong> {request.purpose}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => viewDetails(request)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            handleAction(request._id, "completed");
                          }}
                          disabled={updating}
                          className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </button>
                        <button
                          onClick={() => viewDetails(request)}
                          disabled={updating}
                          className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Request Details
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRequest(null);
                  setActionReason("");
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Document Type
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedRequest.documentType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Requestor
                </label>
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {selectedRequest.user?.firstName} {selectedRequest.user?.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {selectedRequest.user?.email}
                      </span>
                    </div>
                    {selectedRequest.user?.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedRequest.user?.phoneNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedRequest.purpose && (
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Purpose
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedRequest.purpose}
                  </p>
                </div>
              )}

              {selectedRequest.status === "pending" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes/Reason (Optional for completion, Required for rejection)
                  </label>
                  <textarea
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    rows={3}
                    placeholder="Add notes or rejection reason..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              {selectedRequest.status === "pending" ? (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedRequest(null);
                      setActionReason("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!actionReason.trim()) {
                        setError("Please provide a reason for rejection");
                        return;
                      }
                      handleAction(selectedRequest._id, "rejected", actionReason);
                    }}
                    disabled={updating}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Request
                  </button>
                  <button
                    onClick={() => handleAction(selectedRequest._id, "completed", actionReason)}
                    disabled={updating}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Request
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
