const { companyRepository } = require('../repositories');
const createError = require('http-errors');

exports.verifiedCompney = async (req, res, next) => {
    const companyId = req.companyId;
    const company = await companyRepository.get({
        _id: companyId
    })

    if (!company.email.isVerified) {
        next(new createError.Unauthorized("Email is not verified"))
    }

    if (!company.phone.isVerified) {
        next(new createError.Unauthorized("Phone is not verified"))
    }
    
    next();
}