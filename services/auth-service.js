const { companyRepository } = require('../repositories')
const { sendEmail } = require('./email-service');
const createError = require('http-errors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendSms } = require('./sms-service');


exports.signUp = async (payload) => {
    const { name, companyName, email, phone, password, employeeCount } = payload.data || {};

    if (!email) {
        throw new createError.BadRequest('Email is required');
    }

    if (!phone) {
        throw new createError.BadRequest('Phone is required');
    }

    // if (!password) {
    //     throw new createError.BadRequest('Password is required');
    // }

    let existingCompany = await companyRepository.get({
        'email.value': email
    });

    if (existingCompany) {
        throw new createError.Conflict('Company already exists');
    }

    let existingCompanyPhone = await companyRepository.get({
        'phone.value': phone
    });

    if (existingCompanyPhone) {
        throw new createError.Conflict('Company already exists');
    }

    const emailField = {
        value: email,
        otp: Math.floor(100000 + Math.random() * 900000),
        expiry: Date.now() + 3600000
    }

    const phoneField = {
        value: phone,
        otp: 1234,
        expiry: Date.now() + 3600000
    }

    const hashedPassword = await bcrypt.hash(password ||"123", 10);

    let company = await companyRepository.create({
        name,
        companyName,
        email: emailField,
        phone: phoneField,
        password: hashedPassword,
        employeeCount,
    });

    await sendEmail({
        from: process.env.MAIL_SENDER_EMAIL,
        to: email,
        subject: 'OTP Verification',
        template: `otp.ejs`,
        data: { otp: emailField.otp, name: "Email" }
    });

    await sendSms(phone, `Your OTP is ${phoneField.otp}`)
    delete company.password;
    const secret = process.env.SECRET

    const token = jwt.sign({ companyId: company._id },secret , {
        expiresIn: '1h',
    });

    company = company.toJSON();
    delete company.password;
    delete company.email.otp;
    delete company.phone.otp;

    return { token, company };
}

exports.signIn = async (payload) => {
    const { email, phone, password } = payload.data || {};

    if (!email && !phone) {
        throw new createError.BadRequest('Email or Phone is required');
    }

    if (!password) {
        throw new createError.BadRequest('Password is required');
    }

    let company;

    if (email) {
        company = await companyRepository.get({ 'email.value': email });
    }

    if (phone) {
        company = await companyRepository.get({ 'phone.value': phone });
    }


    if (!company) {
        throw new createError.BadRequest('Company not found');
    }

    const passwordMatch = await bcrypt.compare(password, company.password);

    if (!passwordMatch) {
        throw new createError.BadRequest('Invalid password');
    }

    const secret = process.env.SECRET

    const token = jwt.sign({ companyId: company._id },secret , {
        expiresIn: '1h',
    });

    company = company.toJSON();
    delete company.password;
    delete company.email.otp;
    delete company.phone.otp;

    return { token, company };
}

