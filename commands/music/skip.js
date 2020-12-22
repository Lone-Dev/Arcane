module.exports = {
    name: "skip",
    description: "Skip an song.",
    category: "🎵 Music",
    usage: `${process.env.prefix}skip`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, options) {

        const guildIDData = options.active.get(message.guild.id)

        if (!message.guild.me.voice.channel) return message.channel.send(`Im not connected to an voice channel.`)
        if (!guildIDData) return message.channel.send(`No music is playing right now.`)
        if (!message.member.voice.channel) return message.channel.send(`Join a voice channel.`);
        if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send(`Join the same voice channel as me.`)

        if (message.member.hasPermission("KICK_MEMBERS")) {

            message.channe.send(`👍 ***Skipped***`)

            return guildIDData.dispatcher.emit('finish');

        } else {

            const amountUsers = message.member.voice.channel.members.size;

            const amountSkip = Math.floor(amountUsers / 2)

            if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

            if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`You already voted for skipping.`)

            guildIDData.queue[0].voteSkips.push(message.member.id);

            options.active.set(message.guild.id, guildIDData)

            if (guildIDData.queue[0].voteSkips.length >= amountSkip) {
                message.channe.send(`⏭ ***Skipped***`)

                return guildIDData.dispatcher.emit('finish');
            }

            message.channel.send(`Waiting for other people to skip (**${guildIDData.queue[0].voteSkips.length}/${amountSkip})`)
        }

    }
}