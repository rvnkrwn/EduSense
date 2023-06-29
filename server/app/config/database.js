require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

module.exports = {
    url: MONGO_URL
}