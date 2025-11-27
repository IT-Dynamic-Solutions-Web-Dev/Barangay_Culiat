const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reportsRoute'));
app.use('/api/announcements', require('./routes/announcementsRoute'));
app.use('/api/logs', require('./routes/logsRoute'));
app.use('/api/document-requests', require('./routes/documentRequestRoute'));
// V2 routes with atomic address and file validation
app.use('/api/v2/document-requests', require('./routes/documentRequestRoute_v2'));
app.use('/api/terms', require('./routes/termsRoute'));
app.use('/api/settings', require('./routes/settingsRoute'));

// New model routes
app.use('/api/officials', require('./routes/officialsRoute'));
app.use('/api/barangay-info', require('./routes/barangayInfoRoute'));
app.use('/api/services', require('./routes/servicesRoute'));
app.use('/api/faqs', require('./routes/faqsRoute'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Barangay Culiat API is running',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
