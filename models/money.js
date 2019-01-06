const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
  userName: String,
  userID: String,
  serverID: String,
  money: Number
})

module.exports = mongoose.model("Money", moneySchema);
