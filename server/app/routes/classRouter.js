const classRoute = require("express").Router();
const classController = require("../controllers/classController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {roleTeacherMiddleware} = require("../middlewares/roleMiddleware");

module.exports = app => {

    // Post Method
    classRoute.post("/register", authMiddleware, roleTeacherMiddleware, classController.create);


    // Get Method
    classRoute.get("/get-class", authMiddleware, classController.getListClass);
    classRoute.get("/detail-class", authMiddleware, classController.detailClass);

    app.use("/api/class", classRoute);
}