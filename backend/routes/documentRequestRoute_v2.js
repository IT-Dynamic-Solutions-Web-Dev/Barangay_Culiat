const express = require('express');
const router = express.Router();
const {
  createDocumentRequest,
  uploadFile,
  getAllDocumentRequests,
  getMyRequests,
  getDocumentRequest,
  updateDocumentRequest,
  updateRequestStatus,
  deleteDocumentRequest,
  checkRequiredDocuments,
  syncWithUser,
  getStatistics
} = require('../controllers/documentRequestController_v2');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');
const upload = require('../middleware/fileUpload');

// Statistics (Admin only)
router.get('/stats', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getStatistics);

// File upload
router.post('/upload', protect, upload.single('file'), uploadFile);

// My requests (current user)
router.get('/my-requests', protect, getMyRequests);

// Create document request (auto-fills from user profile)
router.post('/', protect, createDocumentRequest);

// Get all requests (Admin only)
router.get('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllDocumentRequests);

// Get, update, delete specific request
router.get('/:id', protect, getDocumentRequest);
router.put('/:id', protect, updateDocumentRequest);
router.delete('/:id', protect, deleteDocumentRequest);

// Status update (Admin only)
router.patch('/:id/status', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateRequestStatus);

// Check required documents
router.get('/:id/check-documents', protect, checkRequiredDocuments);

// Sync with user profile
router.post('/:id/sync', protect, syncWithUser);

module.exports = router;
