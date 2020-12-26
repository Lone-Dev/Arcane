const guildPrefix = require('../../database/models/guildPrefix')

module.exports = {
    name: "reset",
    description: "Reset some settings.",
    category: "⚙ Settings",
    usage: `${process.env.prefix}reset <thing>`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Only an admin of this server can use this command.`)
        if (!args[1]) return message.channel.send(`What do you want to reset?.`)

        switch (args[1]) {
            case 'prefix':
                guildPrefix.deleteOne({ guildID: message.guild.id }, (err) => {
                    if (err) console.log(err)
                })
                message.channel.send(`Deleted, prefix. Prefix is setted to default (!)`)

                break;
        }



    }
}