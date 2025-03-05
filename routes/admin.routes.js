const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin.controller');
const Admin = require('../models/Admin.model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
        return res.status(403).json({ message: 'Registration is disabled. Admin already exists.' });
    }

    next();
}, [
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
    body('email')
    .isEmail()
    .withMessage('Invalid email format'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
], adminController.loginAdmin);

module.exports = router;
