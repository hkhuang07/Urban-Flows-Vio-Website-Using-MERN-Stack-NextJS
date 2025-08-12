const Manufacturer = require('../models/Manufacturer');

// @desc    Lấy tất cả nhà sản xuất
// @route   GET /api/manufacturers
// @access  Public
const getManufacturers = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find({});
        res.json(manufacturers);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết một nhà sản xuất
// @route   GET /api/manufacturers/:id
// @access  Public
const getManufacturerById = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        if (manufacturer) {
            res.json(manufacturer);
        } else {
            res.status(404).json({ message: 'Manufacturer not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Tạo nhà sản xuất mới (chỉ admin)
// @route   POST /api/manufacturers
// @access  Private/Admin
const createManufacturer = async (req, res) => {
    const { name, email, address, contactPhone, website } = req.body;
    try {
        const manufacturerExists = await Manufacturer.findOne({ name });
        if (manufacturerExists) {
            return res.status(400).json({ message: 'Manufacturer with this name already exists.' });
        }
        const manufacturer = await Manufacturer.create({ name, email, address, contactPhone, website });
        res.status(201).json(manufacturer);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật nhà sản xuất (chỉ admin)
// @route   PUT /api/manufacturers/:id
// @access  Private/Admin
const updateManufacturer = async (req, res) => {
    const { name, email, address, contactPhone, website } = req.body;
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        if (manufacturer) {
            manufacturer.name = name || manufacturer.name;
            manufacturer.email = email || manufacturer.email;
            manufacturer.address = address || manufacturer.address;
            manufacturer.contactPhone = contactPhone || manufacturer.contactPhone;
            manufacturer.website = website || manufacturer.website;
            const updatedManufacturer = await manufacturer.save();
            res.json(updatedManufacturer);
        } else {
            res.status(404).json({ message: 'Manufacturer not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa nhà sản xuất (chỉ admin)
// @route   DELETE /api/manufacturers/:id
// @access  Private/Admin
const deleteManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        if (manufacturer) {
            await manufacturer.deleteOne();
            res.json({ message: 'Manufacturer removed.' });
        } else {
            res.status(404).json({ message: 'Manufacturer not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getManufacturers,
    getManufacturerById,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
};