const e = require("cors");
const { Schema, model } = require("mongoose");

const contactInfoSchema = new Schema({
    value: {
        type: String,
        required: true,
        unique: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        required: true,
    },
}, { _id: false });

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    email: contactInfoSchema,
    phone: contactInfoSchema,
    employeeCount: {
        type: Number,
        required: true,
    },
    password: {
        type: String
    },
}, { timestamps: true });

module.exports = model("Company", companySchema);