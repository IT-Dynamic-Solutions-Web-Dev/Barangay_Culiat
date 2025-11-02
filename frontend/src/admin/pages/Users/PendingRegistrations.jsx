import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, Calendar, Mail, Phone, MapPin, User, AlertCircle, RefreshCw } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
      console.log('Fetching pending registrations from:', `${API_URL}/api/auth/pending-registrations`);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/auth/pending-registrations`, {
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
        `${API_URL}/api/auth/approve-registration/${selectedUser._id}`,
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
        `${API_URL}/api/auth/reject-registration/${selectedUser._id}`,
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Pending Registrations</h3>
          <p className="text-gray-600 dark:text-gray-400">There are currently no pending resident registration requests.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pendingUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {user.address?.houseNumber} {user.address?.street} {user.address?.subdivision}, Brgy. Culiat, Quezon City
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(user)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
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
          title={`${selectedUser.firstName} ${selectedUser.lastName}`}
          size="3xl"
        >
          <div className="space-y-2.5 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Account Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2.5">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1.5 text-xs">Account Credentials</h4>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-blue-700 dark:text-blue-300 font-medium text-[10px]">Username</label>
                  <p className="text-blue-900 dark:text-blue-100">@{selectedUser.username}</p>
                </div>
                <div>
                  <label className="text-blue-700 dark:text-blue-300 font-medium text-[10px]">Email</label>
                  <p className="text-blue-900 dark:text-blue-100">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-xs">Personal Information</h4>
              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div className="col-span-3">
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Full Name</label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}{selectedUser.suffix ? ` ${selectedUser.suffix}` : ''}
                  </p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Date of Birth</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Gender</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedUser.gender || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Civil Status</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedUser.civilStatus || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Phone</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedUser.phoneNumber}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Occupation</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedUser.occupation || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Religion</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedUser.religion || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-xs">Address</h4>
              <div className="text-xs">
                <p className="text-gray-900 dark:text-gray-100">
                  {selectedUser.address?.houseNumber} {selectedUser.address?.street} {selectedUser.address?.subdivision}, Barangay Culiat, Quezon City
                </p>
              </div>
            </div>

            {/* Spouse Information (if married) */}
            {selectedUser.spouseInfo && selectedUser.spouseInfo.name && (
              <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-2.5">
                <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-1.5 text-xs">Spouse Information</h4>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <label className="text-pink-700 dark:text-pink-300 font-medium text-[10px]">Name</label>
                    <p className="text-pink-900 dark:text-pink-100">{selectedUser.spouseInfo.name}</p>
                  </div>
                  <div>
                    <label className="text-pink-700 dark:text-pink-300 font-medium text-[10px]">Occupation</label>
                    <p className="text-pink-900 dark:text-pink-100">{selectedUser.spouseInfo.occupation || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-pink-700 dark:text-pink-300 font-medium text-[10px]">Contact</label>
                    <p className="text-pink-900 dark:text-pink-100">{selectedUser.spouseInfo.contactNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {selectedUser.emergencyContact && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2.5">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-1.5 text-xs">Emergency Contact</h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-orange-700 dark:text-orange-300 font-medium text-[10px]">Name</label>
                    <p className="text-orange-900 dark:text-orange-100">{selectedUser.emergencyContact.fullName}</p>
                  </div>
                  <div>
                    <label className="text-orange-700 dark:text-orange-300 font-medium text-[10px]">Relationship</label>
                    <p className="text-orange-900 dark:text-orange-100">{selectedUser.emergencyContact.relationship || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-orange-700 dark:text-orange-300 font-medium text-[10px]">Contact</label>
                    <p className="text-orange-900 dark:text-orange-100">{selectedUser.emergencyContact.contactNumber}</p>
                  </div>
                  <div>
                    <label className="text-orange-700 dark:text-orange-300 font-medium text-[10px]">Address</label>
                    <p className="text-orange-900 dark:text-orange-100">
                      {selectedUser.emergencyContact.address?.houseNumber} {selectedUser.emergencyContact.address?.street} {selectedUser.emergencyContact.address?.subdivision}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information */}
            {(selectedUser.tinNumber || selectedUser.sssGsisNumber || selectedUser.precinctNumber) && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-xs">Additional Information</h4>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {selectedUser.tinNumber && (
                    <div>
                      <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">TIN</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedUser.tinNumber}</p>
                    </div>
                  )}
                  {selectedUser.sssGsisNumber && (
                    <div>
                      <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">SSS/GSIS</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedUser.sssGsisNumber}</p>
                    </div>
                  )}
                  {selectedUser.precinctNumber && (
                    <div>
                      <label className="text-gray-600 dark:text-gray-400 font-medium text-[10px]">Precinct</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedUser.precinctNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Valid ID / Proof of Residency */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-xs">
                {selectedUser.validID ? 'Valid ID' : 'Proof of Residency'}
              </h4>
              {(selectedUser.validID?.url || selectedUser.proofOfResidency) ? (
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <img
                    src={
                      selectedUser.validID?.url 
                        ? `${API_URL}${selectedUser.validID.url}` 
                        : `${API_URL}/${selectedUser.proofOfResidency}`
                    }
                    alt={selectedUser.validID ? "Valid ID" : "Proof of Residency"}
                    className="w-full h-auto max-h-48 object-contain bg-white dark:bg-gray-800"
                  />
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-xs">No ID/proof uploaded</p>
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
