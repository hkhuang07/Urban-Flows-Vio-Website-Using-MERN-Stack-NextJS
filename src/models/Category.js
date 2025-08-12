// src/models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    imageUrl: {
        type: String, // URL ảnh đại diện cho danh mục
        default: 'images/category.png'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);