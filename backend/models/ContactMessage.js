// For contact message management on phase 2
const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  // Sender Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  
  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  category: {
    type: String,
    enum: [
      'general_inquiry',
      'document_request',
      'complaint',
      'suggestion',
      'emergency',
      'other'
    ],
    default: 'general_inquiry',
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['new', 'read', 'in_progress', 'resolved', 'closed', 'spam'],
    default: 'new',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  
  // User Reference (if logged in)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  
  // Admin Response
  response: {
    message: {
      type: String,
      default: null,
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    respondedAt: {
      type: Date,
      default: null,
    },
  },
  
  // Assignment
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  assignedAt: {
    type: Date,
    default: null,
  },
  
  // Additional tracking
  ipAddress: {
    type: String,
    default: null,
  },
  userAgent: {
    type: String,
    default: null,
  },
  
  // Notes (for internal use by admins)
  internalNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Attachments (optional)
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Spam detection
  isSpam: {
    type: Boolean,
    default: false,
  },
  spamScore: {
    type: Number,
    default: 0,
  },
  
  // Follow-up
  requiresFollowUp: {
    type: Boolean,
    default: false,
  },
  followUpDate: {
    type: Date,
    default: null,
  },
  
  // Read tracking
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Archive
  isArchived: {
    type: Boolean,
    default: false,
  },
  archivedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Indexes for efficient queries
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ userId: 1 });
contactMessageSchema.index({ category: 1 });
contactMessageSchema.index({ priority: 1 });
contactMessageSchema.index({ assignedTo: 1 });
contactMessageSchema.index({ isArchived: 1, status: 1 });

// Virtual for full name
contactMessageSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to mark as read by a user
contactMessageSchema.methods.markAsRead = async function(userId) {
  const alreadyRead = this.readBy.some(
    entry => entry.user.toString() === userId.toString()
  );
  
  if (!alreadyRead) {
    this.readBy.push({ user: userId, readAt: new Date() });
    if (this.status === 'new') {
      this.status = 'read';
    }
    await this.save();
  }
  return this;
};

// Method to add internal note
contactMessageSchema.methods.addInternalNote = async function(note, userId) {
  this.internalNotes.push({
    note,
    addedBy: userId,
    addedAt: new Date(),
  });
  return this.save();
};

// Method to assign to admin
contactMessageSchema.methods.assignTo = async function(adminId) {
  this.assignedTo = adminId;
  this.assignedAt = new Date();
  if (this.status === 'new' || this.status === 'read') {
    this.status = 'in_progress';
  }
  return this.save();
};

// Method to add response
contactMessageSchema.methods.addResponse = async function(responseMessage, responderId) {
  this.response = {
    message: responseMessage,
    respondedBy: responderId,
    respondedAt: new Date(),
  };
  this.status = 'resolved';
  return this.save();
};

// Static method to get unread count
contactMessageSchema.statics.getUnreadCount = async function() {
  return this.countDocuments({ 
    status: 'new',
    isArchived: false,
    isSpam: false,
  });
};

// Static method to get messages by status
contactMessageSchema.statics.getByStatus = async function(status, options = {}) {
  const query = { status, isArchived: false };
  if (options.excludeSpam) {
    query.isSpam = false;
  }
  
  return this.find(query)
    .populate('userId', 'firstName lastName email')
    .populate('assignedTo', 'firstName lastName')
    .populate('response.respondedBy', 'firstName lastName')
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
