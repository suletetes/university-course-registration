const Course = require('../models/Course');
const User = require('../models/User');

// Get all student slips with their registered courses
const getAllStudentSlips = async (req, res) => {
  try {
    // Find all users with role 'student' and populate their registered courses
    const students = await User.find({ role: 'student' })
      .populate('registeredCourses')
      .sort({ name: 1 }); // Sort by name in ascending order

    // Return the list of students with their course details
    res.status(200).json({
      status: 'success',
      count: students.length,
      data: students
    });

  } catch (error) {
    console.error('Error fetching student slips:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching student slips',
      error: error.message
    });
  }
};

// Get admin dashboard stats
const getAdminStats = async (req, res) => {
  try {
    const [studentCount, courseCount] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Course.countDocuments(),
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        students: studentCount,
        courses: courseCount,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching admin stats',
      error: error.message,
    });
  }
};

// Get all courses (admin)
const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ level: 1, courseCode: 1 });

    res.status(200).json({
      status: 'success',
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Error fetching courses for admin:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching courses',
      error: error.message,
    });
  }
};

// Create a new course (admin)
const createCourse = async (req, res) => {
  try {
    const { courseCode, courseName, semester, creditUnit, level } = req.body;

    if (!courseCode || !courseName || !semester || !creditUnit || !level) {
      return res.status(400).json({
        status: 'error',
        message:
          'Please provide courseCode, courseName, semester, creditUnit, and level',
      });
    }

    const existingCourse = await Course.findOne({
      courseCode: courseCode.toUpperCase(),
    });

    if (existingCourse) {
      return res.status(400).json({
        status: 'error',
        message: 'Course code already exists',
      });
    }

    const course = await Course.create({
      courseCode: courseCode.toUpperCase(),
      courseName,
      semester,
      creditUnit,
      level,
    });

    res.status(201).json({
      status: 'success',
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating course',
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudentSlips,
  getAdminStats,
  getAllCoursesAdmin,
  createCourse,
};
