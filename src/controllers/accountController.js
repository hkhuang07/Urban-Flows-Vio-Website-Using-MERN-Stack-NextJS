const Account = require('../models/Account');
const jwt = require('jsonwebtoken');

// Hàm tạo JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Đăng ký người dùng
// @route   POST /api/accounts/register
// @access  Public
const registerAccount = async (req, res) => {
    const { fullName, email, username, password } = req.body;
    
    try {
        const accountExists = await Account.findOne({ $or: [{ email }, { username }] });
        if (accountExists) {
            return res.status(400).json({ message: 'Email or username already exists.' });
        }
    
        const newAccount = await Account.create({ fullName, email, username, password });
        
        if (newAccount) {
            res.status(201).json({
                _id: newAccount._id,
                fullName: newAccount.fullName,
                email: newAccount.email,
                username: newAccount.username,
                token: generateToken(newAccount._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid account data.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Đăng nhập người dùng
// @route   POST /api/accounts/login
// @access  Public
const loginAccount = async (req, res) => {
    const { email, password } = req.body;

    try {
        const account = await Account.findOne({ email });

        if (account && await account.matchPassword(password)) {
            res.json({
                _id: account._id,
                fullName: account.fullName,
                email: account.email,
                username: account.username,
                token: generateToken(account._id),
                roles: account.roles,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy thông tin profile người dùng
// @route   GET /api/accounts/profile
// @access  Private
const getAccountProfile = async (req, res) => {
    const account = req.user;
    if (account) {
        res.json({
            _id: account._id,
            fullName: account.fullName,
            email: account.email,
            username: account.username,
            roles: account.roles,
            avatar: account.avatar,
            phoneNumber: account.phoneNumber,
        });
    } else {
        res.status(404).json({ message: 'Account not found.' });
    }
};
// @desc    Lấy tất cả tài khoản (chỉ admin)
// @route   GET /api/accounts
// @access  Private/Admin
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({}).select('-password'); // Không trả về mật khẩu
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật thông tin tài khoản (chỉ admin/chủ tài khoản)
// @route   PUT /api/accounts/:id
// @access  Private/Admin or Account owner
const updateAccount = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, username, roles, isActive } = req.body;

    try {
        const account = await Account.findById(id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        // Chỉ admin hoặc chính chủ tài khoản mới được cập nhật
        if (req.user.roles.includes('admin') || req.user._id.toString() === account._id.toString()) {
            account.fullName = fullName || account.fullName;
            account.email = email || account.email;
            account.username = username || account.username;

            // Chỉ admin mới được thay đổi vai trò hoặc trạng thái kích hoạt
            if (req.user.roles.includes('admin')) {
                account.roles = roles || account.roles;
                account.isActive = typeof isActive === 'boolean' ? isActive : account.isActive;
            }

            const updatedAccount = await account.save();
            res.json({
                _id: updatedAccount._id,
                fullName: updatedAccount.fullName,
                email: updatedAccount.email,
                username: updatedAccount.username,
                roles: updatedAccount.roles,
                isActive: updatedAccount.isActive,
            });
        } else {
            res.status(403).json({ message: 'Not authorized to update this account.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa tài khoản (chỉ admin)
// @route   DELETE /api/accounts/:id
// @access  Private/Admin
const deleteAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const account = await Account.findById(id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        await account.deleteOne(); // Sử dụng deleteOne() thay vì remove() cho các phiên bản Mongoose mới hơn
        res.json({ message: 'Account removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = { registerAccount, loginAccount, getAccountProfile, getAllAccounts, updateAccount, deleteAccount };