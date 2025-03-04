const hrService = require('../services/hr.service');
const { validationResult } = require('express-validator');
const Hr = require('../models/hr.model'); // Make sure this is correct



// Register HR User
module.exports.registerHr = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        // // check if email already exists
        // const existingHr = await hrModel.findOne({email});
        // if(existingHr){
        //     return res.status(400).json({
        //         error: 'Email already exists. Please use a different email'
        //     });
        // }

        // // We cannot store password into plain text so that's why we use hash password 
        // const hashedPassword = await hrModel.hashPassword(password);



        // Create HR User
        const hr = await hrService.createHr({ fullname, email, password });

        // Generate auth token
        const token = hr.generateAuthToken();

        // Send success response
        return res.status(201).json({
            token,
            hr: {
                id: hr._id,
                fullname: hr.fullname,
                email: hr.email,
            },
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Email already exists. Please use a different email'
            });
        }

        console.error('Error in registerHr:', error.message);
        next(error);
    }
};




// Login Hr
module.exports.loginHr = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log("Login Attempt:", { email, password });  // Debugging line

        const hr = await Hr.findOne({ email });
        if (!hr) {
            console.log("HR Not Found");  // Debugging line
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        const isMatch = await hr.comparePassword(password);
        if (!isMatch) {
            console.log("Password Mismatch");  // Debugging line
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = hr.generateAuthToken();

        return res.status(200).json({
            token,
            hr: {
                id: hr._id,
                fullname: hr.fullname,
                email: hr.email,
                role: hr.role,
            },
        });

    } catch (error) {
        console.error('Error in loginHr:', error.message);
        next(error);
    }
};
