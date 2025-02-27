const hrModel = require('../models/hr.model');
const bcrypt = require('bcrypt');

module.exports.createHr = async ({ fullname, email, password }) => {
    if (!fullname.firstname || !fullname.lastname || !email || !password) {
        throw new Error('All fields are required');
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save HR user
    const hr = await hrModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword, // Store hashed password
    });

    return hr;
};
