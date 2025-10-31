const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'document_issuance',
      'permits_clearance',
      'health_services',
      'social_services',
      'emergency_services',
      'public_safety',
      'other'
    ],
  },
  requirements: [{
    type: String,
    trim: true,
  }],
  processingTime: {
    type: String,
    trim: true,
  },
  fees: {
    type: Number,
    default: 0,
  },
  officeInCharge: {
    type: String,
    trim: true,
  },
  contactPerson: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  availableHours: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
