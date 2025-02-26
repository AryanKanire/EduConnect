const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
