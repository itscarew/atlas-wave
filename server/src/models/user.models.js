const mongoose = require("mongoose");

const role = require("../auth/role");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  role: { type: String, enum: [role.BASIC, role.ADMIN], default: role.BASIC },
});

module.exports = mongoose.model("User", UserSchema);
