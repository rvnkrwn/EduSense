exports.roleAdminMiddleware = async (req, res, next) => {
    const {userId, role} = req.user;
    if (!role) {
        return res.status(401).json({msg: "Missing role at this user"});
    }
    if (role !== "admin") {
        return res.status(403).json({msg: "You are not an admin"});
    }
    req.user = {userId, role};
    next();
}

exports.roleTeacherMiddleware = async (req, res, next) => {
    const {userId, role} = req.user;
    if (!role) {
        return res.status(401).json({msg: "Missing role at this user"});
    }
    if (role !== "teacher") {
        return res.status(403).json({msg: "You are not an teacher"});
    }
    req.user = {userId, role};
    next();
}

exports.roleStudentMiddleware = async (req, res, next) => {
    const {userId, role} = req.user;
    if (!role) {
        return res.status(401).json({msg: "Missing role at this user"});
    }
    if (role !== "student") {
        return res.status(403).json({msg: "You are not an student"});
    }
    req.user = {userId, role};
    next();
}