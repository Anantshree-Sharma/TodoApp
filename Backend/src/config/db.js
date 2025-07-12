const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const DB_URL = process.env.DB_URL;

const dbConnect = (callback) => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Db connection successfull");
      callback();
    })
    .catch((error) => {
      console.log("Error Connecting to DB: ", error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
