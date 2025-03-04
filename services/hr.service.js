const hrModel = require('../models/hr.model');

module.exports.createHr = async ({ fullname, email, password }) => {
    if (!fullname.firstname || !fullname.lastname || !email || !password) {
        throw new Error('All fields are required');
    }

    const hr = await hrModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,  // Let Mongoose pre('save') hook handle hashing
    });

    return hr;
};
