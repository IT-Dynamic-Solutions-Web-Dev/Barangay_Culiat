const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    relationship: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    address: { type: String, trim: true },
  },
  { _id: false }
);

const documentRequestSchema = new mongoose.Schema(
  {
    // Link to user account
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Personal Information
    lastName: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    dateOfBirth: { type: Date },
    placeOfBirth: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other", "unspecified"] },
    civilStatus: {
      type: String,
      enum: [
        "single",
        "married",
        "widowed",
        "separated",
        "domestic_partner",
        "other",
      ],
    },
    nationality: { type: String, trim: true },
    address: { type: String, trim: true },
    contactNumber: { type: String, trim: true },

    // Emergency Contact
    emergencyContact: { type: emergencyContactSchema, default: {} },

    // Document Request details
    documentType: {
      type: String,
      required: true,
      enum: [
        "indigency", // Certificate of Indigency
        "residency", // Certificate of Residency
        "clearance", // Barangay Clearance
        "ctc", // Community Tax Certificate
        "business_permit",
        "building_permit",
        "good_moral", // Certificate of Good Moral
      ],
    },
    purposeOfRequest: { type: String, trim: true },
    preferredPickupDate: { type: Date },
    remarks: { type: String, trim: true },

  // Attachments / photos
  // Accept either a reference to a Picture document (ObjectId) OR a plain file path string
  // Example values:
  // - ObjectId: "650a1f2b6d9e4c3b2a1f0e9d"
  // - Path string: "/uploads/document-requests/myfile.jpg"
  photo1x1: { type: mongoose.Schema.Types.Mixed, default: null },
  validID: { type: mongoose.Schema.Types.Mixed, default: null },

    // Request workflow
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    processedAt: { type: Date },

    // Optional administrative fields
    fees: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "waived"],
      default: "unpaid",
    },

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DocumentRequest", documentRequestSchema);
