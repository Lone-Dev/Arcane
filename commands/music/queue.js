const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Gives the queue of the guild.",
    category: "🎵 Music",
    usage: `${process.env.prefix}queue`,
    cooldown: 2,
    nsfw: false,

    async execute(message, args, client, options) {

        const guildIDData = options.active.get(message.guild.id)

        if (!guildIDData) return message.channel.send(`No music is playing right now.`)

        const queue = guildIDData.queue

        const nowPlaying = queue[0];

        var response = `__Now Playing:__\n[${nowPlaying.title}](${nowPlaying._videoURL}) | \`Requested by: ${nowPlaying.requester}\`\n\n__Up Next:__\n`

        for (let index = 0; index < queue.length; index++) {

            response += `\`${index + 1}\`. [${queue[index].title}](${queue[index]._videoURL}) | \`Requested by: ${queue[index].requester}\`\n\n`
        }

        response += `**${queue.length} songs in queue**`

        const embed = new MessageEmbed()
            .setTitle(`Queue for ${message.guild.name}`)
            .setDescription(`${response}`)
            .setColor("RANDOM")

        message.channel.send(embed)

    }
}