const mongoose = require('mongoose');

const guildPrefix = new mongoose.Schema({
    guildID: String,
    prefix: String,
});

module.exports = mongoose.model('prefixe', guildPrefix, "prefix")