const { jobRepository,companyRepository } = require('../repositories');
const { sendEmail } = require('./email-service');
const createError = require('http-errors');

const JOB_TEMPLATES = [
    'job'
];

exports.createJob = async (payload) => {
    const {
        title,
        description,
        experience,
        candidateEmails,
        companyId,
        endDate,
        templateName,
    } = payload.data;

    if(!companyId){
        throw new createError.BadRequest('Company id is required');
    }

    if(!templateName){
        throw new createError.BadRequest('Template name is required');
    }

    if(!JOB_TEMPLATES.includes(templateName)){
        throw new createError.BadRequest('Invalid template name');
    }

    if(!candidateEmails?.length){
        throw new createError.BadRequest('Candidates are required');
    }

    const company = await companyRepository.get({
        _id: companyId,
    });

    if (!company) {
        throw new createError.BadRequest('Company not found');
    }


    await jobRepository.create({
        title,
        description,
        experience,
        candidates: candidateEmails,
        company :companyId,
        endDate,
    });

    candidateEmails.forEach(async (email) => {

        await sendEmail({
            from: process.env.MAIL_SENDER_EMAIL,
            to: email,
            subject: 'Job Notification',
            template: `${templateName}.ejs`,
            data: {
                title,
                description,
                experience,
                endDate,
                email: company.email.value
            },
        });

    });

    return true;

}