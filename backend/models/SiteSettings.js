const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  // Site Identity
  siteName: {
    type: String,
    default: 'Barangay Culiat',
    trim: true,
  },
  logoUrl: {
    type: String,
    default: null,
  },
  faviconUrl: {
    type: String,
    default: null,
  },
  
  // Contact Information
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  officeAddress: {
    type: String,
    trim: true,
  },
  officeHours: {
    type: String,
    default: 'Monday - Friday, 8:00 AM - 5:00 PM',
    trim: true,
  },
  
  // Social Media Links
  socialMedia: {
    facebook: {
      type: String,
      default: null,
    },
  },
  
  // Site Features Toggle
  features: {
    enableAnnouncements: {
      type: Boolean,
      default: true,
    },
    enableDocumentRequests: {
      type: Boolean,
      default: true,
    },
    enableReports: {
      type: Boolean,
      default: true,
    },
    enableRegistration: {
      type: Boolean,
      default: true,
    },
    enableContactForm: {
      type: Boolean,
      default: true,
    },
  },
  
  // Homepage Content
  missionStatement: {
    type: String,
    trim: true,
  },
  visionStatement: {
    type: String,
    trim: true,
  },
  
  // Maintenance Mode
  maintenanceMode: {
    enabled: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'We are currently performing maintenance. Please check back later.',
    },
  },
  
  // SEO Settings
  seo: {
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
  },
  
  // Emergency Contact - to implement phase 2
  emergencyContact: {
    hotline: {
      type: String,
      trim: true,
    },
    policeStation: {
      type: String,
      trim: true,
    },
    fireStation: {
      type: String,
      trim: true,
    },
    hospital: {
      type: String,
      trim: true,
    },
  },
  
  // Last Updated Information
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Ensure only one settings document exists
siteSettingsSchema.statics.getSiteSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
