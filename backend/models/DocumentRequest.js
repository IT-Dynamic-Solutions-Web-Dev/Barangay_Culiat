const mongoose = require("mongoose");

// File/Image Upload Schema with validation
const fileUploadSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'File URL is required'],
      trim: true,
      validate: {
        validator: function(v) {
          // Validate URL format (http/https or relative path)
          return /^(https?:\/\/.+|\/uploads\/.+|\/.+\.(jpg|jpeg|png))$/i.test(v);
        },
        message: 'Invalid file URL format'
      }
    },
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
    },
    originalName: {
      type: String,
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, 'File type is required'],
      enum: {
        values: ['image/jpeg', 'image/jpg', 'image/png'],
        message: 'Only JPG, JPEG, and PNG images are allowed'
      }
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required'],
      validate: {
        validator: function(v) {
          // Max file size: 5MB (5 * 1024 * 1024 bytes)
          return v <= 5242880;
        },
        message: 'File size must not exceed 5MB'
      }
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const emergencyContactSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    relationship: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    // Atomic address structure for emergency contact
    address: {
      country: { type: String, default: 'Philippines' },
      region: { type: String, default: 'National Capital Region' },
      province: { type: String, default: 'Metro Manila' },
      city: { type: String, default: 'Quezon City' },
      barangay: { type: String, default: 'Culiat' },
      postalCode: { type: String, default: '1128' },
      subdivision: { type: String, trim: true, default: null },
      street: { type: String, trim: true, default: null },
      houseNumber: { type: String, trim: true, default: null },
    },
  },
  { _id: false }
);

const documentRequestSchema = new mongoose.Schema(
  {
    // Link to user account
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Personal/Business Owner Information (Auto-filled from User model)
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
    // Atomic address structure (auto-filled from User)
    address: {
      country: { type: String, default: 'Philippines' },
      region: { type: String, default: 'National Capital Region' },
      province: { type: String, default: 'Metro Manila' },
      city: { type: String, default: 'Quezon City' },
      barangay: { type: String, default: 'Culiat' },
      postalCode: { type: String, default: '1128' },
      subdivision: { type: String, trim: true, default: null },
      street: { type: String, trim: true, default: null },
      houseNumber: { type: String, trim: true, default: null },
    },
    contactNumber: { type: String, trim: true },
    
    // Additional Standard Form Fields (from the form image)
    tinNumber: { type: String, trim: true },
    sssGsisNumber: { type: String, trim: true },
    precinctNumber: { type: String, trim: true },
    religion: { type: String, trim: true },
    heightWeight: { type: String, trim: true },
    colorOfHairEyes: { type: String, trim: true },
    occupation: { type: String, trim: true },
    emailAddress: { type: String, trim: true, lowercase: true },
    
    requestFor: { type: String, trim: true }, // Added field
    
    // Spouse Information (if married)
    spouseInfo: {
      name: { type: String, trim: true },
      occupation: { type: String, trim: true },
      contactNumber: { type: String, trim: true },
    },

    // Emergency Contact
    emergencyContact: { type: emergencyContactSchema, default: {} },

    // Business Information (ONLY for business_permit and business_clearance)
    businessInfo: {
      businessName: { type: String, trim: true },
      // Atomic address structure for business
      businessAddress: {
        country: { type: String, default: 'Philippines' },
        region: { type: String, default: 'National Capital Region' },
        province: { type: String, default: 'Metro Manila' },
        city: { type: String, default: 'Quezon City' },
        barangay: { type: String, default: 'Culiat' },
        postalCode: { type: String, default: '1128' },
        subdivision: { type: String, trim: true, default: null },
        street: { type: String, trim: true, default: null },
        houseNumber: { type: String, trim: true, default: null },
      },
      // Nature of Business
      applicationType: { type: String, enum: ["new", "renewal"] },
      natureOfBusiness: { type: String, trim: true },
      ownerRepresentative: { type: String, trim: true },
      ownerContactNumber: { type: String, trim: true },
      representativeContactNumber: { type: String, trim: true },
    },

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
        "business_clearance",
      ],
    },
    purposeOfRequest: { type: String, trim: true },
    preferredPickupDate: { type: Date },
    remarks: { type: String, trim: true },

    // Attachments / photos with validation
    // 1x1 Photo (optional for some documents)
    photo1x1: {
      type: fileUploadSchema,
      default: null,
      validate: {
        validator: function(v) {
          // Check if required based on document type
          const requiresPhoto = ['clearance', 'business_permit', 'business_clearance'].includes(this.documentType);
          if (requiresPhoto && !v) {
            return false;
          }
          return true;
        },
        message: 'Photo 1x1 is required for this document type'
      }
    },
    // Valid ID (required for all documents)
    validID: {
      type: fileUploadSchema,
      required: [true, 'Valid ID is required for document requests'],
    },
    // Additional supporting documents (optional)
    supportingDocuments: [{
      type: fileUploadSchema,
      default: [],
    }],

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

// Pre-save hook to validate file uploads and business info
documentRequestSchema.pre('save', function(next) {
  // Check if business info is required for this document type
  const businessDocTypes = ['business_permit', 'business_clearance'];
  const isBusinessDoc = businessDocTypes.includes(this.documentType);
  
  // Validate business info for business documents
  if (isBusinessDoc) {
    if (!this.businessInfo || !this.businessInfo.businessName) {
      return next(new Error('Business name is required for business permits and clearances'));
    }
    if (!this.businessInfo.natureOfBusiness) {
      return next(new Error('Nature of business is required for business permits and clearances'));
    }
  }
  
  // Validate validID if present
  if (this.validID && this.validID.url) {
    const validation = this.validateFileUpload(this.validID);
    if (!validation.isValid) {
      return next(new Error(`Valid ID validation failed: ${validation.errors.join(', ')}`));
    }
  }
  
  // Validate photo1x1 if present
  if (this.photo1x1 && this.photo1x1.url) {
    const validation = this.validateFileUpload(this.photo1x1);
    if (!validation.isValid) {
      return next(new Error(`Photo 1x1 validation failed: ${validation.errors.join(', ')}`));
    }
  }
  
  // Validate supporting documents if present
  if (this.supportingDocuments && this.supportingDocuments.length > 0) {
    for (let i = 0; i < this.supportingDocuments.length; i++) {
      const doc = this.supportingDocuments[i];
      if (doc && doc.url) {
        const validation = this.validateFileUpload(doc);
        if (!validation.isValid) {
          return next(new Error(`Supporting document ${i + 1} validation failed: ${validation.errors.join(', ')}`));
        }
      }
    }
  }
  
  next();
});

// Static method to create request with auto-filled user data
documentRequestSchema.statics.createFromUser = async function(userId, requestData) {
  const User = mongoose.model('User');
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Auto-fill from user model
  const autoFilledData = {
    applicant: userId,
    firstName: user.firstName,
    lastName: user.lastName,
    contactNumber: user.phoneNumber,
    address: {
      country: user.address.country || 'Philippines',
      region: user.address.region || 'National Capital Region',
      province: user.address.province || 'Metro Manila',
      city: user.address.city || 'Quezon City',
      barangay: user.address.barangay || 'Culiat',
      postalCode: user.address.postalCode || '1128',
      subdivision: user.address.subdivision,
      street: user.address.street,
      houseNumber: user.address.houseNumber,
    },
    ...requestData, // Allow overrides from request data
  };
  
  return this.create(autoFilledData);
};

// Method to update applicant info from user model
documentRequestSchema.methods.syncWithUser = async function() {
  const User = mongoose.model('User');
  const user = await User.findById(this.applicant);
  
  if (user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.contactNumber = user.phoneNumber;
    this.address = {
      country: user.address.country || 'Philippines',
      region: user.address.region || 'National Capital Region',
      province: user.address.province || 'Metro Manila',
      city: user.address.city || 'Quezon City',
      barangay: user.address.barangay || 'Culiat',
      postalCode: user.address.postalCode || '1128',
      subdivision: user.address.subdivision,
      street: user.address.street,
      houseNumber: user.address.houseNumber,
    };
    return this.save();
  }
  return this;
};

// Custom validation methods
documentRequestSchema.methods.validateFileUpload = function(fileData) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxSize = 5242880; // 5MB in bytes
  
  const errors = [];
  
  if (!fileData) {
    errors.push('File data is required');
    return { isValid: false, errors };
  }
  
  if (!allowedTypes.includes(fileData.mimeType)) {
    errors.push('Only JPG, JPEG, and PNG files are allowed');
  }
  
  if (fileData.fileSize > maxSize) {
    errors.push('File size must not exceed 5MB');
  }
  
  if (!fileData.url || !/^(https?:\/\/.+|\/uploads\/.+)$/i.test(fileData.url)) {
    errors.push('Invalid file URL format');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Method to check if this is a business-related document
documentRequestSchema.methods.isBusinessDocument = function() {
  return ['business_permit', 'business_clearance'].includes(this.documentType);
};

// Method to check if all required documents are uploaded
documentRequestSchema.methods.hasRequiredDocuments = function() {
  const requiresPhoto = ['clearance', 'business_permit', 'business_clearance'].includes(this.documentType);
  
  const hasValidID = this.validID && this.validID.url;
  const hasPhoto = !requiresPhoto || (this.photo1x1 && this.photo1x1.url);
  
  return hasValidID && hasPhoto;
};

// Method to get file extension from filename
documentRequestSchema.methods.getFileExtension = function(filename) {
  return filename.split('.').pop().toLowerCase();
};

// Static method to validate file before upload
documentRequestSchema.statics.validateFile = function(file) {
  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxSize = 5242880; // 5MB
  
  const errors = [];
  
  if (!file) {
    return { isValid: false, errors: ['No file provided'] };
  }
  
  // Check mime type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    errors.push('Only JPG, JPEG, and PNG images are allowed');
  }
  
  // Check file size
  if (file.size > maxSize) {
    errors.push('File size must not exceed 5MB');
  }
  
  // Check extension
  const ext = file.originalname.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    errors.push('Invalid file extension. Only .jpg, .jpeg, .png are allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Static method to create file upload object from uploaded file
documentRequestSchema.statics.createFileUploadObject = function(file, url) {
  return {
    url: url,
    filename: file.filename || file.name,
    originalName: file.originalname || file.originalName,
    mimeType: file.mimetype || file.mimeType,
    fileSize: file.size,
    uploadedAt: new Date(),
  };
};

// Method to get file information summary
documentRequestSchema.methods.getFilesSummary = function() {
  const summary = {
    validID: null,
    photo1x1: null,
    supportingDocuments: [],
    totalFiles: 0,
    totalSize: 0,
  };
  
  if (this.validID && this.validID.url) {
    summary.validID = {
      filename: this.validID.filename,
      size: this.validID.fileSize,
      uploadedAt: this.validID.uploadedAt,
    };
    summary.totalFiles++;
    summary.totalSize += this.validID.fileSize;
  }
  
  if (this.photo1x1 && this.photo1x1.url) {
    summary.photo1x1 = {
      filename: this.photo1x1.filename,
      size: this.photo1x1.fileSize,
      uploadedAt: this.photo1x1.uploadedAt,
    };
    summary.totalFiles++;
    summary.totalSize += this.photo1x1.fileSize;
  }
  
  if (this.supportingDocuments && this.supportingDocuments.length > 0) {
    this.supportingDocuments.forEach(doc => {
      if (doc && doc.url) {
        summary.supportingDocuments.push({
          filename: doc.filename,
          size: doc.fileSize,
          uploadedAt: doc.uploadedAt,
        });
        summary.totalFiles++;
        summary.totalSize += doc.fileSize;
      }
    });
  }
  
  return summary;
};

// Virtual for full name
documentRequestSchema.virtual('fullName').get(function() {
  const parts = [this.firstName];
  if (this.middleName) parts.push(this.middleName);
  parts.push(this.lastName);
  return parts.join(' ');
});

// Virtual for full applicant address
documentRequestSchema.virtual('fullAddress').get(function() {
  const parts = [];
  
  if (this.address.houseNumber) parts.push(this.address.houseNumber);
  if (this.address.street) parts.push(this.address.street);
  if (this.address.subdivision) parts.push(this.address.subdivision);
  if (this.address.barangay) parts.push(`Barangay ${this.address.barangay}`);
  if (this.address.city) parts.push(this.address.city);
  if (this.address.province) parts.push(this.address.province);
  if (this.address.postalCode) parts.push(this.address.postalCode);
  if (this.address.country) parts.push(this.address.country);
  
  return parts.join(', ');
});

// Virtual for full business address
documentRequestSchema.virtual('fullBusinessAddress').get(function() {
  if (!this.businessInfo || !this.businessInfo.businessAddress) return null;
  
  const addr = this.businessInfo.businessAddress;
  const parts = [];
  
  if (addr.houseNumber) parts.push(addr.houseNumber);
  if (addr.street) parts.push(addr.street);
  if (addr.subdivision) parts.push(addr.subdivision);
  if (addr.barangay) parts.push(`Barangay ${addr.barangay}`);
  if (addr.city) parts.push(addr.city);
  if (addr.province) parts.push(addr.province);
  if (addr.postalCode) parts.push(addr.postalCode);
  if (addr.country) parts.push(addr.country);
  
  return parts.join(', ');
});

// Virtual for emergency contact full address
documentRequestSchema.virtual('emergencyContactFullAddress').get(function() {
  if (!this.emergencyContact || !this.emergencyContact.address) return null;
  
  const addr = this.emergencyContact.address;
  const parts = [];
  
  if (addr.houseNumber) parts.push(addr.houseNumber);
  if (addr.street) parts.push(addr.street);
  if (addr.subdivision) parts.push(addr.subdivision);
  if (addr.barangay) parts.push(`Barangay ${addr.barangay}`);
  if (addr.city) parts.push(addr.city);
  if (addr.province) parts.push(addr.province);
  if (addr.postalCode) parts.push(addr.postalCode);
  if (addr.country) parts.push(addr.country);
  
  return parts.join(', ');
});

// Ensure virtuals are included in JSON
documentRequestSchema.set('toJSON', { virtuals: true });
documentRequestSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("DocumentRequest", documentRequestSchema);
