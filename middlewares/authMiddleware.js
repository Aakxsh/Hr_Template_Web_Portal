const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // This attaches `user` to `req` so controllers can access `req.user`
        next();  // Call next to move to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};







