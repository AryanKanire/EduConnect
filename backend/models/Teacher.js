const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Teacher', teacherSchema);
