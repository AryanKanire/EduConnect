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
    deleteNotice 
} = require('../controllers/adminController');

const router = express.Router();

/**
 * 📌 Student Management
 */
router.post('/students/bulk', authenticateUser, authorizeAdmin, excelUpload.single('file'), addStudentBulk);
router.get('/students', authenticateUser, authorizeAdmin, getAllStudents);

/**
 * 📌 Teacher Management
 */
router.post('/teachers', authenticateUser, authorizeAdmin, addTeacher);
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
