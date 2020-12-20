const discordString = require('discord-strings');

module.exports = {
    name: 'string',
    description: "Get an random string.",
    category: "🔰 Util",
    usage: `${process.env.prefix}string`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {


        const x = discordString({
            lenght: 5,
            numeric: true,
            letter: true,
            special: false
        })

        message.channel.send(x)

    }
};