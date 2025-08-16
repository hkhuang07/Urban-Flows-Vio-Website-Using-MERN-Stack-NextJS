<<<<<<< HEAD
=======
// src/models/ShippingRequest.js
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
const mongoose = require('mongoose');

const ShippingRequestSchema = new mongoose.Schema({
    orderId: { // Liên kết với một Order có orderType là 'shipping_request'
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
    deliveryLocation: {
        address: { type: String, required: true, trim: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    itemDescription: { // Mô tả hàng hóa cần vận chuyển
        type: String,
        required: true,
        trim: true
    },
    itemWeight: { // Trọng lượng hàng hóa (có thể là ước tính)
        type: Number,
        min: 0
    },
    itemDimensions: { // Kích thước (dài x rộng x cao)
        length: Number,
        width: Number,
        height: Number
    },
    shipperId: { // Tài xế được gán cho yêu cầu này
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShipperProfile',
        default: null
    },
    fare: { // Phí vận chuyển
        type: Number,
        required: true,
        min: 0
    },
    distance: { // Khoảng cách ước tính (km)
        type: Number,
        min: 0
    },
    estimatedTime: { // Thời gian giao hàng ước tính (phút)
        type: Number,
        min: 0
    },
    requestStatus: {
        type: String,
        enum: ['pending', 'searching_shipper', 'shipper_assigned', 'picked_up', 'on_the_way', 'delivered', 'cancelled'],
        default: 'pending'
    },
    pickupTime: { type: Date },
    deliveryTime: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('ShippingRequest', ShippingRequestSchema);