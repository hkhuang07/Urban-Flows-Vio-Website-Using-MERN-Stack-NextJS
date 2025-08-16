const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        default: 'images/article.png'
    },
    summary: {
        type: String,
        trim: true,
        required: true  
    },
    content: {
        type: String,
        required: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',   
        required: true
    },
    authorId: { // Người tạo bài viết
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    viewCount: {
        type: Number,
        default: 0
    },
    censorStatus: { // Trạng thái kiểm duyệt (pending, approved, rejected)
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    lastEditedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);