const {userModel} = require("../models");
const {encryptPassword, verifyPassword, generateToken} = require("../utils/helper");

exports.create = async (req, res) => {
    const {fullName, email, password, phone} = req.body;

    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({msg: "Missing required fields"})
    }

    const passwordV2 = await encryptPassword(password);
    try {
        await userModel.create({
            fullName,
            email,
            password: passwordV2,
            phone
        });
        return res.status(200).json({msg: "Successfully Created"})
    } catch (error) {
        return res.status(500).json({msg: "Error creating user", error});
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
            userId: user._id
        };
        const token = await generateToken(payload);
        return res.status(200).json({msg: "Successfully Login", token});
    } catch (error) {
        return res.status(500).json({msg: "Error creating user", error: error.message});
    }
}