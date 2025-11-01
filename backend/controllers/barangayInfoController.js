const BarangayInfo = require('../models/BarangayInfo');
const { LOGCONSTANTS } = require('../config/logConstants');
const { logAction } = require('../utils/logHelper');

// @desc    Get barangay information
// @route   GET /api/barangay-info
// @access  Public
exports.getBarangayInfo = async (req, res) => {
  try {
    // Assuming there's only one barangay info document (singleton pattern)
    const barangayInfo = await BarangayInfo.findOne()
      .populate('lastUpdatedBy', 'firstName lastName email');

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found',
      });
    }

    res.status(200).json({
      success: true,
      data: barangayInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching barangay information',
      error: error.message,
    });
  }
};

// @desc    Create barangay information (Initial setup)
// @route   POST /api/barangay-info
// @access  Private (Admin)
exports.createBarangayInfo = async (req, res) => {
  try {
    // Prevent duplicate creation - only one barangay info should exist
    const existingInfo = await BarangayInfo.findOne();
    
    if (existingInfo) {
      return res.status(400).json({
        success: false,
        message: 'Barangay information already exists. Use the update endpoint instead.',
      });
    }

    const {
      barangayName,
      description,
      mission,
      vision,
      history,
      address,
      contactInfo,
      demographics,
      logo,
      coverPhoto,
      socialMedia,
    } = req.body;

    const barangayInfo = await BarangayInfo.create({
      barangayName,
      description,
      mission,
      vision,
      history,
      address,
      contactInfo,
      demographics,
      logo,
      coverPhoto,
      socialMedia,
      lastUpdatedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Barangay information created successfully',
      data: barangayInfo,
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.CREATE_BARANGAY_INFO,
      `Barangay information created: ${barangayInfo.barangayName}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating barangay information',
      error: error.message,
    });
  }
};

// @desc    Update barangay information (General update)
// @route   PUT /api/barangay-info
// @access  Private (Admin)
exports.updateBarangayInfo = async (req, res) => {
  try {
    const {
      barangayName,
      description,
      mission,
      vision,
      history,
      address,
      contactInfo,
      demographics,
      logo,
      coverPhoto,
      socialMedia,
    } = req.body;

    // Find the barangay info (singleton - should only be one document)
    let barangayInfo = await BarangayInfo.findOne();

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found. Please create it first.',
      });
    }

    // Build update object with only provided fields
    const updateData = {
      lastUpdatedBy: req.user._id,
    };

    if (barangayName !== undefined) updateData.barangayName = barangayName;
    if (description !== undefined) updateData.description = description;
    if (mission !== undefined) updateData.mission = mission;
    if (vision !== undefined) updateData.vision = vision;
    if (history !== undefined) updateData.history = history;
    if (address !== undefined) updateData.address = address;
    if (contactInfo !== undefined) updateData.contactInfo = contactInfo;
    if (demographics !== undefined) updateData.demographics = demographics;
    if (logo !== undefined) updateData.logo = logo;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
    if (socialMedia !== undefined) updateData.socialMedia = socialMedia;

    barangayInfo = await BarangayInfo.findByIdAndUpdate(
      barangayInfo._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate('lastUpdatedBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      message: 'Barangay information updated successfully',
      data: barangayInfo,
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.UPDATE_BARANGAY_INFO,
      `Barangay information updated: ${barangayInfo.barangayName}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating barangay information',
      error: error.message,
    });
  }
};

// @desc    Update barangay demographics
// @route   PUT /api/barangay-info/demographics
// @access  Private (Admin)
exports.updateDemographics = async (req, res) => {
  try {
    const { totalPopulation, totalHouseholds, ongoingPublicProjects, barangayArea } = req.body;

    let barangayInfo = await BarangayInfo.findOne();

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found',
      });
    }

    // Update demographics
    if (totalPopulation !== undefined) barangayInfo.demographics.totalPopulation = totalPopulation;
    if (totalHouseholds !== undefined) barangayInfo.demographics.totalHouseholds = totalHouseholds;
    if (ongoingPublicProjects !== undefined) barangayInfo.demographics.ongoingPublicProjects = ongoingPublicProjects;
    if (barangayArea !== undefined) barangayInfo.demographics.barangayArea = barangayArea;

    barangayInfo.lastUpdatedBy = req.user._id;
    await barangayInfo.save();

    res.status(200).json({
      success: true,
      message: 'Demographics updated successfully',
      data: barangayInfo,
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.UPDATE_BARANGAY_DEMOGRAPHICS,
      `Barangay demographics updated: ${barangayInfo._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating demographics',
      error: error.message,
    });
  }
};

// @desc    Update barangay contact information
// @route   PUT /api/barangay-info/contact
// @access  Private (Admin)
exports.updateContactInfo = async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;

    let barangayInfo = await BarangayInfo.findOne();

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found',
      });
    }

    // Update contact info
    if (phoneNumber !== undefined) barangayInfo.contactInfo.phoneNumber = phoneNumber;
    if (email !== undefined) barangayInfo.contactInfo.email = email;

    barangayInfo.lastUpdatedBy = req.user._id;
    await barangayInfo.save();

    res.status(200).json({
      success: true,
      message: 'Contact information updated successfully',
      data: barangayInfo,
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.UPDATE_BARANGAY_CONTACT,
      `Barangay contact information updated: ${barangayInfo._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact information',
      error: error.message,
    });
  }
};

// @desc    Update barangay address
// @route   PUT /api/barangay-info/address
// @access  Private (Admin)
exports.updateAddress = async (req, res) => {
  try {
    const { street, municipality, province, region, zipCode } = req.body;

    let barangayInfo = await BarangayInfo.findOne();

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found',
      });
    }

    // Update address
    if (street !== undefined) barangayInfo.address.street = street;
    if (municipality !== undefined) barangayInfo.address.municipality = municipality;
    if (province !== undefined) barangayInfo.address.province = province;
    if (region !== undefined) barangayInfo.address.region = region;
    if (zipCode !== undefined) barangayInfo.address.zipCode = zipCode;

    barangayInfo.lastUpdatedBy = req.user._id;
    await barangayInfo.save();

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: barangayInfo,
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.UPDATE_BARANGAY_ADDRESS,
      `Barangay address updated: ${barangayInfo._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating address',
      error: error.message,
    });
  }
};

// @desc    Update barangay social media
// @route   PUT /api/barangay-info/social-media
// @access  Private (Admin)
exports.updateSocialMedia = async (req, res) => {
  try {
    const { facebook, twitter, instagram, youtube } = req.body;

    let barangayInfo = await BarangayInfo.findOne();

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found',
      });
    }

    // Update social media
    if (facebook !== undefined) barangayInfo.socialMedia.facebook = facebook;
    if (twitter !== undefined) barangayInfo.socialMedia.twitter = twitter;
    if (instagram !== undefined) barangayInfo.socialMedia.instagram = instagram;
    if (youtube !== undefined) barangayInfo.socialMedia.youtube = youtube;

    barangayInfo.lastUpdatedBy = req.user._id;
    await barangayInfo.save();

    res.status(200).json({
      success: true,
      message: 'Social media updated successfully',
      data: barangayInfo,
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.UPDATE_BARANGAY_SOCIAL_MEDIA,
      `Barangay social media updated: ${barangayInfo._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating social media',
      error: error.message,
    });
  }
};

// @desc    Delete barangay information
// @route   DELETE /api/barangay-info
// @access  Private (SuperAdmin only - use with extreme caution)
exports.deleteBarangayInfo = async (req, res) => {
  try {
    const barangayInfo = await BarangayInfo.findOne();

    if (!barangayInfo) {
      return res.status(404).json({
        success: false,
        message: 'Barangay information not found',
      });
    }

    const barangayName = barangayInfo.barangayName;
    await barangayInfo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Barangay information deleted successfully',
    });

    await logAction(
      LOGCONSTANTS.actions.barangayInfo.DELETE_BARANGAY_INFO,
      `Barangay information deleted: ${barangayName}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting barangay information',
      error: error.message,
    });
  }
};
