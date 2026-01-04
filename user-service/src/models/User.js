const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  language: { type: String, default: "tr" }
});

module.exports = mongoose.model("User", UserSchema);
