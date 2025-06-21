const express = require("express");

const signupValidator = require("../validations/signup.vadidator");
const authentication = require("../middlewares/auth");
const {
  handleSignup,
  handleLogin,
  handleLogout,
  getProfile,
} = require("../controllers/user.controller");

const userRouter = express.Router();

//routes
userRouter.post("/user/signup", signupValidator, handleSignup);

userRouter.post("/user/login", handleLogin);

userRouter.get("/user/profile", authentication, getProfile);

userRouter.post("/user/logout", authentication, handleLogout);

module.exports = userRouter;
