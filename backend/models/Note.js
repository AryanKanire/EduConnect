const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true }, // Cloudinary file URL
    year: { type: String, required: true }, // Example: "3rd-year"
    subject: { type: String, required: true }, // Example: "Project Management"
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Reference to Teacher model
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
