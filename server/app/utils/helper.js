const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function generateToken(payload) {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

async function generateTokenResetPassword(payload) {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "5m"});
    return token;
}

async function verifyToken(token) {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}

async function encryptPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

async function generateCode(length) {
    let code = '';
    const character = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const generate = () => {
        for (let i = 0; i < length; i++){
            code += character.charAt(Math.floor(Math.random()*character.length))
        }
    }

    await generate();
    return code;
}

module.exports = {
    generateToken,
    verifyToken,
    encryptPassword,
    verifyPassword,
    generateTokenResetPassword,
    generateCode
};
