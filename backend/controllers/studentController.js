const Student = require('../models/Student');
const Assignment = require('../models/Assignment');
const Placement = require('../models/Placement');
const Chat = require('../models/Chat');
const Notice = require('../models/Notice');
const Attendance = require('../models/Attendance');

/**
 * 📌 Download Notes (Only students can download)
 */
exports.downloadNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Notes.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ downloadUrl: note.fileUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to download note" });
    }
};

/**
 * 📌 Submit Assignment
 */
exports.submitAssignment = async (req, res) => {
    try {
        const { assignmentId, fileUrl } = req.body;
        const assignment = new Assignment({
            studentId: req.user.id,
            assignmentId,
            fileUrl,
            submittedAt: new Date()
        });
        await assignment.save();
        res.json({ message: "Assignment submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit assignment" });
    }
};

/**
 * 📌 Apply for Placement
 */

const Placement = require('../models/Placement');

/**
 * 📌 Get All Placement Opportunities
 */
exports.getAllPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        res.json(placements);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch placements" });
    }
};

exports.applyForPlacement = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(req.user.id);
        const placement = await Placement.findById(id);

        if (!placement || !student) {
            return res.status(404).json({ error: "Invalid placement or student" });
        }

        // Check if student meets criteria
        if (student.CGPA < placement.requirements.minCGPA) {
            return res.status(403).json({ error: "You do not meet the eligibility criteria" });
        }

        placement.applicants.push(student._id);
        await placement.save();
        res.json({ message: "Applied successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to apply for placement" });
    }
};

/**
 * 📌 Fetch Chat Messages between Student & Teacher
 */
exports.getChatMessages = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const messages = await Chat.find({
            $or: [
                { sender: req.user.id, receiver: teacherId },
                { sender: teacherId, receiver: req.user.id }
            ]
        }).sort('timestamp');

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chat messages" });
    }
};

/**
 * 📌 Send Message to Teacher (Using Socket.io)
 */
exports.sendMessage = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { message } = req.body;

        const chatMessage = new Chat({
            sender: req.user.id,
            receiver: teacherId,
            message,
            timestamp: new Date()
        });

        await chatMessage.save();

        // Emit the message via Socket.io
        req.io.to(teacherId).emit("newMessage", chatMessage);

        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
};

/**
 * 📌 Get Notices from Admin
 */
exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notices" });
    }
};

/**
 * 📌 View Student Profile (Read-Only)
 */
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password');
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};

/**
 * 📌 View Attendance (Read-Only)
 */
exports.getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ studentId: req.user.id });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch attendance" });
    }
};
