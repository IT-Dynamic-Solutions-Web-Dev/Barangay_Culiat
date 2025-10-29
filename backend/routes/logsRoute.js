const express = require('express');
const router = express.Router();
const {
  getAllLogs,
  createLog,
  getLogById,
  deleteLog,
} = require('../controllers/logsController');

const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');

// Admin and SuperAdmin only
router.get('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllLogs);
router.post('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), createLog);
router.get('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getLogById);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteLog);

module.exports = router;
