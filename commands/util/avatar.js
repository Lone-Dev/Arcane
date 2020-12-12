const Discord = require("discord.js");
const { prefix } = require('../../config.json')

module.exports = {
    name: "avatar",
    aliases: ['pf', 'profilepic', 'profilepicture'],
    description: "Get an avatar of someone.",
    category: "🔰 Util",
    usage: `${prefix}avatar [member]`,
    cooldown: 6,

    async execute(message, args, client) {

        //Get the member
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
        if (member) var avatarMember = member.user
        if (!member) var avatarMember = message.author

        //Send the embed message
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`[${avatarMember.username}](${avatarMember.displayAvatarURL()})'s Avatar`)
            .setImage(avatarMember.displayAvatarURL()))



    }
}