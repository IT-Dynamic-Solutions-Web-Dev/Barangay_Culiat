const Logs = require('../models/Logs');
const { getRoleName } = require('../utils/roleHelpers');

// @desc Get all logs (admin/superadmin)
// @route GET /api/logs
// @access Private (Admin/SuperAdmin)
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Logs.find().populate('performedBy', 'firstName lastName email').sort({ timestamp: -1 });
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching logs', error: error.message });
  }
};

// @desc Create a log entry (internal use)
// @route POST /api/logs
// @access Private (Admin/SuperAdmin) - typically created by server actions
exports.createLog = async (req, res) => {
  try {
    const { action, description } = req.body;
    // Use the authenticated user as performer where possible
    const performerId = req.user ? req.user._id : req.body.performedBy;
    const performerRoleCode = req.user ? req.user.role : undefined;
    const performerRoleName = performerRoleCode ? getRoleName(performerRoleCode) : undefined;

    const log = await Logs.create({
      action,
      description,
      performedBy: performerId,
      performedByRole: performerRoleName,
    });

    const populated = await Logs.findById(log._id).populate('performedBy', 'firstName lastName email');
    res.status(201).json({ success: true, message: 'Log created', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating log', error: error.message });
  }
};

// @desc Get single log by id
// @route GET /api/logs/:id
// @access Private (Admin/SuperAdmin)
exports.getLogById = async (req, res) => {
  try {
    const log = await Logs.findById(req.params.id).populate('performedBy', 'firstName lastName email');
    if (!log) return res.status(404).json({ success: false, message: 'Log not found' });
    res.status(200).json({ success: true, data: log });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching log', error: error.message });
  }
};

// @desc Delete a log
// @route DELETE /api/logs/:id
// @access Private (Admin/SuperAdmin)
exports.deleteLog = async (req, res) => {
  try {
    const log = await Logs.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ success: false, message: 'Log not found' });
    res.status(200).json({ success: true, message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting log', error: error.message });
  }
};
