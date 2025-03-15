const express = require('express');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const { excelUpload } = require('../middlewares/uploadMiddleware');

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
    deleteTeacher
} = require('../controllers/adminController');

const router = express.Router();

router.post('/signup', adminSignup); 
router.post('/login', adminLogin);

/**
 * 📌 Student Management
 */
router.post('/students', authenticateUser, authorizeAdmin, addStudent);
router.post('/students/bulk', authenticateUser, authorizeAdmin, excelUpload.single('file'), addStudentBulk);
router.put('/students/update/:id', authenticateUser, authorizeAdmin, updateStudent); 
router.delete('/students/delete/:id', authenticateUser, authorizeAdmin, deleteStudent); 
router.get('/students', authenticateUser, authorizeAdmin, getAllStudents);

/**
 * 📌 Teacher Management
 */
router.post('/teachers', authenticateUser, authorizeAdmin, addTeacher);
router.put('/teachers/update/:id', updateTeacher);
router.delete('/teachers/delete/:id', deleteTeacher);
router.get('/teachers', authenticateUser, authorizeAdmin, getAllTeachers);

/**
 * 📌 Placement Management
 */
router.post('/placements', authenticateUser, authorizeAdmin, updatePlacement);
router.delete('/placements/:id', authenticateUser, authorizeAdmin, deletePlacement);
router.get('/placements', authenticateUser, authorizeAdmin, getAllPlacements);

/**
 * 📌 Notice Management (Calendar Notices)
 */
router.post('/notices', authenticateUser, authorizeAdmin, createNotice);
router.delete('/notices/:id', authenticateUser, authorizeAdmin, deleteNotice);

module.exports = router;
