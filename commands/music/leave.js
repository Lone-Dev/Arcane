module.exports = {
    name: "leave",
    description: "Let me leave the voice channel.",
    category: "🎵 Music",
    usage: `${process.env.prefix}leave`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, ops) {

        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);
        if (!message.guild.me.voice.channel) return message.channel.send(`Im not connected to an voice channel.`)
        if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(`You are not in the same voice channel as me.`);


        message.guild.me.voice.channel.leave();
        message.react('👋')

    }
}