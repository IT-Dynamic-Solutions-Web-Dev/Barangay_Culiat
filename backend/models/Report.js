const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Report title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Report description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['infrastructure', 'safety', 'health', 'sanitation', 'other'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  location: {
    type: String,
    trim: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isPrivate: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Report', reportSchema);
