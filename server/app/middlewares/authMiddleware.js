const {verifyToken} = require("../utils/helper");
exports.authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({msg: "Missing authorization header"});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}