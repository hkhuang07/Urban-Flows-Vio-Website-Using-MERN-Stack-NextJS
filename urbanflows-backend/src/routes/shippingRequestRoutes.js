const express = require('express');
const router = express.Router();
const { getShippingRequests, getShippingRequestById, updateShippingRequest, deleteShippingRequest } = require('../controllers/shippingRequestController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Public/Shipper routes (tùy thuộc vào chính sách hiển thị đơn cho shipper)
router.get('/', protect, getShippingRequests); // Cần protect nếu chỉ shipper/admin được xem tất cả
router.get('/:id', protect, getShippingRequestById);

// Admin/Manager/Shipper routes
router.put('/:id', protect, updateShippingRequest); // Logic kiểm tra quyền trong controller
router.delete('/:id', protect, isAdmin, deleteShippingRequest); // Chỉ admin

module.exports = router;