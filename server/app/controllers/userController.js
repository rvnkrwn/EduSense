const {userModel, classModel} = require("../models");
const {
    encryptPassword, verifyPassword, generateToken, generateTokenResetPassword, verifyToken
} = require("../utils/helper");
const {sendResetPasswordEmail, sendRegistrationThankYouEmail} = require("../utils/nodemailer");

// User CRUD
exports.create = async (req, res) => {
    try {
        const {fullName, email, password, phone, role} = req.body;

        if (!fullName || !email || !password || !phone || !role) {
            return res.status(400).json({msg: "Missing required fields"})
        }
        const User = await userModel.findOne({email});

        if (User) {
            return res.status(400).json({msg: "Email already exits"})
        }
        const passwordV2 = await encryptPassword(password);
        await userModel.create({
            fullName, email, password: passwordV2, phone, role
        });
        await sendRegistrationThankYouEmail(fullName, email)
        return res.status(200).json({msg: "User registered successfully"})
    } catch (error) {
        return res.status(500).json({msg: "Error creating user", error: error.message});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const User = await userModel.findOne({email});
        if (!User) {
            return res.status(401).json({msg: "Invalid email or password"});
        }
        const match = await verifyPassword(password, User.password);
        if (!match) {
            return res.status(401).json({msg: "Invalid email or password"});
        }
        const payload = {
            userId: User._id, role: User.role
        };
        const token = await generateToken(payload);
        return res.status(200).json({msg: "User logged successfully", token});
    } catch (error) {
        return res.status(500).json({msg: "Error creating user", error: error.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const {userId} = req.user;
        const User = await userModel.findById(userId).select("-password");
        if (!User) {
            return res.status(404).json({msg: "User not found"});
        }
        return res.status(200).json(User);
    } catch (error) {
        return res.status(500).json({msg: "Error retrieving user", error: error.message});
    }
};

exports.findUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const User = await userModel.findById(userId);
        if (!User) {
            return res.status(404).json({msg: "User not found"})
        }
        const {password, ...data} = User._doc;
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({msg: "Error get user", error: error.message});
    }
}

exports.findAllUser = async (req, res) => {
    try {
        const Users = await userModel.find({}, {password: 0});
        return res.status(200).json(Users);
    } catch (error) {
        return res.status(500).json({msg: "Error retrieving users", error});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {userId} = req.user;
        const {password, ...updateData} = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {new: true});

        if (!updatedUser) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json({msg: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({msg: "Error updating user", error});
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const {userId} = req.user;
        const {newPassword} = req.body;
        const passwordV2 = await encryptPassword(newPassword)

        const updatedUser = await userModel.findByIdAndUpdate(userId, {password: passwordV2}, {new: true});

        if (!updatedUser) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json({msg: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({msg: "Error updating user", error});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;

        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json({msg: "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({msg: "Error deleting user", error});
    }
};

exports.sendResetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const User = await userModel.findOne({email});
        if (!User) {
            return res.status(200).json({msg: "If the email is registered, an OTP will be sent for verification."});
        }
        const payload = {
            userId: User._id
        }
        const token = await generateTokenResetPassword(payload);
        await sendResetPasswordEmail(User.fullName, email, token);
        return res.status(200).json({msg: "If the email is registered, an OTP will be sent for verification."});
    } catch (error) {
        return res.status(500).json({msg: "Error sending OTP", error});
    }
}

exports.verifyTokenResetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        const passwordV2 = await encryptPassword(password);
        if (!token) {
            res.status(400).json({msg: "Request token is invalid"})
        }
        const {userId} = await verifyToken(token);


        const User = await userModel.findById(userId);
        if (!User) {
            return res.status(404).json({msg: "User not found"});
        }

        User.password = passwordV2;
        await User.save();
        res.status(200).json({msg: "Successfully updated password"})
    } catch (error) {
        return res.status(500).json({msg: "Link is Expired"});
    }
}

// Class

exports.joinClass = async (req, res) => {
    try {
        const {userId} = req.user;
        const {code} = req.body;
        if (!code) {
            return res.status(400).json({msg: "Missing required fields"});
        }
        const Class = await classModel.findOne({code});
        if (!Class) {
            return res.status(404).json({msg: "Class not found"});
        }
        const User = await userModel.findById(userId);
        if (!User) {
            return res.status(404).json({msg: "User not found"});
        }
        const checkDuplicateClass = await userModel.findById(userId).where({classes: {$in: Class._id}});
        if (checkDuplicateClass) {
            return res.status(400).json({msg: "Class already exits"});
        }
        Class.students.push(userId);
        await Class.save();
        User.classes.push(Class._id);
        await User.save();
        res.status(200).json({msg: "Successfully join class"})
    } catch (error) {
        return res.status(500).json({msg: "Error join class", error});
    }
}

exports.addQuizHistories = async (req, res) => {
    try {
        const {userId, quizId, score} = req.user;

        if (!quizId) {
            return res.status(400).json({msg: "Missing required fields"});
        }

        const User = await userModel.findById(userId);
        if (!User) {
            return res.status(404).json({msg: "User not found"});
        }
        quizHistory = {
            quiz: quizId, score
        }
        User.quizHistories.score = score;
        await User.save();
        res.status(200).json({msg: "Successfully add quizHistories"})
    } catch (error) {
        return res.status(500).json({msg: "Error add quizHistories", error});
    }
}