const Admin = require('../models/Admin.model');

module.exports.createAdmin = async ({ fullname, email, password }) => {
    const admin = new Admin({ fullname, email, password });
    await admin.save();
    return admin;
};
