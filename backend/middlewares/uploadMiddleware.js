const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Memory storage for Excel files (bulk student uploads)
const memoryStorage = multer.memoryStorage();
const excelUpload = multer({ storage: memoryStorage });

// Cloudinary storage for Notes and Assignments (Dynamic Folder Structure)
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        if (!req.body.year || !req.body.subject) {
            throw new Error("Year and Subject are required for uploading notes!");
        }

        return {
            folder: `college-portal/notes/${req.body.year}/${req.body.subject}`, // Dynamic folder structure
            resource_type: 'auto', // Auto-detect file type
            allowed_formats: ['pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg'],
        };
    },
});

const cloudinaryUpload = multer({ storage: cloudinaryStorage });

module.exports = { excelUpload, cloudinaryUpload };
