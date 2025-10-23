const express = require('express');
const router = express.Router();
const {
  createBarangayIdRequest,
  getAllBarangayIdRequests,
  getBarangayIdRequestById,
  updateBarangayIdStatus,
  deleteBarangayIdRequest,
} = require('../controllers/barangayIdRequestController');

const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

// Residents can submit requests
router.post('/', protect, createBarangayIdRequest);

// Admin-only routes
router.get('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllBarangayIdRequests);
router.get('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getBarangayIdRequestById);
router.put('/:id/status', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateBarangayIdStatus);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteBarangayIdRequest);

module.exports = router;
