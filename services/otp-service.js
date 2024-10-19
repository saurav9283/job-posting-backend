const { companyRepository } = require('../repositories');
const { sendEmail } = require('./email-service');
const { sendSms } = require('./sms-service');
const createError = require('http-errors');

exports.verifyEmail = async (payload) => {
    const { id, otp } = payload.data || {};

    if(!id){
        throw new createError.BadRequest('id is required')
    }

    if(!otp){
        throw new createError.BadRequest('otp is required')
    }

    const company = await companyRepository.get({
        _id: id,
        'email.otp': otp,
        'email.expiry': { $gte: Date.now() }
    });

    if (!company) {
        throw new createError.BadRequest('Invalid OTP');
    }

    company.email.isVerified = true;
    await company.save();

    return true;

};

exports.verifyPhone = async (payload) => {
    const { id, otp } = payload.data || {};

    if(!id){
        throw new createError.BadRequest('id is required')
    }

    if(!otp){
        throw new createError.BadRequest('otp is required')
    }

    const company = await companyRepository.get({
        _id: id,
        'phone.otp': otp,
        'phone.expiry': { $gte: Date.now() }
    });

    if (!company) {
        throw new createError.BadRequest('Invalid OTP');
    }

    company.phone.isVerified = true;
    await company.save();

    return true;
};


exports.resendEmail = async (payload) => {
    const { id } = payload.data || {};

    const company = await companyRepository.get({ _id: id });

    if (!company) {
        throw new createError.BadRequest('Company not found');
    }

    company.email.otp = Math.floor(100000 + Math.random() * 900000);
    company.email.expiry = Date.now() + 600000;

    await company.save();

    await sendEmail({
        from: process.env.MAIL_SENDER_EMAIL,
        to: company.email.value,
        subject: 'OTP Verification',
        template: `otp.ejs`,
        data: { otp: company.email.otp, name: "Email" }
    });

    return true;
}

exports.resendPhone = async (payload) => {
    const { id } = payload.data || {};

    const company = await companyRepository.get({ _id: id });

    if (!company) {
        throw new createError.BadRequest('Company not found');
    }

    company.phone.otp = 1234 ;
    company.phone.expiry = Date.now() + 600000;

    await company.save();

    await sendSms(
        company.phone.value,
        `Your OTP is ${company.phone.otp}`
    );

    return true;
}