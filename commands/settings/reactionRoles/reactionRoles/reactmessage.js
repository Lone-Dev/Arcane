const Discord = require("discord.js");
const reactChannel = require('../../../../database/models/reactChannel');
const { prefix } = require('../../../../config.json')

module.exports = {
    name: "reactmessage",
    description: "Send the reaction roles message in your specefied channel.",
    category: "⚙ Settings",
    usage: `${prefix}reactmessage`,
    cooldown: 2,

    async execute(message, args, client) {

        reactChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {

            if (!data12) return

            let channel = client.channels.cache.get(data12.ChannelID)

            if (!message.member.hasPermission('ADMINISTRATOR')) {
                return message.channel.send(`You don't have the right permission for this.`)
            } else {

                const msg = await channel.send(new Discord.MessageEmbed()
                    .setTitle("Reaction Roles!")
                    .setColor('RANDOM')
                    .setDescription('🔴 Red\n🔵 Blue'))

                msg.react('🔴')
                msg.react('🔵')



                if (!message.guild.roles.cache.find(r => r.name === 'Red')) await message.guild.roles.create({ data: { name: "Red", color: "RED" } }).then(async () => {
                    message.channel.send('Created role: Red')
                })

                if (!message.guild.roles.cache.find(r => r.name === 'Blue')) await message.guild.roles.create({ data: { name: "Blue", color: "BLUE" } }).then(async () => {
                    message.channel.send('Created role: Blue')
                })


            }
        })

    }
}