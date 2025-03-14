const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Memory storage for Excel files (for bulk student uploads)
const memoryStorage = multer.memoryStorage();
const excelUpload = multer({ storage: memoryStorage });

// Cloudinary storage for files (Notes, Assignments)
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'college-portal',
        resource_type: 'auto', // Auto-detect file type
        allowed_formats: ['pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg'], // Allowed file formats
    },
});

const cloudinaryUpload = multer({ storage: cloudinaryStorage });

module.exports = { excelUpload, cloudinaryUpload };
