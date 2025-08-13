const express = require('express');
const router = express.Router();
const { getRideBookings, getRideBookingById, updateRideBooking, deleteRideBooking } = require('./controllers/rideBookingController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager'))) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin or manager.' });
    }
};

// Public/Shipper routes
router.get('/', protect, getRideBookings);
router.get('/:id', protect, getRideBookingById);

// Admin/Manager/Shipper routes
router.put('/:id', protect, updateRideBooking);
router.delete('/:id', protect, isAdmin, deleteRideBooking);

module.exports = router;