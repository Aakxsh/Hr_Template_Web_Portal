const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const hrController = require('../controllers/hr.controller');


// Register HR
router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),

    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters'),

    body('fullname.lastname')
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters'),

    body('password')
        .isStrongPassword()
        .withMessage('Password must be strong (at least 8 characters, including uppercase, lowercase, number, and symbol)')
], hrController.registerHr);






// ✅ Add this route for HR login
router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Invalid email format'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
], hrController.loginHr);



module.exports = router;
