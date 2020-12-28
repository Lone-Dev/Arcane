const mongoose = require('mongoose')

const ban = mongoose.Schema({
    guildID: String,
    memberID: String,
    bans: Array,
    moderator: Array,
    date: Array
})

module.exports = mongoose.model('ban', ban, "bans")