const guildPrefix = require('../../database/models/guildPrefix')

module.exports = {
    name: "prefix",
    description: "Set an custom prefix for you guild",
    category: "⚙ Settings",
    usage: `<prefix>`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Only an admin of this server can use this command.`)
        if (!args[1]) return message.channel.send(`What must the prefix be?`)
        if (args[1] > 3) return message.channel.send(`The prefix cannot be longer then 3 characters.`)

        guildPrefix.findOne({ guildID: message.guild.id }, async (err, data) => {
            if (err) return message.channel.send(`An error acuded.`)
            if (!data) {
                let newGuildPrefix = new guildPrefix({
                    guildID: message.guild.id,
                    prefix: args[1],
                })
                newGuildPrefix.save().catch(err => console.log(err))
                message.channel.send(`The new prefix for this guild is **${args[1]}`)
            }
            if (data) {
                message.channel.send(`This data already exist.`)

            }
        })



    }
}