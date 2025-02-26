const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    semester: { type: Number, required: true },
    subject: { type: String, required: true },
});

module.exports = mongoose.model('Notes', notesSchema);
