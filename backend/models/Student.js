const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    semester: { type: Number, required: true },
    branch: { type: String, required: true },
    CGPA: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    currentSubjects: [String],
    password: { type: String, required: true }, // 🔹 Added password field
});


module.exports = mongoose.model('Student', studentSchema);
