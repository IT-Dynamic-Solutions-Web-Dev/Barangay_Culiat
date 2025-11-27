const Achievement = require('../models/Achievement');
const fs = require('fs');
const path = require('path');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching achievements',
      error: error.message
    });
  }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
exports.getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching achievement',
      error: error.message
    });
  }
};

// @desc    Create new achievement
// @route   POST /api/achievements
// @access  Private (Admin)
exports.createAchievement = async (req, res) => {
  try {
    const { title, category, description, date } = req.body;
    
    let image = 'no-photo.jpg';
    if (req.file) {
      image = req.file.filename;
    }

    const achievement = await Achievement.create({
      title,
      category,
      description,
      date,
      image
    });

    res.status(201).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating achievement',
      error: error.message
    });
  }
};

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private (Admin)
exports.updateAchievement = async (req, res) => {
  try {
    let achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    const fieldsToUpdate = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date
    };

    if (req.file) {
      // Delete old image if it's not the default one
      if (achievement.image && achievement.image !== 'no-photo.jpg') {
        const oldImagePath = path.join(__dirname, '../uploads/achievements', achievement.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      fieldsToUpdate.image = req.file.filename;
    }

    achievement = await Achievement.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating achievement',
      error: error.message
    });
  }
};

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
// @access  Private (Admin)
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    // Delete image if it's not the default one
    if (achievement.image && achievement.image !== 'no-photo.jpg') {
      const imagePath = path.join(__dirname, '../uploads/achievements', achievement.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await achievement.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting achievement',
      error: error.message
    });
  }
};
