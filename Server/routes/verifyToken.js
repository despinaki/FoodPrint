const jwt = require('jsonwebtoken')
//use this function to protect routes
module.exports = function auth (req, res, next) {
    const token = req.header('accessToken');
    if (!token) return res.status(401).send('Access denied.')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).send('Invalid token.')
    }
};