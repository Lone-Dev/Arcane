const warnModel = require('../../../database/models/warn')

module.exports = {
    name: 'unwarn',
    description: 'Unwarn a member from the guild.',
    category: '🛠️ Moderation',
    usage: '<member> <warning id> [reason]',
    cooldown: 3,
    nsfw: false,
    async execute(message, args, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1])

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You don't have permission to unwarn members.`)
        if (!mentionedMember) return message.channel.send(`You need to mention a member you want to warn`)

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position

        if (memberPosition <= mentionedPosition) return message.channel.send(`You can't unwarn this member as their role is higher/equal to yours.`)

        let warnDoc = await warnModel.findOne({ guildID: message.guild.id, memberID: mentionedMember.id })

        if (!warnDoc || !warnDoc.warnings.length) return message.channel.send(`This member doesn't have any warnings.`)

        const warningID = parseInt(args[2])

        if (warningID <= 0 || warningID > warnDoc.warnings.length || !args[2]) return message.channel.send(`This is an invalid warning id.`)

        warnDoc.warnings.splice(warningID - 1, warningID !== 1 ? warningID - 1 : 1)

        await warnDoc.save().catch(err => console.log(err))

        message.channel.send(`Unwarned ${mentionedMember}`)




    }
}