const userRoute = require("express").Router();
const userController = require("../controllers/userController")
const {authMiddleware} = require("../middlewares/authMiddleware");
const {roleAdminMiddleware} = require("../middlewares/roleMiddleware");


module.exports = app => {

    // Post Method
    userRoute.post("/register", userController.create);
    userRoute.post("/login", userController.login);
    userRoute.post("/forget-password", userController.sendResetPassword);

    // Get Method
    userRoute.get("/get-user", authMiddleware, userController.getUser);
    userRoute.get("/find-all-user", userController.findAllUser);
    userRoute.get("/:userId", userController.findUser);

    // Put Method
    userRoute.put("/update", authMiddleware, userController.updateUser);
    userRoute.put("/update-password", authMiddleware, userController.updatePassword);
    userRoute.put("/reset-password/:token", userController.verifyTokenResetPassword);

    // Delete Method
    userRoute.delete("/delete/:userId", authMiddleware, roleAdminMiddleware, userController.deleteUser);


    app.use("/api/user", userRoute);
}