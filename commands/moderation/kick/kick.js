const kickModel = require('../../../database/models/kick')

module.exports = {
    name: "kick",
    description: "Kick someone.",
    category: "🛠️ Moderation",
    usage: `<member> [reason]`,
    cooldown: 4,

    async execute(message, args, client) {

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1])

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`You don't have permission to kick members.`)
        if (!mentionedMember) return message.channel.send(`You need to mention a member you want to kick`)

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position

        if (memberPosition <= mentionedPosition) return message.channel.send(`You can't kick this member as their role is higher/equal to yours.`)

        const reason = args.slice(2).join(' ') || "Not Specified."

        let kickDoc = await kickModel.findOne({ guildID: message.guild.id, memberID: mentionedMember.id })

        if (!kickDoc) {
            kickDoc = new kickModel({
                guildID: message.guild.id,
                memberID: mentionedMember.id,
                kicks: [reason],
                moderator: [message.member.id],
                date: [Date.now()]
            })

            await kickDoc.save().catch(err => console.log(err))
        } else {

            kickDoc.kicks.push(reason)
            kickDoc.moderator.push(message.member.id)
            kickDoc.date.push(Date.now())

            await kickDoc.save().catch(err => console.log(err))
        }

        message.channel.send(`Kicked ${mentionedMember} for reason **${reason}**`)

        mentionedMember.kick([reason])


    }
}