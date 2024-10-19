const router = require('express').Router();
const { otpController } = require('../controllers');

router.post('/verify-email', otpController.verifyEmail);
router.post('/verify-phone', otpController.verifyPhone);

router.post('/email/resend', otpController.resendEmail);
router.post('/phone/resend', otpController.resendPhone);



module.exports = router;