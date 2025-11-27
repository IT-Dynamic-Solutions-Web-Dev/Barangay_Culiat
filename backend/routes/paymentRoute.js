const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Create a payment link
router.post('/create-link', protect, paymentController.createPaymentLink);

// Webhook endpoint (usually doesn't need auth middleware as it comes from PayMongo)
router.post('/webhook', paymentController.webhook);

module.exports = router;
