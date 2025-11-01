const FAQ = require("../models/FAQ");
const { LOGCONSTANTS } = require("../config/logConstants");
const { logAction } = require("../utils/logHelper");

// @desc    Get all FAQs (for admin)
// @route   GET /api/faqs/all
// @access  Private (Admin)
exports.getAllFAQs = async (req, res) => {
  try {
    const { category, isPublished } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";

    const faqs = await FAQ.find(filter)
      .populate("createdBy", "firstName lastName")
      .populate("lastUpdatedBy", "firstName lastName")
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQs",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get published FAQs (for public/residents)
// @route   GET /api/faqs
// @access  Public
exports.getPublishedFAQs = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isPublished: true };

    if (category) filter.category = category;

    // Add search functionality
    if (search) {
      filter.$or = [
        { question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
      ];
    }

    const faqs = await FAQ.find(filter)
      .select("-createdBy -lastUpdatedBy")
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQs",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get FAQs by category
// @route   GET /api/faqs/category/:category
// @access  Public
exports.getFAQsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const faqs = await FAQ.find({
      category,
      isPublished: true,
    })
      .select("-createdBy -lastUpdatedBy")
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQs by category",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get single FAQ
// @route   GET /api/faqs/:id
// @access  Public
exports.getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id)
      .populate("createdBy", "firstName lastName")
      .populate("lastUpdatedBy", "firstName lastName");

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    // Increment view count
    faq.views += 1;
    await faq.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQ",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private (Admin)
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, category, displayOrder, isPublished } = req.body;

    const faq = await FAQ.create({
      question,
      answer,
      category,
      displayOrder,
      isPublished,
      createdBy: req.user._id,
      lastUpdatedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });

    await logAction(
      LOGCONSTANTS.actions.faqs.CREATE_FAQ,
      `FAQ created: ${faq._id} - "${faq.question}"`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating FAQ",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Private (Admin)
exports.updateFAQ = async (req, res) => {
  try {
    let faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    const { question, answer, category, displayOrder, isPublished } = req.body;

    const updateData = {
      lastUpdatedBy: req.user._id,
    };

    if (question !== undefined) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;
    if (category !== undefined) updateData.category = category;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isPublished !== undefined) updateData.isPublished = isPublished;

    faq = await FAQ.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: faq,
    });

    await logAction(
      LOGCONSTANTS.actions.faqs.UPDATE_FAQ,
      `FAQ updated: ${faq._id} - "${faq.question}"`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating FAQ",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Toggle FAQ publish status
// @route   PUT /api/faqs/:id/publish
// @access  Private (Admin)
exports.togglePublish = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    faq.isPublished = !faq.isPublished;
    faq.lastUpdatedBy = req.user._id;
    await faq.save();

    res.status(200).json({
      success: true,
      message: `FAQ ${
        faq.isPublished ? "published" : "unpublished"
      } successfully`,
      data: faq,
    });

    await logAction(
      LOGCONSTANTS.actions.faqs.TOGGLE_FAQ_PUBLISH,
      `FAQ ${faq.isPublished ? 'published' : 'unpublished'}: ${faq._id}`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling FAQ publish status",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Mark FAQ as helpful
// @route   PUT /api/faqs/:id/helpful
// @access  Public
exports.markHelpful = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    faq.helpful += 1;
    await faq.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Thank you for your feedback",
      data: {
        helpful: faq.helpful,
        notHelpful: faq.notHelpful,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error recording feedback",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Mark FAQ as not helpful
// @route   PUT /api/faqs/:id/not-helpful
// @access  Public
exports.markNotHelpful = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    faq.notHelpful += 1;
    await faq.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Thank you for your feedback",
      data: {
        helpful: faq.helpful,
        notHelpful: faq.notHelpful,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error recording feedback",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Bulk update FAQ display order
// @route   PUT /api/faqs/reorder
// @access  Private (Admin)
exports.reorderFAQs = async (req, res) => {
  try {
    const { faqs } = req.body; // Array of { id, displayOrder }

    if (!Array.isArray(faqs) || faqs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid FAQs array",
      });
    }

    // Bulk update using Promise.all
    const updatePromises = faqs.map(({ id, displayOrder }) =>
      FAQ.findByIdAndUpdate(
        id,
        { displayOrder, lastUpdatedBy: req.user._id },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: "FAQs reordered successfully",
    });

    await logAction("REORDER FAQS", `${faqs.length} FAQs reordered`, req.user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error reordering FAQs",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
// @access  Private (Admin)
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    const faqQuestion = faq.question;
    await faq.deleteOne();

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });

    await logAction(
      LOGCONSTANTS.actions.faqs.DELETE_FAQ,
      `FAQ deleted: ${req.params.id} - "${faqQuestion}"`,
      req.user
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting FAQ",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// @desc    Get FAQ statistics
// @route   GET /api/faqs/stats
// @access  Private (Admin)
exports.getFAQStats = async (req, res) => {
  try {
    const totalFAQs = await FAQ.countDocuments();
    const publishedFAQs = await FAQ.countDocuments({ isPublished: true });
    const unpublishedFAQs = await FAQ.countDocuments({ isPublished: false });

    // Get FAQs by category
    const categoryCounts = await FAQ.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get most viewed FAQs
    const mostViewed = await FAQ.find({ isPublished: true })
      .sort({ views: -1 })
      .limit(5)
      .select("question views helpful notHelpful");

    // Get most helpful FAQs
    const mostHelpful = await FAQ.find({ isPublished: true })
      .sort({ helpful: -1 })
      .limit(5)
      .select("question views helpful notHelpful");

    res.status(200).json({
      success: true,
      data: {
        total: totalFAQs,
        published: publishedFAQs,
        unpublished: unpublishedFAQs,
        byCategory: categoryCounts,
        mostViewed,
        mostHelpful,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQ statistics",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};
