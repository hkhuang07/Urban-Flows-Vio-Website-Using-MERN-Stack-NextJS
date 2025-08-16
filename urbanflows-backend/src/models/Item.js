const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: [String], 
        default: ['images/item.png']
    },
    quantity: { 
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    numPurchased: { 
        type: Number,
        default: 0
    },
    numFavorites: { 
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['in_stock', 'out_of_stock', 'low_stock'],
        default: 'in_stock'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    manufacturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true
    },
    addedBy: { // Tài khoản đã thêm sản phẩm (admin/manager)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
}, {
    timestamps: true
});

// Middleware để cập nhật trạng thái 'status' dựa trên 'quantity'
ItemSchema.pre('save', function(next) {
    if (this.isModified('quantity')) {
        if (this.quantity === 0) {
            this.status = 'out_of_stock';
        } else if (this.quantity < 10) { // Giả sử 10 là ngưỡng để đánh dấu là 'low_stock'
            this.status = 'low_stock';
        } else {
            this.status = 'in_stock';
        }
    }
    next();
});

module.exports = mongoose.model('Item', ItemSchema);