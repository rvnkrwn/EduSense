const {classModel, userModel} = require("../models");
const {generateCode} = require("../utils/helper");

exports.create = async (req, res) => {
    const {name, subjects, teacher} = req.body;
    if (!name || !subjects || !teacher) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    const code = generateCode(6);
    try {
        await classModel.create({
            name: name,
            subjects: subjects,
            code: code,
            teacher: teacher
        });
        return res.json({msg: "Class registered successfully"})
    } catch (error) {
        return res.status(500).json({msg: "Error creating class", error: error.message});
    }
}

exports.getClass = async (req, res) => {
    const {userId} = req.user; // Assuming the user's ID is stored in the _id field
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
        return res.status(404).json({msg: "User not found"});
    }

    try {
        await classModel.find().where({students: userId});
    } catch (error) {
        return res.status(500).json({msg: "Error get class", error: error.message});
    }
};