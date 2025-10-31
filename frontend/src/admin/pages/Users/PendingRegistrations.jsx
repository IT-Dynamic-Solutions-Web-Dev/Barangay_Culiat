import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, Calendar, Mail, Phone, MapPin, User, AlertCircle, RefreshCw } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function PendingRegistrations() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'
  const [rejectionReason, setRejectionReason] = useState("");
  const [alert, setAlert] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const fetchPendingRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/auth/pending-registrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPendingUsers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
      setPendingUsers([]); // Set to empty array on error
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to fetch pending registrations",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setActionType(null);
    setRejectionReason("");
  };

  const handleApprove = async () => {
    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/auth/approve-registration/${selectedUser._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAlert({
          type: "success",
          message: `Successfully approved registration for ${selectedUser.firstName} ${selectedUser.lastName}`,
        });
        setShowModal(false);
        setSelectedUser(null);
        fetchPendingRegistrations();
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to approve registration",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setAlert({
        type: "error",
        message: "Please provide a reason for rejection",
      });
      return;
    }

    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/auth/reject-registration/${selectedUser._id}`,
        { reason: rejectionReason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAlert({
          type: "success",
          message: `Registration rejected for ${selectedUser.firstName} ${selectedUser.lastName}`,
        });
        setShowModal(false);
        setSelectedUser(null);
        setRejectionReason("");
        fetchPendingRegistrations();
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to reject registration",
      });
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Pending Registrations</h2>
            <p className="mt-1 text-sm text-gray-600">
              Review and approve resident registration requests
            </p>
          </div>
          <button
            onClick={fetchPendingRegistrations}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {alert && (
        <div className="mb-6">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading pending registrations...</p>
          </div>
        </div>
      ) : !pendingUsers || pendingUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Registrations</h3>
          <p className="text-gray-600">There are currently no pending resident registration requests.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pendingUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{user.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(user)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details & Decide
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showModal && selectedUser && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
            setActionType(null);
            setRejectionReason("");
          }}
          title="Registration Details"
          size="large"
        >
          <div className="space-y-6">
            {/* User Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Username</label>
                  <p className="text-gray-900">@{selectedUser.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  <p className="text-gray-900">{selectedUser.phoneNumber}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-900">{selectedUser.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Registered On</label>
                  <p className="text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Proof of Residency */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Proof of Residency</h4>
              {selectedUser.proofOfResidency ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`${API_URL.replace("/api", "")}/${selectedUser.proofOfResidency}`}
                    alt="Proof of Residency"
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <p className="text-gray-500 italic">No proof uploaded</p>
              )}
            </div>

            {/* Action Buttons or Rejection Form */}
            {actionType === null && (
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setActionType("approve")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Registration
                </button>
                <button
                  onClick={() => setActionType("reject")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Registration
                </button>
              </div>
            )}

            {actionType === "approve" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-900 mb-4">
                  Are you sure you want to approve this registration? The resident will be able to log in immediately.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {processing ? "Processing..." : "Confirm Approval"}
                  </button>
                  <button
                    onClick={() => setActionType(null)}
                    disabled={processing}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {actionType === "reject" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Please provide a clear reason for rejecting this registration..."
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleReject}
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {processing ? "Processing..." : "Confirm Rejection"}
                  </button>
                  <button
                    onClick={() => setActionType(null)}
                    disabled={processing}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
