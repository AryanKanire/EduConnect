const Teacher = require('../models/Teacher');
const Notes = require('../models/Notes');
const Assignment = require('../models/Assignment');
const Chat = require('../models/Chat');
const cloudinary = require('../config/cloudinary');

/**
 * 📌 Upload Notes (Stored in Cloudinary)
 */
exports.uploadNotes = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const note = new Notes({
            teacherId: req.user.id,
            fileUrl: result.secure_url,
            fileName: req.file.originalname
        });

        await note.save();
        res.json({ message: "Notes uploaded successfully!", note });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload notes" });
    }
};

/**
 * 📌 Get Uploaded Notes by Teacher
 */
exports.getUploadedNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ teacherId: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

/**
 * 📌 Upload Assignment (Stored in Cloudinary)
 */
exports.uploadAssignment = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const assignment = new Assignment({
            teacherId: req.user.id,
            fileUrl: result.secure_url,
            fileName: req.file.originalname
        });

        await assignment.save();
        res.json({ message: "Assignment uploaded successfully!", assignment });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload assignment" });
    }
};

/**
 * 📌 Get All Uploaded Assignments
 */
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ teacherId: req.user.id });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch assignments" });
    }
};

/**
 * 📌 Fetch Chat Messages between Teacher & Student
 */
exports.getChatMessages = async (req, res) => {
    try {
        const { studentId } = req.params;
        const messages = await Chat.find({
            $or: [
                { sender: req.user.id, receiver: studentId },
                { sender: studentId, receiver: req.user.id }
            ]
        }).sort('timestamp');

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chat messages" });
    }
};

/**
 * 📌 Send Message to Student (Using Socket.io)
 */
exports.sendMessage = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { message } = req.body;

        const chatMessage = new Chat({
            sender: req.user.id,
            receiver: studentId,
            message,
            timestamp: new Date()
        });

        await chatMessage.save();

        // Emit the message via Socket.io
        req.io.to(studentId).emit("newMessage", chatMessage);

        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
};

/**
 * 📌 View Teacher Profile (Read-Only)
 */
exports.getTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id).select('-password');
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};
