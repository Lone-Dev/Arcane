const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    description: "Resume the music.",
    category: "🎵 Music",
    usage: `${process.env.prefix}resume`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, options) {

        const guildIDData = options.active.get(message.guild.id)

        if (!message.guild.me.voice.channel) return message.channel.send(`Im not connected to an voice channel.`)
        if (!guildIDData) return message.channel.send(`No music is playing right now.`)
        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);
        if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send(`Join the same voice channel as me.`)

        if (!guildIDData.dispatcher.paused) return message.channel.send(`The music is not paused.`)

        guildIDData.dispatcher.resume();

        return message.channel.send(`▶ ***Resumed***`)



    }
}