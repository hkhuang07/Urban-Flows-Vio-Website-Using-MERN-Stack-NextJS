const express = require('express');
const router = express.Router();
const { getManufacturers, getManufacturerById, createManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturerController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getManufacturers);
router.get('/:id', getManufacturerById);

// Admin routes
router.post('/', protect, isAdmin, createManufacturer);
router.put('/:id', protect, isAdmin, updateManufacturer);
router.delete('/:id', protect, isAdmin, deleteManufacturer);

module.exports = router;