const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String, required: true
    }, subjects: {
        type: String, required: true
    }, code: {
        type: String, required: true, unique: true
    }, teacher: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    }, students: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }], quizzes: [{
        type: Schema.Types.ObjectId, ref: 'Quiz'
    }],
});

module.exports = mongoose.model('Class', classSchema);
