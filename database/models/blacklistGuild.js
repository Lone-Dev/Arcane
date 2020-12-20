const mongoose = require('mongoose');

const blacklistGuild = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    guildID: String,
    reason: String,
    time: String,
});

module.exports = mongoose.model('blacklistGuild', blacklistGuild, "blacklist")