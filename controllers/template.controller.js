const templateService = require('../services/template.service');

exports.createTemplate = async (req, res) => {
    try {
        const { title, content } = req.body;
        const uploadedBy = req.user.id;

        const template = await templateService.createTemplate({ title, content, uploadedBy });
        res.status(201).json({ message: 'Template created successfully', template });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTemplates = async (req, res) => {
    const templates = await templateService.getAllTemplates();
    res.json({ templates });
};

exports.updateTemplate = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedTemplate = await templateService.updateTemplate(id, updates);
    res.json({ message: 'Template updated', updatedTemplate });
};

exports.deleteTemplate = async (req, res) => {
    const { id } = req.params;
    await templateService.deleteTemplate(id);
    res.json({ message: 'Template deleted' });
};


