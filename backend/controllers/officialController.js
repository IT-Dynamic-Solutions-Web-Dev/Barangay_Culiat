const Official = require('../models/Official');
const { LOGCONSTANTS } = require('../config/logConstants');
const { logAction } = require('../utils/logHelper');

// @desc    Get all officials
// @route   GET /api/officials
// @access  Public
exports.getAllOfficials = async (req, res) => {
  try {
    const { isActive, position } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (position) filter.position = position;

    const officials = await Official.find(filter).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: officials.length,
      data: officials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching officials',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get active officials only
// @route   GET /api/officials/active
// @access  Public
exports.getActiveOfficials = async (req, res) => {
  try {
    const officials = await Official.find({ isActive: true }).sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: officials.length,
      data: officials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching active officials',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get officials by position
// @route   GET /api/officials/position/:position
// @access  Public
exports.getOfficialsByPosition = async (req, res) => {
  try {
    const { position } = req.params;

    const officials = await Official.find({
      position,
      isActive: true,
    }).sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: officials.length,
      data: officials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching officials by position',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get single official
// @route   GET /api/officials/:id
// @access  Public
exports.getOfficial = async (req, res) => {
  try {
    const official = await Official.findById(req.params.id);

    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found',
      });
    }

    res.status(200).json({
      success: true,
      data: official,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Official not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching official',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Create new official
// @route   POST /api/officials
// @access  Private (Admin)
exports.createOfficial = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      position,
      committee,
      isActive,
      contactNumber,
      email,
      photo,
      bio,
      displayOrder,
      termStart,
      termEnd,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !position) {
      return res.status(400).json({
        success: false,
        message: 'Please provide firstName, lastName, and position',
      });
    }

    const official = await Official.create({
      firstName,
      lastName,
      middleName,
      position,
      committee,
      isActive,
      contactNumber,
      email,
      photo,
      bio,
      displayOrder,
      termStart,
      termEnd,
    });

    res.status(201).json({
      success: true,
      message: 'Official created successfully',
      data: official,
    });

    await logAction(
      LOGCONSTANTS.actions.officials.CREATE_OFFICIAL,
      `Official created: ${official.firstName} ${official.lastName} - ${official.position}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating official',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Update official
// @route   PUT /api/officials/:id
// @access  Private (Admin)
exports.updateOfficial = async (req, res) => {
  try {
    let official = await Official.findById(req.params.id);

    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found',
      });
    }

    const {
      firstName,
      lastName,
      middleName,
      position,
      committee,
      isActive,
      contactNumber,
      email,
      photo,
      bio,
      displayOrder,
      termStart,
      termEnd,
    } = req.body;

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (middleName !== undefined) updateData.middleName = middleName;
    if (position !== undefined) updateData.position = position;
    if (committee !== undefined) updateData.committee = committee;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (contactNumber !== undefined) updateData.contactNumber = contactNumber;
    if (email !== undefined) updateData.email = email;
    if (photo !== undefined) updateData.photo = photo;
    if (bio !== undefined) updateData.bio = bio;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (termStart !== undefined) updateData.termStart = termStart;
    if (termEnd !== undefined) updateData.termEnd = termEnd;

    official = await Official.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Official updated successfully',
      data: official,
    });

    await logAction(
      LOGCONSTANTS.actions.officials.UPDATE_OFFICIAL,
      `Official updated: ${official.firstName} ${official.lastName}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating official',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Toggle official active status
// @route   PUT /api/officials/:id/toggle-active
// @access  Private (Admin)
exports.toggleActive = async (req, res) => {
  try {
    const official = await Official.findById(req.params.id);

    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found',
      });
    }

    official.isActive = !official.isActive;
    await official.save();

    res.status(200).json({
      success: true,
      message: `Official ${official.isActive ? 'activated' : 'deactivated'} successfully`,
      data: official,
    });

    await logAction(
      LOGCONSTANTS.actions.officials.TOGGLE_OFFICIAL_STATUS,
      `Official ${official.isActive ? 'activated' : 'deactivated'}: ${official.firstName} ${official.lastName}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling official status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Bulk update officials display order
// @route   PUT /api/officials/reorder
// @access  Private (Admin)
exports.reorderOfficials = async (req, res) => {
  try {
    const { officials } = req.body; // Array of { id, displayOrder }

    if (!Array.isArray(officials) || officials.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid officials array',
      });
    }

    // Bulk update using Promise.all
    const updatePromises = officials.map(({ id, displayOrder }) =>
      Official.findByIdAndUpdate(id, { displayOrder }, { new: true, runValidators: true })
    );

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Officials reordered successfully',
    });

    await logAction(
      LOGCONSTANTS.actions.officials.REORDER_OFFICIALS,
      `${officials.length} officials reordered`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering officials',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Delete official
// @route   DELETE /api/officials/:id
// @access  Private (Admin)
exports.deleteOfficial = async (req, res) => {
  try {
    const official = await Official.findById(req.params.id);

    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found',
      });
    }

    const officialName = `${official.firstName} ${official.lastName}`;
    const officialPosition = official.position;
    
    await official.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Official deleted successfully',
    });

    await logAction(
      LOGCONSTANTS.actions.officials.DELETE_OFFICIAL,
      `Official deleted: ${officialName} - ${officialPosition}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting official',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get officials statistics
// @route   GET /api/officials/stats/all
// @access  Private (Admin)
exports.getOfficialsStats = async (req, res) => {
  try {
    const totalOfficials = await Official.countDocuments();
    const activeOfficials = await Official.countDocuments({ isActive: true });
    const inactiveOfficials = await Official.countDocuments({ isActive: false });

    // Get officials by position
    const positionCounts = await Official.aggregate([
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalOfficials,
        active: activeOfficials,
        inactive: inactiveOfficials,
        byPosition: positionCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching officials statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};
