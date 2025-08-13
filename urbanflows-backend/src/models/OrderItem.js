// src/models/OrderItem.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: { 
        type: Number,
        required: true,
        min: 1
    },
    priceAtPurchase: { 
        type: Number,
        required: true,
        min: 0
    },
    subtotal: { // Tổng tiền cho loại sản phẩm này (quantity * priceAtPurchase)
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);