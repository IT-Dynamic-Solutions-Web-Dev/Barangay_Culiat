// For phase 2 banner enhancements
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Banner title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: [true, 'Media type is required'],
  },
  mediaUrl: {
    type: String,
    required: [true, 'Media URL is required'],
  },
  // Thumbnail for videos
  thumbnailUrl: {
    type: String,
    default: null,
  },
  // Call to action button
  ctaButton: {
    enabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Learn More',
    },
    link: {
      type: String,
      default: '#',
    },
  },
  // Display settings
  displayOrder: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Text positioning
  textPosition: {
    type: String,
    enum: ['left', 'center', 'right'],
    default: 'center',
  },
  // Creator information
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for efficient queries
bannerSchema.index({ isActive: 1, displayOrder: 1 });

module.exports = mongoose.model('Banner', bannerSchema);
