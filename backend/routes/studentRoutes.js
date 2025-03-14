const express = require('express');
const { authenticateUser, authorizeStudent } = require('../middlewares/authMiddleware');

const {
    downloadNotes,
    submitAssignment,
    applyForPlacement,
    getAllPlacements,  // New function to fetch all placements
    getChatMessages,
    sendMessage,
    getNotices,
    getStudentProfile,
    getAttendance
} = require('../controllers/studentController');

const router = express.Router();

/**
 * 📌 Notes Section (Download Notes)
 */
router.get('/notes/:id', authenticateUser, authorizeStudent, downloadNotes);

/**
 * 📌 Assignment Section (Submit Assignments)
 */
router.post('/assignments/submit', authenticateUser, authorizeStudent, submitAssignment);

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
 * 📌 Attendance (View Only)
 */
router.get('/attendance', authenticateUser, authorizeStudent, getAttendance);

module.exports = router;
