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
const ROLES = require('../config/roles');

router.post('/', protect, createReport);
router.get('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllReports);
router.get('/my-reports', protect, getMyReports);
router.get('/:id', protect, getReport);
router.put('/:id/status', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), updateReportStatus);
router.post('/:id/comments', protect, addComment);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteReport);

module.exports = router;
