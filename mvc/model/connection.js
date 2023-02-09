const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url =
  "mongodb+srv://admin:12345@cluster0.wzwycwb.mongodb.net/foodblog?retryWrites=true&w=majority";

mongoose.connect(url, {
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
module.exports = { db, mongoose };
