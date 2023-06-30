const {userModel, classModel} = require("../models");

exports.joinQuiz = async (req, res) => {
    const {userId} = req.user;
    const {quizId, timeline} = req.body;

    const startTime = new Date();
    const endTime = startTime.setMinutes(startTime.getMinutes() + timeline);

    if (!quizId) {
        return res.status(400).json({msg: "Missing required fields"});
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const quiz = {
            quiz: quizId,
            startTime: startTime,
            endTime: endTime,
            score: score,
            status: "expired"
        }
        user.quizHistories.push(quiz);
        await user.save();
        res.status(200).json({msg: "Successfully add quizHistories"})
    } catch (error) {
        return res.status(500).json({msg: "Error add quizHistories", error});
    }
}