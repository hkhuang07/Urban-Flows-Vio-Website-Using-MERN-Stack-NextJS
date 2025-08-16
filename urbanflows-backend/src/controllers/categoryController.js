<<<<<<< HEAD
const Category = require("../models/Category");
//const asyncHandler = require('express-async-handler'); // Dùng để xử lý lỗi async (đồng bộ, bất đồng bộ)
=======
const Category = require('../models/Category');
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e

// @desc    Lấy tất cả danh mục
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
<<<<<<< HEAD
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
=======
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
};

// @desc    Lấy chi tiết một danh mục
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
<<<<<<< HEAD
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
=======
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
};

// @desc    Tạo danh mục mới (chỉ admin)
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
<<<<<<< HEAD
  const { name, description, imageUrl } = req.body;
  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }
    const category = await Category.create({ name, description, imageUrl });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
=======
    const { name, description, imageUrl } = req.body;
    try {
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category with this name already exists.' });
        }
        const category = await Category.create({ name, description, imageUrl });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
};

// @desc    Cập nhật danh mục (chỉ admin)
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
<<<<<<< HEAD
  const { name, description, imageUrl } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;
      category.imageUrl = imageUrl || category.imageUrl;
      const updatedCategory = await category.save();
      res.json({
        message: "Category updated successfully!",
        category: updatedCategory,
      });
    } else {
      res.status(404).json({ message: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
=======
    const { name, description, imageUrl } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = name || category.name;
            category.description = description || category.description;
            category.imageUrl = imageUrl || category.imageUrl;
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
};

// @desc    Xóa danh mục (chỉ admin)
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
<<<<<<< HEAD
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.deleteOne();
      res.json({ message: "Category removed." });
    } else {
      res.status(404).json({ message: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
=======
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.deleteOne();
            res.json({ message: 'Category removed.' });
        } else {
            res.status(404).json({ message: 'Category not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
