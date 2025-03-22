const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Memory storage for Excel files (bulk student uploads)
const memoryStorage = multer.memoryStorage();
const excelUpload = multer({ 
    storage: memoryStorage,
    fileFilter: (req, file, cb) => {
        // Check if the file is an Excel file
        const allowedMimeTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/octet-stream'
        ];
        
        if (allowedMimeTypes.includes(file.mimetype)) {
            // Accept the file
            console.log("Excel file accepted:", file.originalname, file.mimetype);
            cb(null, true);
        } else {
            // Reject the file
            console.log("File rejected - not an Excel file:", file.originalname, file.mimetype);
            cb(new Error('Only Excel files are allowed!'), false);
        }
    }
});

// Debug middleware for file uploads
const debugExcelUpload = (req, res, next) => {
    console.log("===== EXCEL UPLOAD DEBUG =====");
    console.log("Headers:", req.headers['content-type']);
    console.log("File received:", req.file);
    next();
};

// Cloudinary storage for Notes and Assignments (Dynamic Folder Structure)
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        try {
            // Debug the request body
            console.log("Request body in Cloudinary middleware:", req.body);
            
            // Use defaults if values are not present
            const year = req.body.year || 'general';
            const subject = req.body.subject || 'misc';
            
            // Use safer file property access
            const fileOriginalName = file.originalname || 'unnamed';
            
            return {
                folder: `college-portal/notes/${year}/${subject}`,
                resource_type: 'auto',
                public_id: `${Date.now()}-${fileOriginalName.split('.')[0]}`,
                format: fileOriginalName.split('.').pop(),
            };
        } catch (error) {
            console.error("Error in cloudinary middleware:", error);
            throw error;
        }
    },
});

// Create multer middleware with Cloudinary storage
const cloudinaryUpload = multer({ 
    storage: cloudinaryStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Export a debug function to use in routes for troubleshooting
const debugFileUpload = (req, res, next) => {
    console.log("===== UPLOAD DEBUG =====");
    console.log("Request headers:", JSON.stringify(req.headers, null, 2));
    console.log("Content-Type:", req.headers['content-type']);
    console.log("Request body before multer:", req.body);
    next();
};

module.exports = { 
    excelUpload, 
    cloudinaryUpload, 
    debugFileUpload,
    debugExcelUpload 
};