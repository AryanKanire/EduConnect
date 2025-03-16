const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }, // 🔹 Added password field
});

// 🔹 Hash password before saving
teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Teacher', teacherSchema);
