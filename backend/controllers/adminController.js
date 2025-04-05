const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Placement = require('../models/Placement');
const Notice = require('../models/Notice');
const parseExcelFile = require('../utils/excelParser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * 📌 Admin Registration (with optional security check)
 */
exports.adminSignup = async (req, res) => {
    try {
        const { name, email, password, secretKey } = req.body;

        // Optional: Add a secret key check to restrict admin creation
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized: Invalid secret key"
            });
        }

        // Check if an admin with this email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ 
                success: false, 
                message: "Admin with this email already exists"
            });
        }

        // Create new admin (password will be hashed by pre-save middleware)
        const admin = new Admin({ 
            name, 
            email, 
            password 
        });
        
        await admin.save();

        res.status(201).json({ 
            success: true, 
            message: "Admin account created successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Error in adminSignup:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

/**
 * 📌 Admin Login
 */
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found!" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        // Generate a token
        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, message: "Login successful!", token });

    } catch (error) {
        console.error("Error in adminLogin:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


/**
 * 📌 Add a Single Student
 */
exports.addStudent = async (req, res) => {
    try {
        const { rollNumber, registerNumber, name, semester, branch, CGPA, email, phone, currentSubjects, password } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ $or: [{ rollNumber }, { registerNumber }] });
        if (existingStudent) {
            return res.status(400).json({ success: false, message: "Student with this Roll Number or Register Number already exists!" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const student = new Student({ 
            rollNumber, 
            registerNumber,  // 🔹 Added registerNumber
            name, 
            semester, 
            branch, 
            CGPA, 
            email, 
            phone, 
            currentSubjects, 
            password: hashedPassword
        });

        await student.save();

        res.status(201).json({ success: true, message: "Student added successfully!", student });

    } catch (error) {
        console.error("Error in addStudent:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


/**
 * 📌 Add Students in Bulk (via Excel)
 */
exports.addStudentBulk = async (req, res) => {
    try {
        console.log("Starting bulk student upload process");
        
        // Check if file exists in request
        if (!req.file) {
            console.log("No file received in request");
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded", 
                error: "Please upload an Excel file" 
            });
        }
        
        console.log("File received:", req.file.originalname, "Size:", req.file.size, "Mimetype:", req.file.mimetype);
        
        // Ensure buffer exists
        if (!req.file.buffer || req.file.buffer.length === 0) {
            console.log("File buffer is empty or undefined");
            return res.status(400).json({ 
                success: false, 
                message: "Invalid file upload", 
                error: "File buffer is empty" 
            });
        }
        
        // Parse students from Excel file
        console.log("Parsing Excel file...");
        const students = await parseExcelFile(req.file.buffer);
        console.log("Parsed students:", students);
        
        if (!students || students.length === 0) {
            console.log("No student data found in Excel file");
            return res.status(400).json({ 
                success: false, 
                message: "Excel file contains no valid student data", 
                error: "No students found in file" 
            });
        }
        
        console.log(`Successfully parsed ${students.length} students from Excel file`);
        
        // Validate student data
        const validationErrors = [];
        students.forEach((student, index) => {
            // console.log(student);
            if (!student.rollNumber  || !student.name || !student.password) {
                validationErrors.push(`Row ${index + 2}: Missing required fields (rollNumber, name, or password)`);
            }
        });
        
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid student data in Excel file",
                errors: validationErrors
            });
        }
        
        // Check for duplicate roll numbers in the database
        const rollNumbers = students.map(student => student.rollNumber);
        const registerNumbers = students.map(student => student.registerNumber);

        const existingStudents = await Student.find({ 
            $or: [{ rollNumber: { $in: rollNumbers } }, { registerNumber: { $in: registerNumbers } }]
        });
        
        if (existingStudents.length > 0) {
            const duplicates = existingStudents.map(student => student.rollNumber);
            return res.status(400).json({
                success: false,
                message: "Some students already exist in the database",
                duplicates: duplicates
            });
        }

        // Hash passwords before inserting
        console.log("Hashing passwords for all students...");
        const studentsWithHashedPasswords = await Promise.all(
            students.map(async (student) => {
                const hashedPassword = await bcrypt.hash(student.password, 10);
                return { ...student, password: hashedPassword };
            })
        );

        // Insert students into database
        console.log("Inserting students into database...");
        await Student.insertMany(studentsWithHashedPasswords);
        console.log(`Successfully added ${studentsWithHashedPasswords.length} students to database`);

        res.json({ 
            success: true, 
            message: "Students added successfully!", 
            count: studentsWithHashedPasswords.length 
        });
    } catch (error) {
        console.error("Error in addStudentBulk:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add students", 
            error: error.message 
        });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;

        // Check if registerNumber already exists for another student
        if (updateData.registerNumber) {
            const existingStudent = await Student.findOne({ registerNumber: updateData.registerNumber, _id: { $ne: id } });
            if (existingStudent) {
                return res.status(400).json({ success: false, message: "Register Number already exists for another student!" });
            }
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const student = await Student.findByIdAndUpdate(id, updateData, { new: true });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found!" });
        }

        res.json({ success: true, message: "Student updated successfully!", student });

    } catch (error) {
        console.error("Error in updateStudent:", error);
        res.status(500).json({ success: false, message: "Failed to update student", error: error.message });
    }
};


exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found!" });
        }

        res.json({ success: true, message: "Student deleted successfully!" });

    } catch (error) {
        console.error("Error in deleteStudent:", error);
        res.status(500).json({ success: false, message: "Failed to delete student", error: error.message });
    }
};

/**
 * 📌 Get Student By ID
 */
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate if the ID is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID format"
            });
        }
        
        // Find the student by ID
        const student = await Student.findById(id).select('-password');
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        
        res.status(200).json({
            success: true,
            student
        });
        
    } catch (error) {
        console.error("Error in getStudentById:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch student",
            error: error.message
        });
    }
};

/**
 * 📌 Add a New Teacher
 */
exports.addTeacher = async (req, res) => {
    try {
        const { name, department, specialization, experience, email, phone, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create teacher object
        const teacher = new Teacher({ 
            name, 
            department, 
            specialization, 
            experience, 
            email, 
            phone, 
            password: hashedPassword // Save hashed password
        });

        await teacher.save();

        res.status(201).json({ success: true, message: "Teacher added successfully!", teacher });

    } catch (error) {
        console.error("Error in addTeacher:", error);
        res.status(500).json({ success: false, message: "Failed to add teacher", error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;

        // If password is being updated, hash it before saving
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found!" });
        }

        res.json({ success: true, message: "Teacher updated successfully!", teacher });

    } catch (error) {
        console.error("Error in updateTeacher:", error);
        res.status(500).json({ success: false, message: "Failed to update teacher", error: error.message });
    }
};



exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found!" });
        }

        res.json({ success: true, message: "Teacher deleted successfully!" });

    } catch (error) {
        console.error("Error in deleteTeacher:", error);
        res.status(500).json({ success: false, message: "Failed to delete teacher", error: error.message });
    }
};



/**
 * 📌 Get All Students
 */
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch students", error: error.message });
    }
};

/**
 * 📌 Get All Teachers
 */
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json({ success: true, teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch teachers", error: error.message });
    }
};

exports.addPlacement = async (req, res) => {
    try {
        const { companyName, package, requirements, dateOfVisit, applyLink } = req.body;

        // Validate the Google Form link format
        if (!applyLink.startsWith("https://")) {
            return res.status(400).json({ success: false, message: "Invalid apply link. It must be a valid URL." });
        }

        // Create new placement entry
        const placement = new Placement({ companyName, package, requirements, dateOfVisit, applyLink });

        await placement.save();

        res.status(201).json({ success: true, message: "Placement added successfully!", placement });

    } catch (error) {
        console.error("Error in addPlacement:", error);
        res.status(500).json({ success: false, message: "Failed to add placement", error: error.message });
    }
};


/**
 * 📌 Add or Update Placement Info
 */
exports.updatePlacement = async (req, res) => {
    try {
        const { id } = req.params; // Get placement ID from URL
        const updateData = req.body; // Get updated data from request body

        // Find the placement and update it
        const placement = await Placement.findByIdAndUpdate(id, updateData, { new: true });

        if (!placement) {
            return res.status(404).json({ success: false, message: "Placement not found!" });
        }

        res.json({ success: true, message: "Placement updated successfully!", placement });

    } catch (error) {
        console.error("Error in updatePlacement:", error);
        res.status(500).json({ success: false, message: "Failed to update placement", error: error.message });
    }
};


/**
 * 📌 Delete Placement
 */
exports.deletePlacement = async (req, res) => {
    try {
        await Placement.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Placement deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete placement", error: error.message });
    }
};

/**
 * 📌 Get All Placements
 */
exports.getAllPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        res.json({ success: true, placements });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch placements", error: error.message });
    }
};

/**
 * 📌 Get Placement Applicants
 */
exports.getPlacementApplicants = async (req, res) => {
    try {
        const { id } = req.params; // Get placement ID
        
        // Find placement and populate the applicants field
        const placement = await Placement.findById(id).populate({
            path: 'applicants',
            select: 'name rollNumber registerNumber email CGPA branch semester', // Don't include password
            model: 'Student'
        });
        
        if (!placement) {
            return res.status(404).json({
                success: false,
                message: "Placement not found"
            });
        }
        
        // Return the list of applicants
        res.json({
            success: true,
            placementId: placement._id,
            companyName: placement.companyName,
            applicantsCount: placement.applicants.length,
            applicants: placement.applicants
        });
        
    } catch (error) {
        console.error("Error in getPlacementApplicants:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch placement applicants",
            error: error.message
        });
    }
};

/**
 * 📌 Update Applicant Status
 */
exports.updateApplicantStatus = async (req, res) => {
    try {
        const { placementId, applicantId } = req.params;
        const { status } = req.body;
        
        // Validate status value
        const validStatuses = ['Applied', 'Selected', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value. Must be 'Applied', 'Selected', or 'Rejected'"
            });
        }
        
        // Find the placement
        const placement = await Placement.findById(placementId);
        if (!placement) {
            return res.status(404).json({
                success: false, 
                message: "Placement not found"
            });
        }
        
        // Check if applicant exists
        const applicantExists = placement.applicants.includes(applicantId);
        if (!applicantExists) {
            return res.status(404).json({
                success: false,
                message: "Applicant not found for this placement"
            });
        }
        
        // Check if we have an applicant status array
        if (!placement.applicantStatuses) {
            placement.applicantStatuses = [];
        }
        
        // Update or add the status
        const existingStatusIndex = placement.applicantStatuses.findIndex(
            item => item.applicantId.toString() === applicantId
        );
        
        if (existingStatusIndex >= 0) {
            // Update existing status
            placement.applicantStatuses[existingStatusIndex].status = status;
        } else {
            // Add new status
            placement.applicantStatuses.push({
                applicantId,
                status
            });
        }
        
        await placement.save();
        
        res.json({
            success: true,
            message: "Applicant status updated successfully",
            placementId,
            applicantId,
            status
        });
        
    } catch (error) {
        console.error("Error in updateApplicantStatus:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update applicant status",
            error: error.message
        });
    }
};

/**
 * 📌 Create Notice (Calendar Notices)
 */
exports.createNotice = async (req, res) => {
    try {
        console.log(req.body);
        const notice = new Notice(req.body);
    
        await notice.save();
        res.json({ success: true, message: "Notice created successfully!", notice });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create notice", error: error.message });
    }
};

/**
 * 📌 Delete Notice
 */
exports.deleteNotice = async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Notice deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete notice", error: error.message });
    }
};

/**
 * 📌 Get All Notices
 */
exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json({ success: true, notices });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch notices", error: error.message });
    }
};
