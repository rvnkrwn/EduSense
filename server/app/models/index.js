const mongoose = require("mongoose");
const db = require("../config/database");

module.exports = {
    mongoose,
    url: db.url,
    userModel: require("./userModel"),
    classModel: require("./classModel"),
    quizModel: require("./quizModel"),
    questionModel: require("./questionModel")
}