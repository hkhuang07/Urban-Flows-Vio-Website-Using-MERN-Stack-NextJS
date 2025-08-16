<<<<<<< HEAD
=======
// src/models/Topic.js
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Topic', TopicSchema);