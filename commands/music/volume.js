const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Change the volume of the song.",
    category: "🎵 Music",
    usage: `${process.env.prefix}volume`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, options) {

        const guildIDData = options.active.get(message.guild.id)

        if (!message.guild.me.voice.channel) return message.channel.send(`Im not connected to an voice channel.`)
        if (!guildIDData) return message.channel.send(`No music is playing right now.`)
        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);
        if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send(`Join the same voice channel as me.`)

        if (isNaN(args[1]) || args[1] > 150 || args[1] < 0) return message.channel.send(`What must be the volume, 0-150??`)

        guildIDData.dispatcher.setVolume(args[1] / 100)

        return message.channel.send(`Setted volume to ${args[1]}`)


    }
}