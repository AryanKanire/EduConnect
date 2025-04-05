const Student = require('../models/Student');
const Assignment = require('../models/Assignment');
const Placement = require('../models/Placement');
const Note = require('../models/Note');
const Chat = require('../models/Chat');
const Notice = require('../models/Notice');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentAssignment = require('../models/StudentAssignment'); 
// const Attendance = require('../models/Attendance');
const Teacher = require('../models/Teacher');

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Compare entered password with stored hash
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: student._id, role: "Student" }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.json({ message: "Login successful", token, student });

    } catch (error) {
        res.status(500).json({ error: "Failed to log in", details: error.message });
    }
};

/**
 * 📌 Student Registration
 */
exports.registerStudent = async (req, res) => {
    try {
        const { rollNumber, registerNumber, name, semester, branch, CGPA, email, phone, currentSubjects, password } = req.body;
        
        // Check if student with this rollNumber, registerNumber or email already exists
        const existingStudent = await Student.findOne({
            $or: [
                { rollNumber },
                { registerNumber },
                { email }
            ]
        });
        
        if (existingStudent) {
            return res.status(400).json({ 
                success: false, 
                message: "Student with this roll number, register number, or email already exists" 
            });
        }
        
        // Create new student
        const student = new Student({
            rollNumber,
            registerNumber,
            name,
            semester,
            branch,
            CGPA,
            email,
            phone,
            currentSubjects: currentSubjects || [],
            password // Password will be hashed before saving
        });
        
        // Hash password manually if no pre-save middleware exists in the model
        if (!student.schema.pre) {
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(password, salt);
        }
        
        await student.save();
        
        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student: {
                id: student._id,
                name: student.name,
                rollNumber: student.rollNumber,
                email: student.email
            }
        });
        
    } catch (error) {
        console.error("Error in registerStudent:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

/**
 * 📌 Download Notes (Only students can download)
 */
exports.downloadNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ downloadUrl: note.fileUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to download note" });
    }
};

/**
 * 📌 Get All Notes (For Students)
 */
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes", details: error.message });
    }
};

exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * 📌 Submit Assignment
 */

exports.submitAssignment = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { assignmentId } = req.params;  // Get assignment ID from URL
        const studentId = req.user.id;  // Extract student ID from JWT token

        // ✅ Check if the assignment exists
        const assignmentExists = await Assignment.findById(assignmentId);
        if (!assignmentExists) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // ✅ Store student submission
        const studentAssignment = new StudentAssignment({
            assignmentId: assignmentId,
            studentId: studentId,
            fileUrl: req.file.path, // Uploaded file path
        });

        await studentAssignment.save();

        res.status(201).json({ message: 'Assignment submitted successfully', studentAssignment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getStudentSubmissions = async (req, res) => {
    try {
      const studentId = req.user.id; // Extract student ID from JWT token
      
      // Find all submissions for this student
      const submissions = await StudentAssignment.find({ studentId });
      
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  

/**
 * 📌 Apply for Placement
 */

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

        if (!placement) {
            return res.status(404).json({ error: "Placement not found" });
        }
        
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if student meets criteria
        if (student.CGPA < placement.requirements.minCGPA) {
            return res.status(403).json({ error: "You do not meet the eligibility criteria" });
        }

        // Use Mongoose's update method instead of modifying and saving
        const result = await Placement.findByIdAndUpdate(
            id,
            { $addToSet: { applicants: student._id } },
            { new: true }
        );
        
        if (!result) {
            return res.status(500).json({ error: "Failed to update placement" });
        }
        
        res.json({ message: "Applied successfully!" });
    } catch (error) {
        console.error("Error in applyForPlacement:", error);
        res.status(500).json({ error: error.message });
    }
};
/**
 * 📌 Get Chat Messages (Between Student & Teacher)
 */
exports.getChatMessages = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const messages = await Chat.find({
            $or: [
                { sender: req.user.id, receiver: teacherId },
                { sender: teacherId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chat messages", details: error.message });
    }
};

/**
 * 📌 Send Message to Teacher (Using Socket.io)
 */
exports.sendMessage = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message content is required" });
        }

        const senderId = req.user.id;
        const senderRole = "Student";  // Student is the sender
        const receiverRole = "Teacher";  // Teacher is the receiver

        // ✅ Save the message in MongoDB (Only needed for API requests)
        const newMessage = new Chat({
            sender: senderId,
            senderModel: senderRole,
            receiver: teacherId,
            receiverModel: receiverRole,
            message
        });

        await newMessage.save();

        // ✅ Emit message via Socket.io (if teacher is online)

        if (req.io) {
            const receiverSocket = req.io.userSocketMap.get(teacherId);
            if (receiverSocket) {
                req.io.to(receiverSocket).emit("newMessage", newMessage);
            }
        }

        res.status(201).json({ message: "Message sent successfully", newMessage });

    } catch (error) {
        res.status(500).json({ error: "Failed to send message", details: error.message });
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
 * 📌 Get All Teachers
 */
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select('-password');
        
        if (!teachers || teachers.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No teachers found' 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            count: teachers.length,
            teachers 
        });
    } catch (error) {
        console.error("Error in getAllTeachers:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error', 
            error: error.message 
        });
    }
};

/**
 * 📌 View Attendance (Read-Only)
 */
// exports.getAttendance = async (req, res) => {
//     try {
//         const attendance = await Attendance.find({ studentId: req.user.id });
//         res.json(attendance);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch attendance" });
//     }
// };
