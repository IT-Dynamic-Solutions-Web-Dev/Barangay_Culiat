const express = require("express");
const router = express.Router();
const termsController = require("../controllers/termsController");
const { protect, isAdmin } = require("../middleware/auth");

// All routes require authentication
router.use(protect);

// User routes
router.post("/accept", termsController.acceptTerms);
router.get("/status", termsController.getAcceptanceStatus);
router.get("/history", termsController.getAcceptanceHistory);

// Admin routes
router.get("/all-acceptances", isAdmin, termsController.getAllAcceptances);
router.get("/signature/:acceptanceId", isAdmin, termsController.getSignature);

module.exports = router;
