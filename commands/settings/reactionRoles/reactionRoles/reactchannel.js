const Discord = require("discord.js");
const reactChannel = require('../../../../database/models/reactChannel');

module.exports = {
    name: "reactchannel",
    description: "set an react channel for reaction roles.",
    category: "⚙ Settings",
    usage: `;reactchannel <channel>`,
    cooldown: 2,

    async execute(message, args, client) {
        let channel =
            message.mentions.channels.first() || client.channels.cache.get(args[0]);

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(
                "You do not have permissions to use this command."
            );
        }

        if (!channel) {
            return message.channel.send('Please specify a channel.');
        }

        reactChannel.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if (err) console.log(err);
            if (!data) {
                let newSettings = new reactChannel({
                    GuildID: message.guild.id,
                    ChannelID: channel.id,
                });
                newSettings.save();
                message.channel.send(`The bot will send reaction roles now in ${channel}`);
            } else {
                message.channel.send('This data already exist.');
            }
        });
    },
};
