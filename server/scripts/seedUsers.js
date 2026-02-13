const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define users to create
    const usersData = [
      // Students at different levels
      {
        name: 'John Doe',
        regNo: 'UG15/CS/1001',
        email: 'john.doe@student.edu',
        level: '100',
        role: 'student'
      },
      {
        name: 'Jane Smith',
        regNo: 'UG15/CS/1002',
        email: 'jane.smith@student.edu',
        level: '100',
        role: 'student'
      },
      {
        name: 'Michael Johnson',
        regNo: 'UG15/CS/2001',
        email: 'michael.johnson@student.edu',
        level: '200',
        role: 'student'
      },
      {
        name: 'Sarah Williams',
        regNo: 'UG15/CS/2002',
        email: 'sarah.williams@student.edu',
        level: '200',
        role: 'student'
      },
      {
        name: 'David Brown',
        regNo: 'UG15/CS/3001',
        email: 'david.brown@student.edu',
        level: '300',
        role: 'student'
      },
      {
        name: 'Emily Davis',
        regNo: 'UG15/CS/3002',
        email: 'emily.davis@student.edu',
        level: '300',
        role: 'student'
      },
      {
        name: 'James Wilson',
        regNo: 'UG15/CS/4001',
        email: 'james.wilson@student.edu',
        level: '400',
        role: 'student'
      },
      {
        name: 'Olivia Martinez',
        regNo: 'UG15/CS/4002',
        email: 'olivia.martinez@student.edu',
        level: '400',
        role: 'student'
      },
      // Admin users
      {
        name: 'Admin User',
        regNo: 'UG15/CS/ADMIN01',
        email: 'admin@university.edu',
        level: '100',
        role: 'admin'
      },
      {
        name: 'Dr. Robert Taylor',
        regNo: 'UG15/CS/ADMIN02',
        email: 'robert.taylor@university.edu',
        level: '100',
        role: 'admin'
      }
    ];

    const createdUsers = [];

    // Create each user with sample course registrations
    for (const userData of usersData) {
      let registeredCourses = [];

      // Only register courses for students
      if (userData.role === 'student') {
        // Get sample courses for the student's level
        const sampleCourses = await Course.find({ 
          level: userData.level, 
          semester: 1 
        }).limit(5);
        
        registeredCourses = sampleCourses.map(course => course._id);

        // Update enrolled count for registered courses
        if (registeredCourses.length > 0) {
          await Course.updateMany(
            { _id: { $in: registeredCourses } },
            { $inc: { enrolledCount: 1 } }
          );
        }
      }

      const user = await User.create({
        ...userData,
        password: hashedPassword,
        registeredCourses
      });

      createdUsers.push({
        name: user.name,
        email: user.email,
        regNo: user.regNo,
        role: user.role,
        level: user.level,
        coursesCount: registeredCourses.length
      });
    }

    console.log('\nCreated users:');
    console.log('='.repeat(80));
    console.log(`Password for all users: ${password}`);
    console.log('='.repeat(80));
    
    console.log('\nSTUDENTS:');
    createdUsers.filter(u => u.role === 'student').forEach(user => {
      console.log(`  ${user.name}`);
      console.log(`    Email: ${user.email}`);
      console.log(`    RegNo: ${user.regNo}`);
      console.log(`    Level: ${user.level}`);
      console.log(`    Registered Courses: ${user.coursesCount}`);
      console.log('');
    });

    console.log('ADMINS:');
    createdUsers.filter(u => u.role === 'admin').forEach(user => {
      console.log(`  ${user.name}`);
      console.log(`    Email: ${user.email}`);
      console.log(`    RegNo: ${user.regNo}`);
      console.log('');
    });

    console.log('='.repeat(80));
    console.log(`Total users created: ${createdUsers.length}`);
    console.log(`  - Students: ${createdUsers.filter(u => u.role === 'student').length}`);
    console.log(`  - Admins: ${createdUsers.filter(u => u.role === 'admin').length}`);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
