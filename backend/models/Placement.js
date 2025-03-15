const mongoose = require('mongoose');

const PlacementSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    package: {
        type: Number, // Salary package in LPA
        required: true
    },
    requirements: {
        type: [String], // Array of requirements (e.g., CGPA, skills)
        required: true
    },
    dateOfVisit: {
        type: Date,
        required: true
    },
    appliedStudents: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            },
            status: {
                type: String,
                enum: ['Applied', 'Selected', 'Rejected'],
                default: 'Applied'
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Placement', PlacementSchema);
