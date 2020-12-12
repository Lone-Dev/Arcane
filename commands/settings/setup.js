const Discord = require("discord.js");

module.exports = {
    name: "setup",
    description: "Just setup me.",
    category: "⚙ Settings",
    usage: `;setup`,
    cooldown: 6,


    async execute(message, args, client, lone) {

        message.channel.awaitMessages(user => user.author.id === message.author.id, { max: 1 }).then(answer => {


            if (answer.first() === 'cancel') message.channel.send('Canceled the setup.')
        })

    }
}