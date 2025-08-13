const ShipperProfile = require('../models/ShipperProfile');
const Account = require('../models/Account');

// @desc    Đăng ký hồ sơ tài xế (dành cho user muốn trở thành shipper)
// @route   POST /api/shippers/profile
// @access  Private
const createShipperProfile = async (req, res) => {
    const { vehicleType, licensePlate, currentLocation } = req.body;
    const accountId = req.user._id;

    try {
        // Kiểm tra xem user đã có hồ sơ shipper chưa
        const existingProfile = await ShipperProfile.findOne({ accountId });
        if (existingProfile) {
            return res.status(400).json({ message: 'User already has a shipper profile.' });
        }
        // Cần đảm bảo tài khoản này có thể trở thành shipper (ví dụ: vai trò 'customer' được nâng cấp)
        const account = await Account.findById(accountId);
        if (!account.roles.includes('shipper')) {
            account.roles.push('shipper'); // Thêm vai trò shipper
            await account.save();
        }

        const shipperProfile = await ShipperProfile.create({
            accountId,
            vehicleType,
            licensePlate,
            currentLocation,
            isAvailable: true, // Mặc định sẵn sàng
        });
        res.status(201).json(shipperProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy hồ sơ tài xế của người dùng hiện tại
// @route   GET /api/shippers/profile/me
// @access  Private
const getMyShipperProfile = async (req, res) => {
    try {
        const shipperProfile = await ShipperProfile.findOne({ accountId: req.user._id }).populate('accountId', 'fullName email username');
        if (shipperProfile) {
            res.json(shipperProfile);
        } else {
            res.status(404).json({ message: 'Shipper profile not found for this user.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật hồ sơ tài xế (chỉ chủ hồ sơ hoặc admin)
// @route   PUT /api/shippers/profile/:id
// @access  Private/Admin/Shipper
const updateShipperProfile = async (req, res) => {
    const { vehicleType, licensePlate, currentLocation, isAvailable } = req.body;
    try {
        const shipperProfile = await ShipperProfile.findById(req.params.id);
        if (shipperProfile) {
            // Chỉ chủ hồ sơ hoặc admin mới được cập nhật
            if (req.user.roles.includes('admin') || shipperProfile.accountId.toString() === req.user._id.toString()) {
                shipperProfile.vehicleType = vehicleType || shipperProfile.vehicleType;
                shipperProfile.licensePlate = licensePlate || shipperProfile.licensePlate;
                shipperProfile.currentLocation = currentLocation || shipperProfile.currentLocation;
                shipperProfile.isAvailable = typeof isAvailable === 'boolean' ? isAvailable : shipperProfile.isAvailable;

                const updatedProfile = await shipperProfile.save();
                res.json(updatedProfile);
            } else {
                res.status(403).json({ message: 'Not authorized to update this shipper profile.' });
            }
        } else {
            res.status(404).json({ message: 'Shipper profile not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy tất cả hồ sơ tài xế (chỉ admin/manager)
// @route   GET /api/shippers/profile
// @access  Private/Admin/Manager
const getAllShipperProfiles = async (req, res) => {
    try {
        const shipperProfiles = await ShipperProfile.find({}).populate('accountId', 'fullName email username roles');
        res.json(shipperProfiles);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa hồ sơ tài xế (chỉ admin)
// @route   DELETE /api/shippers/profile/:id
// @access  Private/Admin
const deleteShipperProfile = async (req, res) => {
    try {
        const shipperProfile = await ShipperProfile.findById(req.params.id);
        if (shipperProfile) {
            // Có thể thêm logic gỡ vai trò 'shipper' khỏi Account
            await shipperProfile.deleteOne();
            res.json({ message: 'Shipper profile removed.' });
        } else {
            res.status(404).json({ message: 'Shipper profile not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    createShipperProfile,
    getMyShipperProfile,
    updateShipperProfile,
    getAllShipperProfiles,
    deleteShipperProfile,
};