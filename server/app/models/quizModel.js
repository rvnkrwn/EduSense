const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String, required: true,
    },
    questions: [{
        text: {
            type: String, required: true,
        }, options: [{
            type: String, required: true,
        }], correctOption: {
            type: String, required: true,
        },
    }],
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status: {
        type: String, enum: ['pending', 'active', 'expired'], default: 'pending'
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
