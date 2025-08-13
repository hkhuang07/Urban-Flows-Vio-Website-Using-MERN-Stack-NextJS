const express = require('express');
const router = express.Router();
const { createShipperProfile, getMyShipperProfile, updateShipperProfile, getAllShipperProfiles, deleteShipperProfile } = require('../controllers/shipperProfileController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Shipper/User routes
router.post('/', protect, createShipperProfile); // Đăng ký profile shipper
router.get('/me', protect, getMyShipperProfile); // Lấy profile của mình
router.put('/:id', protect, updateShipperProfile); // Cập nhật profile của mình (hoặc admin cập nhật)

// Admin/Manager routes
router.get('/', protect, isManagerOrAdmin, getAllShipperProfiles); // Lấy tất cả profile shipper
router.delete('/:id', protect, isAdmin, deleteShipperProfile); // Xóa profile shipper

module.exports = router;