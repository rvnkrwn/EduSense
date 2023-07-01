const {classModel, userModel} = require("../models");
const {generateCode} = require("../utils/helper");
const mongoose = require("mongoose")

exports.create = async (req, res) => {
    try {
        const {name, subjects} = req.bodyC
        const {userId} = req.user;
        if (!name || !subjects) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const code = await generateCode(6);
        await classModel.create({
            name: name, subjects: subjects, code: code, teacher: userId
        });
        return res.status(201).json({msg: "Class registered successfully"})
    } catch (error) {
        return res.status(500).json({msg: "Error creating class", error: error.message});
    }
}

exports.getListClass = async (req, res) => {
    try {
        const {userId} = req.user; // Assuming the user's ID is stored in the _id field
        const user = await userModel.findById(userId).populate("classes")
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const Classes = user.classes;

        let listClass = [];
        for (let i = 0; i < Classes.length; i++) {
            const classData = Classes[i];
            listClass.push({
                classId: classData._id, name: classData.name, teacher: classData.teacher, code: classData.code,
            })
        }
        return res.status(200).json(listClass)
    } catch (error) {
        return res.status(500).json({msg: "Error get class", error: error.message});
    }
};

exports.detailClass = async (req, res) => {
    try {
        const {classId} = req.params; // Assuming the user's ID is stored in the _id field
        const Class = await classModel.findById(classId);
        if (!Class) {
            return res.status(404).json({msg: "Class not found"});
        }
        return res.status(200).json(Class)
    } catch (error) {
        return res.status(500).json({msg: "Error get class", error: error.message});
    }
};

exports.leaveClass = async (req, res) => {
    try {
        const {userId} = req.user;
        const {classId} = req.params;
        if (!classId) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const User = await userModel.findById(userId);
        if (!User) {
            return res.status(404).json({msg: "User not found"});
        }
        const classes = User.classes;
        const Class = await classModel.findById(classId);
        Class.students.pull(new mongoose.Types.ObjectId(userId))
        await Class.save();
        User.classes.pull(new mongoose.Types.ObjectId(classId))
        await User.save();
        return res.status(200).json({msg: "Successfully leave class"});
    } catch (error) {
        return res.status(500).json({msg: "Error leave class", error: error.message});
    }
}

exports.deleteClass = async (req, res) => {
    try {
        const {userId} = req.user;
        const {classId} = req.params;
        if (!classId) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const Users = await userModel.find();
        // if (!users) {
        //     return res.status(404).json({msg: "User not found"});
        // }
        for (let i = 0; i < Users.length; i++) {
            Users[i].classes.pull(classId);
            await Users[i].save();
        }
        await classModel.findByIdAndDelete(classId);
        return res.status(200).json({msg: "Successfully deleted class"});
    } catch (error) {
        return res.status(500).json({msg: "Error delete class", error: error.message});
    }
}