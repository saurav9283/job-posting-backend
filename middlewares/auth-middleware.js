const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) throw new createError.Unauthorized("Unauthorized");
    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);
        req.companyId = decoded.companyId;
        next();
    } catch (error) {
        next(error)
    }
}