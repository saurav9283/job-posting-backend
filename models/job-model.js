const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    condidates: {
        type: [String],
        default: [],
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

module.exports = model("Job", jobSchema);