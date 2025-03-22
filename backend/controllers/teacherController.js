const cloudinary = require('../config/cloudinary');
const Note = require('../models/Note');
const Assignment = require('../models/Assignment');
const Chat = require('../models/Chat');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentAssignment = require('../models/StudentAssignment');


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
        console.log("==== CONTROLLER START ====");
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Safer property access
        console.log("File object received:", JSON.stringify(req.file, null, 2));
        
        const { title, description, year, subject } = req.body;

        // Ensure required fields are provided
        if (!year || !subject || !title) {
            return res.status(400).json({ success: false, message: "Year, Subject, and Title are required" });
        }
        
        // Use safer property access with optional chaining
        let fileUrl = '';
        if (req.file?.path) {
            fileUrl = req.file.path;
        } else if (req.file?.secure_url) {
            fileUrl = req.file.secure_url;
        } else if (req.file?.url) {
            fileUrl = req.file.url;
        }
        
        let fileName = '';
        if (req.file?.originalname) {
            fileName = req.file.originalname;
        } else if (req.file?.original_filename) {
            fileName = req.file.original_filename;
        } else if (req.file?.filename) {
            fileName = req.file.filename;
        } else {
            fileName = 'unnamed';
        }

        console.log("Extracted file properties:", {
            fileUrl,
            fileName
        });

        // Check if file URL was successfully extracted
        if (!fileUrl) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to process file upload. No URL available.' 
            });
        }

        const note = new Note({
            teacher: req.user.id,
            title,
            description,
            fileUrl: fileUrl,
            fileName: fileName,
            year,
            subject
        });

        await note.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Notes uploaded successfully', 
            note: {
                id: note._id,
                title: note.title,
                fileName: note.fileName,
                fileUrl: note.fileUrl,
                year: note.year,
                subject: note.subject
            }
        });

    } catch (error) {
        console.error("Error in uploadNotes:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
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
        const { title, dueDate } = req.body;

        const assignment = new Assignment({
            fileUrl: path,
            title: title,
            uploadedBy: req.user.id,
            dueDate: dueDate,
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

exports.viewSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        const submissions = await StudentAssignment.find({ assignmentId })
            .populate('studentId', 'name rollNumber email') // Get student details
            .populate('assignmentId', 'title dueDate'); // Get assignment details

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this assignment' });
        }

        res.status(200).json({ message: 'Submissions retrieved successfully', submissions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateSubmissionStatus = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { status } = req.body; // New status (Pending, Reviewed, Graded)

        const submission = await StudentAssignment.findByIdAndUpdate(
            submissionId,
            { status },
            { new: true }
        );

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json({ message: 'Submission status updated', submission });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
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
                { sender: req.user.id, senderModel: "Teacher", receiver: studentId, receiverModel: "Student" },
                { sender: studentId, senderModel: "Student", receiver: req.user.id, receiverModel: "Teacher" }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
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
            return res.status(400).json({ message: "Message content required" });
        }

        const senderRole = "Teacher"; // "Teacher" or "Student"
        const senderId = req.user.id;
        const receiverRole = senderRole === "Teacher" ? "Student" : "Teacher";

        // ✅ Store the message in MongoDB (ONLY HERE FOR API)
        const newMessage = new Chat({
            sender: senderId,
            senderModel: senderRole,
            receiver: studentId,
            receiverModel: receiverRole,
            message
        });

        await newMessage.save();

        // ✅ Emit the message via Socket.io (ONLY for real-time users)
        if (req.io) {
            const receiverSocket = req.io.userSocketMap.get(studentId);
            if (receiverSocket) {
                req.io.to(receiverSocket).emit("newMessage", newMessage);
            }
        }

        res.status(201).json({ message: "Message sent successfully", newMessage });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
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
