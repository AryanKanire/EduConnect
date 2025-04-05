const express = require('express');
const { authenticateUser, authorizeStudent } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const {
    downloadNotes,
    submitAssignment,
    applyForPlacement,
    getAllPlacements,
    getChatMessages,
    sendMessage,
    getNotices,
    getStudentProfile,
    loginStudent,
    getAssignments,
    getNotes, // Import the new function
    getStudentSubmissions,
    getAllTeachers,
    registerStudent
    // getAttendance
} = require('../controllers/studentController');
const { cloudinaryUpload } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Authentication routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

router.get('/verify-token', async (req, res) => {
    try {
      // Get token from authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      const token = authHeader.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if it's a student token
      if (decoded.role !== 'Student' && decoded.role !== 'student') {
        return res.status(403).json({ error: 'Invalid token type' });
      }
  
      // Get student data from database
      const student = await Student.findById(decoded.id).select('-password');
      
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Return student data
      res.json({
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        registerNumber: student.registerNumber,
        semester: student.semester,
        branch: student.branch,
        CGPA: student.CGPA,
        phone: student.phone,
        currentSubjects: student.currentSubjects
      });
      
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      console.error('Error verifying student token:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });
  


/**
 * 📌 Notes Section (Download Notes & Get All Notes)
 */
router.get('/notes/:id', authenticateUser, authorizeStudent, downloadNotes);
router.get('/notes', authenticateUser, authorizeStudent, getNotes); // ✅ New route to get all notes

/**
 * 📌 Assignment Section (Submit Assignments)
 */
router.get('/assignments/get',authenticateUser, authorizeStudent, getAssignments);
router.post('/submit-assignment/:assignmentId', authenticateUser, authorizeStudent,cloudinaryUpload.single('file'), submitAssignment);
router.get('/assignments/submissions', authenticateUser, authorizeStudent, getStudentSubmissions);

/**
 * 📌 Placement Section (Apply for Placement & View Placements)
 */
router.post('/placements/apply/:id', authenticateUser, authorizeStudent, applyForPlacement);
router.get('/placements', authenticateUser, authorizeStudent, getAllPlacements); // ✅ Get all placement opportunities

/**
 * 📌 Chat Section (Student ↔ Teacher Chat using Socket.io)
 */
router.get('/chat/:teacherId', authenticateUser, authorizeStudent, getChatMessages);
router.post('/chat/:teacherId', authenticateUser, authorizeStudent, sendMessage);

/**
 * 📌 Notice Board (View Notices)
 */
router.get('/notices', authenticateUser, authorizeStudent, getNotices);

/**
 * 📌 Student Profile (View Profile - Cannot Edit)
 */
router.get('/profile', authenticateUser, authorizeStudent, getStudentProfile);

/**
 * 📌 Teacher Management
 */
router.get('/teachers', authenticateUser, authorizeStudent, getAllTeachers);

/**
 * 📌 Attendance (View Only)
 */
// router.get('/attendance', authenticateUser, authorizeStudent, getAttendance);

module.exports = router;
