const Discord = require("discord.js");
const Canvas = require('canvas')

module.exports = {
    name: "gay",
    description: "Let someone be gay",
    category: "📜 Canvas",
    usage: `[member]`,
    cooldown: 6,
    nsfw: false,

    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
        if (member) var avatarMember = member.user
        if (!member) var avatarMember = message.author
        const canvas = Canvas.createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        const avatar = await Canvas.loadImage(avatarMember.displayAvatarURL({ format: 'jpg', dynamic: true }));
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);


        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/748601397674770622/780828615959904286/rainbow-gay-pride-flag.fw_-1024x1024.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'gay.png');

        const msg = await message.channel.send(`Generating...`)
        msg.delete()
        message.channel.send(attachment)


    }
}