const mongoose = require('mongoose');

const blacklistUser = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userID: String,
    reason: String,
    time: String,
});

module.exports = mongoose.model('blacklistUser', blacklistUser, "blacklist")