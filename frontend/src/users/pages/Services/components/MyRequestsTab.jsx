import React, { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Package } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    label: "Pending"
  },
  approved: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "Approved"
  },
  rejected: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Rejected"
  },
  completed: {
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "Completed"
  },
  cancelled: {
    icon: AlertCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    label: "Cancelled"
  }
};

const documentTypeLabels = {
  indigency: "Certificate of Indigency",
  residency: "Certificate of Residency",
  clearance: "Barangay Clearance",
  ctc: "Community Tax Certificate",
  business_permit: "Business Permit",
  building_permit: "Building Permit",
  good_moral: "Certificate of Good Moral",
  business_clearance: "Business Clearance"
};

export default function MyRequestsTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/document-requests/my-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setRequests(response.data.data || []);
      setError("");
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load your requests');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/payments/create-link`, {
        requestId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success && response.data.paymentLink) {
        window.open(response.data.paymentLink, '_blank');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to create payment link: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Yet</h3>
        <p className="text-gray-600">You haven't submitted any document requests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium">My Document Requests</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Track the status of your submitted document requests
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => {
          const status = statusConfig[request.status] || statusConfig.pending;
          const StatusIcon = status.icon;

          return (
            <div
              key={request._id}
              className={`border-2 ${status.borderColor} ${status.bgColor} rounded-lg p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${status.bgColor}`}>
                    <FileText className={`h-5 w-5 ${status.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {documentTypeLabels[request.documentType] || request.documentType}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submitted on {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bgColor} border ${status.borderColor}`}>
                  <StatusIcon className={`h-4 w-4 ${status.color}`} />
                  <span className={`text-sm font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Purpose</p>
                  <p className="font-medium text-gray-900">{request.purposeOfRequest || 'N/A'}</p>
                </div>
                {request.preferredPickupDate && (
                  <div>
                    <p className="text-gray-600">Preferred Pickup</p>
                    <p className="font-medium text-gray-900">{formatDate(request.preferredPickupDate)}</p>
                  </div>
                )}
                {request.processedAt && (
                  <div>
                    <p className="text-gray-600">Processed On</p>
                    <p className="font-medium text-gray-900">{formatDate(request.processedAt)}</p>
                  </div>
                )}
                {request.remarks && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Remarks</p>
                    <p className="font-medium text-gray-900">{request.remarks}</p>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              {request.paymentStatus === 'unpaid' && (request.fees > 0 || true) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center gap-4">
                    <div className="text-sm text-gray-600">
                      Payment Status: <span className="font-semibold text-yellow-600">Unpaid</span>
                    </div>
                    <button
                      onClick={() => handlePayment(request._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Pay Now (₱{request.fees || 50})
                    </button>
                  </div>
                )}
                {request.paymentStatus === 'paid' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center">
                     <div className="text-sm text-gray-600">
                      Payment Status: <span className="font-semibold text-green-600">Paid</span>
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
