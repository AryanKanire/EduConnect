const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to verify JWT token and authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Attach user payload to request
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

// Middleware to authorize Admin only
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware to authorize Teacher only
const authorizeTeacher = (req, res, next) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ error: 'Access denied. Teachers only.' });
    }
    next();
};

// Middleware to authorize Student only
const authorizeStudent = (req, res, next) => {
    if (req.user.role.toLowerCase() !== 'student') {
        return res.status(403).json({ error: 'Access denied. Students only.' });
    }
    next();
};

module.exports = { authenticateUser, authorizeAdmin, authorizeTeacher, authorizeStudent };
