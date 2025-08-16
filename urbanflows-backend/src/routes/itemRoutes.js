const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { protect, isAdmin } = require('../middleware/authMiddleware'); // Cần một middleware isManager hoặc kết hợp isAdmin

// Middleware để kiểm tra admin hoặc manager
const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Public routes
router.get('/', getItems);
router.get('/:id', getItemById);

// Admin/Manager routes
router.post('/', protect, isManagerOrAdmin, createItem);
router.put('/:id', protect, isManagerOrAdmin, updateItem);
router.delete('/:id', protect, isManagerOrAdmin, deleteItem);

module.exports = router;