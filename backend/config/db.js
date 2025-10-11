const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://itdynamicsolutions_db_user:L2gXX6xZtza6pcdL@brgyculiat.htjphix.mongodb.net/?retryWrites=true&w=majority&appName=BrgyCuliat");
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
