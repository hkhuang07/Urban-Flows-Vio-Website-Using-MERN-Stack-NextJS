const Article = require('../models/Article');
const Topic = require('../models/Topic');
const Account = require('../models/Account');

// @desc    Lấy tất cả bài viết (có thể lọc theo censorStatus cho public)
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
    try {
        // Chỉ lấy các bài viết đã được duyệt cho người dùng thông thường
        const query = req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager')) ? {} : { censorStatus: 'approved' };

        const articles = await Article.find(query)
            .populate('topicId', 'name')
            .populate('authorId', 'fullName username')
            .sort({ publishDate: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết một bài viết và tăng lượt xem
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('topicId', 'name')
            .populate('authorId', 'fullName username');

        if (article) {
            // Tăng lượt xem (chỉ khi truy cập bởi người dùng thông thường hoặc không phải admin/manager chỉnh sửa)
            if (!(req.user && (req.user.roles.includes('admin') || req.user.roles.includes('manager')))) {
                article.viewCount += 1;
                await article.save();
            }
            res.json(article);
        } else {
            res.status(404).json({ message: 'Article not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Tạo bài viết mới (chỉ admin/manager/có thể là user với quyền đặc biệt)
// @route   POST /api/articles
// @access  Private/Admin/Manager
const createArticle = async (req, res) => {
    const { title, summary, content, topicId } = req.body;
    try {
        const articleExists = await Article.findOne({ title });
        if (articleExists) {
            return res.status(400).json({ message: 'Article with this title already exists.' });
        }
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found.' });
        }

        const article = await Article.create({
            title,
            summary,
            content,
            topicId,
            authorId: req.user._id,
            censorStatus: req.user.roles.includes('admin') ? 'approved' : 'pending', // Admin tự duyệt, người khác cần duyệt
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật bài viết (chỉ admin/manager hoặc chính tác giả)
// @route   PUT /api/articles/:id
// @access  Private/Admin/Manager/Author
const updateArticle = async (req, res) => {
    const { title, summary, content, topicId, censorStatus, publishDate } = req.body;
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            // Kiểm tra quyền: admin/manager hoặc chính tác giả
            if (req.user.roles.includes('admin') || req.user.roles.includes('manager') || article.authorId.toString() === req.user._id.toString()) {
                article.title = title || article.title;
                article.summary = summary || article.summary;
                article.content = content || article.content;
                article.topicId = topicId || article.topicId;
                article.lastEditedDate = Date.now();

                // Chỉ admin/manager mới được thay đổi censorStatus và publishDate
                if (req.user.roles.includes('admin') || req.user.roles.includes('manager')) {
                    article.censorStatus = censorStatus || article.censorStatus;
                    article.publishDate = publishDate || article.publishDate;
                }

                const updatedArticle = await article.save();
                res.json(updatedArticle);
            } else {
                res.status(403).json({ message: 'Not authorized to update this article.' });
            }
        } else {
            res.status(404).json({ message: 'Article not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa bài viết (chỉ admin/manager)
// @route   DELETE /api/articles/:id
// @access  Private/Admin/Manager
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            await article.deleteOne();
            res.json({ message: 'Article removed.' });
        } else {
            res.status(404).json({ message: 'Article not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};