const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    // Site Information
    siteInfo: {
      barangayName: {
        type: String,
        default: "Barangay Culiat",
      },
      city: {
        type: String,
        default: "Quezon City",
      },
      province: {
        type: String,
        default: "Metro Manila",
      },
      tagline: {
        type: String,
        default: "Building a Better Community Together",
      },
      description: {
        type: String,
        default: "Official Website of Barangay Culiat",
      },
      logo: {
        type: String,
        default: "",
      },
    },

    // Contact Information
    contactInfo: {
      officeAddress: {
        type: String,
        default: "",
      },
      phoneNumber: {
        type: String,
        default: "",
      },
      mobileNumber: {
        type: String,
        default: "",
      },
      emailAddress: {
        type: String,
        default: "",
      },
      officeHours: {
        type: String,
        default: "Monday - Friday, 8:00 AM - 5:00 PM",
      },
    },

    // Social Media Links
    socialMedia: {
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
    },

    // Banner Settings
    banner: {
      enabled: {
        type: Boolean,
        default: true,
      },
      images: [
        {
          url: String,
          caption: String,
          order: Number,
        },
      ],
      autoRotate: {
        type: Boolean,
        default: true,
      },
      rotationInterval: {
        type: Number,
        default: 5000, // milliseconds
      },
    },

    // Theme Settings
    theme: {
      primaryColor: {
        type: String,
        default: "#3B82F6", // blue-500
      },
      secondaryColor: {
        type: String,
        default: "#8B5CF6", // purple-500
      },
      accentColor: {
        type: String,
        default: "#10B981", // green-500
      },
      darkMode: {
        type: Boolean,
        default: false,
      },
    },

    // Email Templates
    emailTemplates: {
      welcomeEmail: {
        subject: {
          type: String,
          default: "Welcome to Barangay Culiat Portal",
        },
        body: {
          type: String,
          default: "Dear {userName},\n\nWelcome to the Barangay Culiat Portal! Your account has been created successfully.",
        },
      },
      documentReady: {
        subject: {
          type: String,
          default: "Your Document is Ready for Pickup",
        },
        body: {
          type: String,
          default: "Dear {userName},\n\nYour {documentType} is ready for pickup at the Barangay Hall.",
        },
      },
      documentRejected: {
        subject: {
          type: String,
          default: "Document Request Update",
        },
        body: {
          type: String,
          default: "Dear {userName},\n\nYour {documentType} request has been rejected. Reason: {reason}",
        },
      },
      reportResolved: {
        subject: {
          type: String,
          default: "Your Report Has Been Resolved",
        },
        body: {
          type: String,
          default: "Dear {userName},\n\nYour report '{reportTitle}' has been resolved.",
        },
      },
    },

    // System Settings
    system: {
      maintenanceMode: {
        type: Boolean,
        default: false,
      },
      registrationEnabled: {
        type: Boolean,
        default: true,
      },
      documentRequestEnabled: {
        type: Boolean,
        default: true,
      },
      reportingEnabled: {
        type: Boolean,
        default: true,
      },
      maxFileSize: {
        type: Number,
        default: 5, // MB
      },
      allowedFileTypes: {
        type: [String],
        default: ["pdf", "jpg", "jpeg", "png", "doc", "docx"],
      },
    },

    // Terms and Conditions
    termsAndConditions: {
      version: {
        type: String,
        default: "1.0",
      },
      content: {
        type: String,
        default: "",
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },

    // Last updated metadata
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("Settings", settingsSchema);
