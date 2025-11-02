import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FileText, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileCheck,
  Ban,
  Printer,
  Eye,
  Filter
} from "lucide-react";

const AdminDocuments = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch all document requests
  useEffect(() => {
    fetchRequests();
  }, []);

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

  // Update request status
  const updateStatus = async (requestId, newStatus) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/api/document-requests/${requestId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh the list
      await fetchRequests();
      setShowModal(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Print request details
  const printRequest = (request) => {
    const printWindow = window.open("", "_blank");
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Document Request - ${request.documentType}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; display: inline-block; width: 150px; }
          .value { display: inline-block; }
          .status { display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold; }
          .status-pending { background: #fef3c7; color: #92400e; }
          .status-approved { background: #d1fae5; color: #065f46; }
          .status-rejected { background: #fee2e2; color: #991b1b; }
          .status-completed { background: #dbeafe; color: #1e40af; }
          .status-cancelled { background: #e5e7eb; color: #374151; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>BARANGAY CULIAT</h1>
          <h2>Document Request Details</h2>
          <p>Request ID: ${request._id}</p>
        </div>
        
        <div class="section">
          <p><span class="label">Document Type:</span> <span class="value">${request.documentType}</span></p>
          <p><span class="label">Purpose:</span> <span class="value">${request.purpose}</span></p>
          <p><span class="label">Status:</span> <span class="status status-${request.status}">${request.status.toUpperCase()}</span></p>
        </div>

        <div class="section">
          <h3>Applicant Information</h3>
          <p><span class="label">Name:</span> <span class="value">${request.firstName} ${request.middleName || ''} ${request.lastName}</span></p>
          <p><span class="label">Gender:</span> <span class="value">${request.gender}</span></p>
          <p><span class="label">Date of Birth:</span> <span class="value">${new Date(request.dateOfBirth).toLocaleDateString()}</span></p>
          <p><span class="label">Civil Status:</span> <span class="value">${request.civilStatus}</span></p>
          <p><span class="label">Contact:</span> <span class="value">${request.contactNumber}</span></p>
          <p><span class="label">Email:</span> <span class="value">${request.email}</span></p>
        </div>

        <div class="section">
          <h3>Address</h3>
          <p><span class="label">Street:</span> <span class="value">${request.address?.street || 'N/A'}</span></p>
          <p><span class="label">Barangay:</span> <span class="value">${request.address?.barangay || 'N/A'}</span></p>
          <p><span class="label">City:</span> <span class="value">${request.address?.city || 'N/A'}</span></p>
          <p><span class="label">Province:</span> <span class="value">${request.address?.province || 'N/A'}</span></p>
          <p><span class="label">Postal Code:</span> <span class="value">${request.address?.postalCode || 'N/A'}</span></p>
        </div>

        ${request.businessName ? `
        <div class="section">
          <h3>Business Information</h3>
          <p><span class="label">Business Name:</span> <span class="value">${request.businessName}</span></p>
          <p><span class="label">Business Address:</span> <span class="value">${request.businessAddress}</span></p>
        </div>
        ` : ''}

        <div class="section">
          <h3>Request Details</h3>
          <p><span class="label">Pickup Date:</span> <span class="value">${new Date(request.pickupDate).toLocaleDateString()}</span></p>
          <p><span class="label">Submitted:</span> <span class="value">${new Date(request.createdAt).toLocaleString()}</span></p>
          ${request.remarks ? `<p><span class="label">Remarks:</span> <span class="value">${request.remarks}</span></p>` : ''}
        </div>

        <div class="section">
          <p style="margin-top: 50px; text-align: center; font-size: 12px; color: #666;">
            This is a computer-generated document. No signature required.
          </p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  // View request details
  const viewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Filter requests
  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(r => r.status === filter);

  // Status configuration
  const statusConfig = {
    pending: {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      label: "Pending"
    },
    approved: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      label: "Approved"
    },
    rejected: {
      icon: XCircle,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      label: "Rejected"
    },
    completed: {
      icon: FileCheck,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      label: "Completed"
    },
    cancelled: {
      icon: Ban,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      label: "Cancelled"
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Document Requests
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FileText className="w-4 h-4" />
          <span>{filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}</span>
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
          All ({requests.length})
        </button>
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = requests.filter(r => r.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
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
            {filter === "all" ? "No document requests found" : `No ${filter} requests`}
          </p>
        </div>
      )}

      {/* Requests Table */}
      {!loading && filteredRequests.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Document Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRequests.map((request) => {
                  const StatusIcon = statusConfig[request.status]?.icon || AlertCircle;
                  return (
                    <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {request.firstName} {request.lastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {request.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {request.documentType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                          {request.purpose}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {new Date(request.pickupDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[request.status]?.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[request.status]?.label || request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => viewDetails(request)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => printRequest(request)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Print"
                          >
                            <Printer className="w-5 h-5" />
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

      {/* Modal for Request Details */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Request Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 space-y-6">
              {/* Status Section */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Current Status
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedRequest.status]?.color}`}>
                    {React.createElement(statusConfig[selectedRequest.status]?.icon || AlertCircle, { className: "w-4 h-4 mr-1" })}
                    {statusConfig[selectedRequest.status]?.label || selectedRequest.status}
                  </span>
                </div>
                
                {/* Status Update Buttons */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedRequest._id, status)}
                      disabled={updating || selectedRequest.status === status}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        selectedRequest.status === status
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                          : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                      }`}
                    >
                      {React.createElement(config.icon, { className: "w-4 h-4" })}
                      Mark as {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Document Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Document Type</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.documentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(selectedRequest.pickupDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Purpose</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.purpose}</p>
                  </div>
                </div>
              </div>

              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedRequest.firstName} {selectedRequest.middleName} {selectedRequest.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(selectedRequest.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Civil Status</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.civilStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contact Number</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.email}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Address
                </h3>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedRequest.address?.street}, {selectedRequest.address?.barangay}, {selectedRequest.address?.city}, {selectedRequest.address?.province} {selectedRequest.address?.postalCode}
                </p>
              </div>

              {/* Business Info (if applicable) */}
              {selectedRequest.businessName && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Business Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.businessName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Business Address</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.businessAddress}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {selectedRequest.emergencyContact && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.emergencyContact?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Relationship</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.emergencyContact?.relationship}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Contact Number</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.emergencyContact?.contactNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Remarks */}
              {selectedRequest.remarks && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Remarks
                  </h3>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.remarks}</p>
                </div>
              )}

              {/* Submitted Date */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Submitted on</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => printRequest(selectedRequest)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
