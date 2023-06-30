const {classModel, userModel} = require("../models");
const {generateCode} = require("../utils/helper");

exports.create = async (req, res) => {
    const {name, subjects} = req.body;
    const {userId} = req.user;
    if (!name || !subjects) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    const code = await generateCode(6);
    try {
        await classModel.create({
            name: name,
            subjects: subjects,
            code: code,
            teacher: userId
        });
        return res.json({msg: "Class registered successfully"})
    } catch (error) {
        return res.status(500).json({msg: "Error creating class", error: error.message});
    }
}

exports.getListClass = async (req, res) => {
    const {userId} = req.user; // Assuming the user's ID is stored in the _id field
    try {
        const user = await userModel.findById(userId).populate("classes")
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const classes = user.classes;
        let listClass = [];
        for (let i = 0; i < classes.length; i++) {
            const classData = classes[i];
            listClass.push({
                classId: classData._id,
                name: classData.name,
                teacher: classData.teacher,
                code: classData.code,
            })
        }
        return res.status(200).json(listClass)
    } catch (error) {
        return res.status(500).json({msg: "Error get class", error: error.message});
    }
};

exports.detailClass = async (req, res) => {
    const {classId} = req.body; // Assuming the user's ID is stored in the _id field
    try {
        const Class = await classModel.findById(classId);
        return res.status(200).json(Class)
    } catch (error) {
        return res.status(500).json({msg: "Error get class", error: error.message});
    }
};

exports.deleteClass = async (req, res) => {
    const {userId} = req.user;
    const {classId} = req.body;
    if (!classId) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const classIndex = user.classes.findIndex((_id) => _id.toString() === classId);

        if (classIndex === -1) {
            return res.status(404).json({msg: 'Class not found in user\'s classes'});
        }

        user.classes.splice(classIndex, 1);
        await user.save();
        await classModel.findByIdAndDelete(classId);
        return res.status(200).json({msg: "Successfully deleted class"});
    } catch (error) {
        return res.status(500).json({msg: "Error delete class", error: error.message});
    }
}