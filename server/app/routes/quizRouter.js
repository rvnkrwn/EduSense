const quizRoute = require("express").Router();
const quizController = require("../controllers/quizController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {roleTeacherMiddleware} = require("../middlewares/roleMiddleware");

module.exports = app => {

    // Post Method
    quizRoute.post("/register", authMiddleware, roleTeacherMiddleware,quizController.create);
    quizRoute.post("/submission", authMiddleware, quizController.submission);
    quizRoute.get("/:quizId", authMiddleware, quizController.detailQuiz);

    app.use("/api/quiz", quizRoute);
}