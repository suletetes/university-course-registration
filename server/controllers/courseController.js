const Course = require('../models/Course');
const User = require('../models/User');

// Get all available courses
const getAllCourses = async (req, res, next) => {
  try {
    const { level, includeLevels } = req.query;

    // Validate that level is provided
    if (!level) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Level is required. Please provide your current level.'
      });
    }

    // Build the query to include current level and any carry-over levels
    let levelsToInclude = [level];
    
    // If includeLevels is provided (comma-separated string of levels), add them
    if (includeLevels) {
      const additionalLevels = includeLevels.split(',').map(l => l.trim());
      levelsToInclude = [...new Set([...levelsToInclude, ...additionalLevels])];
    }

    // Find courses that match any of the specified levels
    const courses = await Course.find({ 
      level: { $in: levelsToInclude } 
    }).sort({ level: 1, courseCode: 1 });

    res.status(200).json({
      status: 'success',
      count: courses.length,
      currentLevel: level,
      levelsIncluded: levelsToInclude,
      message: levelsToInclude.length > 1 
        ? 'Courses include carry-overs from previous levels' 
        : 'Courses for your current level only',
      data: courses
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    next(error); // Forward to error handler
  }
};

// Register courses for a student
const registerCourses = async (req, res, next) => {
  try {
    const { courseIds, userId } = req.body;

    // Fetch the courses from the database
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Check if all courses were found
    if (courses.length !== courseIds.length) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: 'One or more courses not found' 
      });
    }

    // Calculate the total credit units
    const totalCreditUnits = courses.reduce((sum, course) => sum + course.creditUnit, 0);

    // Check if total exceeds 36 units
    if (totalCreditUnits > 36) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'Credit unit limit exceeded (Max: 36)',
        totalCreditUnits
      });
    }

    // Update the user's registeredCourses field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { registeredCourses: courseIds },
      { new: true, runValidators: true }
    ).populate('registeredCourses');

    if (!updatedUser) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: 'User not found' 
      });
    }

    // Return success response with updated user
    res.status(200).json({
      status: 'success',
      message: 'Courses registered successfully',
      totalCreditUnits,
      user: updatedUser
    });

  } catch (error) {
    console.error('Error registering courses:', error);
    next(error); // Forward to error handler
  }
};

// Get registered courses for the logged-in student
const getRegisteredCourses = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    const user = await User.findById(userId).populate('registeredCourses');

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    const registeredCourses = user.registeredCourses || [];
    const totalCreditUnits = registeredCourses.reduce(
      (sum, course) => sum + course.creditUnit,
      0
    );

    res.status(200).json({
      status: 'success',
      message: registeredCourses.length
        ? 'Registered courses retrieved successfully'
        : 'No registered courses found',
      totalCreditUnits,
      courses: registeredCourses
    });
  } catch (error) {
    console.error('Error fetching registered courses:', error);
    next(error); // Forward to error handler
  }
};

module.exports = {
  getAllCourses,
  registerCourses,
  getRegisteredCourses
};
