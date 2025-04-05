const express = require('express');
const { authenticateUser, authorizeStudent } = require('../middlewares/authMiddleware');

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

/**
 * 📌 Notes Section (Download Notes)
 */
router.get('/notes/:id', authenticateUser, authorizeStudent, downloadNotes);

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
