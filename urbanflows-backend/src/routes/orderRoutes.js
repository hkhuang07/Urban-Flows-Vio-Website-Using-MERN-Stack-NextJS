const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Customer/User routes
router.post('/', protect, createOrder); // Tạo đơn hàng
router.get('/my', protect, getMyOrders); // Lấy đơn hàng của tôi
router.get('/:id', protect, getOrderById); // Lấy chi tiết đơn hàng (của mình hoặc nếu là admin)

// Admin/Manager routes
router.get('/', protect, isManagerOrAdmin, getAllOrders); // Lấy tất cả đơn hàng
router.put('/:id/status', protect, updateOrderStatus); // Cập nhật trạng thái (cần kiểm tra quyền trong controller)

module.exports = router;