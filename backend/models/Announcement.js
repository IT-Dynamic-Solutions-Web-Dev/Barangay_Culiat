const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Announcement title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Announcement content is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['event', 'notice', 'alert', 'update', 'general'],
  },
  priority: {
    type: String,
    enum: ['normal', 'important', 'urgent'],
    default: 'normal',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  publishDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Announcement', announcementSchema);
