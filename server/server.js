const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// config
dotenv.config();
app.use(express.json());
app.use(cors({origin: "*"}));

// connect database


// routing server
app.use("/", (req,res) => {
    res.send("<p>Welcome To API</p>")
});



// running server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server running and up at ${PORT}`);
})