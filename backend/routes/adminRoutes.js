const express = require('express');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const { excelUpload, debugExcelUpload } = require('../middlewares/uploadMiddleware');
const jwt = require('jsonwebtoken');

const { 
    addStudentBulk, 
    addTeacher, 
    updatePlacement, 
    deletePlacement, 
    getAllPlacements, 
    getAllStudents, 
    getAllTeachers, 
    createNotice, 
    deleteNotice, 
    adminSignup,
    adminLogin,
    addStudent,
    updateStudent,
    deleteStudent,
    updateTeacher,
    deleteTeacher,
    addPlacement,
    getAllNotices,
    getPlacementApplicants,
    updateApplicantStatus,
    getStudentById
} = require('../controllers/adminController');

const router = express.Router();

// Authentication routes
router.post('/register', adminSignup); 
router.post('/login', adminLogin);
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
      
      // Check if it's an admin token
      if (decoded.role !== 'Admin' && decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Invalid token type' });
      }
  
      // Get admin data from database
      const admin = await Admin.findById(decoded.id).select('-password');
      
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      // Return admin data
      res.json({
        id: admin._id,
        name: admin.name,
        email: admin.email
      });
      
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      console.error('Error verifying admin token:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });

/**
 * 📌 Student Management
 */
router.post('/add/student', authenticateUser, authorizeAdmin, addStudent);
router.post('/add/studentsbulk', authenticateUser, authorizeAdmin, debugExcelUpload, excelUpload.single('file'), addStudentBulk);
router.put('/students/update/:id', authenticateUser, authorizeAdmin, updateStudent); 
router.delete('/students/delete/:id', authenticateUser, authorizeAdmin, deleteStudent); 
router.get('/students', authenticateUser, authorizeAdmin, getAllStudents);
router.get('/students/:id', authenticateUser, authorizeAdmin, getStudentById);

/**
 * 📌 Teacher Management
 */
router.post('/add/teachers', authenticateUser, authorizeAdmin, addTeacher);
router.put('/teachers/update/:id', updateTeacher);
router.delete('/teachers/delete/:id', deleteTeacher);
router.get('/teachers', authenticateUser, authorizeAdmin, getAllTeachers);

/**
 * 📌 Placement Management
 */
router.post('/add/placement', authenticateUser, authorizeAdmin, addPlacement);
router.put('/update/placements/:id', authenticateUser, authorizeAdmin, updatePlacement);
router.delete('/delete/placements/:id', authenticateUser, authorizeAdmin, deletePlacement);
router.get('/placements', authenticateUser, authorizeAdmin, getAllPlacements);
router.get('/placements/:id/applicants', authenticateUser, authorizeAdmin, getPlacementApplicants);
router.put('/placements/:placementId/applicants/:applicantId', authenticateUser, authorizeAdmin, updateApplicantStatus);

/**
 * 📌 Notice Management (Calendar Notices)
 */
router.get('/notices', authenticateUser, authorizeAdmin, getAllNotices)
router.get('/notices', authenticateUser, authorizeAdmin, getAllNotices);
router.post('/add/notices', authenticateUser, authorizeAdmin, createNotice);
router.delete('/notices/:id', authenticateUser, authorizeAdmin, deleteNotice);

module.exports = router;
