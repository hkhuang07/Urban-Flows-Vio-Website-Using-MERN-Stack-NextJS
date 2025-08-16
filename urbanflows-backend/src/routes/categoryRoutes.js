const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);


// Admin routes
//router.post('/', protect, isAdmin, createCategory); 
router.post('/', createCategory); 
//router.put('/:id', protect, isAdmin, updateCategory);
router.put('/:id', updateCategory); 
//router.delete('/:id', protect, isAdmin, deleteCategory);
router.delete('/:id', deleteCategory); 

module.exports = router;