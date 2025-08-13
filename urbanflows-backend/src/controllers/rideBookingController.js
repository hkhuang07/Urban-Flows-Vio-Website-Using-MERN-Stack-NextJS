const RideBooking = require('../models/RideBooking');
const Order = require('../models/Order');
const ShipperProfile = require('../models/ShipperProfile');

// @desc    Lấy tất cả yêu cầu đặt xe
// @route   GET /api/ride-bookings
// @access  Public (cho tài xế) / Private (admin/manager)
const getRideBookings = async (req, res) => {
    try {
        const bookings = await RideBooking.find({})
            .populate('orderId', 'accountId orderDate status')
            .populate('shipperId', 'accountId vehicleType currentLocation');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết yêu cầu đặt xe
// @route   GET /api/ride-bookings/:id
// @access  Private (Chủ yêu cầu, Shipper được gán, Admin, Manager)
const getRideBookingById = async (req, res) => {
    try {
        const booking = await RideBooking.findById(req.params.id)
            .populate('orderId', 'accountId orderDate status')
            .populate('shipperId', 'accountId vehicleType currentLocation');

        if (booking) {
            // Kiểm tra quyền tương tự ShippingRequest
            const order = await Order.findById(booking.orderId._id);
            if (req.user.roles.includes('admin') || req.user.roles.includes('manager') ||
                (order && order.accountId.toString() === req.user._id.toString()) ||
                (booking.shipperId && booking.shipperId.accountId.toString() === req.user._id.toString())
            ) {
                res.json(booking);
            } else {
                res.status(403).json({ message: 'Not authorized to view this ride booking.' });
            }
        } else {
            res.status(404).json({ message: 'Ride booking not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật yêu cầu đặt xe
// @route   PUT /api/ride-bookings/:id
// @access  Private/Admin/Manager/Shipper
const updateRideBooking = async (req, res) => {
    const { requestStatus, shipperId, fare, estimatedArrivalTime, estimatedTravelTime } = req.body;
    try {
        const booking = await RideBooking.findById(req.params.id);
        if (booking) {
            // Kiểm tra quyền tương tự ShippingRequest
            if (req.user.roles.includes('admin') || req.user.roles.includes('manager') ||
                (booking.shipperId && booking.shipperId.toString() === req.user.shipperProfile._id.toString())
            ) {
                booking.requestStatus = requestStatus || booking.requestStatus;
                booking.shipperId = shipperId || booking.shipperId;
                booking.fare = fare || booking.fare;
                booking.estimatedArrivalTime = estimatedArrivalTime || booking.estimatedArrivalTime;
                booking.estimatedTravelTime = estimatedTravelTime || booking.estimatedTravelTime;

                // Cập nhật trạng thái của Order liên quan
                const order = await Order.findById(booking.orderId);
                if (order) {
                    order.status = requestStatus; // Đồng bộ trạng thái
                    await order.save();
                }

                const updatedBooking = await booking.save();
                res.json(updatedBooking);
            } else {
                res.status(403).json({ message: 'Not authorized to update this ride booking.' });
            }
        } else {
            res.status(404).json({ message: 'Ride booking not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa yêu cầu đặt xe (chỉ admin/manager)
// @route   DELETE /api/ride-bookings/:id
// @access  Private/Admin/Manager
const deleteRideBooking = async (req, res) => {
    try {
        const booking = await RideBooking.findById(req.params.id);
        if (booking) {
            // Cũng cần xóa Order liên quan nếu Order đó chỉ phục vụ cho booking này
            await booking.deleteOne();
            res.json({ message: 'Ride booking removed.' });
        } else {
            res.status(404).json({ message: 'Ride booking not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getRideBookings,
    getRideBookingById,
    updateRideBooking,
    deleteRideBooking
};