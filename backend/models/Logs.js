const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        // Removed strict enum validation so controllers can use structured
        // LOGCONSTANTS values (e.g. 'CREATE ANNOUNCEMENT') without Mongoose
        // validation errors. If you prefer strict enums, sync this list with
        // `backend/config/logConstants.js`.
        index: true,
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
