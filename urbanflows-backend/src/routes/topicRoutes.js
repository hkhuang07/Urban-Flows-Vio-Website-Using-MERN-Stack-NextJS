const express = require('express');
const router = express.Router();
const { getTopics, getTopicById, createTopic, updateTopic, deleteTopic } = require('../controllers/topicController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Public routes
router.get('/', getTopics);
router.get('/:id', getTopicById);

// Admin/Manager routes
router.post('/', protect, isManagerOrAdmin, createTopic);
router.put('/:id', protect, isManagerOrAdmin, updateTopic);
router.delete('/:id', protect, isManagerOrAdmin, deleteTopic);

module.exports = router;