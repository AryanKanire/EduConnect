const express = require('express');
const { authenticateUser, authorizeTeacher } = require('../middlewares/authMiddleware');

const {
    uploadNotes,
    getUploadedNotes,
    uploadAssignment,
    getAssignments,
    getChatMessages,
    sendMessage,
    getTeacherProfile
} = require('../controllers/teacherController');

const uploadMiddleware = require('../middlewares/uploadMiddleware'); // Middleware for file uploads

const router = express.Router();

/**
 * 📌 Notes Section (Upload Notes)
 */
router.post('/notes/upload', authenticateUser, authorizeTeacher, uploadMiddleware, uploadNotes);
router.get('/notes', authenticateUser, authorizeTeacher, getUploadedNotes); // Get all uploaded notes by the teacher

/**
 * 📌 Assignment Section (Upload & View Assignments)
 */
router.post('/assignments/upload', authenticateUser, authorizeTeacher, uploadMiddleware, uploadAssignment);
router.get('/assignments', authenticateUser, authorizeTeacher, getAssignments); // Get all uploaded assignments

/**
 * 📌 Chat Section (Teacher ↔ Student Chat using Socket.io)
 */
router.get('/chat/:studentId', authenticateUser, authorizeTeacher, getChatMessages);
router.post('/chat/:studentId', authenticateUser, authorizeTeacher, sendMessage);

/**
 * 📌 Teacher Profile (View Profile - Cannot Edit)
 */
router.get('/profile', authenticateUser, authorizeTeacher, getTeacherProfile);

module.exports = router;
