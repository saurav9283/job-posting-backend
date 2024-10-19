const { otpService } = require('../services');
const { StatusCodes } = require('http-status-codes');

exports.verifyEmail = async (req, res, next) => {
    try {
        await otpService.verifyEmail({ data: req.body });
        res.status(StatusCodes.OK).send({ message: "Email verified successfully" });
    } catch (error) {
        console.log("error in verifying email", error);
        next(error);
    }
}

exports.verifyPhone = async (req, res, next) => {
    try {
        await otpService.verifyPhone({ data: req.body });
        res.status(StatusCodes.OK).send({
            message: "Phone verified successfully"
        });
    } catch (error) {
        console.log("error in verifying phone", error);
        next(error);
    }
}

exports.resendEmail = async (req, res, next) => {
    try {
        await otpService.resendEmail({ data: req.body });
        res.status(StatusCodes.OK).send({
            message: "Email sent successfully"
        });
    } catch (error) {
        console.log("error in resending email", error);
        next(error);
    }
}

exports.resendPhone = async (req, res, next) => {
    try {
        await otpService.resendPhone({ data: req.body });
        res.status(StatusCodes.OK).send({
            message: "Phone sent successfully"
        });
    } catch (error) {
        console.log("error in resending phone", error);
        next(error);
    }
}