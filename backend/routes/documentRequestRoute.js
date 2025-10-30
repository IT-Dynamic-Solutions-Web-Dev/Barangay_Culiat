const express = require('express');
const router = express.Router();
const {
  createDocumentRequest,
  getAllDocumentRequests,
  getMyRequests,
  getDocumentRequest,
  updateDocumentRequest,
  updateRequestStatus,
  deleteDocumentRequest,
} = require('../controllers/documentRequestController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

router.post('/', protect, createDocumentRequest);
router.get('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllDocumentRequests);
router.get('/my-requests', protect, getMyRequests);
router.get('/:id', protect, getDocumentRequest);
router.put('/:id', protect, updateDocumentRequest);
router.put('/:id/status', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateRequestStatus);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteDocumentRequest);

module.exports = router;
