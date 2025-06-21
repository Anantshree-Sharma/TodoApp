const mongoose = require("mongoose");

const blackListTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});

const BlacklistToken = mongoose.model("BlacklistToken", blackListTokenSchema);

module.exports = BlacklistToken;
