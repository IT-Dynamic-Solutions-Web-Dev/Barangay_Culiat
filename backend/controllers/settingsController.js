const Settings = require("../models/Settings");
const { logAction } = require("../utils/logHelper");

// @desc    Get settings
// @route   GET /api/settings
// @access  Public (for site info) / Private (for system settings)
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    // If not authenticated, return only public settings
    if (!req.user) {
      return res.status(200).json({
        success: true,
        data: {
          siteInfo: settings.siteInfo,
          contactInfo: settings.contactInfo,
          socialMedia: settings.socialMedia,
          theme: settings.theme,
          banner: {
            enabled: settings.banner.enabled,
            images: settings.banner.images,
            autoRotate: settings.banner.autoRotate,
            rotationInterval: settings.banner.rotationInterval,
          },
        },
      });
    }

    // Return full settings for authenticated users
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching settings",
      error: error.message,
    });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private (Admin only)
exports.updateSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    // Update only provided fields
    const updateFields = [
      "siteInfo",
      "contactInfo",
      "socialMedia",
      "banner",
      "theme",
      "emailTemplates",
      "system",
      "termsAndConditions",
    ];

    updateFields.forEach((field) => {
      if (req.body[field]) {
        // Merge nested objects instead of replacing
        if (typeof req.body[field] === "object" && !Array.isArray(req.body[field])) {
          settings[field] = {
            ...settings[field].toObject(),
            ...req.body[field],
          };
        } else {
          settings[field] = req.body[field];
        }
      }
    });

    settings.lastModifiedBy = req.user._id;

    await settings.save();

    // Log the action
    await logAction(
      req.user._id,
      "UPDATE_SETTINGS",
      "Settings",
      settings._id,
      {
        updatedFields: Object.keys(req.body),
      }
    );

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({
      success: false,
      message: "Error updating settings",
      error: error.message,
    });
  }
};

// @desc    Update site information
// @route   PUT /api/settings/site-info
// @access  Private (Admin only)
exports.updateSiteInfo = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    settings.siteInfo = {
      ...settings.siteInfo.toObject(),
      ...req.body,
    };
    
    settings.lastModifiedBy = req.user._id;
    await settings.save();

    await logAction(
      req.user._id,
      "UPDATE_SITE_INFO",
      "Settings",
      settings._id,
      { siteInfo: req.body }
    );

    res.status(200).json({
      success: true,
      message: "Site information updated successfully",
      data: settings.siteInfo,
    });
  } catch (error) {
    console.error("Error updating site info:", error);
    res.status(500).json({
      success: false,
      message: "Error updating site information",
      error: error.message,
    });
  }
};

// @desc    Update contact information
// @route   PUT /api/settings/contact-info
// @access  Private (Admin only)
exports.updateContactInfo = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    settings.contactInfo = {
      ...settings.contactInfo.toObject(),
      ...req.body,
    };
    
    settings.lastModifiedBy = req.user._id;
    await settings.save();

    await logAction(
      req.user._id,
      "UPDATE_CONTACT_INFO",
      "Settings",
      settings._id,
      { contactInfo: req.body }
    );

    res.status(200).json({
      success: true,
      message: "Contact information updated successfully",
      data: settings.contactInfo,
    });
  } catch (error) {
    console.error("Error updating contact info:", error);
    res.status(500).json({
      success: false,
      message: "Error updating contact information",
      error: error.message,
    });
  }
};

// @desc    Update social media links
// @route   PUT /api/settings/social-media
// @access  Private (Admin only)
exports.updateSocialMedia = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    settings.socialMedia = {
      ...settings.socialMedia.toObject(),
      ...req.body,
    };
    
    settings.lastModifiedBy = req.user._id;
    await settings.save();

    await logAction(
      req.user._id,
      "UPDATE_SOCIAL_MEDIA",
      "Settings",
      settings._id,
      { socialMedia: req.body }
    );

    res.status(200).json({
      success: true,
      message: "Social media links updated successfully",
      data: settings.socialMedia,
    });
  } catch (error) {
    console.error("Error updating social media:", error);
    res.status(500).json({
      success: false,
      message: "Error updating social media links",
      error: error.message,
    });
  }
};

// @desc    Update theme settings
// @route   PUT /api/settings/theme
// @access  Private (Admin only)
exports.updateTheme = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    settings.theme = {
      ...settings.theme.toObject(),
      ...req.body,
    };
    
    settings.lastModifiedBy = req.user._id;
    await settings.save();

    await logAction(
      req.user._id,
      "UPDATE_THEME",
      "Settings",
      settings._id,
      { theme: req.body }
    );

    res.status(200).json({
      success: true,
      message: "Theme settings updated successfully",
      data: settings.theme,
    });
  } catch (error) {
    console.error("Error updating theme:", error);
    res.status(500).json({
      success: false,
      message: "Error updating theme settings",
      error: error.message,
    });
  }
};

// @desc    Reset settings to default
// @route   POST /api/settings/reset
// @access  Private (SuperAdmin only)
exports.resetSettings = async (req, res) => {
  try {
    // Delete existing settings
    await Settings.deleteMany({});
    
    // Create new default settings
    const settings = await Settings.create({
      lastModifiedBy: req.user._id,
    });

    await logAction(
      req.user._id,
      "RESET_SETTINGS",
      "Settings",
      settings._id,
      { message: "Settings reset to default" }
    );

    res.status(200).json({
      success: true,
      message: "Settings reset to default successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error resetting settings:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting settings",
      error: error.message,
    });
  }
};
