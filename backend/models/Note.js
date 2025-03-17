const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true }, 
    fileName: { type: String, required: true },  
    year: { type: String, required: true }, 
    subject: { type: String, required: true }, 
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
