<<<<<<< HEAD
=======
// src/models/ShipperProfile.js
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
const mongoose = require('mongoose');

const ShipperProfileSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        unique: true // Mỗi tài khoản chỉ có một hồ sơ tài xế
    },
    vehicleType: {
        type: String,
        enum: ['motorcycle', 'car', 'truck'],
        required: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    currentLocation: { // Vị trí hiện tại của tài xế (có thể là GeoJSON để truy vấn khoảng cách)
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: { // [longitude, latitude]
            type: [Number],
            index: '2dsphere' // Chỉ mục không gian để truy vấn vị trí
        }
    },
    isAvailable: { // Trạng thái sẵn sàng nhận đơn
        type: Boolean,
        default: true
    },
    rating: { // Điểm đánh giá trung bình
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: { // Số lượng đánh giá
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ShipperProfile', ShipperProfileSchema);