const {quizModel, classModel} = require("../models");
const {autoGenerateQuestions} = require("../utils/openai");

exports.create = async (req, res) => {
    const {classId, title,prompt,startTime,endTime} = req.body;
    if (!title || !prompt) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    try {
        const text = await autoGenerateQuestions(prompt);
        const questions = JSON.parse(text);

        const quiz = await quizModel.create({
            title,
            status: "pending"
        });
        for (let i = 0; i < questions.length; i++) {
            quiz.questions.push(questions[i]);
            await quiz.save();
        }

        const Class = await classModel.findById(classId);
        Class.quizzes.push(quiz._id);
        Class.save();

        return res.status(201).json({msg: "Successfully created quiz"});
    } catch (error) {
        return res.status(500).json({msg: "Error created quiz", error})
    }
}


exports.submission = async (req, res) => {
    const {quizId, answers} = req.body;
    if (!quizId || !answers) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    try {
        const quiz = await quizModel.findById(quizId);
        const questions = quiz.questions;
        let grade = 0;
        for (let i = 0; i < questions.length; i++){
            const correctOption = questions[i].correctOption;
            if (correctOption === answers[i]){
                grade++;
            }
        }
        return res.status(200).json(grade);
    } catch (error) {
        return res.status(500).json({msg: "Error created quiz", error})
    }
}