const Topic = require('../models/Topic');

// @desc    Lấy tất cả chủ đề
// @route   GET /api/topics
// @access  Public
const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find({});
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết một chủ đề
// @route   GET /api/topics/:id
// @access  Public
const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (topic) {
            res.json(topic);
        } else {
            res.status(404).json({ message: 'Topic not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Tạo chủ đề mới (chỉ admin/manager)
// @route   POST /api/topics
// @access  Private/Admin/Manager
const createTopic = async (req, res) => {
    const { name, description } = req.body;
    try {
        const topicExists = await Topic.findOne({ name });
        if (topicExists) {
            return res.status(400).json({ message: 'Topic with this name already exists.' });
        }
        const topic = await Topic.create({ name, description });
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật chủ đề (chỉ admin/manager)
// @route   PUT /api/topics/:id
// @access  Private/Admin/Manager
const updateTopic = async (req, res) => {
    const { name, description } = req.body;
    try {
        const topic = await Topic.findById(req.params.id);
        if (topic) {
            topic.name = name || topic.name;
            topic.description = description || topic.description;
            const updatedTopic = await topic.save();
            res.json(updatedTopic);
        } else {
            res.status(404).json({ message: 'Topic not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa chủ đề (chỉ admin/manager)
// @route   DELETE /api/topics/:id
// @access  Private/Admin/Manager
const deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (topic) {
            // Có thể thêm logic kiểm tra xem có bài viết nào đang dùng topic này không
            await topic.deleteOne();
            res.json({ message: 'Topic removed.' });
        } else {
            res.status(404).json({ message: 'Topic not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic,
};