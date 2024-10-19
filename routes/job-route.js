const router = require('express').Router();
const { jobController } = require('../controllers');
const { authMiddleware, verifiedMiddleware } = require('../middlewares');

router.post('/', authMiddleware.verifyToken,verifiedMiddleware.verifiedCompney, jobController.createJob);


module.exports = router;