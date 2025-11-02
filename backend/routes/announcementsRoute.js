const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
  getPublishedAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  togglePublish,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

router.post('/', protect, authorize(ROLES.SuperAdmin), createAnnouncement);
router.get('/all', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllAnnouncements);
router.get('/', getPublishedAnnouncements); // Public - no auth needed
router.get('/:id', getAnnouncement); // Public - no auth needed
router.put('/:id', protect, authorize(ROLES.Admin, ROLES.SuperAdmin), updateAnnouncement);
router.put('/:id/publish', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), togglePublish);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteAnnouncement);

module.exports = router;
