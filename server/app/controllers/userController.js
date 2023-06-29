const {userModel} = require("../models");
const {encryptPassword, verifyPassword, generateToken, generateTokenResetPassword, verifyToken} = require("../utils/helper");
const {sendResetPasswordEmail} = require("../utils/nodemailer");

exports.create = async (req, res) => {
    const {fullName, email, password, phone, role} = req.body;

    if (!fullName || !email || !password || !phone || !role) {
        return res.status(400).json({msg: "Missing required fields"})
    }

    const user = await userModel.findOne({email});

    if (user) {
        return res.status(400).json({msg: "Email already exits"})
    }
    const passwordV2 = await encryptPassword(password);
    try {
        await userModel.create({
            fullName,
            email,
            password: passwordV2,
            phone,
            role
        });
        return res.status(200).json({msg: "User registered successfully"})
    } catch (error) {
        return res.status(500).json({msg: "Error creating user", error: error.message});
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(401).json({msg: "Invalid email or password"});
        }
        const match = await verifyPassword(password, user.password);
        if (!match) {
            return res.status(401).json({msg: "Invalid email or password"});
        }
        const payload = {
            userId: user._id,
            role: user.role
        };
        const token = await generateToken(payload);
        return res.status(200).json({msg: "User logged successfully", token});
    } catch (error) {
        return res.status(500).json({msg: "Error creating user", error: error.message});
    }
}

exports.getUser = async (req, res) => {
    const {userId} = req.user; // Assuming the user's ID is stored in the _id field

    try {
        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({msg: "Error retrieving user", error: error.message});
    }
};

exports.findUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"})
        }
        const {password, ...data} = user._doc;
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({msg: "Error get user", error: error.message});
    }
}

exports.findAllUser = async (req, res) => {
    try {
        const users = await userModel.find({}, {password: 0});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({msg: "Error retrieving users", error});
    }
};

exports.updateUser = async (req, res) => {
    const {userId} = req.user;
    const {password, ...updateData} = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            {new: true}
        );

        if (!updatedUser) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json({msg: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({msg: "Error updating user", error});
    }
};

exports.updatePassword = async (req, res) => {
    const {userId} = req.user;
    const {newPassword} = req.body;
    const passwordV2 = await encryptPassword(newPassword)

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {password: passwordV2},
            {new: true}
        );

        if (!updatedUser) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json({msg: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({msg: "Error updating user", error});
    }
};

exports.deleteUser = async (req, res) => {
    const {userId} = req.params;
    const {role} = req.user;

    try {
        if (role !== "admin") {
            return res.status(403).json({msg: "Only admin can delete user"});
        }
        const user = await userModel.findById(userId);
        if (user.role === "admin") {
            return res.status(403).json({msg: "Can't delete admin"});
        }

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
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({msg: "Missing required fields"});
    }
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(200).json({msg: "If the email is registered, an OTP will be sent for verification."});
        }
        const payload = {
            userId: user._id
        }
        const token = await generateTokenResetPassword(payload);
        await sendResetPasswordEmail(user.fullName, email, token);
        return res.status(200).json({msg: "If the email is registered, an OTP will be sent for verification."});
    } catch (error) {
        return res.status(500).json({msg: "Error sending OTP", error});
    }
}

exports.verifyTokenRestPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const passwordV2 = await encryptPassword(password);
    if (!token){
        res.status(400).json({msg: "Request token is invalid"})
    }
    try {
        const {userId} = await verifyToken(token);


        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        user.password = passwordV2;
        await user.save();
        res.json({msg: "Successfully updated password"})
    } catch (error) {
        return res.status(500).json({msg: "Link is Expired"});
    }
}