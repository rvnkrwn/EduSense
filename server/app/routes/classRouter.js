const classRoute = require("express").Router();
const classController = require("../controllers/classController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {roleTeacherMiddleware} = require("../middlewares/roleMiddleware");

module.exports = app => {

    // Post Method
    classRoute.post("/register", authMiddleware, roleTeacherMiddleware, classController.create);


    app.use("/api/class", classRoute);
}