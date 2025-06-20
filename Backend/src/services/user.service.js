const User = require("../models/user.model");
const AppError = require("../utils/AppError");

exports.createUser = async ({ firstName, lastName, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Account Already exists", 401);
  }
  const user = await User.create({ firstName, lastName, email, password });
  return user;
};
