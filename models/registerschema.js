const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
});

const User = mongoose.model("User", registerSchema);
module.exports = User;
