const classRoute = require("express").Router();
const classController = require("../controllers/classController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {roleTeacherMiddleware} = require("../middlewares/roleMiddleware");

module.exports = app => {

    // Post Method
    classRoute.post("/register", authMiddleware, roleTeacherMiddleware, classController.create);

    // Get Method
    classRoute.get("/", authMiddleware, classController.getListClass);
    classRoute.get("/detail/:classId", authMiddleware, classController.detailClass);

    // Delete Method
    classRoute.delete("/leave/:classId", authMiddleware, classController.leaveClass);
    classRoute.delete("/delete/:classId", authMiddleware, roleTeacherMiddleware, classController.deleteClass);

    app.use("/api/class", classRoute);
}