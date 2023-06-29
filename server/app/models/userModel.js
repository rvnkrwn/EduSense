const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        default: 'student',
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    quizHistories: [{
        type: Schema.Types.ObjectId,
        ref: 'QuizHistory'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
