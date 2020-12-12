const { stats } = require('discord-bukket')
const { prefix } = require('../../config.json')

module.exports = {
    name: "stats",
    description: "View the stats of the bot.",
    category: "🔰 Util",
    usage: `${prefix}stats`,
    cooldown: 2,
    nsfw: false,
    async execute(message, args, client) {

        stats(client, message)

    }
};