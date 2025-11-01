const express = require('express');
const router = express.Router();
const {
  getAllFAQs,
  getPublishedFAQs,
  getFAQsByCategory,
  getFAQ,
  createFAQ,
  updateFAQ,
  togglePublish,
  markHelpful,
  markNotHelpful,
  reorderFAQs,
  deleteFAQ,
  getFAQStats,
} = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

// Public routes
router.get('/', getPublishedFAQs);
router.get('/category/:category', getFAQsByCategory);
router.get('/:id', getFAQ);
router.put('/:id/helpful', markHelpful);
router.put('/:id/not-helpful', markNotHelpful);

// Admin routes
router.get('/all/list', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllFAQs);
router.post('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), createFAQ);
router.put('/reorder', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), reorderFAQs);
router.put('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateFAQ);
router.put('/:id/publish', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), togglePublish);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteFAQ);
router.get('/stats/all', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getFAQStats);

module.exports = router;
