const Service = require('../models/Service');
const { LOGCONSTANTS } = require('../config/logConstants');
const { logAction } = require('../utils/logHelper');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res) => {
  try {
    const { isActive, category } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (category) filter.category = category;

    const services = await Service.find(filter)
      .populate('createdBy', 'firstName lastName')
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get active services only
// @route   GET /api/services/active
// @access  Public
exports.getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .select('-createdBy')
      .sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching active services',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const services = await Service.find({
      category,
      isActive: true,
    })
      .select('-createdBy')
      .sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services by category',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'createdBy',
      'firstName lastName'
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
exports.createService = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      requirements,
      processingTime,
      fees,
      officeInCharge,
      contactPerson,
      contactNumber,
      availableHours,
      icon,
      isActive,
      displayOrder,
    } = req.body;

    const service = await Service.create({
      title,
      description,
      category,
      requirements,
      processingTime,
      fees,
      officeInCharge,
      contactPerson,
      contactNumber,
      availableHours,
      icon,
      isActive,
      displayOrder,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });

    await logAction(
      LOGCONSTANTS.actions.services.CREATE_SERVICE,
      `Service created: ${service.title}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
exports.updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    const {
      title,
      description,
      category,
      requirements,
      processingTime,
      fees,
      officeInCharge,
      contactPerson,
      contactNumber,
      availableHours,
      icon,
      isActive,
      displayOrder,
    } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (requirements !== undefined) updateData.requirements = requirements;
    if (processingTime !== undefined) updateData.processingTime = processingTime;
    if (fees !== undefined) updateData.fees = fees;
    if (officeInCharge !== undefined) updateData.officeInCharge = officeInCharge;
    if (contactPerson !== undefined) updateData.contactPerson = contactPerson;
    if (contactNumber !== undefined) updateData.contactNumber = contactNumber;
    if (availableHours !== undefined) updateData.availableHours = availableHours;
    if (icon !== undefined) updateData.icon = icon;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;

    service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });

    await logAction(
      LOGCONSTANTS.actions.services.UPDATE_SERVICE,
      `Service updated: ${service.title}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Toggle service active status
// @route   PUT /api/services/:id/toggle-active
// @access  Private (Admin)
exports.toggleActive = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    service.isActive = !service.isActive;
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
      data: service,
    });

    await logAction(
      LOGCONSTANTS.actions.services.TOGGLE_SERVICE_STATUS,
      `Service ${service.isActive ? 'activated' : 'deactivated'}: ${service.title}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling service status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Bulk update services display order
// @route   PUT /api/services/reorder
// @access  Private (Admin)
exports.reorderServices = async (req, res) => {
  try {
    const { services } = req.body; // Array of { id, displayOrder }

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid services array',
      });
    }

    // Bulk update using Promise.all
    const updatePromises = services.map(({ id, displayOrder }) =>
      Service.findByIdAndUpdate(id, { displayOrder }, { new: true })
    );

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Services reordered successfully',
    });

    await logAction(
      LOGCONSTANTS.actions.services.REORDER_SERVICES,
      `${services.length} services reordered`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering services',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    const serviceTitle = service.title;
    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });

    await logAction(
      LOGCONSTANTS.actions.services.DELETE_SERVICE,
      `Service deleted: ${serviceTitle}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get services statistics
// @route   GET /api/services/stats
// @access  Private (Admin)
exports.getServicesStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });
    const inactiveServices = await Service.countDocuments({ isActive: false });

    // Get services by category
    const categoryCounts = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get average fees
    const avgFees = await Service.aggregate([
      {
        $group: {
          _id: null,
          averageFee: { $avg: '$fees' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalServices,
        active: activeServices,
        inactive: inactiveServices,
        byCategory: categoryCounts,
        averageFee: avgFees.length > 0 ? avgFees[0].averageFee : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};
