const warnModel = require('../../../database/models/warn')

module.exports = {
    name: 'warn',
    description: 'Warn a member.',
    category: '🛠️ Moderation',
    usage: '<member> [reason]',
    cooldown: 3,
    nsfw: false,
    async execute(message, args, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1])

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You don't have permission to warn members.`)
        if (!mentionedMember) return message.channel.send(`You need to mention a member you want to warn`)

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position

        if (memberPosition <= mentionedPosition) return message.channel.send(`You can't warn this member as their role is higher/equal to yours.`)

        const reason = args.slice(2).join(' ') || "Not Specified."

        let warnDoc = await warnModel.findOne({ guildID: message.guild.id, memberID: mentionedMember.id })

        if (!warnDoc) {
            warnDoc = new warnModel({
                guildID: message.guild.id,
                memberID: mentionedMember.id,
                warnings: [reason],
                moderator: [message.member.id],
                date: [Date.now()]
            })

            await warnDoc.save().catch(err => console.log(err))
        } else {
            if (warnDoc.warnings.length === 3) {
                return message.channel.send(`You can't warn this member as they already have 3 warns`)
            }

            warnDoc.warnings.push(reason)
            warnDoc.moderator.push(message.member.id)
            warnDoc.date.push(Date.now())

            await warnDoc.save().catch(err => console.log(err))
        }

        message.channel.send(`Warned ${mentionedMember} for reason **${reason}**`)
    }
}