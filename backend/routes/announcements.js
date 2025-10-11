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

router.post('/', protect, authorize('admin'), createAnnouncement);
router.get('/all', protect, authorize('admin'), getAllAnnouncements);
router.get('/', getPublishedAnnouncements);
router.get('/:id', protect, getAnnouncement);
router.put('/:id', protect, authorize('admin'), updateAnnouncement);
router.put('/:id/publish', protect, authorize('admin'), togglePublish);
router.delete('/:id', protect, authorize('admin'), deleteAnnouncement);

module.exports = router;
