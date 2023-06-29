const userRoute = require("express").Router();
const userController = require("../controllers/userController")

module.exports = app => {

    // Post Method
    userRoute.post("/register", userController.create);
    userRoute.post("/login", userController.login);

    app.use("/api/user", userRoute);
}