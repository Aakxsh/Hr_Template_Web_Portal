const Template = require('../models/template.model');

exports.createTemplate = async ({ title, content, uploadedBy }) => {
    return await Template.create({ title, content, uploadedBy });
};

exports.getAllTemplates = async () => {
    return await Template.find();
};

exports.updateTemplate = async (id, updates) => {
    return await Template.findByIdAndUpdate(id, updates, { new: true });
};

exports.deleteTemplate = async (id) => {
    return await Template.findByIdAndDelete(id);
};
