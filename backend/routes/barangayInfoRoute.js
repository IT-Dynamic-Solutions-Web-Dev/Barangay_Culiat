const express = require('express');
const router = express.Router();
const {
  getBarangayInfo,
  createBarangayInfo,
  updateBarangayInfo,
  updateDemographics,
  updateContactInfo,
  updateAddress,
  updateSocialMedia,
  deleteBarangayInfo,
} = require('../controllers/barangayInfoController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

// Public routes
router.get('/', getBarangayInfo);

// Admin routes
router.post('/', protect, authorize(ROLES.SuperAdmin), createBarangayInfo);
router.put('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateBarangayInfo);
router.put('/demographics', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateDemographics);
router.put('/contact', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateContactInfo);
router.put('/address', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateAddress);
router.put('/social-media', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateSocialMedia);
router.delete('/', protect, authorize(ROLES.SuperAdmin), deleteBarangayInfo);

module.exports = router;
