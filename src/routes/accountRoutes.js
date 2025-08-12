// src/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const { registerAccount, loginAccount, getAccountProfile } = require('../controllers/accountController');
const { protect } = require('../middleware/authMiddleware');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const { getAllAccounts, updateAccount, deleteAccount } = require('../controllers/accountController');

// Route công khai
router.post('/register', registerAccount);
router.post('/login', loginAccount);

// Route cần bảo vệ
router.get('/profile', protect, getAccountProfile);

// Route chỉ dành cho admin
router.get('/', protect, isAdmin, getAllAccounts); // Lấy tất cả tài khoản
router.put('/:id', protect, isAdmin, updateAccount); // Cập nhật tài khoản (admin có thể thay đổi vai trò)
router.delete('/:id', protect, isAdmin, deleteAccount); // Xóa tài khoản

module.exports = router;