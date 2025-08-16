const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: { 
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash_on_delivery', 'credit_card', 'e_wallet', 'bank_transfer'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    orderType: { // Phân biệt loại đơn hàng: sản phẩm, vận chuyển, đặt xe
        type: String,
        enum: ['product_order', 'shipping_request', 'ride_booking'],
        required: true
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);