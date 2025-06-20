const User = require("../models/user.model");
const { createUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

exports.handleSignup = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const err = error.array()[0].msg;
      throw new AppError(err, 401);
    }

    const { firstName, lastName, email, password } = req.body;

    const hanshedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hanshedPassword,
    });

    res.status(201).json({ msg: "User Registration Success" });
  } catch (err) {
    const error =
      err.name === "AppError" ? err.message : "Something went wrong";
    const statusCode = err.name === "AppError" ? err.statusCode : 500;
    res.status(statusCode).json({ error });
  }
};
