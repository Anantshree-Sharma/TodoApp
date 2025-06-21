const User = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
const AppError = require("../utils/AppError");

//handle user Creation in Database
exports.createUser = async ({ firstName, lastName, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Account Already exists", 401);
  }
  const user = await User.create({ firstName, lastName, email, password });
  return user;
};

//finds user by email and returns only cerntain details of user
exports.findByEmail = async (email) => {
  return await User.findOne({ email }).select("-createdAt -updatedAt -__v");
};

//finds user by email and fetch hashed-password as well
exports.findByEmailWithPassword = async (email) => {
  return await User.findOne({ email }).select(
    "+password -createdAt -updatedAt"
  );
};

// Adds token to BlacklistToken collection in database
exports.blacklistToken = async (token) => {
  return await BlacklistToken.create({ token });
};

//finds blacklisted token
exports.findBlacklistToken = async (token) => {
  return await BlacklistToken.findOne({ token });
};
