const warnModel = require('../../../database/models/warn')

module.exports = {
    name: 'warnings',
    aliases: ['warns'],
    description: 'View warnings of a member.',
    category: '🛠️ Moderation',
    usage: '[member]',
    cooldown: 3,
    nsfw: false,
    async execute(message, args, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member


        const warnDoc = await warnModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        }).catch(err => console.log(err))

        if (!warnDoc || !warnDoc.warnings.length) {
            return message.channel.send(`${mentionedMember} doesn't have any warnings.`)
        }

        const data = []


        for (let i = 0; warnDoc.warnings.length > i; i++) {
            data.push(`ID: ${i + 1}`)
            data.push(`Warn: ${warnDoc.warnings[i]}`)
            data.push(`Moderator: ${await message.client.users.fetch(warnDoc.moderator[i]).catch(() => 'Deleted User')}`)
            data.push(`Date: ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`)
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