const Announcement = require('../models/Announcement');
const { LOGCONSTANTS } = require('../config/logConstants');
const { getRoleName } = require('../utils/roleHelpers');
const { logAction } = require('../utils/logHelper');

// @desc    Create new announcement
// @route   POST /api/announcements
// @access  Private (Admin)
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, category, priority, publishDate, expiryDate } = req.body;

    const announcement = await Announcement.create({
      title,
      content,
      category,
      priority,
      publishDate,
      expiryDate,
      publishedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement,
    });

    await logAction(
      LOGCONSTANTS.actions.announcements.CREATE_ANNOUNCEMENT,
      `Announcement created: ${announcement._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating announcement',
      error: error.message,
    });
  }
};

// @desc    Get all announcements (for admin)
// @route   GET /api/announcements/all
// @access  Private (Admin)
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('publishedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements',
      error: error.message,
    });
  }
};

// @desc    Get published announcements (for residents)
// @route   GET /api/announcements
// @access  Public/Private
exports.getPublishedAnnouncements = async (req, res) => {
  try {
    const now = new Date();
    
    const announcements = await Announcement.find({
      isPublished: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: now } }
      ]
    })
      .populate('publishedBy', 'firstName lastName')
      .sort({ priority: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements',
      error: error.message,
    });
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Private
exports.getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('publishedBy', 'firstName lastName email');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcement',
      error: error.message,
    });
  }
};

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private (Admin)
exports.updateAnnouncement = async (req, res) => {
  try {
    const { title, content, category, priority, isPublished, publishDate, expiryDate } = req.body;

    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        priority,
        isPublished,
        publishDate,
        expiryDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: announcement,
    });
    
    await logAction(
      LOGCONSTANTS.actions.announcements.UPDATE_ANNOUNCEMENT,
      `Announcement updated: ${announcement._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating announcement',
      error: error.message,
    });
  }
};

// @desc    Publish/Unpublish announcement
// @route   PUT /api/announcements/:id/publish
// @access  Private (Admin)
exports.togglePublish = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    announcement.isPublished = !announcement.isPublished;
    if (announcement.isPublished && !announcement.publishDate) {
      announcement.publishDate = new Date();
    }

    await announcement.save();

    res.status(200).json({
      success: true,
      message: `Announcement ${announcement.isPublished ? 'published' : 'unpublished'} successfully`,
      data: announcement,
    });
    
    await logAction(
      LOGCONSTANTS.actions.announcements.TOGGLE_PUBLISH_ANNOUNCEMENT,
      `Announcement ${announcement.isPublished ? 'published' : 'unpublished'}: ${announcement._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling announcement publish status',
      error: error.message,
    });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin)
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
    // create delete log
    await logAction(
      LOGCONSTANTS.actions.announcements.DELETE_ANNOUNCEMENT,
      `Announcement deleted: ${announcement._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting announcement',
      error: error.message,
    });
  }
};
