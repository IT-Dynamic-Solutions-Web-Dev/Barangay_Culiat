const BarangayIdRequest = require('../models/BarangayIdRequest');
const Logs = require('../models/Logs');
const ROLES = require('../config/roles');

const getRoleName = (code) => {
  const entry = Object.entries(ROLES).find(([k, v]) => v === code);
  return entry ? entry[0] : undefined;
};


// Helper: generate a unique Barangay ID number e.g. BID-2025-abcdef
const generateBarangayIdNumber = () => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BID-${year}-${rand}`;
};

// @desc    Create new Barangay ID request
// @route   POST /api/barangay-id-requests
// @access  Private (Resident)
exports.createBarangayIdRequest = async (req, res) => {
  try {
    // Extract and validate required flattened emergency fields if present
    const payload = { ...req.body };

    // Generate unique barangayIdNumber, retry on collision up to a few times
    let attempts = 0;
    let barangayIdNumber;
    while (attempts < 5) {
      barangayIdNumber = generateBarangayIdNumber();
      // Check uniqueness
      // eslint-disable-next-line no-await-in-loop
      const exists = await BarangayIdRequest.findOne({ barangayIdNumber });
      if (!exists) break;
      attempts += 1;
    }
    payload.barangayIdNumber = barangayIdNumber;

    const request = await BarangayIdRequest.create(payload);

    // create a log entry for this creation
    try {
      const performerId = req.user?._id;
      const performerRole = req.user ? getRoleName(req.user.role) : undefined;
      await Logs.create({
        action: 'BARANGAY_ID_REQUEST',
        description: `Barangay ID request created: ${request._id}`,
        performedBy: performerId,
        performedByRole: performerRole,
      });
    } catch (logErr) {
      console.error('Failed to create log for barangay id request create:', logErr);
    }

    res.status(201).json({
      success: true,
      data: request,
      message: 'Barangay ID request submitted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Error creating Barangay ID request',
      error: error.message,
    });
  }
};


// @desc    Get all Barangay ID requests
// @route   GET /api/barangay-id-requests
// @access  Private (Admin)
exports.getAllBarangayIdRequests = async (req, res) => {
  try {
    const requests = await BarangayIdRequest.find().sort({ requestedAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Barangay ID requests',
      error: error.message,
    });
  }
};


// @desc    Get single Barangay ID request by ID
// @route   GET /api/barangay-id-requests/:id
// @access  Private (Resident/Admin)
exports.getBarangayIdRequestById = async (req, res) => {
  try {
    const request = await BarangayIdRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Barangay ID request not found',
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Barangay ID request',
      error: error.message,
    });
  }
};


// @desc    Update Barangay ID request status
// @route   PUT /api/barangay-id-requests/:id/status
// @access  Private (Admin)
exports.updateBarangayIdStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await BarangayIdRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Barangay ID request not found',
      });
    }

    request.status = status;
    request.reviewedAt = Date.now();
    await request.save();

    // create a log entry for status update
    try {
      const performerId = req.user?._id;
      const performerRole = req.user ? getRoleName(req.user.role) : undefined;
      await Logs.create({
        action: 'BARANGAY_ID_REQUEST_STATUS_UPDATE',
        description: `Barangay ID request ${request._id} marked as ${status}`,
        performedBy: performerId,
        performedByRole: performerRole,
      });
    } catch (logErr) {
      console.error('Failed to create log for barangay id request status update:', logErr);
    }

    res.status(200).json({
      success: true,
      message: `Barangay ID request marked as ${status}`,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating Barangay ID request',
      error: error.message,
    });
  }
};


// @desc    Delete Barangay ID request
// @route   DELETE /api/barangay-id-requests/:id
// @access  Private (Admin)
exports.deleteBarangayIdRequest = async (req, res) => {
  try {
    const request = await BarangayIdRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Barangay ID request not found',
      });
    }

    // create a log entry for deletion
    try {
      const performerId = req.user?._id;
      const performerRole = req.user ? getRoleName(req.user.role) : undefined;
      await Logs.create({
        action: 'BARANGAY_ID_REQUEST_DELETE',
        description: `Barangay ID request deleted: ${request._id}`,
        performedBy: performerId,
        performedByRole: performerRole,
      });
    } catch (logErr) {
      console.error('Failed to create log for barangay id request delete:', logErr);
    }

    res.status(200).json({
      success: true,
      message: 'Barangay ID request deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting Barangay ID request',
      error: error.message,
    });
  }
};
