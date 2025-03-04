const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// POST /admin/register - Admin Registration Route
router.post('/register', [
    body('fullname')
    .notEmpty()
    .withMessage('Fullname is required'),

    body('email')
    .isEmail()
    .withMessage('Valid email is required'),

    body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
], adminController.registerAdmin);




router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], adminController.loginAdmin);

module.exports = router;
