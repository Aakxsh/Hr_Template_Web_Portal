const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');
const { checkAuth } = require('../middlewares/authMiddleware');
const checkAdminRole = require('../middlewares/checkAdminRole');  // Import new middleware

// CREATE template - Admin only
router.post('/create', checkAuth, checkAdminRole, templateController.createTemplate);

// DELETE template by Id - Admin only
router.delete('/:id', checkAuth, checkAdminRole, templateController.deleteTemplate);

// UPDATE template - Admin only
router.put('/:id', checkAuth, checkAdminRole, templateController.updateTemplate);

// GET all templates - No admin restriction (optional)
router.get('/', checkAuth, templateController.getAllTemplates);

module.exports = router;
