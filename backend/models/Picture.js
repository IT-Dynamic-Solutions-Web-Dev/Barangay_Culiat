const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number },
}, { _id: false });

const pictureSchema = new mongoose.Schema({
  // Basic file info
  filename: { type: String, required: true, trim: true },
  originalName: { type: String, trim: true },
  encoding: { type: String },
  mimeType: { type: String },
  size: { type: Number }, // bytes

  // URLs / storage paths
  url: { type: String },


  // Integrity / processing
  checksum: { type: String }, // optional file hash
  processed: { type: Boolean, default: false },

  // Image specific metadata
  width: { type: Number },
  height: { type: Number },
  aspectRatio: { type: Number },
  crop: { type: cropSchema },

  // Usage / classification
  isProfilePicture: { type: Boolean, default: false },
  isDocument: { type: Boolean, default: false },
  documentType: {
    type: String,
    enum: ['id', 'certificate', 'clearance', 'avatar', 'thumbnail', 'other'],
  },

  // Relations: flexible refPath pattern so this picture can be attached to different models
  relatedModel: {
    type: String,
    enum: ['User', 'Report', 'Announcement', 'DocumentRequest', 'Logs', 'Other'],
  },
  relatedId: { type: mongoose.Schema.Types.ObjectId, refPath: 'relatedModel' },

  // Who uploaded the file
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Misc
  tags: [{ type: String }],
  status: { type: String, enum: ['active', 'archived', 'deleted'], default: 'active' },
  notes: { type: String },

  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});


module.exports = mongoose.model('Picture', pictureSchema);
