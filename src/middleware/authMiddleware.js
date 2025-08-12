// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Account = require('../models/Account'); 

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Lấy token từ header "Bearer token"
            token = req.headers.authorization.split(' ')[1];

            // Giải mã token để lấy ID của người dùng
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tìm người dùng trong database và bỏ qua trường mật khẩu
            req.user = await Account.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.roles.includes('admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, isAdmin };