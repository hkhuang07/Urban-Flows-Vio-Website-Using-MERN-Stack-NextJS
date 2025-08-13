const express = require('express');
const router = express.Router();
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Public routes (có thể hiển thị bài viết đã duyệt)
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Protected routes (cho người tạo, admin, manager)
router.post('/', protect, isManagerOrAdmin, createArticle); // Có thể cho phép user thông thường tạo, sau đó cần duyệt
router.put('/:id', protect, updateArticle); // Admin/Manager hoặc tác giả
router.delete('/:id', protect, isManagerOrAdmin, deleteArticle); // Chỉ admin/manager

module.exports = router;