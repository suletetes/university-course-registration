const express = require('express');
const {
	getAllStudentSlips,
	getAdminStats,
	getAllCoursesAdmin,
	createCourse,
} = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /students - Get all student slips with registered courses (protected - admin only)
router.get('/students', protect, isAdmin, getAllStudentSlips);

// GET /stats - Admin dashboard stats (protected - admin only)
router.get('/stats', protect, isAdmin, getAdminStats);

// GET /courses - Get all courses (protected - admin only)
router.get('/courses', protect, isAdmin, getAllCoursesAdmin);

// POST /courses - Create a course (protected - admin only)
router.post('/courses', protect, isAdmin, createCourse);

module.exports = router;
