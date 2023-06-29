const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const model = require("./app/models");

const app = express();

// config
dotenv.config();
app.use(express.json());
app.use(cors({origin: "*"}));

// connect database
model.mongoose.connect(model.url).then(() => {
    console.log("Database connected");
}).catch((error) => {
    return console.error("Database error to connect", error);
})


// routing server
// app.use("/", (req,res) => {
//     res.send("<p>Welcome To API</p>")
// });

// User Router
require("./app/routes/userRouter")(app);


// running server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server running and up at ${PORT}`);
})