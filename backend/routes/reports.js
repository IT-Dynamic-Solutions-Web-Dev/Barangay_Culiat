const express = require('express');
const router = express.Router();
const {
  createReport,
  getAllReports,
  getMyReports,
  getReport,
  updateReportStatus,
  addComment,
  deleteReport,
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createReport);
router.get('/', protect, authorize('admin'), getAllReports);
router.get('/my-reports', protect, getMyReports);
router.get('/:id', protect, getReport);
router.put('/:id/status', protect, authorize('admin'), updateReportStatus);
router.post('/:id/comments', protect, addComment);
router.delete('/:id', protect, authorize('admin'), deleteReport);

module.exports = router;
