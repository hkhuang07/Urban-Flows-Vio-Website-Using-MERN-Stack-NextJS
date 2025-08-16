const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
        default: 'images/manufacturer.png'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    address: {
        type: String,
        trim: true
    },
    contactPhone: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);