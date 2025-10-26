const mongoose = require("mongoose");
const DocumentRequest = require("../models/DocumentRequest");
const Picture = require("../models/Picture");
const Logs = require("../models/Logs");
const ROLES = require("../config/roles");
const { LOGCONSTANTS } = require("../config/logConstants");

// helper to map numeric role to role name
const getRoleName = (code) => {
  const entry = Object.entries(ROLES).find(([k, v]) => v === code);
  return entry ? entry[0] : "Unknown";
};

// @desc    Create a new document request
// @route   POST /api/document-requests
// @access  Private (Resident/Admin)
exports.createDocumentRequest = async (req, res) => {
  try {
    const payload = req.body || {};

    const newRequest = await DocumentRequest.create({
      applicant: req.user?._id,
      lastName: payload.lastName,
      firstName: payload.firstName,
      middleName: payload.middleName,
      dateOfBirth: payload.dateOfBirth,
      placeOfBirth: payload.placeOfBirth,
      gender: payload.gender,
      civilStatus: payload.civilStatus,
      nationality: payload.nationality,
      address: payload.address,
      contactNumber: payload.contactNumber,
      emergencyContact: payload.emergencyContact || {},
      documentType: payload.documentType,
      purposeOfRequest: payload.purposeOfRequest,
      preferredPickupDate: payload.preferredPickupDate,
      remarks: payload.remarks,
      photo1x1: payload.photo1x1,
      validID: payload.validID,
    });

    // Normalize response: populate photo fields if they are ObjectIds, otherwise wrap as { url }
    let responseObj = newRequest.toObject ? newRequest.toObject() : newRequest;
    if (responseObj.photo1x1) {
      if (mongoose.Types.ObjectId.isValid(responseObj.photo1x1)) {
        const pic = await Picture.findById(responseObj.photo1x1);
        responseObj.photo1x1 = pic || responseObj.photo1x1;
      } else {
        responseObj.photo1x1 = { url: responseObj.photo1x1 };
      }
    }
    if (responseObj.validID) {
      if (mongoose.Types.ObjectId.isValid(responseObj.validID)) {
        const pic = await Picture.findById(responseObj.validID);
        responseObj.validID = pic || responseObj.validID;
      } else {
        responseObj.validID = { url: responseObj.validID };
      }
    }

    res.status(201).json({
      success: true,
      message: "Document request created successfully",
      data: responseObj,
    });

    try {
      await Logs.create({
        action: LOGCONSTANTS.actions.records.CREATE_RECORD,
        description: `Document request created: ${newRequest._id}`,
        performedBy: req.user?._id,
        performedByRole: getRoleName(req.user?.role),
      });
    } catch (logErr) {
      console.error(
        "Failed to create log for document request create:",
        logErr
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating document request",
      error: error.message,
    });
  }
};

// @desc    Get all document requests (admin)
// @route   GET /api/document-requests
// @access  Private (Admin)
exports.getAllDocumentRequests = async (req, res) => {
  try {
    const { status, documentType, applicant } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (documentType) filter.documentType = documentType;
    if (applicant) filter.applicant = applicant;

    const requests = await DocumentRequest.find(filter)
      .populate("applicant", "firstName lastName email")
      .sort({ createdAt: -1 });

    const normalized = await Promise.all(
      requests.map(async (r) => {
        const obj = r.toObject ? r.toObject() : r;
        if (obj.photo1x1) {
          if (mongoose.Types.ObjectId.isValid(obj.photo1x1)) {
            const pic = await Picture.findById(obj.photo1x1);
            obj.photo1x1 = pic || obj.photo1x1;
          } else {
            obj.photo1x1 = { url: obj.photo1x1 };
          }
        }
        if (obj.validID) {
          if (mongoose.Types.ObjectId.isValid(obj.validID)) {
            const pic = await Picture.findById(obj.validID);
            obj.validID = pic || obj.validID;
          } else {
            obj.validID = { url: obj.validID };
          }
        }
        return obj;
      })
    );

    res
      .status(200)
      .json({ success: true, count: normalized.length, data: normalized });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching document requests",
      error: error.message,
    });
  }
};

// @desc    Get current user's document requests
// @route   GET /api/document-requests/my-requests
// @access  Private (Resident)
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await DocumentRequest.find({
      applicant: req.user._id,
    }).sort({ createdAt: -1 });

    const normalized = await Promise.all(
      requests.map(async (r) => {
        const obj = r.toObject ? r.toObject() : r;
        if (obj.photo1x1) {
          if (mongoose.Types.ObjectId.isValid(obj.photo1x1)) {
            const pic = await Picture.findById(obj.photo1x1);
            obj.photo1x1 = pic || obj.photo1x1;
          } else {
            obj.photo1x1 = { url: obj.photo1x1 };
          }
        }
        if (obj.validID) {
          if (mongoose.Types.ObjectId.isValid(obj.validID)) {
            const pic = await Picture.findById(obj.validID);
            obj.validID = pic || obj.validID;
          } else {
            obj.validID = { url: obj.validID };
          }
        }
        return obj;
      })
    );

    res
      .status(200)
      .json({ success: true, count: normalized.length, data: normalized });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your document requests",
      error: error.message,
    });
  }
};

// @desc    Get single document request
// @route   GET /api/document-requests/:id
// @access  Private
exports.getDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id).populate(
      "applicant",
      "firstName lastName email"
    );

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Document request not found" });
    }

    // Authorization: allow admin or owner
    if (
      request.applicant &&
      req.user &&
      request.applicant._id.toString() !== req.user._id.toString() &&
      req.user.role !== ROLES.Admin &&
      req.user.role !== ROLES.SuperAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this request",
      });
    }

    const obj = request.toObject ? request.toObject() : request;
    if (obj.photo1x1) {
      if (mongoose.Types.ObjectId.isValid(obj.photo1x1)) {
        const pic = await Picture.findById(obj.photo1x1);
        obj.photo1x1 = pic || obj.photo1x1;
      } else {
        obj.photo1x1 = { url: obj.photo1x1 };
      }
    }
    if (obj.validID) {
      if (mongoose.Types.ObjectId.isValid(obj.validID)) {
        const pic = await Picture.findById(obj.validID);
        obj.validID = pic || obj.validID;
      } else {
        obj.validID = { url: obj.validID };
      }
    }

    res.status(200).json({ success: true, data: obj });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching document request",
      error: error.message,
    });
  }
};

// @desc    Update document request (applicant/updatable fields)
// @route   PUT /api/document-requests/:id
// @access  Private
exports.updateDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Document request not found" });
    }

    // Only owner or admin can update
    if (
      request.applicant &&
      req.user &&
      request.applicant.toString() !== req.user._id.toString() &&
      req.user.role !== ROLES.Admin &&
      req.user.role !== ROLES.SuperAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this request",
      });
    }

    const updatable = [
      "lastName",
      "firstName",
      "middleName",
      "dateOfBirth",
      "placeOfBirth",
      "gender",
      "civilStatus",
      "nationality",
      "address",
      "contactNumber",
      "emergencyContact",
      "purposeOfRequest",
      "preferredPickupDate",
      "remarks",
      "photo1x1",
      "validID",
    ];
    updatable.forEach((field) => {
      if (req.body[field] !== undefined) {
        request[field] = req.body[field];
      }
    });

    await request.save();

    res.status(200).json({
      success: true,
      message: "Document request updated successfully",
      data: request,
    });

    try {
      await Logs.create({
        action: LOGCONSTANTS.actions.records.UPDATE_RECORD,
        description: `Document request updated: ${request._id}`,
        performedBy: req.user?._id,
        performedByRole: getRoleName(req.user?.role),
      });
    } catch (logErr) {
      console.error(
        "Failed to create log for document request update:",
        logErr
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating document request",
      error: error.message,
    });
  }
};

// @desc    Update request status (admin)
// @route   PUT /api/document-requests/:id/status
// @access  Private (Admin)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Document request not found" });
    }

    request.status = status;
    request.processedBy = req.user?._id;
    request.processedAt = new Date();

    await request.save();

    res.status(200).json({
      success: true,
      message: "Document request status updated",
      data: request,
    });

    try {
      await Logs.create({
        action: LOGCONSTANTS.actions.records.UPDATE_RECORD,
        description: `Document request status updated: ${request._id} to ${status}`,
        performedBy: req.user?._id,
        performedByRole: getRoleName(req.user?.role),
      });
    } catch (logErr) {
      console.error(
        "Failed to create log for document request status update:",
        logErr
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating request status",
      error: error.message,
    });
  }
};

// @desc    Delete document request
// @route   DELETE /api/document-requests/:id
// @access  Private (Admin or owner)
exports.deleteDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findById(req.params.id);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Document request not found" });
    }

    // Only owner or admin can delete
    if (
      request.applicant &&
      req.user &&
      request.applicant.toString() !== req.user._id.toString() &&
      req.user.role !== ROLES.Admin &&
      req.user.role !== ROLES.SuperAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this request",
      });
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document request deleted successfully",
    });

    try {
      await Logs.create({
        action: LOGCONSTANTS.actions.records.DELETE_RECORD || "DELETE RECORD",
        description: `Document request deleted: ${request._id}`,
        performedBy: req.user?._id,
        performedByRole: getRoleName(req.user?.role),
      });
    } catch (logErr) {
      console.error(
        "Failed to create log for document request delete:",
        logErr
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting document request",
      error: error.message,
    });
  }
};

// @desc    Upload a file and create a Picture record (local filesystem)
// @route   POST /api/document-requests/upload
// @access  Private
exports.uploadPicture = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // create Picture document
    const pic = await Picture.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/document-requests/${req.file.filename}`,
      uploadedBy: req.user?._id,
      isDocument: true,
    });

    res.status(201).json({ success: true, data: pic });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
};
