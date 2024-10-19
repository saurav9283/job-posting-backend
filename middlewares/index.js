
module.exports = {
    errorMiddleware: require('./error-middleware').errorMiddleware,
    authMiddleware: require('./auth-middleware'),
    verifiedMiddleware: require('./verified-middleware')
}