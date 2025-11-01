const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getActiveServices,
  getServicesByCategory,
  getService,
  createService,
  updateService,
  toggleActive,
  reorderServices,
  deleteService,
  getServicesStats,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

// Public routes
router.get('/', getAllServices);
router.get('/active', getActiveServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getService);

// Admin routes
router.post('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), createService);
router.put('/reorder', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), reorderServices);
router.put('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateService);
router.put('/:id/toggle-active', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), toggleActive);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteService);
router.get('/stats/all', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getServicesStats);

module.exports = router;
