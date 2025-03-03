const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    title: { type: String, 
        required: true, 
        unique: true },

    content: { 
        type: String, 
        required: true },

    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin' },

    createdAt: { 
        type: Date, 
        default: Date.now }
});

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;
