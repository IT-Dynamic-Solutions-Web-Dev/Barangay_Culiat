// So Ito yung galing sa canva

const mongoose = require("mongoose");

const BarangayIdRequestSchema = new mongoose.Schema({
  // Unique Barangay ID identifier generated on creation
  barangayIdNumber: { type: String, unique: true, index: true },
  // Personal Information
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  suffix: { type: String, trim: true },
  completeAddress: { type: String, required: true, trim: true },
  sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
  placeOfBirth: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  citizenship: { type: String, required: true },
  civilStatus: {
    type: String,
    enum: ["Single", "Married", "Widowed", "Divorced", "Separated"],
    required: true,
  },

  // Emergency Contact flattened into top-level fields
  emergencyFirstName: { type: String, required: true, trim: true },
  emergencyMiddleName: { type: String, trim: true },
  emergencyLastName: { type: String, required: true, trim: true },
  emergencySuffix: { type: String, trim: true },
  emergencyRelationship: { type: String, required: true, trim: true },
  emergencyContactNumber: { type: String, required: true, trim: true },

  // Images ID Photos or Proof of recidency di pa sure if ano yung required
  //   uploads: {
  //     photo: { type: String, required: true }, // file path or URL (1x1 / 2x2 picture)
  //     proofOfResidency: { type: String, required: true }, // file path / URL (PDF/JPG/PNG)
  //     validId: { type: String }, // optional
  //   },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
});

module.exports = mongoose.model("BarangayIdRequest", BarangayIdRequestSchema);
