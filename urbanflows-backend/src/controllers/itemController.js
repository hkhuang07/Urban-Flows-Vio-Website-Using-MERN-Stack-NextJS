const Item = require('../models/Item');
const Account = require('../models/Account'); // Để populate addedBy
const Category = require('../models/Category'); // Để populate categoryId
const Manufacturer = require('../models/Manufacturer'); // Để populate manufacturerId

// @desc    Lấy tất cả sản phẩm
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
    try {
        // Có thể thêm tính năng tìm kiếm, phân trang, lọc ở đây
        const items = await Item.find({})
            .populate('categoryId', 'name') // Lấy tên danh mục
            .populate('manufacturerId', 'name') // Lấy tên nhà sản xuất
            .populate('addedBy', 'username fullName'); // Lấy thông tin người thêm
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết một sản phẩm
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('categoryId', 'name')
            .populate('manufacturerId', 'name')
            .populate('addedBy', 'username fullName');
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Tạo sản phẩm mới (chỉ admin/manager)
// @route   POST /api/items
// @access  Private/Admin/Manager
const createItem = async (req, res) => {
    const { name, description, price, imageUrl, quantity, categoryId, manufacturerId } = req.body;

    try {
        const itemExists = await Item.findOne({ name });
        if (itemExists) {
            return res.status(400).json({ message: 'Item with this name already exists.' });
        }

        // Kiểm tra xem categoryId và manufacturerId có tồn tại không
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        const manufacturer = await Manufacturer.findById(manufacturerId);
        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found.' });
        }

        const item = await Item.create({
            name,
            description,
            price,
            imageUrl,
            quantity,
            categoryId,
            manufacturerId,
            addedBy: req.user._id, // Người tạo là người đang đăng nhập
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật sản phẩm (chỉ admin/manager)
// @route   PUT /api/items/:id
// @access  Private/Admin/Manager
const updateItem = async (req, res) => {
    const { name, description, price, imageUrl, quantity, categoryId, manufacturerId } = req.body;

    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            item.name = name || item.name;
            item.description = description || item.description;
            item.price = price !== undefined ? price : item.price;
            item.imageUrl = imageUrl || item.imageUrl;
            item.quantity = quantity !== undefined ? quantity : item.quantity;
            item.categoryId = categoryId || item.categoryId;
            item.manufacturerId = manufacturerId || item.manufacturerId;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa sản phẩm (chỉ admin/manager)
// @route   DELETE /api/items/:id
// @access  Private/Admin/Manager
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Item removed.' });
        } else {
            res.status(404).json({ message: 'Item not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};