const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Controller username gönderdiği için alanı düzelttik
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  language: { type: String, default: "tr" }
});

module.exports = mongoose.model("User", UserSchema);