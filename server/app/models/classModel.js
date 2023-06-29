const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    quizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
});

module.exports = mongoose.model('Class', classSchema);
