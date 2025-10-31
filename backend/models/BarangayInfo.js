const mongoose = require('mongoose');

const demographicsSchema = new mongoose.Schema({
  totalPopulation: { type: Number, default: 0 },
  totalHouseholds: { type: Number, default: 0 },
  ongoingPublicProjects: { type: Number, default: 0 },
  barangayArea: { type: Number, default: 0 },
}, { _id: false });

const contactInfoSchema = new mongoose.Schema({
  phoneNumber: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: { type: String, trim: true },
  municipality: { type: String, trim: true },
  province: { type: String, trim: true },
  region: { type: String, trim: true },
  zipCode: { type: String, trim: true },
}, { _id: false });

const barangayInfoSchema = new mongoose.Schema({
  barangayName: {
    type: String,
    required: [true, 'Barangay name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  mission: {
    type: String,
    trim: true,
  },
  vision: {
    type: String,
    trim: true,
  },
  history: {
    type: String,
    trim: true,
  },
  address: {
    type: addressSchema,
    default: {},
  },
  contactInfo: {
    type: contactInfoSchema,
    default: {},
  },
  demographics: {
    type: demographicsSchema,
    default: {},
  },
  logo: {
    type: String,
    trim: true,
    default: null,
  },
  coverPhoto: {
    type: String,
    trim: true,
    default: null,
  },
  socialMedia: {
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
    youtube: { type: String, trim: true },
  },
  lastUpdatedBy: {
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

module.exports = mongoose.model('BarangayInfo', barangayInfoSchema);
