const mongoose = require('mongoose');

const welcomeMessage = new mongoose.Schema({
    guildID: String,
    customMessage: String,
});

module.exports = mongoose.model('welcomeMessage', welcomeMessage)