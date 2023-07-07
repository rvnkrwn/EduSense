const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String, required: true,
    }, email: {
        type: String, required: true, unique: true
    }, password: {
        type: String, required: true,
    }, phone: {
        type: String, required: true,
    }, role: {
        type: String, enum: ['teacher', 'student', 'admin'], default: 'student', required: true
    }, classes: [{
        type: Schema.Types.ObjectId, ref: 'Class'
    }], quizHistories: [{
        quiz: {
            type: Schema.Types.ObjectId, ref: 'Quiz'
        }, title: {
            type: String, required: true
        }, score: {
            type: Number, default: 0
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
