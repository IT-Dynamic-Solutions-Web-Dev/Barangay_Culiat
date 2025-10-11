const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import models
const User = require('./models/User');
const Report = require('./models/Report');
const Announcement = require('./models/Announcement');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Sample data
const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@barangay.com',
    password: 'admin123',
    role: 'admin',
    address: 'Barangay Culiat, Quezon City',
    phoneNumber: '09171234567',
    isActive: true,
  },
  {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan@example.com',
    password: 'password123',
    role: 'resident',
    address: 'Phase 1, Barangay Culiat',
    phoneNumber: '09181234567',
    isActive: true,
  },
  {
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria@example.com',
    password: 'password123',
    role: 'resident',
    address: 'Phase 2, Barangay Culiat',
    phoneNumber: '09191234567',
    isActive: true,
  },
];

const announcements = [
  {
    title: 'Community Clean-up Drive',
    content: 'Join us this Saturday, 8:00 AM at the Barangay Hall for our monthly community clean-up drive. Let\'s work together to keep our barangay clean and beautiful!',
    category: 'event',
    priority: 'normal',
    isPublished: true,
    publishDate: new Date(),
  },
  {
    title: 'Important: Water Interruption Notice',
    content: 'Please be advised that there will be a scheduled water interruption on Tuesday, March 15, from 9:00 AM to 3:00 PM due to maintenance work on the main pipeline.',
    category: 'alert',
    priority: 'important',
    isPublished: true,
    publishDate: new Date(),
  },
  {
    title: 'New Barangay ID Registration',
    content: 'Residents who haven\'t registered for their Barangay ID can now do so at the Barangay Hall from Monday to Friday, 9:00 AM to 5:00 PM. Please bring valid IDs and proof of residency.',
    category: 'notice',
    priority: 'normal',
    isPublished: true,
    publishDate: new Date(),
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Report.deleteMany({});
    await Announcement.deleteMany({});

    // Create users
    console.log('Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✓ Created ${createdUsers.length} users`);

    // Get admin and resident users
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const residentUser = createdUsers.find(u => u.role === 'resident');

    // Create announcements with admin as publisher
    console.log('Creating announcements...');
    const announcementsWithPublisher = announcements.map(ann => ({
      ...ann,
      publishedBy: adminUser._id,
    }));
    const createdAnnouncements = await Announcement.create(announcementsWithPublisher);
    console.log(`✓ Created ${createdAnnouncements.length} announcements`);

    // Create sample reports
    console.log('Creating sample reports...');
    const reports = [
      {
        title: 'Broken Street Light',
        description: 'The street light on the corner of Main Street and Second Avenue has been broken for three days now. It\'s making the area unsafe at night.',
        category: 'infrastructure',
        priority: 'high',
        status: 'pending',
        location: 'Main St. & 2nd Ave.',
        reportedBy: residentUser._id,
        isPrivate: true,
      },
      {
        title: 'Stray Dogs in the Area',
        description: 'There are several stray dogs roaming around Phase 3. They are becoming aggressive and might pose a danger to children.',
        category: 'safety',
        priority: 'urgent',
        status: 'in-progress',
        location: 'Phase 3',
        reportedBy: residentUser._id,
        assignedTo: adminUser._id,
        isPrivate: true,
      },
      {
        title: 'Clogged Drainage System',
        description: 'The drainage system near the market area is clogged, causing flooding during heavy rain.',
        category: 'sanitation',
        priority: 'medium',
        status: 'pending',
        location: 'Market Area',
        reportedBy: residentUser._id,
        isPrivate: true,
      },
    ];

    const createdReports = await Report.create(reports);
    console.log(`✓ Created ${createdReports.length} reports`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin:');
    console.log('  Email: admin@barangay.com');
    console.log('  Password: admin123');
    console.log('\nResident:');
    console.log('  Email: juan@example.com');
    console.log('  Password: password123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
