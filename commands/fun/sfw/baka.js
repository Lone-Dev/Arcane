const Discord = require("discord.js");

module.exports = {
    name: "baka",
    description: "Baka someone.",
    category: "🎈 Fun",
    usage: `${process.env.prefix}baka [member]`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, lone) {

        const member = message.mentions.members.first()
            || message.guild.members.cache.get(args[1])


        let result = await lone.sfw.baka();

        const embed = new Discord.MessageEmbed()
            .setDescription(`${member ? `**${member.user.username}** you are getting a baka` : 'BAKAAAAAAA'}`)
            .setImage(result.url)

        message.channel.send(embed)

    }
}