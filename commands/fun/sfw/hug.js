const Discord = require("discord.js");

module.exports = {
    name: "hug",
    description: "Hug someone.",
    category: "🎈 Fun",
    usage: `;hug [member]`,
    cooldown: 2,


    async execute(message, args, client, lone) {

        const member = message.mentions.members.first()
            || message.guild.members.cache.get(args[0])
            || message.guild.members.cache.find(
                (x) => x.user.username === args.slice(0).join(" ")
                    || x.user.username === args[0].toLowerCase());

        if (!member) return message.channel.send(`Who do you want to hug.`)

        let result = await lone.sfw.hug();

        const embed = new Discord.MessageEmbed()
            .setDescription(`_Eeep- **${member.user.username}**! You're getting hugged by **${message.author.username}**!_`)
            .setImage(result.url)

        message.channel.send(embed)

    }
}