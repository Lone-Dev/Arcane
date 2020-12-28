const Discord = require("discord.js");
const $ = require('lone.wolfs')
const neko = new $()

module.exports = {
    name: "hug",
    description: "Hug someone.",
    category: "🎈 Fun",
    usage: `[member]`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        const member = message.mentions.members.first()
            || message.guild.members.cache.get(args[1])


        if (!member) return message.channel.send(`Who do you want to hug.`)

        let result = await neko.sfw.hug();

        const embed = new Discord.MessageEmbed()
            .setDescription(`_Eeep- **${member.user.username}**! You're getting hugged by **${message.author.username}**!_`)
            .setImage(result.url)

        message.channel.send(embed)

    }
}