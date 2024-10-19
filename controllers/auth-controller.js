const { authService } = require('../services');
const { StatusCodes } = require('http-status-codes');

exports.signUp = async (req, res, next) => {
    try {
        const response = await authService.signUp({ data: req.body});
        res.status(StatusCodes.CREATED).send(response);
    } catch (error) {
        console.log("error in signup user ", error);
        next(error);
    }
}

exports.signIn = async (req, res, next) => {
    try {
        const response = await authService.signIn({ data: req.body});
        res.status(StatusCodes.OK).send(response);
    } catch (error) {
        console.log("error in signin user", error);
        next(error);
    }
}


