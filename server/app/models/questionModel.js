const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    options: [{
        type: String,
        required: true,
    }],
    correctOption: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Question', questionSchema);
