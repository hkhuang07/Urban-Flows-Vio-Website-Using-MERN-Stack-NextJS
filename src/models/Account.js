const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Để mã hóa mật khẩu

const AccountSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String, // URL ảnh đại diện
        default: 'images/avatar.png' // URL ảnh mặc định
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true, // Cho phép nhiều tài liệu không có trường này hoặc null
        trim: true
    },
    address: {
        type: String,
        trim: true,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    roles: {
        type: [String], 
        enum: ['customer', 'shipper', 'admin', 'manager'],
        default: ['customer']
    }
}, {
    timestamps: true // createdAt, updatedAt
});

// Middleware để mã hóa mật khẩu trước khi lưu
AccountSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Phương thức để so sánh mật khẩu
AccountSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Account', AccountSchema);