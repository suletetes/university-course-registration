const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  semester: { type: Number, enum: [1, 2], required: true },
  creditUnit: { type: Number, enum: [2, 3], required: true },
  level: { type: String, required: true, enum: ['100', '200', '300', '400', '500'] } // So students only see their level's courses
});

module.exports = mongoose.model('Course', CourseSchema);