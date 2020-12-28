const mongoose = require('mongoose')

const kick = mongoose.Schema({
    guildID: String,
    memberID: String,
    kicks: Array,
    moderator: Array,
    date: Array
})

module.exports = mongoose.model('kick', kick, "kicks")