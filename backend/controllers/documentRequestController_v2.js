const DocumentRequest = require("../models/DocumentRequest");
const User = require("../models/User");
const { LOGCONSTANTS } = require("../config/logConstants");
const { logAction } = require('../utils/logHelper');
const ROLES = require('../config/roles');
const path = require('path');

// @desc    Create a new document request with auto-filled user data
// @route   POST /api/document-requests/v2
// @access  Private (Resident)
exports.createDocumentRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Validate required fields
    if (!req.body.documentType) {
      return res.status(400).json({
        success: false,
        message: "Document type is required"
      });
    }

    // Get user data for auto-fill
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Use the static method to create with auto-filled data
    const newRequest = await DocumentRequest.createFromUser(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Document request created successfully",
      data: newRequest,
    });

    await logAction(
      LOGCONSTANTS.actions.records.CREATE_RECORD,
      `Document request created: ${newRequest._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating document request",
      error: error.message,
    });
  }
};

// @desc    Upload file for document request
// @route   POST /api/document-requests/v2/upload
// @access  Private
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Validate file using the model's static method
    const validation = DocumentRequest.validateFile(req.file);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "File validation failed",
        errors: validation.errors
      });
    }

    // Create file upload object
    const fileUrl = `/uploads/proofs/${req.file.filename}`;
    const fileData = DocumentRequest.createFileUploadObject(req.file, fileUrl);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: fileData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
};

// @desc    Get all document requests (admin)
// @route   GET /api/document-requests/v2
// @access  Private (Admin)
exports.getAllDocumentRequests = async (req, res) => {
  try {
    const { status, documentType, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (documentType) filter.documentType = documentType;

    const skip = (page - 1) * limit;

    const requests = await DocumentRequest.find(filter)
      .populate("applicant", "firstName lastName email phoneNumber")
      .populate("processedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await DocumentRequest.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: requests.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching document requests",
      error: error.message,
    });
  }
};

// @desc    Get current user's document requests
// @route   GET /api/document-requests/v2/my-requests
// @access  Private (Resident)
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await DocumentRequest.find({
      applicant: req.user._id,
    })
    .populate("processedBy", "firstName lastName")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your document requests",
      error: error.message,
    });
  }
};

// @desc    Get single document request by ID
// @route   GET /api/document-requests/v2/:id
// @access  Private
exports.getDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id)
      .populate("applicant", "firstName lastName email phoneNumber address")
      .populate("processedBy", "firstName lastName");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Document request not found"
      });
    }

    // Authorization: allow admin or owner
    const isOwner = request.applicant && request.applicant._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === ROLES.Admin || req.user.role === ROLES.SuperAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this request"
      });
    }

    // Get files summary
    const filesSummary = request.getFilesSummary();

    res.status(200).json({
      success: true,
      data: request,
      filesSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching document request",
      error: error.message,
    });
  }
};

// @desc    Update document request
// @route   PUT /api/document-requests/v2/:id
// @access  Private
exports.updateDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Document request not found"
      });
    }

    // Only owner can update (and only if not yet approved/completed)
    const isOwner = request.applicant.toString() === req.user._id.toString();
    
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this request"
      });
    }

    // Prevent updates if already processed
    if (['approved', 'completed', 'rejected'].includes(request.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot update request with status: ${request.status}`
      });
    }

    // Updatable fields
    const updatableFields = [
      'middleName',
      'dateOfBirth',
      'placeOfBirth',
      'gender',
      'civilStatus',
      'nationality',
      'emergencyContact',
      'businessName',
      'businessAddress',
      'applicationType',
      'ownerRepresentative',
      'ownerContactNumber',
      'representativeContactNumber',
      'purposeOfRequest',
      'preferredPickupDate',
      'remarks',
      'photo1x1',
      'validID',
      'supportingDocuments'
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        request[field] = req.body[field];
      }
    });

    // Update address if provided (only user-specific fields)
    if (req.body.address) {
      if (req.body.address.subdivision !== undefined) {
        request.address.subdivision = req.body.address.subdivision;
      }
      if (req.body.address.street !== undefined) {
        request.address.street = req.body.address.street;
      }
      if (req.body.address.houseNumber !== undefined) {
        request.address.houseNumber = req.body.address.houseNumber;
      }
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: "Document request updated successfully",
      data: request,
    });

    await logAction(
      LOGCONSTANTS.actions.records.UPDATE_RECORD,
      `Document request updated: ${request._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating document request",
      error: error.message,
    });
  }
};

// @desc    Update request status (admin only)
// @route   PATCH /api/document-requests/v2/:id/status
// @access  Private (Admin)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Document request not found"
      });
    }

    // Validate status transition
    const validStatuses = ['pending', 'approved', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    request.status = status;
    request.processedBy = req.user._id;
    request.processedAt = new Date();

    await request.save();

    res.status(200).json({
      success: true,
      message: `Request status updated to ${status}`,
      data: request,
    });

    await logAction(
      LOGCONSTANTS.actions.records.UPDATE_RECORD,
      `Document request ${request._id} status changed to ${status}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating request status",
      error: error.message,
    });
  }
};

// @desc    Delete document request
// @route   DELETE /api/document-requests/v2/:id
// @access  Private (Admin or owner if pending)
exports.deleteDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Document request not found"
      });
    }

    const isOwner = request.applicant.toString() === req.user._id.toString();
    const isAdmin = req.user.role === ROLES.Admin || req.user.role === ROLES.SuperAdmin;

    // Owner can only delete pending requests
    if (isOwner && request.status !== 'pending') {
      return res.status(403).json({
        success: false,
        message: "Cannot delete request that is not pending"
      });
    }

    // Must be owner or admin
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this request"
      });
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document request deleted successfully"
    });

    await logAction(
      LOGCONSTANTS.actions.records.DELETE_RECORD || "DELETE_RECORD",
      `Document request deleted: ${request._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting document request",
      error: error.message,
    });
  }
};

// @desc    Check if user has required documents uploaded
// @route   GET /api/document-requests/v2/:id/check-documents
// @access  Private
exports.checkRequiredDocuments = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Document request not found"
      });
    }

    const hasRequired = request.hasRequiredDocuments();
    const filesSummary = request.getFilesSummary();

    res.status(200).json({
      success: true,
      hasRequiredDocuments: hasRequired,
      filesSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking documents",
      error: error.message,
    });
  }
};

// @desc    Sync document request with user profile
// @route   POST /api/document-requests/v2/:id/sync
// @access  Private
exports.syncWithUser = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Document request not found"
      });
    }

    // Only owner can sync
    const isOwner = request.applicant.toString() === req.user._id.toString();
    
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to sync this request"
      });
    }

    await request.syncWithUser();

    res.status(200).json({
      success: true,
      message: "Request synced with user profile",
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error syncing request",
      error: error.message,
    });
  }
};

// @desc    Get statistics (admin only)
// @route   GET /api/document-requests/v2/stats
// @access  Private (Admin)
exports.getStatistics = async (req, res) => {
  try {
    const stats = await DocumentRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const typeStats = await DocumentRequest.aggregate([
      {
        $group: {
          _id: '$documentType',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await DocumentRequest.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats,
        byType: typeStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
