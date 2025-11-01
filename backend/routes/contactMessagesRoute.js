const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getAllContactMessages,
  getMessagesByStatus,
  getContactMessage,
  updateStatus,
  updatePriority,
  assignMessage,
  addResponse,
  addInternalNote,
  markAsSpam,
  toggleArchive,
  deleteContactMessage,
  getMessagesStats,
} = require('../controllers/contactMessageController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

// Public routes
router.post('/', submitContactMessage); // Can be used by logged in or anonymous users

// Admin routes
router.get('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllContactMessages);
router.get('/status/:status', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getMessagesByStatus);
router.get('/stats/all', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getMessagesStats);
router.get('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getContactMessage);
router.put('/:id/status', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateStatus);
router.put('/:id/priority', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updatePriority);
router.put('/:id/assign', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), assignMessage);
router.post('/:id/response', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), addResponse);
router.post('/:id/note', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), addInternalNote);
router.put('/:id/spam', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), markAsSpam);
router.put('/:id/archive', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), toggleArchive);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteContactMessage);

module.exports = router;
