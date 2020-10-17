const jwt = require('jsonwebtoken')
//use this function to protect routes
module.exports = function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //Deny access
        res.sendStatus(403);
    } 
};

// try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
// } catch {
//     res.status(400).send('Invalid token.')
// }