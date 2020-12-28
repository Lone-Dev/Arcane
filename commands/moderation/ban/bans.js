const banModel = require('../../../database/models/ban')

module.exports = {
    name: 'bans',
    description: 'View bans of a member.',
    category: '🛠️ Moderation',
    usage: '[member]',
    cooldown: 3,
    nsfw: false,
    async execute(message, args, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member


        const banDoc = await banModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        }).catch(err => console.log(err))

        if (!banDoc || !banDoc.bans.length) {
            return message.channel.send(`${mentionedMember} hasn't been banned.`)
        }

        const data = []


        for (let i = 0; banDoc.kicks.length > i; i++) {
            data.push(`ID: ${i + 1}`)
            data.push(`Ban: ${banDoc.bans[i]}`)
            data.push(`Moderator: ${await message.client.users.fetch(banDoc.moderator[i]).catch(() => 'Deleted User')}`)
            data.push(`Date: ${new Date(banDoc.date[i]).toLocaleDateString()}\n`)
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