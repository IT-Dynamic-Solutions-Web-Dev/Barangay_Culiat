const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: [
            'CREATE_ACCOUNT',
            'REPORT',
            'USER_ACTION',
            'BACKUP_DATABASE',
            'DELETE_DATABASE',
            'BARANGAY_ID_REQUEST',
            'BARANGAY_ID_REQUEST_STATUS_UPDATE',
            'BARANGAY_ID_REQUEST_DELETE',
            'OTHER'
        ]
    },
    description: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    performedByRole: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Logs', logSchema);

// example log entry
// {
//     action: 'USER_ACTION',
//     description: 'User JohnDoe created a new report.',
//     performedBy: '60d0fe4f5311236168a109ca', // User ID reference
//     timestamp: '2023-10-05T14:48:00.000Z'
// }
// Parang may kulang tho. I'll check later.
