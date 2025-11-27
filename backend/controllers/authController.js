const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { LOGCONSTANTS } = require('../config/logConstants');
const { getRoleName } = require('../utils/roleHelpers');
const { logAction} = require('../utils/logHelper');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log('=== REGISTRATION REQUEST RECEIVED ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Files:', req.files);
    
    const {
      // Account credentials
      username,
      email,
      password,
      // Personal information
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      placeOfBirth,
      gender,
      civilStatus,
      nationality,
      phoneNumber,
      // Additional information
      tinNumber,
      sssGsisNumber,
      precinctNumber,
      religion,
      heightWeight,
      colorOfHairEyes,
      occupation,
      // Address (nested object)
      address,
      // Spouse info (nested object)
      spouseInfo,
      // Emergency contact (nested object)
      emergencyContact,
    } = req.body;

    console.log('Extracted data:', {
      username,
      email,
      firstName,
      lastName,
      address,
      emergencyContact
    });

    // Check if user already exists
    console.log('Checking if user exists...');
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      console.log('User already exists:', userExists.username);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username',
      });
    }
    console.log('User does not exist, proceeding...');

    // Handle validID file upload
    let validIDData = null;
    if (req.files && req.files.validID) {
      console.log('Processing validID file...');
      const validID = req.files.validID[0];
      validIDData = {
        url: `/uploads/validIDs/${validID.filename}`,
        filename: validID.filename,
        originalName: validID.originalname,
        mimeType: validID.mimetype,
        fileSize: validID.size,
        uploadedAt: new Date(),
      };
      console.log('ValidID data:', validIDData);
    } else {
      console.log('No validID file found in request');
    }

    // Create user with all fields
    console.log('Creating user in database...');
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      placeOfBirth,
      gender,
      civilStatus,
      nationality,
      phoneNumber,
      tinNumber,
      sssGsisNumber,
      precinctNumber,
      religion,
      heightWeight,
      colorOfHairEyes,
      occupation,
      address,
      spouseInfo,
      emergencyContact,
      validID: validIDData,
      role: 74934, // Resident role
      registrationStatus: 'pending', // Pending admin approval
    });

    console.log('User created successfully:', user._id);

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Your account is pending admin approval.',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registrationStatus: user.registrationStatus,
      },
    });
    
    console.log('Creating audit log...');
    // Create audit log for account creation
    await logAction(
      LOGCONSTANTS.actions.user.CREATE_USER,
      `New resident registration: ${user._id} (${user.email}) - Pending approval`,
      user
    );
    console.log('Registration complete!');
  } catch (error) {
    console.error('=== REGISTRATION ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password',
      });
    }

    // Find user with password field
    const user = await User.findOne({ username }).select('+password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if resident registration is approved
    if (user.role === 74934 && user.registrationStatus === 'pending') {
      return res.status(403).json({
        success: false,
        message: 'Your registration is pending admin approval. Please wait for approval before logging in.',
      });
    }

    if (user.role === 74934 && user.registrationStatus === 'rejected') {
      return res.status(403).json({
        success: false,
        message: `Your registration was rejected. Reason: ${user.rejectionReason || 'Please contact admin for more information.'}`,
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: getRoleName(user.role),
        roleCode: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        suffix: user.suffix,
        email: user.email,
        role: getRoleName(user.role),
        roleCode: user.role,
        address: user.address,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        placeOfBirth: user.placeOfBirth,
        gender: user.gender,
        civilStatus: user.civilStatus,
        nationality: user.nationality,
        tinNumber: user.tinNumber,
        sssGsisNumber: user.sssGsisNumber,
        precinctNumber: user.precinctNumber,
        religion: user.religion,
        heightWeight: user.heightWeight,
        colorOfHairEyes: user.colorOfHairEyes,
        occupation: user.occupation,
        spouseInfo: user.spouseInfo,
        emergencyContact: user.emergencyContact,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { username,firstName, lastName, address, phoneNumber } = req.body;

    const user = await User.findById(req.user._id);
    if (username) user.username = username;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (address) user.address = address;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password',
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message,
    });
  }
};

exports.adminRegister = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, role, address, phoneNumber } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this username',
      });
    }

    // Create user
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      address,
      phoneNumber,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'New Super Admin/Admin registered successfully',
      data: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: getRoleName(user.role),
        token,
      },
    });
    
    // Create audit log for admin-created account
    // Use req.user (admin creating account), otherwise use the new user
    const performer = req.user || user;
    await logAction(
      LOGCONSTANTS.actions.user.CREATE_USER,
      `Admin registration: ${user._id} (${user.email}) by ${req.user?._id || 'system'}`,
      performer
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

// @desc    Register a new resident with proof of residency
// @route   POST /api/auth/resident-register
// @access  Public
exports.residentRegister = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, address, phoneNumber } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username',
      });
    }

    // Check if proof of residency was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Proof of residency image is required',
      });
    }

    // Create user with pending status
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      address,
      phoneNumber,
      role: 74934, // Resident
      registrationStatus: 'pending',
      proofOfResidency: req.file.path || req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Please wait for admin approval.',
      data: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registrationStatus: user.registrationStatus,
      },
    });

    // Create audit log
    await logAction(
      LOGCONSTANTS.actions.user.CREATE_USER,
      `Resident registration pending: ${user._id} (${user.email})`,
      user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering resident',
      error: error.message,
    });
  }
};

// @desc    Get pending registrations
// @route   GET /api/auth/pending-registrations
// @access  Private/Admin
exports.getPendingRegistrations = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      registrationStatus: 'pending',
      role: 74934
    }).select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingUsers.length,
      data: pendingUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending registrations',
      error: error.message,
    });
  }
};

// @desc    Approve resident registration
// @route   PUT /api/auth/approve-registration/:userId
// @access  Private/Admin
exports.approveRegistration = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.registrationStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'User registration is not pending',
      });
    }

    user.registrationStatus = 'approved';
    user.isActive = true;
    user.approvedBy = req.user._id;
    user.approvedAt = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Registration approved successfully',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        registrationStatus: user.registrationStatus,
      },
    });

    // Create audit log
    await logAction(
      LOGCONSTANTS.actions.user.UPDATE_USER,
      `Approved resident registration: ${user._id} (${user.email})`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving registration',
      error: error.message,
    });
  }
};

// @desc    Reject resident registration
// @route   PUT /api/auth/reject-registration/:userId
// @access  Private/Admin
exports.rejectRegistration = async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.registrationStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'User registration is not pending',
      });
    }

    user.registrationStatus = 'rejected';
    user.rejectionReason = reason || 'Registration rejected by admin';
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Registration rejected successfully',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        registrationStatus: user.registrationStatus,
        rejectionReason: user.rejectionReason,
      },
    });

    // Create audit log
    await logAction(
      LOGCONSTANTS.actions.user.UPDATE_USER,
      `Rejected resident registration: ${user._id} (${user.email}) - Reason: ${reason}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting registration',
      error: error.message,
    });
  }
};

// @desc    Get all users (admins and residents)
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { role, status } = req.query;
    const filter = {};
    
    // Filter by role if specified
    if (role) {
      filter.role = role;
    }
    
    // Filter by registration status if specified
    if (status) {
      filter.registrationStatus = status;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    // Add role name to each user for frontend display
    const usersWithRoleNames = users.map(user => {
      const userObj = user.toObject();
      userObj.roleName = getRoleName(user.role);
      return userObj;
    });

    res.status(200).json({
      success: true,
      count: usersWithRoleNames.length,
      data: usersWithRoleNames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Email could not be sent' });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token (private key) and save to database
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Create reset url to email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a PUT request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Password Reset Request',
      //   text: message,
      // });
      
      // Since we don't have an email service set up, we'll just return the token for testing
      console.log(`Reset Token for ${user.email}: ${resetToken}`);

      res.status(200).json({ success: true, data: 'Email Sent', testToken: resetToken });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resetToken
// @access  Public
exports.resetPassword = async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid Token' });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: 'Password Reset Success',
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};