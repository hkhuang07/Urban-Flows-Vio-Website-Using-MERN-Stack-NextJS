<<<<<<< HEAD
=======
// src/models/RideBooking.js
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
const mongoose = require('mongoose');

const RideBookingSchema = new mongoose.Schema({
    orderId: { // Liên kết với một Order có orderType là 'ride_booking'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true
    },
    pickupLocation: {
        address: { type: String, required: true, trim: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    destinationLocation: {
        address: { type: String, required: true, trim: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    requestedVehicleType: { // Loại xe khách muốn (nếu có)
        type: String,
        enum: ['motorcycle', 'car'], // Hoặc các loại xe khác
        default: 'car'
    },
    numberOfPassengers: {
        type: Number,
        min: 1,
        default: 1
    },
    shipperId: { // Tài xế được gán cho chuyến đi này
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShipperProfile',
        default: null
    },
    fare: { // Phí chuyến đi
        type: Number,
        required: true,
        min: 0
    },
    distance: { // Khoảng cách ước tính (km)
        type: Number,
        min: 0
    },
    estimatedArrivalTime: { // Thời gian tài xế đến điểm đón ước tính
        type: Date
    },
    estimatedTravelTime: { // Thời gian di chuyển ước tính (phút)
        type: Number,
        min: 0
    },
    requestStatus: {
        type: String,
        enum: ['pending', 'searching_driver', 'driver_assigned', 'arrived_pickup', 'on_ride', 'completed', 'cancelled'],
        default: 'pending'
    },
    pickupTime: { type: Date },
    dropOffTime: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('RideBooking', RideBookingSchema);