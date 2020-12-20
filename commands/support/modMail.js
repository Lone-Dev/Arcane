const Discord = require("discord.js");

module.exports = {
    name: "modmail",
    description: "ModMail someone (support team only)",
    category: "☎ Support",
    usage: `${process.env.prefix}modmail`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client) {

        if (message.author.id !== process.env.ownerID) return message.channel.send('Only support people can use this command.')

        const member = client.users.cache.get(args[1])

        // if (message.author.id === member.id) return message.channel.send(`You can't send a message to your self.`)

        const embed = new Discord.MessageEmbed()
            .setTitle(`[OFFICIAL MODMAIL] Message from ${message.author.username}`)
            .setDescription(args.slice(2).join(' '))
        member.send(embed)
    }
}