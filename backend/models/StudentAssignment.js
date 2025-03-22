const mongoose = require('mongoose');

const studentAssignmentSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    fileUrl: { type: String, required: true },  // Student's uploaded file
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Graded'], default: 'Pending' }
});

module.exports = mongoose.model('StudentAssignment', studentAssignmentSchema);
