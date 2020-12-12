const mongoose = require("mongoose");
const logSchema = new mongoose.Schema({
  GuildID: String,
  ChannelID: String,
});

module.exports = mongoose.model("MessageLog", logSchema);
