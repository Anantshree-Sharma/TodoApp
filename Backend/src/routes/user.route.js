const express = require("express");

const { handleSignup } = require("../controllers/user.controller");
const signupValidator = require("../validations/signup.vadidator");

const authRouter = express.Router();

authRouter.post("/user/signup", signupValidator, handleSignup);

module.exports = authRouter;
