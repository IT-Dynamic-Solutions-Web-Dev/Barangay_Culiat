const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, changePassword, adminRegister, residentRegister, getPendingRegistrations, approveRegistration, rejectRegistration, getAllUsers } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const ROLES = require('../config/roles');
const upload = require('../middleware/fileUpload');

router.post('/register', upload.fields([{ name: 'validID', maxCount: 1 }]), register);
router.post('/resident-register', upload.single('proofOfResidency'), residentRegister);
router.post('/login', login);
router.post('/adminRegister', adminRegister);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Admin routes for managing users
router.get('/users', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getAllUsers);
router.get('/pending-registrations', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), getPendingRegistrations);
router.post('/approve-registration/:userId', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), approveRegistration);
router.post('/reject-registration/:userId', protect, authorize(ROLES.SuperAdmin, ROLES.Admin), rejectRegistration);

module.exports = router;
