module.exports = (req, res, next) => {
    const { role } = req.user;  // `req.user` is attached by checkAuth middleware after decoding JWT.

    if (role !== 'Admin' && role !== 'SuperAdmin') {
        return res.status(403).json({ message: 'Access Denied - Only Admin or SuperAdmin can perform this action' });
    }

    next();
};
