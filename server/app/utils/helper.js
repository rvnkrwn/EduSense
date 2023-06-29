const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
export default function generateToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export default function verifyToken(payload){
    return jwt.verify(payload,process.env.JWT_SECRET);
}
export default async function encryptPassword(passsword) {
    return await bcrypt.hashSync(passsword, 10);
}

export default async function verifyPassword(passsword, hash) {
    return await bcrypt.compareSync(passsword, hash);
}