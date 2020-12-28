const banModel = require('../../../database/models/ban')

module.exports = {
    name: "ban",
    description: "Ban someone",
    category: "🛠️ Moderation",
    usage: `<member> [reason]`,
    cooldown: 4,

    async execute(message, args, client) {

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1])

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`You don't have permission to ban members.`)
        if (!mentionedMember) return message.channel.send(`You need to mention a member you want to ban`)

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position

        if (memberPosition <= mentionedPosition) return message.channel.send(`You can't ban this member as their role is higher/equal to yours.`)

        const reason = args.slice(2).join(' ') || "Not Specified."

        let banDoc = await banModel.findOne({ guildID: message.guild.id, memberID: mentionedMember.id })

        if (!banDoc) {
            banDoc = new banModel({
                guildID: message.guild.id,
                memberID: mentionedMember.id,
                bans: [reason],
                moderator: [message.member.id],
                date: [Date.now()]
            })

            await banDoc.save().catch(err => console.log(err))
        } else {

            banDoc.bans.push(reason)
            banDoc.moderator.push(message.member.id)
            banDoc.date.push(Date.now())

            await banDoc.save().catch(err => console.log(err))
        }

        message.channel.send(`Banned ${mentionedMember} for reason **${reason}**`)

        mentionedMember.ban([reason])


    }
}