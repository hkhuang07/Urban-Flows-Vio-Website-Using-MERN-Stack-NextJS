const express = require('express');
const router = express.Router();
const { getOrderItemsByOrderId, getOrderItemById, updateOrderItem, deleteOrderItem } = require('../controllers/orderitemController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Lấy các item của một đơn hàng cụ thể
router.get('/order/:orderId', protect, getOrderItemsByOrderId);

// Các thao tác quản lý chi tiết OrderItem (chỉ admin/manager)
router.get('/:id', protect, isManagerOrAdmin, getOrderItemById);
router.put('/:id', protect, isManagerOrAdmin, updateOrderItem);
router.delete('/:id', protect, isManagerOrAdmin, deleteOrderItem);

module.exports = router;