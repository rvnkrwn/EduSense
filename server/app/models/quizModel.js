const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    }],
    startTime: {
        type: Date, required: true
    }, endTime: {
        type: Date, required: true
    },
    status: {
        type: String,
        enum: ['pending','active','expired'],
        default: 'pending',
        required: true
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
