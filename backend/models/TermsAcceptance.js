const mongoose = require("mongoose");

const termsAcceptanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    acceptedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    ipAddress: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    version: {
      type: String,
      default: "1.0",
      required: true,
    },
    signature: {
      type: String, // Base64 encoded signature image
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient querying of user's latest acceptance
termsAcceptanceSchema.index({ userId: 1, version: 1 });
termsAcceptanceSchema.index({ userId: 1, acceptedAt: -1 });

const TermsAcceptance = mongoose.model("TermsAcceptance", termsAcceptanceSchema);

module.exports = TermsAcceptance;
