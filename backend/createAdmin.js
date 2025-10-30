const mongoose = require('mongoose');
const User = require('./models/User');
const ROLES = require('./config/roles');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB Connected...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@barangayculiat.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Vergel',
      lastName: 'Admin',
      email: 'admin@barangayculiat.com',
      password: 'password',
      role: ROLES.Admin, // 74933
      address: 'Barangay Culiat, Quezon City',
      phoneNumber: '+63 123 456 7890',
      isActive: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: admin@barangayculiat.com');
    console.log('Password: password');
    console.log('Role: Admin');
    console.log('-----------------------------------');
    console.log('You can now login with these credentials');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
