const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');
const { checkAuth } = require('../middlewares/authMiddleware');

router.post('/create', checkAuth, templateController.createTemplate);
router.get('/', checkAuth, templateController.getAllTemplates);
router.put('/:id', checkAuth, templateController.updateTemplate);
router.delete('/:id', checkAuth, templateController.deleteTemplate);

module.exports = router;
