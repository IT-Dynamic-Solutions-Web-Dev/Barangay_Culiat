const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings,
  updateSiteInfo,
  updateContactInfo,
  updateSocialMedia,
  updateTheme,
  resetSettings,
} = require("../controllers/settingsController");
const { protect, authorize } = require("../middleware/auth");

// Public route - get public settings
router.get("/", getSettings);

// Protected routes - Admin only
router.put("/", protect, authorize("Admin", "SuperAdmin"), updateSettings);
router.put("/site-info", protect, authorize("Admin", "SuperAdmin"), updateSiteInfo);
router.put("/contact-info", protect, authorize("Admin", "SuperAdmin"), updateContactInfo);
router.put("/social-media", protect, authorize("Admin", "SuperAdmin"), updateSocialMedia);
router.put("/theme", protect, authorize("Admin", "SuperAdmin"), updateTheme);

// SuperAdmin only
router.post("/reset", protect, authorize("SuperAdmin"), resetSettings);

module.exports = router;
