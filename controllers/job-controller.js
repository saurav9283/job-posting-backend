const { jobService } = require('../services');
const { StatusCodes } = require('http-status-codes');

exports.createJob = async (req, res, next) => {
    try {
        await jobService.createJob({data: req.body});
        res.status(StatusCodes.OK).json({message: "Job emails send successfully"});
    } catch (error) {
        console.log("Error in createJob controller", error);
        next(error);
    }
}