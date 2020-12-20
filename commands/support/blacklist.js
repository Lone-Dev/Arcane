const Discord = require("discord.js");
const mongoose = require('mongoose')
const blacklistUserModel = require('../../database/models/blacklistUser')
const blacklistGuildModel = require('../../database/models/blacklistGuild')

module.exports = {
    name: "blacklist",
    description: "Add a guild or user to the blacklist.js",
    category: "☎ Support",
    usage: `${process.env.prefix}blacklist <user/guild> <add/remove> <user> [reason]`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        if (message.author.id !== process.env.ownerID) return message.channel.send('Only support people can use this command.')
        const user = message.mentions.members.first() || client.users.cache.get(args[3])
        const guild = client.guilds.cache.get(args[3])
        let reason = args.slice(4).join(' ')
        if (!reason) reason = 'undefined'

        if (!args[1]) return message.channel.send('Do you want to blacklist or unblacklist a guild or a user?')

        switch (args[1]) {
            case 'user': if (!args[2] === 'add' || !args[2] === 'remove') return message.channel.send('Do you want to remove or add a user to the blacklist?')
                switch (args[2]) {
                    case 'add': if (!user) return message.channel.send('Who do you want to blacklist.')
                        blacklistUserModel.findOne({ userID: user.id }, async (err, data) => {
                            if (err) console.log(err)
                            if (!data) {
                                let blacklistuserAdd = new blacklistUserModel({
                                    _id: mongoose.Types.ObjectId(),
                                    userID: user.id,
                                    reason: reason,
                                    time: message.createdAt,
                                })
                                blacklistuserAdd.save().catch(err => message.channel.send(`Oops, something went wrong. Err: ${err}`)).then(() => { message.channel.send(`Added ${user.id} to the blacklist.`) })
                            } else {
                                message.channel.send(`This user is already blacklisted.`)
                            }
                        })
                        break;
                    case 'remove':
                        if (!user) return message.channel.send('Who do you want to unblacklist.')
                        blacklistUserModel.findOne({ userID: user.id }, async (err, data) => {
                            if (err) console.log(err)
                            if (data) {
                                blacklistUserModel.deleteOne({ userID: user.id }).catch(err => message.channel.send(`Oops, something went wrong. Err: ${err}`)).then(() => { message.channel.send(`Removed ${user.id} from the blacklist.`) })
                            } else {
                                message.channel.send(`This user isn't blacklisted.`)
                            }
                        })
                        break;
                }
                break;
            case 'guild': if (!args[2] === 'add' || !args[2] === 'remove') return message.channel.send('Do you want to remove or add a guild to the blacklist?')
                switch (args[2]) {
                    case 'add': if (!guild) return message.channel.send('Which guild do you want to blacklist?')
                        blacklistGuildModel.findOne({ guildID: guild.id }, async (err, data) => {
                            if (err) console.log(err)
                            if (!data) {
                                let blacklistGuildAdd = new blacklistGuildModel({
                                    _id: mongoose.Types.ObjectId(),
                                    guildID: guild.id,
                                    reason: reason,
                                    time: message.createdAt,
                                })
                                blacklistGuildAdd.save().catch(err => message.channel.send(`Oops, something went wrong. Err: ${err}`)).then(() => { message.channel.send(`Added guild: ${guild.id} to the blacklist.`) })
                            } else {
                                message.channel.send(`This guild is already blacklisted.`)
                            }
                        })
                        break;
                    case 'remove':
                        if (!guild) return message.channel.send('Which guild do you want to unblacklist?')
                        blacklistGuildModel.findOne({ guildID: guild.id }, async (err, data) => {
                            if (err) console.log(err)
                            if (data) {
                                blacklistGuildModel.deleteOne({ guildID: guild.id }).then(`Removed guild: ${guild.id} from the blacklist.`)
                            } else {
                                message.channel.send(`This guild isn't blacklisted.`)
                            }
                        })
                        break;
                }
                break;
        }

    }
}