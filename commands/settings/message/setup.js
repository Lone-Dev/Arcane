const Discord = require("discord.js");

module.exports = {
    name: "setup",
    description: "Just setup me",
    category: "⚙ Settings",
    usage: `No usage.`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        const filter = s => s.author.id === message.author.id

        const msg = await message.channel.send('Heyo there, we will do the setup for this server.')

        setTimeout(function () {
            msg.edit(`What would be logging channel? (mention it)`);
        }, 1500);

        message.channel.awaitMessages(filter, { max: 1 }).then(answer => {

            if (answer.first().content === 'cancel') {
                msg.delete()
                return message.channel.send(`Canceled the setup.`)

            } else {

                const mentionedChannel = answer.first().mentions.channels.first() || client.channels.cache.get(answer.first().content)

                msg.edit(`So ${mentionedChannel}? ok ok..`)

                setTimeout(function () {
                    msg.edit(``)
                }, 1500)
            }

        })

    }
}