const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Placement = require('../models/Placement');
const Notice = require('../models/Notice');
const parseExcelFile = require('../utils/excelParser');

/**
 * 📌 Add Students in Bulk (via Excel)
 */
exports.addStudentBulk = async (req, res) => {
    try {
        const students = await parseExcelFile(req.file.buffer);
        await Student.insertMany(students);
        res.json({ message: "Students added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * 📌 Add a New Teacher
 */
exports.addTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.json({ message: "Teacher added successfully!", teacher });
    } catch (error) {
        res.status(500).json({ error: "Failed to add teacher" });
    }
};

/**
 * 📌 Get All Students
 */
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
};

/**
 * 📌 Get All Teachers
 */
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch teachers" });
    }
};

/**
 * 📌 Add or Update Placement Info
 */
exports.updatePlacement = async (req, res) => {
    try {
        const { companyName, package, requirements, visitDate } = req.body;
        const placement = new Placement({ companyName, package, requirements, visitDate });
        await placement.save();
        res.json({ message: "Placement updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update placement" });
    }
};

/**
 * 📌 Delete Placement
 */
exports.deletePlacement = async (req, res) => {
    try {
        await Placement.findByIdAndDelete(req.params.id);
        res.json({ message: "Placement deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete placement" });
    }
};

/**
 * 📌 Get All Placements
 */
exports.getAllPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        res.json(placements);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch placements" });
    }
};

/**
 * 📌 Create Notice (Calendar Notices)
 */
exports.createNotice = async (req, res) => {
    try {
        const notice = new Notice(req.body);
        await notice.save();
        res.json({ message: "Notice created successfully!", notice });
    } catch (error) {
        res.status(500).json({ error: "Failed to create notice" });
    }
};

/**
 * 📌 Delete Notice
 */
exports.deleteNotice = async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ message: "Notice deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete notice" });
    }
};
