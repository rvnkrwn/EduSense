const {quizModel, classModel, userModel, mongoose} = require("../models");
const {autoGenerateQuestions} = require("../utils/openai");

exports.create = async (req, res) => {
    try {
        const {classId, title, prompt, startTime, endTime} = req.body;
        if (!title || !prompt) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const Class = await classModel.findById(classId);
        if (!Class) {
            return res.status(404).json({msg: "User not found"});
        }

        const text = await autoGenerateQuestions(prompt);
        const questions = JSON.parse(text);

        const Quiz = await quizModel.create({
            title, status: "pending"
        });
        for (let i = 0; i < questions.length; i++) {
            Quiz.questions.push(questions[i]);
            await Quiz.save();
        }

        Class.quizzes.push(Quiz._id);
        Class.save();

        return res.status(201).json({msg: "Successfully created quiz"});
    } catch (error) {
        return res.status(500).json({msg: "Error created quiz", error})
    }
}


exports.detailQuiz = async (req, res) => {
    try {
        const {userId} = req.user;
        const {quizId} = req.params;
        const User = await userModel.findById(userId);
        if (!quizId) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const Quiz = await quizModel.findById(quizId).select("-questions.correctOption");

        if (!User) {
            return res.status(404).json({msg: "User not found"});
        }
        if (!Quiz) {
            return res.status(404).json({msg: "Quiz not found"});
        }

        return res.status(200).json(Quiz);
    } catch (error) {
        return res.status(500).json({msg: "Error get quiz", error})
    }
}


exports.submission = async (req, res) => {
    try {
        const {userId} = req.user;
        const {quizId, answers} = req.body;
        if (!quizId || !answers) {
            return res.status(400).json({msg: "Missing required fields"});
        }

        const Quiz = await quizModel.findById(quizId);

        if (!Quiz) {
            return res.status(404).json({msg: "User not found"});
        }

        const questions = Quiz.questions;
        let correct = 0;
        for (let i = 0; i < questions.length; i++) {
            const correctOption = questions[i].correctOption;
            if (correctOption === answers[i]) {
                correct++;
            }
        }
        const grade = (100/questions.length)*correct;
        const User = await userModel.findById(userId);
        User.quizHistories.push({
            quiz: new mongoose.Types.ObjectId(quizId), title: Quiz.title, score: grade
        })
        await User.save();
        return res.status(200).json({msg: "Successfully submission auto correct", grade});
    } catch (error) {
        return res.status(500).json({msg: "Error created quiz", error})
    }
}