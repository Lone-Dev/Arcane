const { MessageEmbed } = require('discord.js')
const warnModel = require('../../database/models/warn')
const kickModel = require('../../database/models/kick')
const banModel = require('../../database/models/ban')


module.exports = {
    name: 'history',
    description: 'View warnings of a member.',
    category: '🛠️ Moderation',
    usage: '[member]',
    cooldown: 3,
    nsfw: false,
    async execute(message, args, client) {
        const data = []
        var warnings = ''
        var kicks = ''
        var bans = ''

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member


        const warnDoc = await warnModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        }).catch(err => console.log(err))

        if (!warnDoc || !warnDoc.warnings.length) {
            warnings = 0
        } else {
            warnings = warnDoc.warnings.length
        }

        const kickDoc = await kickModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        })

        if (!kickDoc || !kickDoc.kicks.length) {
            kicks = 0
        } else {
            kicks = kickDoc.kicks.length
        }

        const banDoc = await banModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedMember.id
        })

        if (!banDoc || !banDoc.bans.length) {
            bans = 0
        } else {
            bans = banDoc.bans.length
        }

        data.push(`Warns: **${warnings}**`)
        data.push(`Kicks: **${kicks}**`)
        data.push(`Bans: **${bans}**`)

        const embed = new MessageEmbed()
            .setAuthor(`History of ${mentionedMember.user.tag}`, mentionedMember.user.displayAvatarURL())
            .setDescription(data.join(', '))
            .setColor('BLUE')

        message.channel.send({ embed: embed })

    }
}