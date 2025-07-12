const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const AppError = require("../utils/AppError");

// checks if a user is authorized to use routes.if not it blocks the user
const authentication = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new AppError("Unauthorized", 401);
    }
    const blacklisted = await userService.findBlacklistToken(token);

    if (blacklisted) {
      throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await userService.findByEmail(email);
    req.user = user;
    next();
  } catch (err) {
    const error =
      err.name === "AppError" ? err.message : "invalid or expired token";
    const statusCode = err.name === "AppError" ? err.statusCode : 403;
    res.status(statusCode).json({ error });
  }
};

module.exports = authentication;
