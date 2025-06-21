const User = require("../models/user.model");
const userService = require("../services/user.service");
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

    await userService.createUser({
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

exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmailWithPassword(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ msg: "Login Successfull" });
  } catch (err) {
    console.log(err);
    const error =
      err.name === "AppError" ? err.message : "Something went wrong";
    const statusCode = err.name === "AppError" ? err.statusCode : 500;
    res.status(statusCode).json({ error });
  }
};

exports.getProfile = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("unauthorized", 401);
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    const error =
      err instanceof AppError ? err.message : "Something went wrong";
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    res.status(statusCode).json({ error });
  }
};

exports.handleLogout = async (req, res) => {
  try {
    const token = req.cookies?.token;
    await userService.blacklistToken(token);
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ msg: "Logout SuccessFull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
