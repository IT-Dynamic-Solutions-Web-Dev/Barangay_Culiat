const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = {
  proofs: 'uploads/proofs',
  validIDs: 'uploads/validIDs',
  documents: 'uploads/documents',
  photos: 'uploads/photos',
  achievements: 'uploads/achievements',
};

// Create directories if they don't exist
Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage with dynamic destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = uploadDirs.proofs; // default
    
    // Determine directory based on field name
    if (file.fieldname === 'validID') {
      uploadDir = uploadDirs.validIDs;
    } else if (file.fieldname === 'photo1x1') {
      uploadDir = uploadDirs.photos;
    } else if (file.fieldname === 'supportingDocuments') {
      uploadDir = uploadDirs.documents;
    } else if (file.fieldname === 'proofOfResidency') {
      uploadDir = uploadDirs.proofs;
    } else if (file.fieldname === 'achievementImage') {
      uploadDir = uploadDirs.achievements;
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const prefix = file.fieldname || 'file';
    cb(null, prefix + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only images (JPG, JPEG, PNG only for strict validation)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

module.exports = upload;
