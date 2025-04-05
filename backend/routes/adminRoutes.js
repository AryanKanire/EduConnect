const express = require('express');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const { excelUpload, debugExcelUpload } = require('../middlewares/uploadMiddleware');

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
router.get('/notices', authenticateUser, authorizeAdmin, getAllNotices);
router.post('/add/notices', authenticateUser, authorizeAdmin, createNotice);
router.delete('/notices/:id', authenticateUser, authorizeAdmin, deleteNotice);

module.exports = router;
