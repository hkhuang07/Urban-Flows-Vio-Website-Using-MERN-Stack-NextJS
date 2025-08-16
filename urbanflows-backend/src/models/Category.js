<<<<<<< HEAD
=======
// src/models/Category.js
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
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