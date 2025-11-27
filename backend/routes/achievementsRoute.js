const express = require('express');
const router = express.Router();
const {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/fileUpload');
const ROLES = require('../config/roles');

router.get('/', getAchievements);
router.get('/:id', getAchievement);

router.post('/', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), upload.single('achievementImage'), createAchievement);
router.put('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), upload.single('achievementImage'), updateAchievement);
router.delete('/:id', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), deleteAchievement);

module.exports = router;
