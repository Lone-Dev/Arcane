const Discord = require("discord.js");
const Canvas = require('canvas')

module.exports = {
    name: "wanted",
    description: "Gives an picture of someone thats wanted.",
    category: "📜 Canvas",
    usage: `${process.env.prefix}wanted [member]`,
    cooldown: 6,


    async execute(message, args, client) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
        if (member) var avatarMember = member.user
        if (!member) var avatarMember = message.author
        const canvas = Canvas.createCanvas(1001, 1414);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/748601397674770622/780518468541087764/f30f16432a938f5fc6101558cf4ff2ae.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(avatarMember.displayAvatarURL({ format: 'jpg', dynamic: true }));
        ctx.drawImage(avatar, 178, 441, 641, 600);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'wanted.png');

        const msg = await message.channel.send(`Generating...`)

        msg.delete()
        message.channel.send(attachment)


    }
}