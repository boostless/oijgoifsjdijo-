const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
  userName: String,
  serverID: String,
  userID: String,
  xp: Number,
  level: Number
})

module.exports = mongoose.model("XP", xpSchema);
