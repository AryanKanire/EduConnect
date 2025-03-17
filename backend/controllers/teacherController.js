const cloudinary = require('../config/cloudinary');
const Note = require('../models/Note');
const Assignment = require('../models/Assignment');
const Chat = require('../models/Chat');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * 📌 Teacher Login
 */
exports.teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if teacher exists
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found!" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        // Generate a token
        const token = jwt.sign({ id: teacher._id, role: "teacher" }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, message: "Login successful!", token });

    } catch (error) {
        console.error("Error in teacherLogin:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


/**
 * 📌 Upload Notes (Teacher uploads notes)
 */
exports.uploadNotes = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description, year, subject } = req.body;

        // Ensure required fields are provided
        if (!year || !subject || !title) {
            return res.status(400).json({ message: "Year, Subject, and Title are required" });
        }

        const { path, originalname } = req.file;

        const note = new Note({
            teacher: req.user.id, // Ensure authentication middleware is used
            title,
            description,
            fileUrl: path,  // Cloudinary file URL
            fileName: originalname,
            year,
            subject
        });

        await note.save();
        res.status(201).json({ success: true, message: 'Notes uploaded successfully', note });

    } catch (error) {
        console.error("Error in uploadNotes:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


/**
 * 📌 Get Uploaded Notes (Teacher views uploaded notes)
 */
exports.getUploadedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ teacher: req.user.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * 📌 Upload Assignment (Teacher uploads assignments)
 */
exports.uploadAssignment = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { path, originalname } = req.file;

        const assignment = new Assignment({
            teacher: req.user.id,
            fileUrl: path,
            fileName: originalname,
        });

        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * 📌 Get Assignments (Teacher views uploaded assignments)
 */
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ teacher: req.user.id });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * 📌 Get Chat Messages (Between Teacher & Student)
 */
exports.getChatMessages = async (req, res) => {
    try {
        const { studentId } = req.params;
        const messages = await Chat.find({
            $or: [
                { sender: req.user.id, receiver: studentId },
                { sender: studentId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * 📌 Send Message (Between Teacher & Student)
 */
exports.sendMessage = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message content required' });
        }

        const newMessage = new Chat({
            sender: req.user.id,
            receiver: studentId,
            message,
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * 📌 Get Teacher Profile (Read-Only)
 */
exports.getTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id).select('-password');
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
