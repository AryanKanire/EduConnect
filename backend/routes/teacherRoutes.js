const express = require('express');
const { authenticateUser, authorizeTeacher } = require('../middlewares/authMiddleware');
const { cloudinaryUpload, debugFileUpload } = require('../middlewares/uploadMiddleware'); // Corrected file upload middleware

const {
    uploadNotes,
    getUploadedNotes,
    uploadAssignment,
    getAssignments,
    getChatMessages,
    sendMessage,
    getTeacherProfile,
    teacherLogin,
    viewSubmissions,
    updateSubmissionStatus
} = require('../controllers/teacherController');

const router = express.Router();

router.post('/login', teacherLogin);

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
      
      // Check if it's a teacher token
      if (decoded.role !== 'Teacher' && decoded.role !== 'teacher') {
        return res.status(403).json({ error: 'Invalid token type' });
      }
  
      // Get teacher data from database
      const teacher = await Teacher.findById(decoded.id).select('-password');
      
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Return teacher data
      res.json({
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
        specialization: teacher.specialization,
        experience: teacher.experience,
        phone: teacher.phone
      });
      
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      console.error('Error verifying teacher token:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });

/**
 * 📌 Notes Section (Upload & View Notes)
 */
router.post('/notes/upload', authenticateUser, authorizeTeacher, debugFileUpload, cloudinaryUpload.single('file'), uploadNotes);
router.get('/notes', authenticateUser, authorizeTeacher, getUploadedNotes);

/**
 * 📌 Assignment Section (Upload & View Assignments)
 */
router.post('/assignments/upload', authenticateUser, authorizeTeacher, cloudinaryUpload.single('file'), uploadAssignment);
router.get('/assignments', authenticateUser, authorizeTeacher, getAssignments);
router.get('/view-submissions/:assignmentId',authenticateUser, authorizeTeacher, viewSubmissions);
router.put('/update-submission-status/:submissionId',authenticateUser, authorizeTeacher,updateSubmissionStatus);

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
