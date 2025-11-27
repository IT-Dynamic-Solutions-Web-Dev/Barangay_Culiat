const TermsAcceptance = require("../models/TermsAcceptance");
const { logActivity } = require("../utils/logHelper");

// Current terms version
const CURRENT_TERMS_VERSION = "1.0";

/**
 * @route   POST /api/terms/accept
 * @desc    Record terms acceptance with signature
 * @access  Private (Authenticated users)
 */
exports.acceptTerms = async (req, res) => {
  try {
    const { signature, ipAddress, userAgent } = req.body;
    const userId = req.user.id;

    // Create acceptance record
    const acceptance = new TermsAcceptance({
      userId,
      signature,
      ipAddress: ipAddress || req.ip || req.connection.remoteAddress,
      userAgent: userAgent || req.get("User-Agent"),
      version: CURRENT_TERMS_VERSION,
      acceptedAt: new Date(),
    });

    await acceptance.save();

    // Log activity
    await logActivity({
      actionType: "terms_accepted",
      actionBy: userId,
      description: `User accepted terms and conditions v${CURRENT_TERMS_VERSION}`,
      ipAddress: acceptance.ipAddress,
    });

    res.status(201).json({
      success: true,
      message: "Terms acceptance recorded successfully",
      data: {
        acceptedAt: acceptance.acceptedAt,
        version: acceptance.version,
      },
    });
  } catch (error) {
    console.error("Error recording terms acceptance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record terms acceptance",
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/terms/status
 * @desc    Check if user has accepted current version
 * @access  Private (Authenticated users)
 */
exports.getAcceptanceStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the latest acceptance for current version
    const acceptance = await TermsAcceptance.findOne({
      userId,
      version: CURRENT_TERMS_VERSION,
    }).sort({ acceptedAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        hasAccepted: !!acceptance,
        currentVersion: CURRENT_TERMS_VERSION,
        acceptedAt: acceptance?.acceptedAt || null,
        acceptanceId: acceptance?._id || null,
      },
    });
  } catch (error) {
    console.error("Error checking terms status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check terms acceptance status",
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/terms/history
 * @desc    Get user's terms acceptance history
 * @access  Private (Authenticated users)
 */
exports.getAcceptanceHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await TermsAcceptance.find({ userId })
      .sort({ acceptedAt: -1 })
      .select("-signature"); // Exclude signature data from history list

    res.status(200).json({
      success: true,
      data: {
        count: history.length,
        history,
      },
    });
  } catch (error) {
    console.error("Error fetching terms history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch terms acceptance history",
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/terms/all-acceptances (Admin only)
 * @desc    Get all users' terms acceptances
 * @access  Private (Admin/SuperAdmin only)
 */
exports.getAllAcceptances = async (req, res) => {
  try {
    const { version, page = 1, limit = 50 } = req.query;
    const query = version ? { version } : {};

    const acceptances = await TermsAcceptance.find(query)
      .populate("userId", "firstName lastName email roleName")
      .sort({ acceptedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-signature"); // Exclude signature images for performance

    const count = await TermsAcceptance.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        acceptances,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count,
      },
    });
  } catch (error) {
    console.error("Error fetching all acceptances:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch terms acceptances",
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/terms/signature/:acceptanceId (Admin only)
 * @desc    Get signature for specific acceptance record
 * @access  Private (Admin/SuperAdmin only)
 */
exports.getSignature = async (req, res) => {
  try {
    const { acceptanceId } = req.params;

    const acceptance = await TermsAcceptance.findById(acceptanceId)
      .populate("userId", "firstName lastName email")
      .select("signature acceptedAt version userId");

    if (!acceptance) {
      return res.status(404).json({
        success: false,
        message: "Acceptance record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: acceptance,
    });
  } catch (error) {
    console.error("Error fetching signature:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch signature",
      error: error.message,
    });
  }
};
