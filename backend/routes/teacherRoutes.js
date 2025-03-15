const express = require('express');
const { authenticateUser, authorizeTeacher } = require('../middlewares/authMiddleware');
const { cloudinaryUpload } = require('../middlewares/uploadMiddleware'); // Corrected file upload middleware

const {
    uploadNotes,
    getUploadedNotes,
    uploadAssignment,
    getAssignments,
    getChatMessages,
    sendMessage,
    getTeacherProfile
} = require('../controllers/teacherController');

const router = express.Router();

/**
 * 📌 Notes Section (Upload & View Notes)
 */
router.post('/notes/upload', authenticateUser, authorizeTeacher, cloudinaryUpload.single('file'), uploadNotes);
router.get('/notes', authenticateUser, authorizeTeacher, getUploadedNotes);

/**
 * 📌 Assignment Section (Upload & View Assignments)
 */
router.post('/assignments/upload', authenticateUser, authorizeTeacher, cloudinaryUpload.single('file'), uploadAssignment);
router.get('/assignments', authenticateUser, authorizeTeacher, getAssignments);

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
