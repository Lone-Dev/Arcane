const kickModel = require('../../../database/models/kick')

module.exports = {
    name: 'kicks',
    description: 'View kicks of a member.',
    category: '🛠️ Moderation',
    usage: '[member]',
    cooldown: 3,
    nsfw: false,
    async execute(message, args, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member


        const kickDoc = await kickModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        }).catch(err => console.log(err))

        if (!kickDoc || !kickDoc.kicks.length) {
            return message.channel.send(`${mentionedMember} hasn't been kicked.`)
        }

        const data = []


        for (let i = 0; kickDoc.kicks.length > i; i++) {
            data.push(`ID: ${i + 1}`)
            data.push(`Kick: ${kickDoc.kicks[i]}`)
            data.push(`Moderator: ${await message.client.users.fetch(kickDoc.moderator[i]).catch(() => 'Deleted User')}`)
            data.push(`Date: ${new Date(kickDoc.date[i]).toLocaleDateString()}\n`)
        }

        const embed = {
            color: 'BLUE',
            thumbnail: {
                url: mentionedMember.user.displayAvatarURL({ dynamic: true }),
            },
            description: data.join('\n')
        }

        message.channel.send({ embed: embed })

    }
}